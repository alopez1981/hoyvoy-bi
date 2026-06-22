/* ============================================================
   HOYVOY BI — Navegación + shell de página
   Lee window.PAGE (definido por cada análisis) e inyecta:
   topbar · sidebar · page-header · kpi-grid · layout wrapper
   ============================================================ */

const PAGES = [
    {num: 1, title: 'Salud del negocio', file: 'hoyvoy_business_intelligence_dashboard.html'},
    {num: 2, title: 'Franquicias propias', file: 'hoyvoy_modelo_negocio_estrategico.html'},
    {num: 3, title: 'Franquicia externa vs propia', file: 'hoyvoy_rentabilidad_real_propios.html'},
    {num: 4, title: 'Cálculo de break-even', file: 'hoyvoy_breakeven_centro_propio.html'},
    {num: 5, title: 'Tiempo hasta €400K', file: 'hoyvoy_tiempo_400k.html'},
    {num: 6, title: 'Franquicias propias: beneficios', file: 'hoyvoy_propios_rentabilidad.html'},
    {num: 7, title: 'Proyección 2026', file: 'hoyvoy_proyeccion_2026.html'},
    {num: 8, title: 'Dinero no ganado: franquicias', file: 'hoyvoy_dinero_perdido_franquicias.html'},
    {num: 9, title: 'Dinero no ganado: propios', file: 'hoyvoy_propios_dinero_perdido.html'},
];

function buildPage() {
    const p = window.PAGE;
    // index.html y otras páginas sin PAGE config se saltan la inyección
    if (!p) return;

    const current = window.location.pathname.split('/').pop() || 'index.html';

    const topbar = `
<nav class="topbar" role="navigation" aria-label="Navegación principal">
  <a href="index.html" class="topbar-logo">
    <div class="logo-mark">HV</div>
    <div><div class="logo-text">Hoyvoy a Conducir</div></div>
  </a>
  <div class="topbar-nav">
    ${PAGES.map(pg => `<a href="${pg.file}">${pg.num}. ${pg.title}</a>`).join('')}
  </div>
</nav>`;

    const sidebar = `
<aside class="sidebar" role="complementary" aria-label="Índice de análisis">
  <div class="sidebar-section">Análisis</div>
  ${PAGES.map(pg => `<a href="${pg.file}"><span class="num">${pg.num}</span>${pg.title}</a>`).join('')}
  <hr class="divider" style="margin-top:10px">
  <div class="sidebar-section">Datos</div>
  <a href="#" style="font-size:11px;color:var(--text-3);padding:4px 10px;pointer-events:none"> Última actualización: Junio 2026</a>
  <a href="#" style="font-size:11px;color:var(--text-3);padding:4px 10px;pointer-events:none"> Fuente: Google Sheets resultado histórico</a>
</aside>`;

    const kpiCards = p.kpis.map(k => `
  <div class="kpi-card ${k.mod || ''}">
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-value ${k.valueClass || ''}">${k.value}</div>
    ${k.sub ? `<div class="kpi-sub">${k.sub}</div>` : ''}
  </div>`).join('');

    const header = `
<header class="page-header">
  <p class="page-eyebrow">${p.eyebrow}</p>
  <h1 class="page-title">${p.title}</h1>
  <p class="page-subtitle">${p.subtitle}</p>
  <div class="page-meta">${p.meta.map(m => `<span class="page-meta-item">${m}</span>`).join('')}</div>
</header>
<div class="kpi-grid">${kpiCards}</div>`;

    // Detach #main-content antes de reescribir el body
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.remove();

    document.body.innerHTML = `${topbar}<div class="layout">${sidebar}<main class="main">${header}</main></div>`;

    if (mainContent) document.querySelector('.main').appendChild(mainContent);

    // Marcar enlace activo en topbar y sidebar
    document.querySelectorAll('.sidebar a, .topbar-nav a').forEach(a => {
        const href = a.getAttribute('href') || '';
        if (href === current || href.includes(current)) a.classList.add('active');
    });

    if (typeof initAllTabs === 'function') initAllTabs();
}

document.addEventListener('DOMContentLoaded', buildPage);
