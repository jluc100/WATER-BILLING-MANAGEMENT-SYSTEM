/*
 * WASAC Water - ESP32 Offline Sync Example
 * 
 * Features:
 * - RFID card detection
 * - Flow sensor reading
 * - Local buffer when WiFi is down
 * - Auto sync when connection restored
 * 
 * Hardware: ESP32, RC522 RFID, YF-S201 flow sensor
 * API: POST /api/sync/batch with X-Device-Key header
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <SPIFFS.h>

const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";
const char* API_URL = "http://your-server:5000/api";
const char* DEVICE_KEY = "esp32-dev-key-change-me";
const char* DEVICE_ID = "ESP32-001";

#define MAX_BUFFER 50
String eventBuffer[MAX_BUFFER];
int bufferCount = 0;
bool isOnline = false;

void setup() {
  Serial.begin(115200);
  SPIFFS.begin(true);
  loadBufferFromFlash();
  connectWiFi();
}

void loop() {
  isOnline = WiFi.status() == WL_CONNECTED;

  if (!isOnline) {
    // Store events locally - critical for Rwanda infrastructure
    Serial.println("OFFLINE - buffering events locally");
  } else if (bufferCount > 0) {
    syncBufferedEvents();
  }

  // Example: read RFID and flow sensor
  // String cardUid = readRFID();
  // float flowRate = readFlowSensor();
  // handleWaterSession(cardUid, flowRate);

  delay(1000);
}

void bufferEvent(String eventJson) {
  if (bufferCount < MAX_BUFFER) {
    eventBuffer[bufferCount++] = eventJson;
    saveBufferToFlash();
  }
}

void syncBufferedEvents() {
  HTTPClient http;
  http.begin(String(API_URL) + "/sync/batch");
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-Device-Key", DEVICE_KEY);

  StaticJsonDocument<4096> doc;
  doc["device_id"] = DEVICE_ID;
  JsonArray events = doc.createNestedArray("events");

  for (int i = 0; i < bufferCount; i++) {
    StaticJsonDocument<256> ev;
    deserializeJson(ev, eventBuffer[i]);
    events.add(ev);
  }

  String body;
  serializeJson(doc, body);

  int code = http.POST(body);
  if (code == 200) {
    Serial.println("Sync successful - clearing buffer");
    bufferCount = 0;
    clearFlashBuffer();
  } else {
    Serial.printf("Sync failed: %d\n", code);
  }
  http.end();
}

void saveBufferToFlash() {
  File f = SPIFFS.open("/buffer.json", "w");
  if (f) {
    f.println(bufferCount);
    for (int i = 0; i < bufferCount; i++) f.println(eventBuffer[i]);
    f.close();
  }
}

void loadBufferFromFlash() {
  if (!SPIFFS.exists("/buffer.json")) return;
  File f = SPIFFS.open("/buffer.json", "r");
  if (f) {
    bufferCount = f.readStringUntil('\n').toInt();
    for (int i = 0; i < bufferCount && i < MAX_BUFFER; i++) {
      eventBuffer[i] = f.readStringUntil('\n');
    }
    f.close();
  }
}

void clearFlashBuffer() {
  SPIFFS.remove("/buffer.json");
}

void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  isOnline = WiFi.status() == WL_CONNECTED;
  Serial.println(isOnline ? "\nWiFi connected" : "\nWiFi failed - offline mode");
}

// Example water authorize API call
bool authorizeWater(String cardUid, int requestedMl) {
  if (!isOnline) {
    StaticJsonDocument<128> ev;
    ev["type"] = "authorize";
    ev["card_uid"] = cardUid;
    ev["requested_ml"] = requestedMl;
    ev["timestamp"] = millis();
    String s;
    serializeJson(ev, s);
    bufferEvent(s);
    return false; // Cannot open valve offline without local balance check
  }

  HTTPClient http;
  http.begin(String(API_URL) + "/water/authorize");
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-Device-Key", DEVICE_KEY);

  StaticJsonDocument<256> doc;
  doc["card_uid"] = cardUid;
  doc["requested_ml"] = requestedMl;
  doc["device_id"] = DEVICE_ID;

  String body;
  serializeJson(doc, body);
  int code = http.POST(body);
  http.end();
  return code == 200;
}
