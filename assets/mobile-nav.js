/* Mobile navigation: on small screens the sidebar becomes a slide-in drawer opened by a hamburger. */
(function () {
  var sb = document.getElementById('sidebar');
  if (!sb) return;
  var dark = document.body.classList.contains('dark') || getComputedStyle(document.body).backgroundColor === 'rgb(18, 17, 16)';

  var css = document.createElement('style');
  css.textContent = [
    '.mnav-bar, .mnav-scrim { display: none; }',
    '@media (max-width: 900px) {',
    '  .mnav-bar { display: flex; position: sticky; top: 0; z-index: 900; align-items: center; justify-content: space-between; height: 56px; padding: 0 16px; background: ' + (dark ? 'rgba(18,17,16,.92)' : 'rgba(240,255,204,.94)') + '; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-bottom: 1px solid ' + (dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)') + '; }',
    '  .mnav-name { font-family: "Inter", sans-serif; font-size: 16px; font-weight: 500; letter-spacing: -.2px; color: ' + (dark ? '#f5f5f4' : '#1c1917') + '; text-decoration: none; }',
    '  .mnav-btn { width: 42px; height: 42px; border: 0; background: none; padding: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; -webkit-tap-highlight-color: transparent; }',
    '  .mnav-btn i { display: block; width: 22px; height: 2px; border-radius: 2px; background: ' + (dark ? '#f5f5f4' : '#1c1917') + '; transition: transform .3s ease, opacity .2s ease; }',
    '  body.mnav-open .mnav-btn i:nth-child(1) { transform: translateY(7px) rotate(45deg); }',
    '  body.mnav-open .mnav-btn i:nth-child(2) { opacity: 0; }',
    '  body.mnav-open .mnav-btn i:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }',
    '  #sidebar { display: flex !important; flex-direction: column; justify-content: space-between; position: fixed !important; top: 0 !important; left: 0 !important; bottom: 0 !important; height: 100dvh !important; width: min(84vw, 320px) !important; max-width: none !important; z-index: 1000 !important; overflow-y: auto !important; transform: translateX(-102%); transition: transform .35s cubic-bezier(.4,0,.2,1); box-shadow: 8px 0 30px rgba(0,0,0,.18); padding: 28px 22px !important; border: 0 !important; }',
    '  body.mnav-open #sidebar { transform: none; }',
    '  .mnav-scrim { display: block; position: fixed; inset: 0; z-index: 950; background: rgba(0,0,0,.35); opacity: 0; pointer-events: none; transition: opacity .3s; }',
    '  body.mnav-open .mnav-scrim { opacity: 1; pointer-events: auto; }',
    '  body.mnav-open { overflow: hidden; }',
    '  body { display: block !important; }',
    '  #main, main { margin-left: 0 !important; width: 100% !important; max-width: 100% !important; }',
    '  .cursor { display: none !important; }',
    '}'
  ].join('\n');
  document.head.appendChild(css);

  var bar = document.createElement('header');
  bar.className = 'mnav-bar';
  bar.innerHTML = '<a class="mnav-name" href="index.html">Thishya Mannur</a><button class="mnav-btn" aria-label="Open menu" aria-expanded="false"><i></i><i></i><i></i></button>';
  var scrim = document.createElement('div');
  scrim.className = 'mnav-scrim';
  document.body.insertBefore(bar, document.body.firstChild);
  document.body.appendChild(scrim);

  var btn = bar.querySelector('.mnav-btn');
  function set(open) {
    document.body.classList.toggle('mnav-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { set(!document.body.classList.contains('mnav-open')); });
  scrim.addEventListener('click', function () { set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  sb.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
})();
