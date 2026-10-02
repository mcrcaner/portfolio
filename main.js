(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ================= CONTENT (edit here) ================= */
  // Add `img: 'assets/your-image.jpg'` to a project once you have real images.
  // `process: ['assets/a.jpg', ...]` fills the process grid on the case study.
  const CATS = { popup: 'Pop-up & Paper', print: 'Print & Editorial', ux: 'UX/UI' };
  const WORK = [
    { slug: 'spatial-editorial', name: 'Spatial Editorial', type: 'Print & Form', cat: 'print', year: '2026', role: 'Design', tools: 'Add tools', color: '#8B0A22', problem: 'One line: the problem this project set out to solve.' },
    { slug: 'system-constraints', name: 'System Constraints', type: 'UX/UI', cat: 'ux', year: '2026', role: 'Design', tools: 'Add tools', color: '#1E1C1C', problem: 'One line: the problem this project set out to solve.' },
    { slug: 'tactile-interfaces', name: 'Tactile Interfaces', type: 'Interaction Design', cat: 'ux', year: '2025', role: 'Design', tools: 'Add tools', color: '#0055FF', problem: 'One line: the problem this project set out to solve.' },
    { slug: 'type-and-grid', name: 'Type & Grid', type: 'Typography Systems', cat: 'print', year: '2025', role: 'Design', tools: 'Add tools', color: '#333333', problem: 'One line: the problem this project set out to solve.' },
    { slug: 'popup-book', name: 'Pop-up Book Architecture', type: 'Paper Engineering', cat: 'popup', year: '2025', role: 'Design, paper engineering', tools: 'Add tools', color: '#B5472B', problem: 'One line: the problem this project set out to solve.' }
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
  $$('.theme-btn').forEach(b => b.addEventListener('click', () => setTheme(b.dataset.themeBtn)));

  /* ================= CURSOR ================= */
  const cursor = $('#custom-cursor');
  let mx = -100, my = -100, cx = -100, cy = -100, cursorOn = false;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!cursorOn) { cursorOn = true; cx = mx; cy = my; document.body.classList.add('has-cursor', 'cursor-ready'); }
  });
  document.addEventListener('mouseover', e => document.body.classList.toggle('hovering', !!e.target.closest('a, button, .row')));

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
    const list = WORK.filter(w => filter === 'all' || w.cat === filter);
    $('#work-list').innerHTML = list.map((w, i) =>
      `<a class="row" href="#work/${w.slug}" data-slug="${w.slug}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="name">${w.name}</span><span class="type">${w.type}</span></a>`).join('');
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

  function renderCase(w) {
    const ph = (src, label, cls = '') => src ? `<div class="ph ${cls}"><img src="${src}" alt="${w.name}: ${label}"></div>` : `<div class="ph ${cls}" style="--c:${w.color}">${label}</div>`;
    const proc = w.process || [];
    $('#case-body').innerHTML = `
      <a class="back reveal" href="#work">← ALL WORK</a>
      <h2 class="panel-title reveal" tabindex="-1">${w.name}<span>.</span></h2>
      <p class="lede reveal">${w.problem}</p>
      <dl class="meta reveal">
        <div><dt>ROLE</dt><dd>${w.role}</dd></div><div><dt>YEAR</dt><dd>${w.year}</dd></div>
        <div><dt>TOOLS</dt><dd>${w.tools}</dd></div><div><dt>CATEGORY</dt><dd>${CATS[w.cat]}</dd></div>
      </dl>
      <div class="reveal">${ph(w.img, 'HERO IMAGE', 'hero-img')}</div>
      <div class="ph-grid reveal">${[0, 1, 2].map(i => ph(proc[i], 'PROCESS 0' + (i + 1))).join('')}</div>`;
    stagger($$('#case-body .reveal'));
  }

  /* ================= ROUTER (hash based) ================= */
  const VIEWS = { work: 'Work', play: 'Play', about: 'About', contact: 'Contact' };
  const home = $('#home');
  let current = null, currentView = 'home';

  function route() {
    const [v, slug] = location.hash.slice(1).split('/');
    const view = VIEWS[v] ? v : 'home';
    const item = view === 'work' && slug ? WORK.find(w => w.slug === slug) : null;
    const panelId = item ? 'case' : view;
    const key = panelId + (item ? item.slug : '');
    if (key === current) return;
    current = key;
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
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'run') { state = 'pause'; draw(); } });

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
  requestAnimationFrame(frame);
})();
