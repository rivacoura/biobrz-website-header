/* @ds-bundle: {"format":3,"namespace":"BIOBRZDesignSystem_d13c3c","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ServiceCard","sourcePath":"components/core/ServiceCard.jsx"}],"sourceHashes":{"brand-site.js":"2102ae79fe34","components/core/Badge.jsx":"60e0c99a5a6e","components/core/Button.jsx":"2ee80c548deb","components/core/Card.jsx":"cb858b42c09a","components/core/Input.jsx":"73c929954f6b","components/core/ServiceCard.jsx":"723ace6739ef"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BIOBRZDesignSystem_d13c3c = window.BIOBRZDesignSystem_d13c3c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// brand-site.js
try { (() => {
/* BIOBRZ Brand Site — interactivity, icon gallery, and asset downloads */
(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     ICON LIBRARY (carregados dinamicamente da pasta icons/)
  ────────────────────────────────────────────────────────────*/
  const UI_ICONS = {};
  const ICON_NAMES = ['arrow-right', 'arrow-up-right', 'building', 'chart-bar', 'check', 'close', 'document', 'external', 'instagram', 'linkedin', 'location', 'magnifier', 'mail', 'menu', 'phone', 'service-advisory', 'service-audit', 'service-tax', 'shield', 'star', 'user'];

  /* ──────────────────────────────────────────────────────────
     COLOR DATA
  ────────────────────────────────────────────────────────────*/
  const COLOR_GROUPS = [{
    name: 'Verde — Floresta',
    desc: 'Âncora. Crescimento, confiança, permanência.',
    swatches: [['Verde 500', '#3E7853', 'Primária'], ['Verde 400', '#5A9070', ''], ['Verde 300', '#8DAA91', ''], ['Verde 200', '#B8C9BA', 'Bordas'], ['Verde 100', '#DDE8DF', ''], ['Verde 50', '#EEF4EF', '']]
  }, {
    name: 'Ouro — Âmbar',
    desc: 'Acento. Distinção e direção. O diamante da bandeira.',
    swatches: [['Ouro 500', '#DDB830', 'Acento / CTA'], ['Ouro 400', '#E8CA62', ''], ['Ouro 300', '#EED47C', ''], ['Ouro 200', '#F5E5A8', ''], ['Ouro 100', '#FAF1C5', ''], ['Ouro 50', '#FDF8E5', '']]
  }, {
    name: 'Azul — Névoa',
    desc: 'Precisão, análise, imparcialidade. A ponte ao mundo financeiro.',
    swatches: [['Azul 400', '#B9CEDF', 'Sky'], ['Azul 300', '#C8D9E8', ''], ['Azul 200', '#D6E4EF', ''], ['Azul 100', '#E7F0F8', '']]
  }, {
    name: 'Neutros',
    desc: 'Off-white respira. Preto comanda.',
    swatches: [['Off-White', '#F5F1E6', 'Fundo'], ['Branco', '#FFFFFF', ''], ['Preto', '#000000', 'Autoridade'], ['Cinza 800', '#1A1A1A', ''], ['Cinza 600', '#4A4A4A', 'Texto'], ['Cinza 400', '#8A8A8A', ''], ['Cinza 200', '#D4D4D4', ''], ['Cinza 100', '#F0F0F0', '']]
  }];

  /* ──────────────────────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────────────────────────*/
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function saveBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1500);
  }
  function isLight(hex) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16),
      g = parseInt(c.substr(2, 2), 16),
      b = parseInt(c.substr(4, 2), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b > 150;
  }
  let toastTimer;
  function toast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = el('div');
      t.id = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove('show');
    }, 2200);
  }
  async function fetchBlob(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error('HTTP ' + r.status + ' — ' + url);
    return await r.blob();
  }
  async function fetchText(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error('HTTP ' + r.status + ' — ' + url);
    return await r.text();
  }

  /* ──────────────────────────────────────────────────────────
     LOAD ICONS — fetch all icon files from icons/ folder
  ────────────────────────────────────────────────────────────*/
  async function loadIcons() {
    for (const name of ICON_NAMES) {
      try {
        const svg = await fetchText('icons/' + name + '.svg');
        UI_ICONS[name + '.svg'] = svg;
      } catch (err) {
        console.warn('Failed to load icon: ' + name, err);
      }
    }
  }

  /* ──────────────────────────────────────────────────────────
     RENDER — color grid
  ────────────────────────────────────────────────────────────*/
  function renderColors() {
    const host = document.getElementById('color-groups');
    if (!host) return;
    COLOR_GROUPS.forEach(function (g) {
      const block = el('div', 'color-block');
      block.appendChild(el('div', 'color-block-head', '<h4>' + g.name + '</h4><p>' + g.desc + '</p>'));
      const row = el('div', 'swatch-row');
      g.swatches.forEach(function (s) {
        const name = s[0],
          hex = s[1],
          tag = s[2];
        const sw = el('button', 'swatch');
        sw.style.background = hex;
        sw.style.color = isLight(hex) ? '#000' : '#fff';
        if (hex === '#FFFFFF') sw.style.border = '1px solid var(--color-green-200)';
        sw.innerHTML = (tag ? '<span class="sw-tag">' + tag + '</span>' : '') + '<span class="sw-meta"><span class="sw-name">' + name + '</span>' + '<span class="sw-hex">' + hex + '</span></span>';
        sw.addEventListener('click', function () {
          navigator.clipboard.writeText(hex).then(function () {
            toast(hex + ' copiado');
          });
        });
        row.appendChild(sw);
      });
      block.appendChild(row);
      host.appendChild(block);
    });
  }

  /* ──────────────────────────────────────────────────────────
     RENDER — icon gallery
  ────────────────────────────────────────────────────────────*/
  function renderIcons() {
    const host = document.getElementById('ui-icon-grid');
    if (!host) return;
    Object.keys(UI_ICONS).forEach(function (name) {
      const tile = el('button', 'icon-tile');
      const box = el('div', 'icon-box');
      box.innerHTML = UI_ICONS[name];
      const svg = box.querySelector('svg');
      if (svg) {
        svg.style.width = '28px';
        svg.style.height = '28px';
      }
      tile.appendChild(box);
      tile.appendChild(el('span', 'icon-name', name.replace('.svg', '')));
      tile.title = 'Clique para baixar ' + name;
      tile.addEventListener('click', function () {
        const blob = new Blob([UI_ICONS[name]], {
          type: 'image/svg+xml'
        });
        saveBlob(blob, name);
        toast(name + ' baixado');
      });
      host.appendChild(tile);
    });
    const count = document.getElementById('icon-count');
    if (count) count.textContent = Object.keys(UI_ICONS).length;
  }

  /* ──────────────────────────────────────────────────────────
     DOWNLOADS
  ────────────────────────────────────────────────────────────*/
  const LICENSE_NOTE = 'BIOBRZ — Ativos de Marca\n' + '================================\n\n' + 'Estes arquivos são propriedade da BioBrz Consultores e destinam-se\n' + 'exclusivamente a aplicações oficiais da marca.\n\n' + 'Consulte o Brand System completo antes de qualquer aplicação.\n' + 'Nunca distorça, gire, recolora ou aplique efeitos ao logotipo.\n';
  async function withBusy(btn, fn) {
    if (btn.dataset.busy === '1') return;
    const label = btn.querySelector('.dl-label');
    const original = label ? label.textContent : '';
    btn.dataset.busy = '1';
    btn.classList.add('busy');
    if (label) label.textContent = 'Gerando…';
    try {
      await fn();
      if (label) label.textContent = 'Baixado ✓';
    } catch (err) {
      console.error(err);
      if (label) label.textContent = 'Erro — tente de novo';
      toast('Falha ao gerar o pacote');
    } finally {
      setTimeout(function () {
        btn.dataset.busy = '0';
        btn.classList.remove('busy');
        if (label) label.textContent = original;
      }, 2400);
    }
  }
  async function addLogos(zip) {
    const folder = zip.folder('Logotipos');

    // Adicionar PNGs (alta resolução)
    const pngFiles = ['LogoFinal.png', 'LogoFinalBranca.png', 'LogoFinalPreta.png'];
    const pngLabels = {
      'LogoFinal.png': 'logo-colorida.png',
      'LogoFinalBranca.png': 'logo-branca.png',
      'LogoFinalPreta.png': 'logo-preta.png'
    };
    for (const f of pngFiles) {
      folder.file(pngLabels[f], await fetchBlob('assets/logos/' + f));
    }

    // Adicionar PDFs (vetoriais)
    const pdfFiles = ['LogoFinal.pdf', 'LogoFinalBranca.pdf', 'LogoFinalPreto.pdf'];
    const pdfLabels = {
      'LogoFinal.pdf': 'logo-colorida.pdf',
      'LogoFinalBranca.pdf': 'logo-branca.pdf',
      'LogoFinalPreto.pdf': 'logo-preta.pdf'
    };
    for (const f of pdfFiles) {
      folder.file(pdfLabels[f], await fetchBlob('logos/' + f));
    }
    folder.file('LEIA-ME.txt', LICENSE_NOTE);
  }
  function addIcons(zip) {
    const folder = zip.folder('Icones');
    Object.keys(UI_ICONS).forEach(function (n) {
      folder.file(n, UI_ICONS[n]);
    });
    folder.file('LEIA-ME.txt', 'Ícones BIOBRZ — ' + Object.keys(UI_ICONS).length + ' SVG\n' + '================================\n\n' + 'Todos os ícones usam currentColor — defina a cor via CSS no elemento pai.\n' + '24×24, stroke-width 2, cantos retos (square/miter).\n');
  }
  async function addFonts(zip) {
    const folder = zip.folder('Tipografia-Barlow');
    const fontFiles = [{
      name: 'Barlow-Thin.ttf',
      weight: 100,
      style: 'normal'
    }, {
      name: 'Barlow-ThinItalic.ttf',
      weight: 100,
      style: 'italic'
    }, {
      name: 'Barlow-ExtraLight.ttf',
      weight: 200,
      style: 'normal'
    }, {
      name: 'Barlow-ExtraLightItalic.ttf',
      weight: 200,
      style: 'italic'
    }, {
      name: 'Barlow-Light.ttf',
      weight: 300,
      style: 'normal'
    }, {
      name: 'Barlow-LightItalic.ttf',
      weight: 300,
      style: 'italic'
    }, {
      name: 'Barlow-Regular.ttf',
      weight: 400,
      style: 'normal'
    }, {
      name: 'Barlow-Italic.ttf',
      weight: 400,
      style: 'italic'
    }, {
      name: 'Barlow-Medium.ttf',
      weight: 500,
      style: 'normal'
    }, {
      name: 'Barlow-MediumItalic.ttf',
      weight: 500,
      style: 'italic'
    }, {
      name: 'Barlow-SemiBold.ttf',
      weight: 600,
      style: 'normal'
    }, {
      name: 'Barlow-SemiBoldItalic.ttf',
      weight: 600,
      style: 'italic'
    }, {
      name: 'Barlow-Bold.ttf',
      weight: 700,
      style: 'normal'
    }, {
      name: 'Barlow-BoldItalic.ttf',
      weight: 700,
      style: 'italic'
    }, {
      name: 'Barlow-ExtraBold.ttf',
      weight: 800,
      style: 'normal'
    }, {
      name: 'Barlow-ExtraBoldItalic.ttf',
      weight: 800,
      style: 'italic'
    }, {
      name: 'Barlow-Black.ttf',
      weight: 900,
      style: 'normal'
    }, {
      name: 'Barlow-BlackItalic.ttf',
      weight: 900,
      style: 'italic'
    }];

    // Gerar CSS @font-face
    let css = '/* Barlow — BIOBRZ Design System */\n\n';
    for (const font of fontFiles) {
      folder.file(font.name, await fetchBlob('fonts/' + font.name));
      css += '@font-face {\n' + '  font-family: "Barlow";\n' + '  src: url("./' + font.name + '") format("truetype");\n' + '  font-weight: ' + font.weight + ';\n' + '  font-style: ' + font.style + ';\n' + '}\n\n';
    }
    folder.file('barlow.css', css);
    folder.file('LEIA-ME.txt', 'Tipografia BIOBRZ — Barlow\n' + '================================\n\n' + 'Fonte: Barlow (Jeremy Tribby) — SIL Open Font License 1.1.\n' + 'Sistema de tipo único da marca. Nunca combine com uma segunda família.\n' + 'Pesos incluídos: 100, 200, 300, 400, 500, 600, 700, 800, 900 (regular + itálico).\n\n' + 'Uso: importe barlow.css ou instale os arquivos .ttf.\n' + 'Especimen oficial: https://fonts.google.com/specimen/Barlow\n');
  }
  function bind(id, fn) {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', function () {
      withBusy(btn, fn);
    });
  }
  function setupDownloads() {
    bind('dl-logos', async function () {
      const zip = new JSZip();
      await addLogos(zip);
      saveBlob(await zip.generateAsync({
        type: 'blob'
      }), 'BIOBRZ-Logotipos.zip');
    });
    bind('dl-icons', async function () {
      const zip = new JSZip();
      addIcons(zip);
      saveBlob(await zip.generateAsync({
        type: 'blob'
      }), 'BIOBRZ-Icones.zip');
    });
    bind('dl-fonts', async function () {
      const zip = new JSZip();
      await addFonts(zip);
      saveBlob(await zip.generateAsync({
        type: 'blob'
      }), 'BIOBRZ-Barlow.zip');
    });
    bind('dl-all', async function () {
      const zip = new JSZip();
      await addLogos(zip);
      addIcons(zip);
      await addFonts(zip);
      zip.file('LEIA-ME.txt', 'BIOBRZ — Kit de Marca Completo\n' + '================================\n\n' + 'Conteúdo:\n' + '  /Logotipos        — 3 variações (colorida, branca, preta)\n' + '  /Icones           — ' + Object.keys(UI_ICONS).length + ' SVG (marca + interface)\n' + '  /Tipografia-Barlow — fonte Barlow + CSS\n\n' + '"Uma marca que não precisa ser explicada."\n');
      saveBlob(await zip.generateAsync({
        type: 'blob'
      }), 'BIOBRZ-Kit-Completo.zip');
    });
  }

  /* ──────────────────────────────────────────────────────────
     NAV — scroll spy + mobile toggle
  ────────────────────────────────────────────────────────────*/
  function setupNav() {
    const links = [].slice.call(document.querySelectorAll('.nav-link'));
    const map = {};
    links.forEach(function (l) {
      const id = l.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) map[id] = l;
    });
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) {
            l.classList.remove('active');
          });
          if (map[e.target.id]) map[e.target.id].classList.add('active');
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px'
    });
    Object.keys(map).forEach(function (id) {
      obs.observe(document.getElementById(id));
    });
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 24) nav.classList.add('scrolled');else nav.classList.remove('scrolled');
    });
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        menu.classList.toggle('open');
      });
      menu.addEventListener('click', function (e) {
        if (e.target.classList.contains('nav-link')) menu.classList.remove('open');
      });
    }
  }

  /* ──────────────────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────────────────────*/
  function setupCopyBlocks() {
    document.querySelectorAll('.copy-block').forEach(function (b) {
      b.addEventListener('click', function () {
        const text = b.dataset.text || b.textContent.trim();
        navigator.clipboard.writeText(text).then(function () {
          toast('Copiado para a área de transferência');
        });
      });
    });
  }
  async function init() {
    await loadIcons();
    renderColors();
    renderIcons();
    setupDownloads();
    setupCopyBlocks();
    setupNav();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "brand-site.js", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact label for service lines, status, and categories.
 * Always uppercase. Pill-shaped (signature for labels in BIOBRZ).
 */
function Badge({
  children,
  variant = 'primary',
  size = 'md',
  style: extraStyle = {},
  ...props
}) {
  const variants = {
    primary: {
      background: 'var(--color-green-500)',
      color: '#fff'
    },
    accent: {
      background: 'var(--color-gold-500)',
      color: '#000'
    },
    sky: {
      background: 'var(--color-blue-400)',
      color: '#000'
    },
    dark: {
      background: '#000',
      color: '#fff'
    },
    'subtle-green': {
      background: 'var(--color-green-100)',
      color: 'var(--color-green-500)'
    },
    'subtle-gold': {
      background: 'var(--color-gold-100)',
      color: '#7a5e00'
    },
    'subtle-blue': {
      background: 'var(--color-blue-100)',
      color: '#2a5a7a'
    },
    white: {
      background: 'rgba(255,255,255,0.15)',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.3)'
    }
  };
  const sizes = {
    sm: {
      padding: '3px 8px',
      fontSize: '10px'
    },
    md: {
      padding: '4px 12px',
      fontSize: '11px'
    },
    lg: {
      padding: '6px 16px',
      fontSize: '13px'
    }
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-primary)',
    fontWeight: 600,
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    borderRadius: '100px',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    ...s,
    ...v,
    ...extraStyle
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: style
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary interactive element for BIOBRZ.
 * Variants: primary (green), accent (gold), outline, ghost, dark.
 * All variants use uppercase labels, tight tracking, and minimal rounding.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  style: extraStyle = {},
  ...props
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: '11px'
    },
    md: {
      padding: '12px 24px',
      fontSize: '13px'
    },
    lg: {
      padding: '16px 32px',
      fontSize: '15px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-green-500)',
      color: '#fff',
      border: 'none'
    },
    accent: {
      background: 'var(--color-gold-500)',
      color: '#000',
      border: 'none'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-green-500)',
      border: '2px solid var(--color-green-500)'
    },
    'outline-light': {
      background: 'transparent',
      color: '#fff',
      border: '2px solid rgba(255,255,255,0.6)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-green-500)',
      border: 'none'
    },
    dark: {
      background: '#000',
      color: '#fff',
      border: 'none'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-primary)',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: '2px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'opacity 120ms ease, transform 100ms ease, background 120ms ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(sizes[size] || sizes.md),
    ...(variants[variant] || variants.primary),
    ...extraStyle
  };
  const handleMouseEnter = e => {
    if (!disabled) e.currentTarget.style.opacity = '0.82';
  };
  const handleMouseLeave = e => {
    if (!disabled) e.currentTarget.style.opacity = '1';
  };
  const handleMouseDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
  };
  const handleMouseUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'scale(1)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    style: base,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — content container for BIOBRZ layouts.
 * Variants: default (white/bordered), filled (green), dark (black), ghost (transparent).
 * Minimal rounding (4px). Generous padding. Clean shadow.
 */
function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  accent = null,
  style: extraStyle = {},
  ...props
}) {
  const variants = {
    default: {
      background: '#fff',
      border: '1px solid var(--color-green-200)',
      color: 'var(--color-black)'
    },
    offwhite: {
      background: 'var(--color-offwhite)',
      border: '1px solid var(--color-green-200)',
      color: 'var(--color-black)'
    },
    filled: {
      background: 'var(--color-green-500)',
      border: 'none',
      color: '#fff'
    },
    dark: {
      background: '#000',
      border: 'none',
      color: '#fff'
    },
    gold: {
      background: 'var(--color-gold-500)',
      border: 'none',
      color: '#000'
    },
    ghost: {
      background: 'transparent',
      border: '1px solid var(--color-green-200)',
      color: 'inherit'
    }
  };
  const paddings = {
    none: '0',
    sm: '16px',
    md: '32px',
    lg: '48px'
  };
  const v = variants[variant] || variants.default;
  const style = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    padding: paddings[padding] || paddings.md,
    transition: 'box-shadow 200ms ease, transform 200ms ease',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    ...v,
    ...(accent ? {
      borderLeft: `3px solid ${accent}`,
      paddingLeft: paddings[padding] || paddings.md
    } : {}),
    ...(hover ? {
      cursor: 'pointer',
      boxShadow: 'var(--shadow-sm)'
    } : {}),
    ...extraStyle
  };
  const handleMouseEnter = e => {
    if (hover) {
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }
  };
  const handleMouseLeave = e => {
    if (hover) {
      e.currentTarget.style.boxShadow = hover ? 'var(--shadow-sm)' : 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text input for forms in BIOBRZ.
 * Includes label, helper text, error state.
 * Clean geometric style: square corners, green focus ring.
 */
function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  helper,
  disabled = false,
  required = false,
  size = 'md',
  style: extraStyle = {},
  ...props
}) {
  const [focused, setFocused] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 12px',
      fontSize: '13px'
    },
    md: {
      padding: '12px 16px',
      fontSize: '14px'
    },
    lg: {
      padding: '14px 20px',
      fontSize: '16px'
    }
  };
  const inputStyle = {
    display: 'block',
    width: '100%',
    fontFamily: 'var(--font-primary)',
    fontWeight: 400,
    color: disabled ? 'var(--color-gray-400)' : 'var(--color-black)',
    background: disabled ? 'var(--color-gray-100)' : '#fff',
    border: error ? '1.5px solid var(--color-error)' : focused ? '1.5px solid var(--color-green-500)' : '1.5px solid var(--color-green-200)',
    borderRadius: '2px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'text',
    ...(sizes[size] || sizes.md)
  };
  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-primary)',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: error ? 'var(--color-error)' : 'var(--color-green-500)',
    marginBottom: '6px'
  };
  const helperStyle = {
    display: 'block',
    fontFamily: 'var(--font-primary)',
    fontSize: '12px',
    fontWeight: 400,
    color: error ? 'var(--color-error)' : 'var(--color-gray-400)',
    marginTop: '5px'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...extraStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: labelStyle
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-error)',
      marginLeft: '3px'
    }
  }, "*")), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    required: required,
    style: inputStyle,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, props)), (helper || error) && /*#__PURE__*/React.createElement("span", {
    style: helperStyle
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ServiceCard — purpose-built card for the three BioBrz service lines:
 * Tax (green), Advisory (gold), Audit (blue).
 * Features: overline label, headline, description, optional CTA.
 */
function ServiceCard({
  service = 'tax',
  overline,
  title,
  description,
  cta,
  onCtaClick,
  variant = 'light',
  style: extraStyle = {},
  ...props
}) {
  const serviceMap = {
    tax: {
      label: 'Tax',
      accent: 'var(--color-green-500)',
      bg: 'var(--color-green-100)'
    },
    advisory: {
      label: 'Advisory',
      accent: 'var(--color-gold-500)',
      bg: 'var(--color-gold-50)'
    },
    audit: {
      label: 'Audit',
      accent: 'var(--color-blue-400)',
      bg: 'var(--color-blue-100)'
    }
  };
  const svc = serviceMap[service] || serviceMap.tax;
  const variants = {
    light: {
      background: '#fff',
      border: '1px solid var(--color-green-200)',
      color: '#000'
    },
    filled: {
      background: svc.bg,
      border: 'none',
      color: '#000'
    },
    dark: {
      background: '#000',
      border: 'none',
      color: '#fff'
    },
    sky: {
      background: '#F1F6FA',
      border: 'none',
      color: '#000'
    },
    green: {
      background: 'var(--color-green-500)',
      border: 'none',
      color: '#fff'
    }
  };
  const v = variants[variant] || variants.light;
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '32px',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    ...v,
    ...extraStyle
  };
  const accentBarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: svc.accent
  };
  const overlineStyle = {
    fontFamily: 'var(--font-primary)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: variant === 'dark' || variant === 'green' ? 'rgba(255,255,255,0.6)' : variant === 'sky' ? '#2a5a7a' : svc.accent
  };
  const titleStyle = {
    fontFamily: 'var(--font-primary)',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.2,
    margin: 0,
    color: variant === 'dark' || variant === 'green' ? '#fff' : '#000' /* title */
  };
  const descStyle = {
    fontFamily: 'var(--font-primary)',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.6,
    margin: 0,
    color: variant === 'dark' || variant === 'green' ? 'rgba(255,255,255,0.75)' : variant === 'sky' ? 'rgba(0,0,0,0.65)' : 'var(--color-gray-600)'
  };
  const ctaStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-primary)',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: variant === 'dark' || variant === 'green' ? '#fff' : variant === 'sky' ? '#71A4C6' : svc.accent,
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    marginTop: 'auto'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: cardStyle
  }, props), /*#__PURE__*/React.createElement("div", {
    style: accentBarStyle
  }), overline && /*#__PURE__*/React.createElement("span", {
    style: overlineStyle
  }, overline), title && /*#__PURE__*/React.createElement("h3", {
    style: titleStyle
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: descStyle
  }, description), cta && /*#__PURE__*/React.createElement("button", {
    style: ctaStyle,
    onClick: onCtaClick
  }, cta, " \u2192"));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ServiceCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

})();
