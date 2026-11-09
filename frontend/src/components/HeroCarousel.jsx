import { useEffect, useState } from 'react';

/* ── Illustration 1: Water Bill Management (water meter, bill, piggy bank, people) ── */
function BillManagementIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="absolute w-72 h-72 bg-blue-100 rounded-full opacity-40 animate-pulse-slow" />

      {/* Falling water drops */}
      <div className="absolute top-4 right-20 animate-drop-1">
        <svg viewBox="0 0 16 20" className="w-3 h-4 text-blue-400" fill="currentColor">
          <path d="M8 0C5.5 4.5 2 8 2 12a6 6 0 0 0 12 0C14 8 10.5 4.5 8 0Z" />
        </svg>
      </div>
      <div className="absolute top-12 right-10 animate-drop-2">
        <svg viewBox="0 0 16 20" className="w-2 h-3 text-cyan-400" fill="currentColor">
          <path d="M8 0C5.5 4.5 2 8 2 12a6 6 0 0 0 12 0C14 8 10.5 4.5 8 0Z" />
        </svg>
      </div>
      <div className="absolute top-8 left-24 animate-drop-3">
        <svg viewBox="0 0 16 20" className="w-2.5 h-3.5 text-blue-300" fill="currentColor">
          <path d="M8 0C5.5 4.5 2 8 2 12a6 6 0 0 0 12 0C14 8 10.5 4.5 8 0Z" />
        </svg>
      </div>

      <svg viewBox="0 0 400 340" className="relative w-full max-w-lg animate-float drop-shadow-xl">
        {/* Background glow circle */}
        <circle cx="200" cy="165" r="135" fill="#EBF5FF" opacity="0.5" />

        {/* Water pipe + faucet */}
        <rect x="162" y="18" width="76" height="20" rx="10" fill="#64B5F6" />
        <rect x="182" y="38" width="36" height="30" fill="#64B5F6" />
        <rect x="146" y="22" width="32" height="10" rx="5" fill="#42A5F5" />
        <rect x="172" y="52" width="10" height="8" rx="4" fill="#1E88E5" opacity="0.7" />

        {/* Water drops from faucet */}
        <ellipse cx="188" cy="76" rx="5" ry="7" fill="#1E88E5" opacity="0.65" />
        <ellipse cx="204" cy="84" rx="4" ry="6" fill="#42A5F5" opacity="0.5" />
        <ellipse cx="220" cy="70" rx="3.5" ry="5" fill="#29B6F6" opacity="0.4" />

        {/* Water meter body */}
        <circle cx="200" cy="165" r="68" fill="white" stroke="#1E88E5" strokeWidth="4" />
        <circle cx="200" cy="165" r="58" fill="#F0F7FF" />
        <circle cx="200" cy="165" r="52" fill="white" stroke="#BBDEFB" strokeWidth="1.5" />

        {/* Gauge tick marks */}
        {Array.from({ length: 10 }, (_, i) => {
          const angle = (i * 30 - 120) * (Math.PI / 180);
          const x1 = 200 + 44 * Math.cos(angle);
          const y1 = 165 + 44 * Math.sin(angle);
          const x2 = 200 + 50 * Math.cos(angle);
          const y2 = 165 + 50 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#90CAF9" strokeWidth="2" />;
        })}

        {/* Meter display box */}
        <rect x="170" y="152" width="60" height="20" rx="4" fill="#1E88E5" opacity="0.1" />
        <text x="200" y="166" textAnchor="middle" fill="#0D1B2A" fontSize="13" fontWeight="800" fontFamily="monospace">0820598</text>
        <text x="200" y="182" textAnchor="middle" fill="#64B5F6" fontSize="9" fontWeight="600">m³</text>

        {/* Needle */}
        <line x1="200" y1="165" x2="228" y2="138" stroke="#F44336" strokeWidth="3" strokeLinecap="round" />
        <circle cx="200" cy="165" r="7" fill="#1E88E5" />
        <circle cx="200" cy="165" r="3.5" fill="white" />

        {/* BILL document - right */}
        <rect x="285" y="88" width="94" height="118" rx="8" fill="white" stroke="#E3F2FD" strokeWidth="2" />
        <rect x="285" y="88" width="94" height="24" rx="8" fill="#1E88E5" />
        <rect x="285" y="100" width="94" height="12" fill="#1E88E5" />
        <text x="332" y="104" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">BILL</text>
        <rect x="296" y="122" width="55" height="5" rx="2.5" fill="#E3F2FD" />
        <rect x="296" y="134" width="65" height="4" rx="2" fill="#F0F7FF" />
        <rect x="296" y="144" width="48" height="4" rx="2" fill="#F0F7FF" />
        <rect x="296" y="154" width="60" height="4" rx="2" fill="#F0F7FF" />
        {/* Amount area */}
        <rect x="296" y="168" width="72" height="30" rx="6" fill="#EBF5FF" />
        <text x="332" y="181" textAnchor="middle" fill="#64B5F6" fontSize="8" fontWeight="600">AMOUNT DUE</text>
        <text x="332" y="193" textAnchor="middle" fill="#1E88E5" fontSize="10" fontWeight="800">RWF 48,500</text>

        {/* Piggy bank - left */}
        <ellipse cx="80" cy="188" rx="36" ry="29" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2" />
        <circle cx="97" cy="172" rx="12" ry="11" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2" />
        <circle cx="101" cy="170" r="2.5" fill="#5D4037" />
        {/* Coin slot */}
        <rect x="76" y="162" width="18" height="5" rx="2.5" fill="#F9A825" />
        {/* Coin dropping */}
        <ellipse cx="85" cy="150" rx="9" ry="7" fill="#FFCA28" stroke="#F9A825" strokeWidth="1.5" />
        <text x="85" y="153" textAnchor="middle" fill="#E65100" fontSize="7" fontWeight="800">RF</text>
        {/* Piggy legs */}
        <rect x="58" y="212" width="11" height="18" rx="5.5" fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
        <rect x="74" y="212" width="11" height="18" rx="5.5" fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
        <rect x="92" y="212" width="11" height="18" rx="5.5" fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />

        {/* Person 1 - holding meter reading */}
        <circle cx="122" cy="263" r="11" fill="#42A5F5" />
        <rect x="115" y="274" width="15" height="24" rx="6" fill="#42A5F5" />
        <rect x="112" y="281" width="7" height="22" rx="3.5" fill="#42A5F5" />
        <rect x="128" y="281" width="7" height="22" rx="3.5" fill="#42A5F5" />

        {/* Person 2 - holding calculator */}
        <circle cx="272" cy="258" r="11" fill="#F48FB1" />
        <rect x="265" y="269" width="15" height="24" rx="6" fill="#F48FB1" />
        {/* Calculator in hand */}
        <rect x="250" y="262" width="18" height="22" rx="3" fill="white" stroke="#E0E0E0" strokeWidth="1.5" />
        <rect x="253" y="265" width="12" height="6" rx="1.5" fill="#BBDEFB" />
        <circle cx="255" cy="276" r="2" fill="#1E88E5" opacity="0.7" />
        <circle cx="261" cy="276" r="2" fill="#1E88E5" opacity="0.7" />
        <circle cx="258" cy="282" r="2" fill="#1E88E5" opacity="0.7" />

        {/* Scattered coins */}
        <circle cx="158" cy="296" r="9" fill="#FFCA28" stroke="#F9A825" strokeWidth="1.5" />
        <text x="158" y="299" textAnchor="middle" fill="#E65100" fontSize="10" fontWeight="800">$</text>
        <circle cx="240" cy="300" r="7" fill="#FFCA28" stroke="#F9A825" strokeWidth="1.5" />
        <circle cx="185" cy="308" r="5.5" fill="#FFCA28" stroke="#F9A825" strokeWidth="1.5" />

        {/* Decorative dots */}
        <circle cx="44" cy="108" r="6" fill="#1E88E5" opacity="0.18" />
        <circle cx="348" cy="270" r="8" fill="#00BCD4" opacity="0.18" />
        <circle cx="355" cy="60" r="5" fill="#42A5F5" opacity="0.25" />
        <circle cx="30" cy="250" r="4" fill="#42A5F5" opacity="0.2" />
      </svg>
    </div>
  );
}

/* ── Illustration 2: Mobile Bill Payment (phone in jeans pocket) ── */
function MobilePaymentIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="absolute w-64 h-64 bg-indigo-100 rounded-full opacity-35 animate-pulse-slow" />

      {/* Floating payment badges — hidden on small screens to avoid overflow */}
      <div className="hidden sm:block absolute top-6 left-10 animate-float" style={{ animationDelay: '0.3s' }}>
        <div className="bg-white rounded-2xl px-3.5 py-2 shadow-xl text-xs font-bold text-slate-700 border border-blue-100 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[9px] font-black">₿</span>
          UPI Pay
        </div>
      </div>
      <div className="hidden sm:block absolute top-24 right-6 animate-float" style={{ animationDelay: '1.2s' }}>
        <div className="bg-white rounded-2xl px-3.5 py-2 shadow-xl text-xs font-bold text-slate-700 border border-green-100 flex items-center gap-2">
          <div className="w-5 h-3.5 rounded bg-gradient-to-r from-emerald-500 to-green-400" />
          Card
        </div>
      </div>
      <div className="hidden sm:block absolute bottom-20 left-8 animate-float" style={{ animationDelay: '2s' }}>
        <div className="bg-white rounded-2xl px-3.5 py-2 shadow-xl text-xs font-bold text-slate-700 border border-purple-100 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-[9px]">W</div>
          Wallet
        </div>
      </div>

      <svg viewBox="0 0 400 360" className="relative w-full max-w-lg drop-shadow-2xl animate-float" style={{ animationDelay: '0.6s' }}>
        {/* Jeans denim background */}
        <rect x="70" y="50" width="260" height="295" rx="22" fill="#3949AB" opacity="0.12" />
        {[60, 82, 104, 126, 148, 170, 192, 214, 236, 258, 280, 302, 324].map((y) => (
          <line key={y} x1="70" y1={y} x2="330" y2={y} stroke="#3F51B5" strokeWidth="0.5" opacity="0.18" />
        ))}
        {/* Pocket stitching */}
        <path d="M 125 50 Q 200 43 275 50" stroke="#3F51B5" strokeWidth="3.5" fill="none" opacity="0.35" strokeDasharray="9 5" />

        {/* Phone body */}
        <rect x="118" y="55" width="164" height="285" rx="24" fill="#111827" />
        <rect x="122" y="59" width="156" height="277" rx="22" fill="#1F2937" />
        {/* Screen area */}
        <rect x="124" y="72" width="152" height="260" rx="20" fill="white" />

        {/* Camera notch */}
        <rect x="167" y="72" width="66" height="16" rx="8" fill="#111827" />
        <circle cx="200" cy="80" r="4.5" fill="#1F2937" />

        {/* Status bar */}
        <rect x="124" y="72" width="152" height="26" rx="20" fill="#F0F7FF" />
        <rect x="124" y="88" width="152" height="10" fill="#F0F7FF" />

        {/* App header - blue */}
        <rect x="124" y="98" width="152" height="48" fill="#1E88E5" />
        <text x="200" y="124" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" letterSpacing="1">BILL PAYMENT</text>
        <text x="200" y="138" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8">AquaPay • Secure</text>

        {/* Bill card */}
        <rect x="136" y="154" width="128" height="58" rx="12" fill="#EBF5FF" />
        <text x="200" y="171" textAnchor="middle" fill="#90A4AE" fontSize="8.5" fontWeight="600">AMOUNT DUE</text>
        <text x="200" y="193" textAnchor="middle" fill="#0D1B2A" fontSize="17" fontWeight="900">RWF 48,500</text>
        <text x="200" y="206" textAnchor="middle" fill="#90A4AE" fontSize="7.5">Due: June 15, 2026</text>

        {/* Payment method tabs */}
        <rect x="136" y="222" width="56" height="32" rx="8" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1" />
        <text x="164" y="241" textAnchor="middle" fill="#2E7D32" fontSize="8.5" fontWeight="700">💳 Card</text>
        <rect x="198" y="222" width="66" height="32" rx="8" fill="#1E88E5" />
        <text x="231" y="241" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="700">📱 UPI</text>

        {/* Pay button */}
        <rect x="136" y="264" width="128" height="38" rx="19" fill="url(#payGrad)" />
        <defs>
          <linearGradient id="payGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1565C0" />
            <stop offset="100%" stopColor="#42A5F5" />
          </linearGradient>
        </defs>
        <text x="200" y="287" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">PAY NOW →</text>

        {/* Home bar */}
        <rect x="178" y="318" width="44" height="4" rx="2" fill="#111827" opacity="0.35" />

        {/* Decorative dots */}
        <circle cx="88" cy="140" r="7" fill="#1E88E5" opacity="0.25" />
        <circle cx="78" cy="158" r="4.5" fill="#42A5F5" opacity="0.18" />
        <circle cx="316" cy="220" r="8" fill="#00BCD4" opacity="0.22" />

        {/* Stars */}
        <text x="75" y="218" fontSize="20" opacity="0.55" fill="#FDD835">✦</text>
        <text x="318" y="140" fontSize="13" opacity="0.4" fill="#42A5F5">✦</text>
        <text x="312" y="290" fontSize="16" opacity="0.3" fill="#1E88E5">✦</text>
      </svg>
    </div>
  );
}

/* ── Illustration 3: Payment Successful (green checkmark on phone + laptop background) ── */
function PaymentSuccessIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="absolute w-60 h-60 bg-green-100 rounded-full opacity-55 animate-pulse-slow" />
      <div className="absolute w-40 h-40 bg-emerald-200 rounded-full opacity-35 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />

      {/* Confetti pieces */}
      {[
        { l: 'left-6', t: 'top-8', color: 'bg-blue-400', w: 'w-2', h: 'h-7', rot: 'rotate-12', d: '0s' },
        { l: 'right-10', t: 'top-6', color: 'bg-yellow-400', w: 'w-2', h: 'h-6', rot: '-rotate-12', d: '0.3s' },
        { l: 'left-14', t: 'top-24', color: 'bg-red-400', w: 'w-1.5', h: 'h-5', rot: 'rotate-45', d: '0.6s' },
        { l: 'right-6', t: 'top-20', color: 'bg-purple-400', w: 'w-2', h: 'h-6', rot: '-rotate-6', d: '0.9s' },
        { l: 'left-8', t: 'bottom-24', color: 'bg-pink-400', w: 'w-1.5', h: 'h-5', rot: 'rotate-20', d: '0.2s' },
        { l: 'right-4', t: 'bottom-18', color: 'bg-cyan-400', w: 'w-2', h: 'h-4', rot: '-rotate-30', d: '0.7s' },
        { l: 'left-20', t: 'bottom-10', color: 'bg-green-400', w: 'w-2', h: 'h-6', rot: 'rotate-6', d: '1.1s' },
      ].map((c, i) => (
        <div
          key={i}
          className={`absolute ${c.l} ${c.t} ${c.color} ${c.w} ${c.h} ${c.rot} rounded-full animate-bounce opacity-75`}
          style={{ animationDelay: c.d, animationDuration: `${1.4 + i * 0.15}s` }}
        />
      ))}

      <svg viewBox="0 0 400 360" className="relative w-full max-w-lg drop-shadow-2xl">
        {/* Laptop in background */}
        <rect x="272" y="170" width="105" height="72" rx="5" fill="#E3F2FD" opacity="0.7" />
        <rect x="276" y="174" width="97" height="60" rx="4" fill="#BBDEFB" opacity="0.7" />
        <rect x="278" y="176" width="93" height="56" rx="3" fill="white" opacity="0.75" />
        <rect x="282" y="180" width="60" height="4" rx="2" fill="#90CAF9" opacity="0.9" />
        <rect x="282" y="188" width="75" height="3" rx="1.5" fill="#BBDEFB" opacity="0.8" />
        <rect x="282" y="195" width="55" height="3" rx="1.5" fill="#BBDEFB" opacity="0.7" />
        <rect x="282" y="202" width="68" height="3" rx="1.5" fill="#BBDEFB" opacity="0.6" />
        <rect x="262" y="242" width="124" height="10" rx="5" fill="#B0BEC5" opacity="0.65" />

        {/* Receipt in background - tilted */}
        <g transform="rotate(-14, 55, 160)">
          <rect x="18" y="108" width="75" height="100" rx="6" fill="white" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.85" />
          <rect x="26" y="118" width="58" height="5" rx="2.5" fill="#BBDEFB" />
          <rect x="26" y="129" width="44" height="3.5" rx="1.5" fill="#F0F7FF" />
          <rect x="26" y="138" width="52" height="3.5" rx="1.5" fill="#F0F7FF" />
          <rect x="26" y="147" width="38" height="3.5" rx="1.5" fill="#F0F7FF" />
          <rect x="26" y="162" width="58" height="20" rx="4" fill="#E8F5E9" />
          <text x="55" y="175" textAnchor="middle" fill="#2E7D32" fontSize="7" fontWeight="700">RWF 48,500</text>
        </g>

        {/* Phone body */}
        <rect x="122" y="28" width="156" height="298" rx="25" fill="#111827" />
        <rect x="126" y="32" width="148" height="290" rx="23" fill="#1F2937" />
        {/* Screen */}
        <rect x="128" y="44" width="144" height="274" rx="21" fill="white" />

        {/* Notch */}
        <rect x="163" y="44" width="74" height="16" rx="8" fill="#111827" />
        <circle cx="200" cy="52" r="4.5" fill="#1F2937" />

        {/* App background */}
        <rect x="128" y="60" width="144" height="258" rx="21" fill="#F8FAFF" />

        {/* App title bar */}
        <rect x="128" y="60" width="144" height="36" rx="21" fill="#F0F7FF" />
        <rect x="128" y="76" width="144" height="20" fill="#F0F7FF" />
        <text x="200" y="82" textAnchor="middle" fill="#90A4AE" fontSize="9.5" fontWeight="600">AquaPay</text>

        {/* Success circle */}
        <circle cx="200" cy="168" r="60" fill="#E8F5E9" />
        <circle cx="200" cy="168" r="50" fill="#C8E6C9" />
        <circle cx="200" cy="168" r="42" fill="#4CAF50" />

        {/* Checkmark - uses CSS animation via className */}
        <polyline
          className="check-path"
          points="182,168 196,182 220,148"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pulse rings */}
        <circle cx="200" cy="168" r="58" fill="none" stroke="#4CAF50" strokeWidth="2.5" opacity="0.4" className="pulse-ring" />
        <circle cx="200" cy="168" r="58" fill="none" stroke="#4CAF50" strokeWidth="2" opacity="0.25" className="pulse-ring-2" />

        {/* Text below */}
        <text x="200" y="238" textAnchor="middle" fill="#1B5E20" fontSize="13" fontWeight="800">Payment Successful!</text>
        <text x="200" y="252" textAnchor="middle" fill="#66BB6A" fontSize="9">Transaction ID: #AQ-2847</text>
        <text x="200" y="272" textAnchor="middle" fill="#0D1B2A" fontSize="14" fontWeight="900">RWF 48,500</text>

        {/* Back to home button */}
        <rect x="148" y="282" width="104" height="28" rx="14" fill="#1E88E5" />
        <text x="200" y="300" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="700">BACK TO HOME</text>

        {/* Home bar */}
        <rect x="178" y="320" width="44" height="4" rx="2" fill="#111827" opacity="0.3" />

        {/* Sparkle text elements */}
        <text x="72" y="128" fontSize="26" opacity="0.7">✨</text>
        <text x="304" y="110" fontSize="20" opacity="0.6">⭐</text>
        <text x="68" y="240" fontSize="18" opacity="0.55">🎉</text>
        <text x="306" y="248" fontSize="22" opacity="0.65">✨</text>
      </svg>
    </div>
  );
}

/* ── Illustration 4: Secure & Reliable ── */
function SecurityIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="absolute w-72 h-72 bg-sky-100 rounded-full opacity-40 animate-pulse-slow" />

      <svg viewBox="0 0 400 340" className="relative w-full max-w-lg animate-float drop-shadow-xl">
        {/* Shield */}
        <path d="M 200 35 L 298 78 L 298 188 Q 298 280 200 312 Q 102 280 102 188 L 102 78 Z" fill="#EBF5FF" stroke="#1E88E5" strokeWidth="4.5" />
        <path d="M 200 52 L 278 88 L 278 188 Q 278 262 200 288 Q 122 262 122 188 L 122 88 Z" fill="white" stroke="#90CAF9" strokeWidth="2" />

        {/* Water drop inside shield */}
        <path d="M 200 108 C 186 128 170 142 170 162 a 30 30 0 0 0 60 0 C 230 142 214 128 200 108 Z" fill="#1E88E5" opacity="0.85" />
        <ellipse cx="191" cy="158" rx="7" ry="11" fill="white" opacity="0.4" />

        {/* Shield checkmarks */}
        <polyline points="158,202 172,216 198,188" fill="none" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="202,202 216,216 242,188" fill="none" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* 24/7 badge */}
        <circle cx="295" cy="92" r="33" fill="#1E88E5" />
        <circle cx="295" cy="92" r="29" fill="#1565C0" />
        <text x="295" y="90" textAnchor="middle" fill="white" fontSize="13" fontWeight="900">24/7</text>
        <text x="295" y="104" textAnchor="middle" fill="#90CAF9" fontSize="8.5" fontWeight="600">ACCESS</text>

        {/* Lock icon below shield */}
        <rect x="178" y="228" width="44" height="34" rx="6" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.5" />
        <path d="M 186 228 L 186 220 a 14 14 0 0 1 28 0 L 214 228" fill="none" stroke="#1E88E5" strokeWidth="3.5" />
        <circle cx="200" cy="244" r="5" fill="#1E88E5" />
        <rect x="198" y="244" width="4" height="8" rx="2" fill="#1E88E5" />

        {/* SSL badge */}
        <rect x="30" y="138" width="88" height="40" rx="12" fill="white" stroke="#E3F2FD" strokeWidth="1.5" />
        <text x="74" y="156" textAnchor="middle" fill="#1E88E5" fontSize="9.5" fontWeight="800">🔐 SSL Secure</text>
        <text x="74" y="170" textAnchor="middle" fill="#90A4AE" fontSize="7.5">256-bit encryption</text>

        {/* PCI badge */}
        <rect x="282" y="210" width="92" height="40" rx="12" fill="white" stroke="#E8F5E9" strokeWidth="1.5" />
        <text x="328" y="228" textAnchor="middle" fill="#2E7D32" fontSize="9.5" fontWeight="800">✅ PCI DSS</text>
        <text x="328" y="242" textAnchor="middle" fill="#90A4AE" fontSize="7.5">Bank-level security</text>

        {/* Decorative dots */}
        <circle cx="50" cy="210" r="9" fill="#1E88E5" opacity="0.13" />
        <circle cx="340" cy="158" r="7" fill="#00BCD4" opacity="0.18" />
        <circle cx="55" cy="280" r="6" fill="#42A5F5" opacity="0.18" />
        <circle cx="348" cy="280" r="10" fill="#1E88E5" opacity="0.1" />
      </svg>
    </div>
  );
}

/* ── Slide data — matches spec exactly ── */
const slides = [
  {
    badge: 'Water Bill Management',
    title: 'Pay Your Water Bill',
    highlight: 'in Seconds',
    description: 'Skip the queues. Check and pay your bill anytime, anywhere.',
    cta: 'Pay Now',
    ctaSecondary: 'Learn More',
    Illustration: BillManagementIllustration,
    from: 'from-blue-50',
    via: 'via-sky-50',
    badgeCls: 'bg-blue-100 text-blue-700',
  },
  {
    badge: 'Instant Bill Fetch',
    title: 'Fetch Your Bill',
    highlight: 'Instantly',
    description: 'Enter your account number and get your latest bill details in real-time.',
    cta: 'Check Bill',
    ctaSecondary: 'Learn More',
    Illustration: MobilePaymentIllustration,
    from: 'from-indigo-50',
    via: 'via-blue-50',
    badgeCls: 'bg-indigo-100 text-indigo-700',
  },
  {
    badge: 'Payment History',
    title: 'Track Your',
    highlight: 'Payments',
    description: 'View payment history, download receipts, and stay on top of due dates.',
    cta: 'View History',
    ctaSecondary: 'Learn More',
    Illustration: PaymentSuccessIllustration,
    from: 'from-emerald-50',
    via: 'via-green-50',
    badgeCls: 'bg-emerald-100 text-emerald-700',
  },
  {
    badge: 'Secure & Fast',
    title: 'Simple, Secure,',
    highlight: 'Fast',
    description: 'Built with modern tech for a smooth and safe payment experience.',
    cta: 'Get Started',
    ctaSecondary: 'Learn More',
    Illustration: SecurityIllustration,
    from: 'from-sky-50',
    via: 'via-blue-50',
    badgeCls: 'bg-sky-100 text-sky-700',
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (index) => {
    if (index === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(index);
      setVisible(true);
    }, 300);
  };

  const goPrev = () => goTo((active - 1 + slides.length) % slides.length);
  const goNext = () => goTo((active + 1) % slides.length);

  useEffect(() => {
    const id = setInterval(goNext, 5200);
    return () => clearInterval(id);
  }, [active]);

  const slide = slides[active];
  const { Illustration } = slide;

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${slide.from} ${slide.via} to-white transition-colors duration-700`}>
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-200 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-200 opacity-15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col-reverse lg:flex-row items-center gap-6 sm:gap-10 lg:gap-20 pt-8 pb-2 sm:pt-12 sm:pb-4 lg:pt-20 lg:pb-8 transition-all duration-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* ── Text side ── */}
          <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0 w-full">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 text-[11px] sm:text-xs font-bold tracking-wide uppercase ${slide.badgeCls}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {slide.badge}
            </span>

            <h1 className="mt-4 sm:mt-5 text-[1.85rem] leading-[1.15] font-black tracking-tight text-darknavy sm:text-4xl lg:text-[3.4rem] lg:leading-[1.1]">
              {slide.title.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
              <br />
              <span className="gradient-text">{slide.highlight}</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-sm leading-7 sm:text-base sm:leading-8 text-slate-600 max-w-lg mx-auto lg:mx-0">
              {slide.description}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-center justify-center lg:justify-start">
              <button className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-300/50 hover:-translate-y-0.5 active:scale-95">
                {slide.cta}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white/80 px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-darknavy backdrop-blur-sm transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-y-0.5 active:scale-95">
                {slide.ctaSecondary}
              </button>
            </div>

            {/* Trust pills */}
            <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-5 justify-center lg:justify-start">
              {[
                { icon: '🔐', label: 'Bank-level security' },
                { icon: '✅', label: 'Free to use' },
                { icon: '⭐', label: '4.9★ rated' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                  <span>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Illustration side ── */}
          <div className="flex-1 w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            <Illustration />
          </div>
        </div>

        {/* Dot indicators — in flow so wave doesn't cover them */}
        <div className="flex justify-center gap-2 pb-10 sm:pb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'bg-primary w-8 shadow-sm shadow-blue-300' : 'bg-slate-300 w-2 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      {[
        { dir: 'prev', side: 'left-4', label: 'Previous', fn: goPrev, d: 'M15 18 9 12l6-6' },
        { dir: 'next', side: 'right-4', label: 'Next', fn: goNext, d: 'm9 18 6-6-6-6' },
      ].map(({ side, label, fn, d }) => (
        <button
          key={label}
          type="button"
          onClick={fn}
          aria-label={label}
          className={`absolute ${side} top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg shadow-slate-200 border border-slate-100 text-slate-500 transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-primary/20`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
          </svg>
        </button>
      ))}

      {/* Wave bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: 56 }}>
          <path d="M0 28C240 0 480 56 720 28C960 0 1200 56 1440 28L1440 56L0 56Z" fill="#F8FAFF" />
        </svg>
      </div>
    </section>
  );
}
