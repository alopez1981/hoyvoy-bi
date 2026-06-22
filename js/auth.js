/* ============================================================
   HOYVOY BI — Autenticación
   Credenciales configurables. La sesión dura 8 horas.
   ============================================================ */

const AUTH = {
    email: 'bi@hoyvoy.com',   // ← cambiar aquí
    password: 'Hoyvoyaconducir2026$',     // ← cambiar aquí
    sessionHours: 8,
    sessionKey: 'hv_bi_auth',
};

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

function login(email, password) {
    return email.trim().toLowerCase() === AUTH.email.toLowerCase()
        && password === AUTH.password;
}

function saveSession() {
    sessionStorage.setItem(AUTH.sessionKey, JSON.stringify({ts: Date.now()}));
}

function logout() {
    sessionStorage.removeItem(AUTH.sessionKey);
    window.location.href = 'index.html';
}

function requireAuth() {
    if (checkAuth()) return; // ya autenticado
    // Guardar la página que querían ver
    sessionStorage.setItem('hv_redirect', window.location.href);
    window.location.href = 'index.html';
}

function handleLoginForm(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');

    if (login(email, password)) {
        saveSession();
        const redirect = sessionStorage.getItem('hv_redirect');
        sessionStorage.removeItem('hv_redirect');
        window.location.href = redirect && !redirect.includes('index.html')
            ? redirect
            : 'hoyvoy_business_intelligence_dashboard.html';
    } else {
        errEl.textContent = 'Email o contraseña incorrectos.';
        errEl.style.display = 'block';
        document.getElementById('login-password').value = '';
        document.getElementById('login-password').focus();
        // Shake animation
        document.querySelector('.login-card').classList.add('shake');
        setTimeout(() => document.querySelector('.login-card').classList.remove('shake'), 500);
    }
}
