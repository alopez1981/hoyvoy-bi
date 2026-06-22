# Hoyvoy a Conducir — Business Intelligence

Dashboard de análisis estratégico para la red de autoescuelas Hoyvoy.

## Estructura

```
hoyvoy-bi/
├── index.html                                  # Página de inicio / índice
├── css/
│   └── styles.css                              # Estilos globales compartidos
├── js/
│   ├── utils.js                                # Utilidades JS (formateadores, Chart.js defaults)
│   └── nav.js                                  # Navegación dinámica (topbar + sidebar)
├── hoyvoy_business_intelligence_dashboard.html # 1. Salud del negocio
├── hoyvoy_modelo_negocio_estrategico.html      # 2. Franquicias propias
├── hoyvoy_rentabilidad_real_propios.html       # 3. Franquicia externa vs propia
├── hoyvoy_breakeven_centro_propio.html         # 4. Cálculo de break-even
├── hoyvoy_tiempo_400k.html                     # 5. Tiempo hasta €400K
├── hoyvoy_propios_rentabilidad.html            # 6. Franquicias propias: beneficios
├── hoyvoy_proyeccion_2026.html                 # 7. Proyección 2026
├── hoyvoy_dinero_perdido_franquicias.html      # 8. Dinero perdido: franquicias
└── hoyvoy_propios_dinero_perdido.html          # 9. Dinero perdido: propios
```

## Tecnologías

- HTML5 + CSS3 (sin frameworks)
- JavaScript vanilla
- [Chart.js 4.4.1](https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js) via CDN
- Google Fonts (Inter)

## Uso local

Abrir `index.html` directamente en el navegador o servir con cualquier servidor estático:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

## Fuente de datos

Google Sheets: «resultado histórico» (`1-94uQS-7IkT0E0PqNG6zWjIME0mvS4b_y1W7ad9OFjM`)

Análisis realizado en Junio 2026. Cubre 42 centros (11 propios + 31 franquicias), datos 2015–2025.

## Autores

Lead Data Analyst — Hoyvoy a Conducir
