/* ============================================================
   HOYVOY BUSINESS INTELLIGENCE — Utilidades JavaScript
   ============================================================ */

// ── FORMATTERS ──────────────────────────────────────────────
const fmt = {
  euro: v => `€${Math.round(v).toLocaleString('es-ES')}`,
  K:    v => `€${Math.round(v / 1000).toLocaleString('es-ES')}K`,
  M:    v => `€${(v / 1e6).toFixed(2)}M`,
  pct:  v => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`,
  num:  v => v.toLocaleString('es-ES'),
};

// ── TAB SYSTEM ──────────────────────────────────────────────
// Called by nav.js after DOM injection is complete
function initAllTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    if (!buttons.length) return;

    // Resolve tab-content elements by ID (they may live outside the container)
    const getContents = () => [...buttons].map(b => document.getElementById(b.dataset.tab)).filter(Boolean);

    const deactivateAll = () => {
      buttons.forEach(b => b.classList.remove('active'));
      getContents().forEach(c => c.classList.remove('active'));
    };

    // Wire up clicks
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        deactivateAll();
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    // Activate first tab
    deactivateAll();
    buttons[0].classList.add('active');
    const firstContent = document.getElementById(buttons[0].dataset.tab);
    if (firstContent) firstContent.classList.add('active');
  });
}

// ── SIDEBAR / TOPBAR ACTIVE LINKS ───────────────────────────
function highlightActiveLinks() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar a, .topbar-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && href.includes(current)) a.classList.add('active');
    else a.classList.remove('active');
  });
}

// ── CHART.JS DEFAULT CONFIG ──────────────────────────────────
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600, easing: 'easeOutQuart' },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1A1916',
      titleColor: '#fff',
      bodyColor: 'rgba(255,255,255,.8)',
      padding: 10,
      cornerRadius: 6,
      titleFont: { size: 12, weight: '600' },
      bodyFont: { size: 12 },
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#9B9890', font: { size: 11 } },
      border: { display: false },
    },
    y: {
      grid: { color: 'rgba(226,223,216,.6)' },
      ticks: { color: '#9B9890', font: { size: 11 } },
      border: { display: false },
    }
  }
};

const chartDefaultsHoriz = {
  ...chartDefaults,
  indexAxis: 'y',
  scales: {
    x: {
      grid: { color: 'rgba(226,223,216,.6)' },
      ticks: { color: '#9B9890', font: { size: 11 } },
      border: { display: false },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#9B9890', font: { size: 11 } },
      border: { display: false },
    }
  }
};

// ── COLOR PALETTE ────────────────────────────────────────────
const C = {
  blue:      '#185FA5',
  blueDark:  '#0C447C',
  blueLight: '#378ADD',
  bluePale:  'rgba(55,138,221,.15)',
  green:     '#3B6D11',
  greenPale: 'rgba(59,109,17,.15)',
  amber:     '#BA7517',
  amberPale: 'rgba(186,117,23,.15)',
  red:       '#A32D2D',
  redPale:   'rgba(162,45,45,.15)',
  teal:      '#9FE1CB',
};

function positiveNegativeColors(data, posColor = C.green, negColor = C.red) {
  return data.map(v => v >= 0 ? posColor : negColor);
}

// ── CHART OPTION BUILDERS ────────────────────────────────────
// opts(fmt.M) / opts(fmt.K) — standard bar/line chart
// opts(fmt.K, { stacked: true }) — stacked bars
// opts(fmt.K, { legend: {...} }) — custom legend
// opts(fmt.K, { tooltip: { callbacks: {...} } }) — custom tooltip
function opts(fmtFn, extra) {
  const o = {
    ...chartDefaults,
    plugins: {
      ...chartDefaults.plugins,
      tooltip: {
        ...chartDefaults.plugins.tooltip,
        callbacks: { label: ctx => ctx.dataset.label ? ctx.dataset.label + ': ' + fmtFn(ctx.raw) : fmtFn(ctx.raw) }
      }
    },
    scales: {
      x: { ...chartDefaults.scales.x },
      y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => fmtFn(v) } }
    }
  };
  if (extra) {
    if (extra.stacked) { o.scales.x.stacked = true; o.scales.y.stacked = true; }
    if (extra.legend)  o.plugins.legend = extra.legend;
    if (extra.tooltip) o.plugins.tooltip = { ...chartDefaults.plugins.tooltip, ...extra.tooltip };
  }
  return o;
}

function optsHoriz(fmtFn) {
  return {
    ...chartDefaultsHoriz,
    plugins: {
      ...chartDefaults.plugins,
      tooltip: {
        ...chartDefaults.plugins.tooltip,
        callbacks: { label: ctx => ctx.dataset.label ? ctx.dataset.label + ': ' + fmtFn(ctx.raw) : fmtFn(ctx.raw) }
      }
    },
    scales: {
      x: { ...chartDefaultsHoriz.scales.x, ticks: { ...chartDefaultsHoriz.scales.x.ticks, callback: v => fmtFn(v) } },
      y: { ...chartDefaultsHoriz.scales.y }
    }
  };
}
