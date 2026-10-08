(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ================= CONTENT (edit here) ================= */
  // Each project: slug, name, cat, year, role, tools, color, problem (one line), img (cover image).
  // `cat` can be one category ('print') or several (['print', 'popup', 'ux']).
  // `content` is the project page below the cover, shown in order. Each item is ONE of:
  //   { heading: 'Title' }   { text: 'A paragraph.' }   { image: 'assets/x.jpg', caption: '...' }
  //   { download: 'assets/fonts/x.ttf', label: 'DOWNLOAD', note: 'optional' }   { specimen: { font: 'FontName' } }
  //   (an image item can also have width: '560px' to make it smaller)
  //   Add hero: false to a project to hide its big cover image at the top of the page.
  //   { images: ['a.jpg', 'b.jpg', 'c.jpg'] }   { vimeo: 'https://vimeo.com/123456789' }
  //   { figma: 'https://www.figma.com/proto/...', ratio: '9/16', width: '420px' }  (ratio and width are optional)
  // Any item can also have a `caption`. Use quotes carefully: write "Caner's" with double quotes.
  const CATS = { popup: 'Pop-up & Paper', print: 'Print & Editorial', ux: 'UX/UI', type: 'Type & Lettering' };
  const STAMPS = { popup: 'POP-UP', print: 'PRINT', ux: 'UX/UI', type: 'TYPE' };
  const cats = w => [].concat(w.cat);
  const WORK = [
    {
      slug: 'fandom-house',
      name: 'Fandom House',
      cat: ['print', 'popup', 'ux'],   // several categories: use a list
      year: '2026',
      role: 'Design, paper engineering',
      tools: 'Add tools',
      color: '#8B0A22',
      problem: 'One line about the whole project.',
      // img: 'assets/projects/fandom-house/cover.jpg',
      content: [
        { text: 'A longer introduction to the project.' },
        { heading: 'The print work' },
        { text: 'What you made and why.' },
        // { images: ['assets/projects/fandom-house/print-1.jpg', 'assets/projects/fandom-house/print-2.jpg'] },
        { heading: 'The pop-up book' },
        { text: 'How the book works.' },
        // { vimeo: 'https://vimeo.com/123456789', caption: 'The full book, opened page by page.' },
        { heading: 'The shopping website' },
        { text: 'What the site does.' }
        // { figma: 'https://www.figma.com/proto/your-link', caption: 'Click through the prototype.' }
      ]
    },
    {
      slug: 'zallak',
      name: 'Zallak',
      type: 'Typeface',
      cat: 'type',
      year: 'Add year',
      role: 'Type design',
      tools: 'Add tools',
      color: '#2F5D50',
      problem: 'A typeface drawn from a hand-painted apartment sign in Karşıyaka.',
      img: 'assets/projects/zallak/sign.jpg',   // used for thumbnails
      hero: false,                               // false = don't show it big at the top of the page
      content: [
        { text: 'Zallak began with the hand-painted name signs above the doors of old apartment buildings in Karşıyaka.' },
        { text: 'One of them, Zallak Ap., had only a few letters to work from. I used those as a starting point and drew the rest of the alphabet in the same style, keeping the spirit of the original lettering and giving it a new digital form.' },
        { image: 'assets/projects/zallak/sign.jpg', width: '560px', caption: 'The original sign, Zallak Ap., in Karşıyaka.' },
        { heading: 'Try it' },
        { text: 'Zallak has uppercase letters only, so whatever you type is set in capitals.' },
        { specimen: { font: 'Zallak' } },
        { download: 'assets/fonts/Zallak-Regular.ttf', label: 'DOWNLOAD ZALLAK' }
        // to add a licence line under the button: { download: '...', label: '...', note: 'Free for personal use.' }
      ]
    },
    {
      slug: 'popup-book',
      name: 'Macrodata Refiner’s Orientation Pop-Up Booklet',
      type: 'Paper Engineering',
      cat: 'popup',
      year: '2025',
      role: 'Design, paper engineering',
      tools: 'Illustrator',
      color: '#B5472B',
      problem: 'A pop-up book to welcome newly severed employees at Lumon Industries, inspired by the world of the TV series Severance.',
      img: 'assets/projects/popup-book/cover.png',
      content: [
        { text: 'It is designed carefully so that every piece of information fits what an innie would know: nothing is revealed that they shouldn’t. The text uses Lumon’s company voice, and the pop-up pages bring key experiences to life, like the Music Dance Experience, the ORTBO, and the Melon Bar. The goal was to design a piece that could feel like a real prop from the show.' },
        { heading: 'Spreads' },
       // { text: 'How the paper engineering works and how you tested it.' },
        { vimeo: 'https://vimeo.com/1077771469/895303fd28', caption: 'The book, opened page by page.' },
        { heading: 'Details' },
        { text: 'How you designed the graphics for each part.' },
        { images: ['assets/projects/popup-book/art-1.JPG', 'assets/projects/popup-book/art-2.jpg', 'assets/projects/popup-book/art-3.jpg', 'assets/projects/popup-book/art-4.jpg', 'assets/projects/popup-book/art-5.jpg', 'assets/projects/popup-book/art-6.jpg', 'assets/projects/popup-book/art-7.jpg'] }
      ]
    },
    {
      slug: 'spatial-editorial',
      name: 'Spatial Editorial',
      type: 'Print & Form',
      cat: 'print',
      year: '2026',
      role: 'Design',
      tools: 'Add tools',
      color: '#8B0A22',
      problem: 'One line: the problem this project set out to solve.',
      // img: 'assets/projects/spatial-editorial/cover.jpg',
      content: [
        { text: 'A longer introduction to the project: what it is and why you made it.' },
        { heading: 'The process' },
        { text: 'How you got from the first sketches to the final layout.' },
        // { images: ['assets/projects/spatial-editorial/process-1.jpg', 'assets/projects/spatial-editorial/process-2.jpg', 'assets/projects/spatial-editorial/process-3.jpg'] },
        { heading: 'The result' },
        { text: 'What the finished piece looks like and what you learned.' }
        // { image: 'assets/projects/spatial-editorial/final.jpg', caption: 'The finished piece.' }
      ]
    },
    {
      slug: 'system-constraints',
      name: 'System Constraints',
      type: 'UX/UI',
      cat: 'ux',
      year: '2026',
      role: 'Design',
      tools: 'Add tools',
      color: '#1E1C1C',
      problem: 'One line: the problem this project set out to solve.',
      // img: 'assets/projects/system-constraints/cover.jpg',
      content: [
        { text: 'A longer introduction to the project: what it is and who it is for.' },
        { heading: 'The problem' },
        { text: 'What was not working and what you wanted to change.' },
        { heading: 'The design' },
        { text: 'How you solved it: the structure, the flow, the key screens.' }
        // { images: ['assets/projects/system-constraints/screen-1.jpg', 'assets/projects/system-constraints/screen-2.jpg', 'assets/projects/system-constraints/screen-3.jpg'] },
        // { figma: 'https://www.figma.com/proto/your-link', caption: 'Click through the prototype.' }
      ]
    },
    {
      slug: 'tactile-interfaces',
      name: 'Tactile Interfaces',
      type: 'Interaction Design',
      cat: 'ux',
      year: '2025',
      role: 'Design',
      tools: 'Add tools',
      color: '#0055FF',
      problem: 'One line: the problem this project set out to solve.',
      // img: 'assets/projects/tactile-interfaces/cover.jpg',
      content: [
        { text: 'A longer introduction to the project: what it is and who it is for.' },
        { heading: 'The problem' },
        { text: 'What was not working and what you wanted to change.' },
        { heading: 'The design' },
        { text: 'How you solved it: the structure, the flow, the key screens.' }
        // { images: ['assets/projects/tactile-interfaces/screen-1.jpg', 'assets/projects/tactile-interfaces/screen-2.jpg', 'assets/projects/tactile-interfaces/screen-3.jpg'] },
        // { figma: 'https://www.figma.com/proto/your-link', caption: 'Click through the prototype.' }
      ]
    },
    {
      slug: 'type-and-grid',
      name: 'Type & Grid',
      type: 'Typography Systems',
      cat: 'print',
      year: '2025',
      role: 'Design',
      tools: 'Add tools',
      color: '#333333',
      problem: 'One line: the problem this project set out to solve.',
      // img: 'assets/projects/type-and-grid/cover.jpg',
      content: [
        { text: 'A longer introduction to the project: what it is and why you made it.' },
        { heading: 'The process' },
        { text: 'How you got from the first sketches to the final layout.' },
        // { images: ['assets/projects/type-and-grid/process-1.jpg', 'assets/projects/type-and-grid/process-2.jpg', 'assets/projects/type-and-grid/process-3.jpg'] },
        { heading: 'The result' },
        { text: 'What the finished piece looks like and what you learned.' }
        // { image: 'assets/projects/type-and-grid/final.jpg', caption: 'The finished piece.' }
      ]
    },
    
  ];
  const EMAIL = 'hello@idesigner.studio';
  const BASE_TITLE = 'Caner Mutlu';

  /* ================= THEME ================= */
  const THEMES = ['light', 'dark', 'pop'];
  let theme = {};
  const cssVar = n => getComputedStyle(root).getPropertyValue(n).trim();
  function readTheme() {
    theme = { bg: cssVar('--tetris-bg'), grid: cssVar('--grid-line'), ink: cssVar('--text-color'),
      pieces: [null, 1, 2, 3, 4, 5, 6, 7].map(i => i && cssVar('--p' + i)) };
  }
  function setTheme(name) {
    if (!THEMES.includes(name)) name = 'light';
    root.setAttribute('data-theme', name);
    $$('.theme-btn').forEach(b => { const on = b.dataset.themeBtn === name; b.classList.toggle('active', on); b.setAttribute('aria-pressed', on); });
    store.set('theme', name);
    readTheme();
    if (typeof draw === 'function') { draw(); drawPreviews(); }
  }
  function changeTheme(name, btn) {
    if (name === root.getAttribute('data-theme')) return;
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return setTheme(name);
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('vt-active');
    const t = document.startViewTransition(() => setTheme(name));
    t.ready.then(() => root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(.85,0,.15,1)', pseudoElement: '::view-transition-new(root)' }
    ));
    t.finished.finally(() => root.classList.remove('vt-active'));
  }
  $$('.theme-btn').forEach(b => b.addEventListener('click', () => changeTheme(b.dataset.themeBtn, b)));

  /* ================= CURSOR ================= */
  const cursor = $('#custom-cursor');
  let mx = -100, my = -100, cx = -100, cy = -100, cursorOn = false;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!cursorOn) { cursorOn = true; cx = mx; cy = my; document.body.classList.add('has-cursor', 'cursor-ready'); }
  });
  document.addEventListener('mouseover', e => {
    document.body.classList.toggle('hovering', !!e.target.closest('a:not(.verb), button, .row'));
    const t = e.target.closest('[data-cursor]');
    cursor.textContent = t ? t.dataset.cursor : '';
    document.body.classList.toggle('cursor-label', !!t);
  });

  /* ================= LOADER ================= */
  (() => {
    const bar = $('#loader-bar'), el = $('#loader'); let done = false;
    const finish = () => { if (done) return; done = true; bar.style.width = '100%'; setTimeout(() => el.classList.add('loader-hidden'), 400); };
    setTimeout(() => bar.style.width = '45%', 150);
    setTimeout(() => bar.style.width = '85%', 500);
    if (document.readyState === 'complete') setTimeout(finish, 200); else addEventListener('load', () => setTimeout(finish, 200));
    setTimeout(finish, 1800);
  })();

  /* ================= WORK LIST + CASE STUDY ================= */
  let filter = 'all';
  const stagger = (els) => els.forEach((el, i) => el.style.setProperty('--i', i));

  function renderChips() {
    const items = [['all', 'ALL'], ...Object.entries(CATS).map(([k, v]) => [k, v.toUpperCase()])];
    $('#chips').innerHTML = items.map(([k, l]) => `<button class="chip" data-f="${k}" aria-pressed="${k === filter}">${l}</button>`).join('');
  }
  function renderWork() {
    renderChips();
    const list = WORK.filter(w => filter === 'all' || cats(w).includes(filter));
    $('#work-list').innerHTML = list.map((w, i) =>
      `<a class="row" href="#work/${w.slug}" data-slug="${w.slug}" data-cursor="VIEW"><span class="row-thumb" style="background:${w.img ? `url('${w.img}') center/cover` : w.color}"></span><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="name">${w.name}</span><span class="stamps">${cats(w).map(c => `<span class="stamp">${STAMPS[c]}</span>`).join('')}</span></a>`).join('');
    stagger($$('#work-list .row'));
    $$('#work-list .row').forEach(r => {
      r.addEventListener('mouseenter', e => showThumb(e, WORK.find(w => w.slug === r.dataset.slug)));
      r.addEventListener('mousemove', moveThumb);
      r.addEventListener('mouseleave', () => thumb.classList.remove('visible'));
    });
  }
  $('#chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { filter = b.dataset.f; renderWork(); } });
  $$('[data-filter]').forEach(a => a.addEventListener('click', () => { filter = a.dataset.filter; renderWork(); }));

  const thumb = $('#thumbnail-preview');
  WORK.forEach(w => { if (w.img) new Image().src = w.img; }); // preload real images
  function showThumb(e, w) {
    thumb.style.backgroundImage = w.img ? `url('${w.img}')` : 'none';
    thumb.style.backgroundColor = w.color;
    thumb.textContent = w.img ? '' : w.name.toUpperCase();
    thumb.classList.add('visible'); moveThumb(e);
  }
  function moveThumb(e) {
    thumb.style.left = e.clientX + 'px'; thumb.style.top = e.clientY + 'px';
    thumb.classList.toggle('below', e.clientY < 260);
  }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  function vimeoSrc(url) {
    const u = String(url), m = u.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-z0-9]+))?/i) || u.match(/^(\d+)$/);
    if (!m) return null;
    const h = m[2] || (u.match(/[?&]h=([a-z0-9]+)/i) || [])[1];
    return `https://player.vimeo.com/video/${m[1]}?${h ? 'h=' + h + '&' : ''}dnt=1&title=0&byline=0&portrait=0`;
  }
  const figmaSrc = url => 'https://www.figma.com/embed?embed_host=share&url=' + encodeURIComponent(url);

  /* ================= IMAGE GALLERY (lightbox) ================= */
  let galleries = [], lbState = null;
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image gallery'); lb.setAttribute('aria-hidden', 'true');
  lb.innerHTML = `<div class="lb-scrim" data-cursor="CLOSE"></div>
    <div class="lb-top"><span class="lb-count"></span><button class="lb-close" type="button">[ ESC ] CLOSE ✕</button></div>
    <button class="lb-nav lb-prev" type="button" aria-label="Previous image">←</button>
    <figure class="lb-stage"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>
    <button class="lb-nav lb-next" type="button" aria-label="Next image">→</button>`;
  document.body.appendChild(lb);
  const lbImg = $('.lb-img', lb), lbCap = $('.lb-cap', lb), lbCount = $('.lb-count', lb), lbClose = $('.lb-close', lb);
  const behindLb = () => [$('nav'), $('.stage'), $('footer')];

  function lbShow(i) {
    const g = lbState.g, n = g.images.length;
    lbState.i = (i + n) % n;
    const src = g.images[lbState.i];
    if (lbImg.getAttribute('src') !== src) {
      lbImg.style.opacity = 0;
      lbImg.onload = lbImg.onerror = () => { lbImg.style.opacity = 1; };
      lbImg.src = src;
    }
    lbImg.alt = g.caption || g.name;
    lbCap.textContent = g.caption;
    lbCount.textContent = n > 1 ? `${lbState.i + 1} / ${n}` : '';
    lb.classList.toggle('single', n < 2);
    [1, -1].forEach(d => { new Image().src = g.images[(lbState.i + d + n) % n]; }); // preload neighbours
  }
  function lbOpen(gi, i, trigger) {
    lbState = { g: galleries[gi], i, trigger };
    lbShow(i);
    behindLb().forEach(el => { if (el) el.inert = true; });
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    lbClose.focus({ preventScroll: true });
  }
  function lbDismiss() {
    if (!lbState) return;
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    behindLb().forEach(el => { if (el) el.inert = false; });
    const t = lbState.trigger; lbState = null;
    if (t && document.contains(t)) t.focus({ preventScroll: true });
  }
  $('#case-body').addEventListener('click', e => {
    const b = e.target.closest('.gal-btn');
    if (b) lbOpen(+b.dataset.g, +b.dataset.i, b);
  });
  $('.lb-scrim', lb).addEventListener('click', lbDismiss);   // click outside the image closes it
  lbClose.addEventListener('click', lbDismiss);
  $('.lb-prev', lb).addEventListener('click', () => lbShow(lbState.i - 1));
  $('.lb-next', lb).addEventListener('click', () => lbShow(lbState.i + 1));
  // capture phase, so Esc and the arrow keys never reach the page behind the gallery
  window.addEventListener('keydown', e => {
    if (!lbState) return;
    if (e.key === 'Escape') lbDismiss();
    else if (e.key === 'ArrowLeft') lbShow(lbState.i - 1);
    else if (e.key === 'ArrowRight') lbShow(lbState.i + 1);
    else return;
    e.preventDefault(); e.stopImmediatePropagation();
  }, true);
  let lbTouchX = null;   // swipe on touch screens
  lb.addEventListener('touchstart', e => { lbTouchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (lbTouchX === null || !lbState) return;
    const dx = e.changedTouches[0].clientX - lbTouchX; lbTouchX = null;
    if (Math.abs(dx) > 50) lbShow(lbState.i + (dx < 0 ? 1 : -1));
  }, { passive: true });

  function renderBlock(b, w) {
    const cap = b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : '';
    const img = src => `<div class="ph"><img src="${src}" alt="${esc(b.caption || w.name)}" loading="lazy"></div>`;
    if (b.heading) return `<h3 class="case-h reveal">${esc(b.heading)}</h3>`;
    if (b.text) return `<p class="case-p reveal">${esc(b.text)}</p>`;
    if (b.image) return `<figure class="case-fig reveal"${b.width ? ` style="max-width:${esc(b.width)}"` : ''}>${img(b.image)}${cap}</figure>`;
    if (b.images) {
      const gi = galleries.push({ images: b.images, caption: b.caption || '', name: w.name }) - 1;
      const thumbs = b.images.map((src, i) => `<div class="ph"><button type="button" class="gal-btn" data-g="${gi}" data-i="${i}" data-cursor="ENLARGE" aria-label="Enlarge image ${i + 1} of ${b.images.length}"><img src="${src}" alt="${esc(b.caption || w.name)}" loading="lazy"></button></div>`).join('');
      return `<figure class="case-fig reveal"><div class="ph-grid" style="--n:${Math.min(b.images.length, 3)}">${thumbs}</div>${cap}</figure>`;
    }
    if (b.download) return `<div class="case-fig download reveal"><a class="btn" href="${esc(b.download)}" download data-cursor="DOWNLOAD">↓ ${esc(b.label || 'DOWNLOAD')}</a>${b.note ? `<p class="small">${esc(b.note)}</p>` : ''}</div>`;
    if (b.specimen) {
      const sp = b.specimen, font = esc(sp.font), text = esc(sp.text || 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
      const glyphs = sp.glyphs || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return `<div class="specimen case-fig reveal" style="--spec-font:'${font}'" data-font="${font}" data-default="${text}">
        <div class="spec-big" aria-hidden="true"><span>${esc(sp.title || sp.font).toUpperCase()}</span></div>
        <div class="spec-tester">
          <div class="spec-bar"><span>TYPE ANYTHING</span><label>SIZE <input class="spec-size" type="range" min="24" max="160" value="72" aria-label="Font size"></label><button class="spec-reset" type="button">RESET</button></div>
          <div class="spec-text" contenteditable="true" spellcheck="false" role="textbox" aria-label="Type tester">${text}</div>
        </div>
        <div class="spec-glyphs" aria-hidden="true">${[...glyphs].map(g => `<span>${esc(g)}</span>`).join('')}</div>
      </div>`;
    }
    if (b.vimeo || b.figma) {
      const src = b.vimeo ? vimeoSrc(b.vimeo) : figmaSrc(b.figma);
      if (!src) return '';
      const ratio = b.ratio || (b.vimeo ? '16/9' : '16/10');
      const [rw, rh] = ratio.split('/').map(Number), r = (rw / (rh || 1)) || 16 / 9;
      const maxW = b.width ? esc(b.width) : `min(100%, calc(min(60vh, 520px) * ${r.toFixed(4)}))`; // never taller than the cover image
      const style = `aspect-ratio:${ratio};max-width:${maxW}`;
      return `<figure class="case-fig reveal"><div class="embed" style="${style}"><iframe src="${src}" loading="lazy" allowfullscreen allow="fullscreen; picture-in-picture" title="${esc(b.caption || w.name)}"></iframe></div>${cap}</figure>`;
    }
    return '';
  }

  function renderCase(w) {
    galleries = [];
    const idx = WORK.indexOf(w), prev = WORK[(idx - 1 + WORK.length) % WORK.length], next = WORK[(idx + 1) % WORK.length];
    const blocks = w.content || (w.process && w.process.length ? [{ images: w.process }] : null);
    const hero = (w.img && w.hero !== false) ? `<div class="ph hero-img"><img src="${w.img}" alt="${esc(w.name)}"></div>`
      : (blocks ? '' : `<div class="ph hero-img" style="--c:${w.color}">COVER IMAGE</div>`);
    const body = blocks ? blocks.map(b => renderBlock(b, w)).join('')
      : `<div class="ph-grid reveal">${[1, 2, 3].map(n => `<div class="ph" style="--c:${w.color}">IMAGE 0${n}</div>`).join('')}</div>`;
    $('#case-body').innerHTML = `
      <a class="back reveal" href="#work">← ALL WORK</a>
      <h2 class="panel-title reveal" tabindex="-1">${w.name}<span>.</span></h2>
      <p class="lede reveal">${w.problem}</p>
      <dl class="meta reveal">
        <div><dt>ROLE</dt><dd>${w.role}</dd></div><div><dt>YEAR</dt><dd>${w.year}</dd></div>
        <div><dt>TOOLS</dt><dd>${w.tools}</dd></div><div><dt>CATEGORY</dt><dd>${cats(w).map(c => CATS[c]).join(', ')}</dd></div>
      </dl>
      ${hero ? `<div class="reveal">${hero}</div>` : ''}
      ${body}
      <div class="case-nav reveal"><a class="case-link" href="#work/${prev.slug}" data-cursor="PREV"><small>← PREVIOUS</small><span>${prev.name}</span></a><a class="case-link next" href="#work/${next.slug}" data-cursor="NEXT"><small>NEXT →</small><span>${next.name}</span></a></div>`;
    stagger($$('#case-body .reveal'));
    $$('#case-body .specimen').forEach(sp => {
      const txt = $('.spec-text', sp), size = $('.spec-size', sp), set = v => sp.style.setProperty('--spec-size', v + 'px');
      set(size.value);
      const big = $('.spec-big', sp), word = $('.spec-big span', sp);
      const fit = () => {
        big.style.fontSize = '100px';
        const w = word.getBoundingClientRect().width, avail = sp.clientWidth;
        if (w > 0 && avail > 0) big.style.fontSize = Math.max(32, Math.min(144, 100 * avail / w * .98)) + 'px';
      };
      fit();
      if (document.fonts && document.fonts.load) document.fonts.load(`100px "${sp.dataset.font}"`).then(fit, () => {});
      if (window.ResizeObserver) new ResizeObserver(fit).observe(sp);
      size.addEventListener('input', () => set(size.value));
      $('.spec-reset', sp).addEventListener('click', () => { txt.textContent = sp.dataset.default; size.value = 72; set(72); });
      txt.addEventListener('paste', e => { e.preventDefault(); document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text')); });
    });
  }

  /* ================= ROUTER (hash based) ================= */
  const VIEWS = { work: 'Work', play: 'Play', about: 'About', contact: 'Contact' };
  const home = $('#home');
  const navEl = $('nav'), menuBtn = $('#menu-btn');
  function setMenu(open) { navEl.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? 'CLOSE' : 'MENU'; }
  menuBtn.addEventListener('click', () => setMenu(!navEl.classList.contains('open')));
  $$('#nav-links a, .nav-logo').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  let current = null, currentView = 'home', pageTitle = document.title;

  function route() {
    lbDismiss();
    const [v, slug] = location.hash.slice(1).split('/');
    const view = VIEWS[v] ? v : 'home';
    const item = view === 'work' && slug ? WORK.find(w => w.slug === slug) : null;
    const panelId = item ? 'case' : view;
    const key = panelId + (item ? item.slug : '');
    if (key === current) return;
    current = key;
    setMenu(false);
    if (currentView === 'play' && view !== 'play' && state === 'run') state = 'pause'; // auto-pause when leaving
    currentView = view;
    const prev = $('.panel.active');
    $$('.panel.leaving').forEach(p => p.classList.remove('leaving'));
    if (item) renderCase(item);
    $$('.panel').forEach(p => { const on = p.id === 'panel-' + panelId; p.classList.toggle('active', on); p.inert = !on; p.setAttribute('aria-hidden', !on); if (on) p.scrollTop = 0; });
    home.inert = panelId !== 'home';
    if (prev && panelId !== 'home' && prev.id !== 'panel-' + panelId) { prev.classList.add('leaving'); setTimeout(() => prev.classList.remove('leaving'), 800); }
    $$('nav [data-nav]').forEach(a => a.classList.toggle('active-nav', a.dataset.nav === view));
    document.title = `${item ? item.name : (VIEWS[view] || 'Home')} \\\\ ${BASE_TITLE}`;
    pageTitle = document.title;
    if (view === 'play') { draw(); drawPreviews(); }
    const h = panelId !== 'home' && $(`#panel-${panelId} h2`);
    if (h) setTimeout(() => h.focus({ preventScroll: true }), 80);
    thumb.classList.remove('visible');
  }
  addEventListener('hashchange', route);
  addEventListener('popstate', route);
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || current === 'home') return;
    history.pushState(null, '', current.startsWith('case') ? '#work' : location.pathname + location.search);
    route();
  });

  /* ================= TETRIS ================= */
  const BS = 30, COLS = 10, ROWS = 20, POINTS = [0, 100, 300, 500, 800];
  const SHAPES = [[], [[1,1,1,1]], [[2,0,0],[2,2,2]], [[0,0,3],[3,3,3]], [[4,4],[4,4]], [[0,5,5],[5,5,0]], [[0,6,0],[6,6,6]], [[7,7,0],[0,7,7]]];
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const fit = (c, w, h) => { c.width = w * dpr; c.height = h * dpr; const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0); return x; };
  const boardCv = $('#tetris-canvas'), nextCv = $('#next-canvas'), holdCv = $('#hold-canvas');
  const tCtx = fit(boardCv, COLS * BS, ROWS * BS), nCtx = fit(nextCv, 100, 100), hCtx = fit(holdCv, 100, 100);
  const startBtn = $('#tetris-start-btn');

  let board, score = 0, lines = 0, level = 1, best = Number(store.get('tetris-best')) || 0;
  let dropInterval = 1000, dropCounter = 0, state = 'idle'; // idle | run | pause | over
  let bag = [], nextIdx = 0, holdIdx = 0, canHold = true;
  const player = { x: 0, y: 0, m: null, shape: 0 };
  const emptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  board = emptyBoard();
  const running = () => state === 'run';

  // 7-bag randomizer: every piece appears once per cycle
  function takeBag() {
    if (!bag.length) { bag = [1,2,3,4,5,6,7]; for (let i = 6; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; } }
    return bag.pop();
  }
  function collide(m, x, y) {
    for (let r = 0; r < m.length; r++) for (let c = 0; c < m[r].length; c++) if (m[r][c]) {
      const bx = x + c, by = y + r;
      if (bx < 0 || bx >= COLS || by >= ROWS || (by >= 0 && board[by][bx])) return true;
    }
    return false;
  }
  function spawn(idx) {
    player.shape = idx; player.m = SHAPES[idx]; player.y = 0;
    player.x = Math.floor((COLS - player.m[0].length) / 2);
    if (collide(player.m, player.x, player.y)) endGame();
  }
  function nextPiece() { spawn(nextIdx); nextIdx = takeBag(); drawPreviews(); }

  function endGame() {
    state = 'over';
    if (score > best) { best = score; store.set('tetris-best', best); }
    updateStats(); startBtn.innerText = 'PLAY AGAIN'; draw();
  }
  function updateStats() {
    $('#tetris-score').innerText = score; $('#tetris-lines').innerText = lines;
    $('#tetris-level').innerText = level; $('#tetris-best').innerText = best; $('#foot-best').innerText = best ? 'YOUR TETRIS BEST: ' + best + ' →' : 'YOUR TETRIS BEST: NOT YET →';
  }
  function lock() {
    player.m.forEach((row, r) => row.forEach((v, c) => { if (v) board[player.y + r][player.x + c] = player.shape; }));
    let n = 0;
    outer: for (let r = ROWS - 1; r >= 0; r--) {
      for (let c = 0; c < COLS; c++) if (!board[r][c]) continue outer;
      board.unshift(board.splice(r, 1)[0].fill(0)); r++; n++;
    }
    if (n) { lines += n; score += POINTS[n] * level; level = Math.floor(lines / 5) + 1; dropInterval = Math.max(120, 1000 - (level - 1) * 100); }
    canHold = true; updateStats(); dropCounter = 0; nextPiece();
  }
  function move(d) { if (running() && !collide(player.m, player.x + d, player.y)) player.x += d; }
  function rotate() {
    if (!running()) return;
    const m = player.m, r = m[0].map((_, i) => m.map(row => row[i]).reverse());
    for (const dx of [0, -1, 1, -2, 2]) if (!collide(r, player.x + dx, player.y)) { player.m = r; player.x += dx; return; } // wall kicks; a failed rotation changes nothing
  }
  function softDrop() {
    if (!running()) return;
    if (collide(player.m, player.x, player.y + 1)) lock(); else { player.y++; score += 1; updateStats(); }
    dropCounter = 0;
  }
  function hardDrop() {
    if (!running()) return;
    let d = 0; while (!collide(player.m, player.x, player.y + 1)) { player.y++; d++; }
    score += d * 2; lock();
  }
  function hold() {
    if (!running() || !canHold) return;
    const cur = player.shape;
    if (holdIdx) { const h = holdIdx; holdIdx = cur; spawn(h); } else { holdIdx = cur; nextPiece(); }
    canHold = false; drawPreviews();
  }
  function ghostY() { let y = player.y; while (!collide(player.m, player.x, y + 1)) y++; return y; }

  function block(ctx, x, y, s, idx, alpha = 1) {
    ctx.globalAlpha = alpha; ctx.fillStyle = theme.pieces[idx]; ctx.fillRect(x, y, s, s);
    ctx.strokeStyle = theme.ink; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y + 1, s - 2, s - 2); ctx.globalAlpha = 1;
  }
  function overlay(t, sub) {
    tCtx.fillStyle = 'rgba(0,0,0,.65)'; tCtx.fillRect(0, 0, COLS * BS, ROWS * BS);
    tCtx.fillStyle = '#fff'; tCtx.textAlign = 'center';
    tCtx.font = "600 26px 'IBM Plex Mono', monospace"; tCtx.fillText(t, COLS * BS / 2, ROWS * BS / 2 - 6);
    tCtx.font = "400 16px 'IBM Plex Mono', monospace"; tCtx.fillText(sub, COLS * BS / 2, ROWS * BS / 2 + 24); tCtx.textAlign = 'start';
  }
  function draw() {
    tCtx.fillStyle = theme.bg; tCtx.fillRect(0, 0, COLS * BS, ROWS * BS);
    tCtx.strokeStyle = theme.grid; tCtx.lineWidth = 1;
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) tCtx.strokeRect(c * BS, r * BS, BS, BS);
    board.forEach((row, r) => row.forEach((v, c) => v && block(tCtx, c * BS, r * BS, BS, v)));
    if (player.m && state !== 'over') {
      const gy = ghostY();
      player.m.forEach((row, r) => row.forEach((v, c) => { if (v) { block(tCtx, (player.x + c) * BS, (gy + r) * BS, BS, player.shape, .25); } }));
      player.m.forEach((row, r) => row.forEach((v, c) => { if (v) block(tCtx, (player.x + c) * BS, (player.y + r) * BS, BS, player.shape); }));
    }
    if (state === 'idle') overlay('READY', 'PRESS START');
    else if (state === 'pause') overlay('PAUSED', 'PRESS P');
    else if (state === 'over') overlay('GAME OVER', 'SCORE ' + score);
  }
  function preview(ctx, idx) {
    ctx.fillStyle = theme.bg; ctx.fillRect(0, 0, 100, 100);
    if (!idx) return;
    const m = SHAPES[idx], s = 22, ox = (100 - m[0].length * s) / 2, oy = (100 - m.length * s) / 2;
    m.forEach((row, r) => row.forEach((v, c) => v && block(ctx, ox + c * s, oy + r * s, s, idx)));
  }
  function drawPreviews() { preview(nCtx, nextIdx || 0); preview(hCtx, holdIdx); }

  function startTetris() {
    board = emptyBoard(); score = 0; lines = 0; level = 1; dropInterval = 1000; dropCounter = 0;
    bag = []; holdIdx = 0; canHold = true; nextIdx = takeBag(); state = 'run';
    updateStats(); nextPiece(); startBtn.innerText = 'RESTART';
  }
  function togglePause() { if (state === 'run') state = 'pause'; else if (state === 'pause') state = 'run'; else return; lastTime = performance.now(); draw(); }

  const bind = (sel, fn) => $(sel).addEventListener('click', e => { fn(); e.currentTarget.blur(); draw(); }); // blur: stops Space re-pressing a focused button
  bind('#tetris-start-btn', startTetris); bind('#t-left', () => move(-1)); bind('#t-right', () => move(1));
  bind('#t-rot', rotate); bind('#t-drop', softDrop); bind('#t-hold', hold);

  addEventListener('keydown', e => {
    if (currentView !== 'play') return;
    const k = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
    if (k === 'p') return togglePause();
    if (!running()) return;
    if (k === 'arrowleft' || k === 'a') move(-1);
    else if (k === 'arrowright' || k === 'd') move(1);
    else if (k === 'arrowdown' || k === 's') softDrop();
    else if (k === 'arrowup' || k === 'w' || k === 'x') rotate();
    else if (k === ' ') hardDrop();
    else if (k === 'c') hold();
    draw();
  });
  addEventListener('keyup', e => { if (currentView === 'play' && e.key === ' ') e.preventDefault(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (state === 'run') { state = 'pause'; draw(); document.title = 'Paused \\\\ come back'; } }
    else document.title = pageTitle;
  });

  /* ================= CONTACT ================= */
  const copyBtn = $('#copy-email');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(EMAIL); }
    catch (e) { const t = document.createElement('textarea'); t.value = EMAIL; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    copyBtn.textContent = 'COPIED ✓'; setTimeout(() => copyBtn.textContent = 'COPY EMAIL', 1800);
  });

  /* ================= LOOP (cursor + game only) ================= */
  let lastTime = performance.now();
  function frame(now) {
    const dt = Math.min(now - lastTime, 100); lastTime = now;
    cx += (mx - cx) * .2; cy += (my - cy) * .2;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    if (currentView === 'play' && running()) { dropCounter += dt; if (dropCounter > dropInterval) softDrop(); draw(); }
    requestAnimationFrame(frame);
  }

  /* ================= INIT ================= */
  $('#year').textContent = new Date().getFullYear();
  const saved = store.get('theme');
  setTheme(THEMES.includes(saved) ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  renderWork(); updateStats(); nextIdx = takeBag(); drawPreviews(); draw();
  $$('.panel .reveal').forEach(el => { if (!el.closest('#case-body')) el.style.setProperty('--i', [...el.parentNode.children].indexOf(el)); });
  route();
  // touch screens have no hover, so play the three hero effects once, one after another
  if (matchMedia('(hover: none)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ['hold', 'fold', 'click'].forEach((v, i) => setTimeout(() => {
      const el = $('.verb.' + v); el.classList.add('demo'); setTimeout(() => el.classList.remove('demo'), 1100);
    }, 2300 + i * 1000));
  }
  requestAnimationFrame(frame);
})();
