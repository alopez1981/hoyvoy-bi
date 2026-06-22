const AUTH = {
    sessionHours: 8,
    sessionKey: 'hv_bi_auth',
};

async function doLogin(email, password) {
    const res = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    return data.ok === true;
}

function checkAuth() {
    const session = sessionStorage.getItem(AUTH.sessionKey);
    if (!session) return false;
    try {
        const {ts} = JSON.parse(session);
        const elapsed = (Date.now() - ts) / 1000 / 3600;
        return elapsed < AUTH.sessionHours;
    } catch {
        return false;
    }
}

function saveSession() {
    sessionStorage.setItem(AUTH.sessionKey, JSON.stringify({ts: Date.now()}));
}

function logout() {
    sessionStorage.removeItem(AUTH.sessionKey);
    window.location.href = 'index.html';
}

function requireAuth() {
    if (checkAuth()) return;
    sessionStorage.setItem('hv_redirect', window.location.href);
    window.location.href = 'index.html';
}