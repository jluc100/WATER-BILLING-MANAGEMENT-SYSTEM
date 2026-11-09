const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const contentType = res.headers.get('content-type');

  if (contentType?.includes('application/pdf')) {
    const blob = await res.blob();
    if (!res.ok) throw new Error('PDF download failed');
    return blob;
  }

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || data.error || 'Request failed');
    err.code = data.error;
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  health: () => request('/health'),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  me: () => request('/auth/me'),
  myCards: () => request('/cards/my'),
  recharge: (body) => request('/cards/recharge', { method: 'POST', body: JSON.stringify(body) }),
  myUsage: () => request('/analytics/my-usage'),
  predict: (userId) => request(`/analytics/predict/${userId || ''}`),
  sessions: () => request('/water/sessions'),
  overview: () => request('/analytics/overview'),
  usageGraph: (period) => request(`/analytics/usage-graph?period=${period}`),
  topConsumers: () => request('/analytics/top-consumers'),
  waterLoss: () => request('/analytics/water-loss'),
  leakAlerts: (resolved) => request(`/alerts/leaks?resolved=${resolved ?? ''}`),
  resolveAlert: (id) => request(`/alerts/leaks/${id}/resolve`, { method: 'PATCH' }),
  users: () => request('/users'),
  pendingCustomers: () => request('/users/pending'),
  updateAccountApproval: (userId, body) =>
    request(`/users/${userId}/approval`, { method: 'PATCH', body: JSON.stringify(body) }),
  updateUserRole: (userId, body) => request(`/users/${userId}/role`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteUser: (userId) => request(`/users/${userId}`, { method: 'DELETE' }),
  adminRegister: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  downloadBill: async (userId, year, month) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/reports/bill/${userId}/${year}/${month}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Bill download failed');
    return res.blob();
  },
  downloadRevenue: async (from, to) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/reports/revenue?from=${from}&to=${to}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Revenue report failed');
    return res.blob();
  },

  // Admin: system controls
  adminGetWaterFetchControl: () => request('/admin/system/water-fetch'),
  adminSetWaterFetchControl: (body) => request('/admin/system/water-fetch', { method: 'PATCH', body: JSON.stringify(body) }),

  // Admin: cards
  adminListCards: () => request('/admin/cards'),
  adminCreateCard: (body) => request('/admin/cards', { method: 'POST', body: JSON.stringify(body) }),
  adminSetCardActive: ({ cardId, is_active }) => request(`/admin/cards/${cardId}/active`, { method: 'PATCH', body: JSON.stringify({ is_active }) }),
  adminRechargeCard: ({ cardId, amount_rwf }) => request(`/admin/cards/${cardId}/recharge`, { method: 'POST', body: JSON.stringify({ amount_rwf }) }),
};

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
