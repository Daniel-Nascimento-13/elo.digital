
/* =========================================
   ESTADO GLOBAL
   ========================================= */
const intro    = document.getElementById('intro');
const secoes   = Array.from(document.querySelectorAll('section'));
let atual      = 0;
let travado    = true;
let timelineFez  = false;
let servicosFez  = false;


/* =========================================
   INTRO — SAI APÓS 2S E REVELA SEÇÃO 1
   ========================================= */
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

setTimeout(() => {
  intro.classList.add('leaving');
  secoes[0].classList.add('visible');
  intro.addEventListener('transitionend', () => {
    intro.style.display = 'none';
    travado = false;
  }, { once: true });

  const hint = secoes[0].querySelector('.scroll-hint');
  const span = hint?.querySelector('span');
  const barra = hint?.querySelector('.scroll-hint-barra');
  if (hint && span) {
    span.style.animation = 'none';
    hint.style.opacity = '0';
    hint.style.transition = 'opacity 0.6s ease';
    if (barra) barra.style.opacity = '0';
    setTimeout(() => {
      hint.style.opacity = '1';
      span.style.animation = 'digitando 4s steps(38) 0.3s forwards';
    }, 2500);
    setTimeout(() => {
      if (barra) {
        barra.style.transition = 'opacity 0.6s ease';
        barra.style.opacity = '1';
      }
    }, 7000);
  }
}, 2000);


/* =========================================
   SEÇÃO 1 — CARROSSEL HERO
   ========================================= */
const heroPersonagens = [
  {
    foto:  './arquivos/suelen.png',
    alt:   'Suelen',
    nome:  'Suka',
    cargo: 'Fundadora e Diretora Criativa',
    proximo: 'Édipo'
  },
  {
    foto:  './arquivos/edipo.png',
    alt:   'Édipo',
    nome:  'Édipo',
    cargo: 'Co-fundador, Diretor de Tráfego e Piloto de Drone',
    proximo: 'Suelen'
  }
];

let heroAtual = 0;
let heroTimer = null;

function trocarHero() {
  const foto   = document.getElementById('heroFoto');
  const nome   = document.getElementById('heroNome');
  const cargo  = document.getElementById('heroCargo');
  const prox   = document.getElementById('heroProximoNome');

  foto.classList.add('trocando');

  setTimeout(() => {
    heroAtual = (heroAtual + 1) % heroPersonagens.length;
    const p = heroPersonagens[heroAtual];

    foto.src = p.foto;
    foto.alt = p.alt;
    nome.textContent  = p.nome;
    cargo.textContent = p.cargo;
    prox.textContent  = p.proximo;

    foto.classList.remove('trocando');
  }, 500);

  reiniciarHeroTimer();
}

function iniciarHeroTimer() {
  heroTimer = setInterval(trocarHero, 5000);
}

function reiniciarHeroTimer() {
  clearInterval(heroTimer);
  iniciarHeroTimer();
}

iniciarHeroTimer();


/* =========================================
   NAVEGAÇÃO ENTRE SEÇÕES
   ========================================= */
function irPara(index) {
  if (travado || index < 0 || index >= secoes.length) return;
  travado = true;
  atual = index;
  secoes[atual].scrollIntoView({ behavior: 'smooth' });
  secoes[atual].classList.add('visible');

  if (index === 2) {
    ativarStrokeFill();
    ativarTimeline();
  }
  if (index === 3) {
    ativarServicosStrokeFill();
    ativarServicos();
  }
  if (index === 4) {
    ativarEscopoStrokeFill();
    ativarEscopo();
    const btn = document.querySelector('.escopo-cta-btn');
    if (btn) {
      btn.style.transition = 'none';
      btn.style.transform = 'translateX(0)';
      setTimeout(() => {
        btn.style.animation = 'ctaShake 4s ease-in-out infinite';
      }, 1400);
    }
  }
  if (index === 5) {
    ativarDiferenciaisStrokeFill();
    ativarDiferenciais();
  }
  if (index === 6) {
    ativarCasosStrokeFill();
    ativarCasos();
  }
  if (index === 7) {
    ativarParceriasStrokeFill();
    ativarParcerias();
  }
  if (index === 8) {
    ativarDepoimentosStrokeFill();
    ativarDepoimentos();
  }
  if (index === 9) {
    ativarPacotesStrokeFill();
  }

  setTimeout(() => { travado = false; }, 900);
}


/* =========================================
   CONTROLE — TOUCH (MOBILE)
   ========================================= */
let toqueY = 0;

document.addEventListener('touchstart', e => {
  toqueY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  const diff = toqueY - e.changedTouches[0].clientY;
  if (Math.abs(diff) < 50) return;
  diff > 0 ? irPara(atual + 1) : irPara(atual - 1);
}, { passive: true });


/* =========================================
   CONTROLE — SCROLL (DESKTOP)
   ========================================= */
document.addEventListener('wheel', e => {
  e.preventDefault();
  if (Math.abs(e.deltaY) < 30) return;
  e.deltaY > 0 ? irPara(atual + 1) : irPara(atual - 1);
}, { passive: false });


/* =========================================
   SCROLL HINT — APARECE APÓS ANIMAÇÕES
   ========================================= */
function mostrarScrollHint(secao, delay) {
  const hint = secao.querySelector('.scroll-hint');
  if (!hint) return;
  hint.style.opacity = '0';
  hint.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { hint.style.opacity = '1'; }, delay);
}


/* =========================================
   SEÇÃO 2 — CARROSSEL SOBRE NÓS
   ========================================= */
const itensCarrossel = document.querySelectorAll('.sobre-carrossel-item');
let indexCarrossel = 0;

setInterval(() => {
  itensCarrossel[indexCarrossel].classList.remove('active');
  indexCarrossel = (indexCarrossel + 1) % itensCarrossel.length;
  itensCarrossel[indexCarrossel].classList.add('active');
}, 2500);


/* =========================================
   SEÇÃO 3 — ESTRATÉGIA
   ========================================= */
/* STROKE FILL DO TÍTULO */
function ativarStrokeFill() {
  const els = document.querySelectorAll('.titulo-outline, .titulo-fill');
  els.forEach((el, i) => {
    el.style.animation = 'none';
    el.style.color = 'transparent';
    void el.offsetWidth;
    el.style.animation = `strokeFill 1.2s ease ${0.5 + i * 0.2}s forwards`;
  });
}

/* TIMELINE */
const esperar = ms => new Promise(r => setTimeout(r, ms));

function animarDot(id) {
  const el = document.getElementById(id);
  if (el) el.style.animation = 'tlDotAparece 340ms cubic-bezier(0.22,1,0.36,1) forwards';
}

function animarTexto(ti, si) {
  return new Promise(r => {
    const t = document.getElementById(ti);
    const s = document.getElementById(si);
    if (t) t.style.animation = 'tlTextoSobe 300ms ease forwards';
    if (s) s.style.animation = 'tlTextoSobe 300ms ease 60ms forwards';
    setTimeout(r, 360);
  });
}

async function ativarTimeline() {
  if (timelineFez) return;
  timelineFez = true;

  for (let i = 0; i < 4; i++) {
    const dot   = document.getElementById('d'    + i);
    const linha = document.getElementById('seg'  + i);
    const inner = document.getElementById('segi' + i);
    const t     = document.getElementById('t'    + i);
    const s     = document.getElementById('s'    + i);
    if (dot)   { dot.style.animation   = 'none'; dot.style.opacity = '0'; }
    if (linha) { linha.style.height    = '0'; }
    if (inner) { inner.style.animation = 'none'; inner.style.transform = 'scaleY(0)'; }
    if (t)     { t.style.animation     = 'none'; t.style.opacity = '0'; }
    if (s)     { s.style.animation     = 'none'; s.style.opacity = '0'; }
  }
  void document.getElementById('d0').offsetWidth;

  await esperar(400);

  const wrap = document.querySelector('.tl-wrap');

  for (let i = 0; i < 4; i++) {
    animarDot('d' + i);
    await esperar(340);
    await animarTexto('t' + i, 's' + i);
    await esperar(100);

    if (i < 3) {
      const dot1  = document.getElementById('d' + i);
      const dot2  = document.getElementById('d' + (i + 1));
      const linha = document.getElementById('seg'  + i);
      const inner = document.getElementById('segi' + i);

      const wrapRect = wrap.getBoundingClientRect();
      const r1 = dot1.getBoundingClientRect();
      const r2 = dot2.getBoundingClientRect();

      linha.style.left      = (r1.left + r1.width / 2 - wrapRect.left) + 'px';
      linha.style.top       = (r1.bottom - wrapRect.top) + 'px';
      linha.style.height    = Math.max(0, r2.top - r1.bottom) + 'px';
      linha.style.transform = 'translateX(-50%)';

      inner.style.transformOrigin = 'top';
      inner.style.animation = 'tlLinhaCresce 480ms cubic-bezier(0.22,1,0.36,1) forwards';
      await esperar(480);
      await esperar(60);
    }
  }
}


/* =========================================
   SEÇÃO 4 — SERVIÇOS
   ========================================= */
function ativarServicosStrokeFill() {
  const els = document.querySelectorAll('.servicos-titulo-outline, .servicos-titulo-fill');
  els.forEach((el, i) => {
    el.style.animation = 'none';
    el.style.color = 'transparent';
    void el.offsetWidth;
    el.style.animation = `servicosStrokeFill 1.2s ease ${0.3 + i * 0.2}s forwards`;
  });
}

function ativarFaixa() {
  const inner = document.querySelector('.servicos-faixa-inner');
  if (!inner) return;

  let pos = 0;
  const larguraTotal = inner.scrollWidth / 2;

  function animar() {
    pos -= 0.5;
    if (Math.abs(pos) >= larguraTotal) pos = 0;
    inner.style.transform = `translateX(${pos}px) translateZ(0)`;
    requestAnimationFrame(animar);
  }

  requestAnimationFrame(animar);
}

function toggleServico(i) {
  const desc   = document.getElementById('sd' + i);
  const toggle = document.getElementById('st' + i);
  const row    = document.getElementById('sr' + i);
  const aberto = desc.classList.contains('aberto');

  for (let j = 0; j < 6; j++) {
    document.getElementById('sd' + j)?.classList.remove('aberto');
    document.getElementById('st' + j)?.classList.remove('aberto');
    document.getElementById('sr' + j)?.classList.remove('aberto');
  }

  if (!aberto) {
    desc.classList.add('aberto');
    toggle.classList.add('aberto');
    row.classList.add('aberto');
  }
}

async function ativarServicos() {
  if (servicosFez) return;
  servicosFez = true;

  ativarFaixa();

  for (let i = 0; i < 6; i++) {
    const row = document.getElementById('sr' + i);
    if (row) { row.style.opacity = '0'; row.style.transform = 'translateY(16px)'; }
  }

  await esperar(500);

  for (let i = 0; i < 6; i++) {
    const row = document.getElementById('sr' + i);
    if (row) row.style.animation = 'servicosSlideUp 0.4s ease forwards';
    await esperar(120);
  }
}


/* =========================================
   SEÇÃO 5 — ESCOPO E ENTREGAS
   ========================================= */
let escopoFez = false;

function ativarEscopoStrokeFill() {
  const els = document.querySelectorAll('.escopo-titulo-outline, .escopo-titulo-fill');
  els.forEach((el, i) => {
    el.style.animation = 'none';
    el.style.color = 'transparent';
    void el.offsetWidth;
    el.style.animation = `escopoStrokeFill 1.2s ease ${0.3 + i * 0.2}s forwards`;
  });
}

async function ativarEscopo() {
  if (escopoFez) return escopoFez;
  escopoFez = true;
  for (let i = 0; i < 4; i++) {
    const card = document.getElementById('ec' + i);
    if (card) { card.style.opacity = '0'; card.style.transform = 'translateX(-16px)'; }
  }
  await esperar(600);
  for (let i = 0; i < 4; i++) {
    const card = document.getElementById('ec' + i);
    if (card) card.style.animation = 'escopoCardEntra 0.5s cubic-bezier(0.22,1,0.36,1) forwards';
    await esperar(150);
  }
}

const ctaBtn = document.querySelector('.escopo-cta-btn');
const whatsUrl = ctaBtn?.getAttribute('data-href');

ctaBtn?.addEventListener('click', function(e) {
  e.preventDefault();
  ctaBtn.style.animation = 'none';

  const rect = ctaBtn.getBoundingClientRect();
  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    background: linear-gradient(to right, #1EE07F33, #1EE07F88, transparent);
    pointer-events: none;
    border-radius: 2px;
    z-index: 999;
    transition: transform 0.5s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.6s ease 0.3s;
  `;
  document.body.appendChild(trail);

  ctaBtn.style.transition = 'transform 0.5s cubic-bezier(0.55, 0, 1, 0.45)';
  ctaBtn.style.transform = 'translateX(120vw)';

  requestAnimationFrame(() => {
    trail.style.transform = 'translateX(120vw)';
    trail.style.opacity = '0';
  });

  setTimeout(() => {
    trail.remove();
    window.open(whatsUrl, '_blank');
  }, 900);
});

// RESET AO VOLTAR DA ABA
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    const btn = document.querySelector('.escopo-cta-btn');
    if (btn) {
      btn.style.transition = 'none';
      btn.style.transform = 'translateX(0)';
      btn.style.animation = 'ctaShake 4s ease-in-out infinite';
    }
    secoes[atual].scrollIntoView({ behavior: 'instant' });
  }
});


/* =========================================
   SEÇÃO 6 — DIFERENCIAIS
   ========================================= */
let diferenciaisFez = false;

function ativarDiferenciaisStrokeFill() {
  const els = document.querySelectorAll('.diferenciais-titulo-outline, .diferenciais-titulo-fill');
  els.forEach((el, i) => {
    el.style.animation = 'none';
    el.style.color = 'transparent';
    void el.offsetWidth;
    el.style.animation = `diferenciaisStrokeFill 1.2s ease ${0.3 + i * 0.2}s forwards`;
  });
}

async function ativarDiferenciais() {
  if (diferenciaisFez) return;
  diferenciaisFez = true;

  // RESET
  for (let i = 0; i < 5; i++) {
    const row = document.getElementById('dr' + i);
    if (row) {
      row.style.opacity = '0';
      row.style.transform = row.classList.contains('dif-esq')
        ? 'translateX(-40px)'
        : 'translateX(40px)';
    }
  }

  await esperar(700);

  // STAGGER
  for (let i = 0; i < 5; i++) {
    const row = document.getElementById('dr' + i);
    if (!row) continue;
    const anim = row.classList.contains('dif-esq') ? 'difSlideEsq' : 'difSlideDir';
    row.style.animation = `${anim} 0.9s cubic-bezier(0.22,1,0.36,1) forwards`;

    // ADICIONAR PULSE RING APÓS O ITEM APARECER
    const iconWrap = row.querySelector('.dif-icon-wrap');
    if (iconWrap && !iconWrap.querySelector('.dif-icon-pulse')) {
      const pulse = document.createElement('div');
      pulse.className = 'dif-icon-pulse';
      iconWrap.appendChild(pulse);
    }

    await esperar(350);
  }
}


/* =========================================
   SEÇÃO 7 — CASES DE SUCESSO
   ========================================= */
let casosFez = false;

function ativarCasosStrokeFill() {
  const els = document.querySelectorAll('.casos-titulo-outline, .casos-titulo-fill');
  els.forEach((el, i) => {
    el.style.animation = 'none';
    el.style.color = 'transparent';
    void el.offsetWidth;
    el.style.animation = `casosStrokeFill 1.2s ease ${0.3 + i * 0.2}s forwards`;
  });
}

async function ativarCasos() {
  if (casosFez) return;
  casosFez = true;

  for (let i = 0; i < 4; i++) {
    const card = document.getElementById('cc' + i);
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.88) translateY(20px)';
      const at = card.querySelector('.casos-at');
      if (at) at.style.opacity = '0';
    }
  }

  await esperar(700);

  // ENTRADA ESCALONADA
  for (let i = 0; i < 4; i++) {
    const card = document.getElementById('cc' + i);
    if (!card) continue;

    card.style.animation = 'casosCardPop 1.1s cubic-bezier(0.22,1,0.36,1) forwards';

    const at = card.querySelector('.casos-at');
    if (at) at.style.animation = 'casosAtFade 0.8s ease 0.5s forwards';

    await esperar(400);
  }

  // ESPERA A ENTRADA TERMINAR, DEPOIS ATIVA O ZOOM SEQUENCIAL
  await esperar(800);

  for (let i = 0; i < 4; i++) {
    const card = document.getElementById('cc' + i);
    if (card) {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      card.style.animation = 'casosZoom 10s ease-in-out ' + (i * 2.5) + 's infinite';
    }
  }
}


/* =========================================
   SEÇÃO 8 — PARCERIAS COM MARCAS / PROFISSIONAIS
   ========================================= */
let parceriasFez = false;
let parcAtivo = 0;
let parcAutoTimer = null;
let parcCarroIdx = 0;
let parcCarroTimer = null;
const PARC_INTERVALO = 4500;
const PARC_TOTAL = 2;

function ativarParceriasStrokeFill() {
  const el = document.querySelector('.parcerias-titulo-outline');
  if (!el) return;
  el.style.animation = 'none';
  el.style.color = 'transparent';
  void el.offsetWidth;
  el.style.animation = `parceriasStrokeFill 1.2s ease 0.3s forwards`;
}

/* MONTA AS LETRAS NO STAGGER */
function montarLetrasParceria(slide) {
  const alvos = slide.querySelectorAll('.parc-nome, .parc-empresa');
  alvos.forEach((el, idxTexto) => {
    const texto = el.getAttribute('data-texto') || '';
    el.innerHTML = '';
    const delayBase = idxTexto * 0.18;
    [...texto].forEach((c, k) => {
      if (c === ' ') {
        const esp = document.createElement('span');
        esp.className = 'parc-letra-espaco';
        el.appendChild(esp);
        return;
      }
      const sp = document.createElement('span');
      sp.className = 'parc-letra';
      sp.textContent = c;
      sp.style.animationDelay = (delayBase + k * 0.035) + 's';
      el.appendChild(sp);
    });
  });
}

/* TROCA PARA UM ÍNDICE */
function irParaParceria(novoIdx) {
  if (novoIdx === parcAtivo) return;
  const slides = document.querySelectorAll('.parc-slide');
  const dots = document.querySelectorAll('.parc-dot');
  const direcao = novoIdx > parcAtivo ? 1 : -1;

  const slideAntigo = slides[parcAtivo];
  const slideNovo = slides[novoIdx];

  /* PREPARA O NOVO SLIDE FORA DA TELA NO LADO CERTO */
  slideNovo.style.transition = 'none';
  slideNovo.classList.remove('parc-slide-ativo', 'parc-slide-direita', 'parc-slide-esquerda');
  slideNovo.classList.add(direcao === 1 ? 'parc-slide-direita' : 'parc-slide-esquerda');
  void slideNovo.offsetWidth;

  /* ANIMA */
  slideNovo.style.transition = '';
  slideAntigo.classList.remove('parc-slide-ativo');
  slideAntigo.classList.add(direcao === 1 ? 'parc-slide-esquerda' : 'parc-slide-direita');
  slideNovo.classList.remove('parc-slide-direita', 'parc-slide-esquerda');
  slideNovo.classList.add('parc-slide-ativo');

  /* RE-RODA O STAGGER NO SLIDE NOVO */
  montarLetrasParceria(slideNovo);

  /* DOTS + CONTADOR */
  dots.forEach((d, i) => d.classList.toggle('ativo', i === novoIdx));
  const num = document.getElementById('parcAtualNum');
  if (num) num.textContent = String(novoIdx + 1).padStart(2, '0');

  parcAtivo = novoIdx;

  /* REINICIA O AUTO-PLAY SEMPRE QUE O USUÁRIO INTERAGE */
  reiniciarAutoplayParcerias();
}

function iniciarAutoplayParcerias() {
  parcAutoTimer = setInterval(() => {
    const proximo = (parcAtivo + 1) % PARC_TOTAL;
    irParaParceria(proximo);
  }, PARC_INTERVALO);
}

function reiniciarAutoplayParcerias() {
  clearInterval(parcAutoTimer);
  iniciarAutoplayParcerias();
}

/* CARROSSEL DO TÍTULO — MARCAS / PROFISSIONAIS */
function rodarCarrosselParcerias() {
  const itens = document.querySelectorAll('.parcerias-carrossel-item');
  if (itens.length < 2) return;

  parcCarroTimer = setInterval(() => {
    const atual = itens[parcCarroIdx];
    atual.classList.remove('ativo');
    atual.classList.add('saindo');

    parcCarroIdx = (parcCarroIdx + 1) % itens.length;
    const proximo = itens[parcCarroIdx];

    proximo.classList.remove('saindo');
    proximo.classList.add('ativo');

    setTimeout(() => atual.classList.remove('saindo'), 600);
  }, 2800);
}

async function ativarParcerias() {
  if (parceriasFez) return;
  parceriasFez = true;

  const slides = document.querySelectorAll('.parc-slide');
  slides.forEach((s, i) => {
    s.classList.remove('parc-slide-ativo', 'parc-slide-direita', 'parc-slide-esquerda');
    s.classList.add(i === 0 ? 'parc-slide-ativo' : 'parc-slide-direita');
  });

  await esperar(600);

  /* DISPARA STAGGER NO PRIMEIRO */
  montarLetrasParceria(slides[0]);

  /* COMEÇA CARROSSEL DO TÍTULO E AUTO-PLAY DOS SLIDES */
  await esperar(2200);
  rodarCarrosselParcerias();
  iniciarAutoplayParcerias();
}


/* =========================================
   SEÇÃO 9 — DEPOIMENTOS
   ========================================= */
let depoimentosFez = false;

function ativarDepoimentosStrokeFill() {
  const els = document.querySelectorAll('.dep-titulo-outline, .dep-titulo-fill');
  els.forEach((el, i) => {
    el.style.animation = 'none';
    el.style.color = 'transparent';
    void el.offsetWidth;
    el.style.animation = `depStrokeFill 1.2s ease ${0.3 + i * 0.2}s forwards`;
  });
}

async function ativarDepoimentos() {
  if (depoimentosFez) return;
  depoimentosFez = true;

  document.querySelectorAll('.dep-faixa').forEach(faixa => {
    const inner = faixa.querySelector('.dep-faixa-inner');
    inner.innerHTML += inner.innerHTML;
    inner.classList.add(`dep-${faixa.dataset.direcao}`);
  });
}


/* =========================================
   SEÇÃO 10 — PACOTES
   ========================================= */
let pacAtivo = 0;

function ativarPacotesStrokeFill() {
  const els = document.querySelectorAll('.pac-titulo-outline, .pac-titulo-fill');
  els.forEach((el, i) => {
    el.style.animation = 'none';
    el.style.color = 'transparent';
    void el.offsetWidth;
    el.style.animation = `pacStrokeFill 1.2s ease ${0.3 + i * 0.2}s forwards`;
  });
}

function irParaPacote(idx) {
  if (idx === pacAtivo) return;
  document.getElementById('pac' + pacAtivo).classList.remove('ativo');
  document.getElementById('pac' + idx).classList.add('ativo');
  document.getElementById('pac' + idx).parentElement.scrollTop = 0;
  document.querySelectorAll('.pac-toggle-btn').forEach((b, i) => {
    b.classList.toggle('ativo', i === idx);
  });
  pacAtivo = idx;
}

/* CARD FLUTUANTE — WHATS */
(function () {
  const inner = document.getElementById('pacFloatInner');
  if (!inner) return;

  let virado = false;

  function virar() {
    virado = !virado;
    inner.classList.toggle('virado', virado);
  }

  setInterval(virar, 5000);
})();