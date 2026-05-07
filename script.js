/* ── script.js  –  My Hobbies ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════
     1. BG PARTICLES
  ══════════════════ */
  const pContainer = document.getElementById('particles');
  const COLORS = ['#818cf8','#34d399','#f472b6','#fb923c','#38bdf8'];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const size = Math.random() * 10 + 3;
    el.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      background:${COLORS[i % COLORS.length]};
      --dur:${Math.random()*14+8}s;
      --del:${Math.random()*10}s;
    `;
    pContainer.appendChild(el);
  }

  /* ══════════════════
     2. SCROLL REVEAL  (cards appear as they enter viewport)
  ══════════════════ */
  const cards = document.querySelectorAll('.hobby-card');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card  = entry.target;
        const delay = parseInt(card.dataset.delay || 0, 10);
        setTimeout(() => card.classList.add('visible'), delay);
        io.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(c => io.observe(c));

  /* ══════════════════
     3. CARD TILT on mouse move
  ══════════════════ */
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);   // -1..1
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform =
        `translateY(-10px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ══════════════════
     4. HOBBY QUIZ
  ══════════════════ */
  const quizData = [
    {
      clue : '🎵 I make sounds with strings and keys…',
      answer: 'Music',
      opts  : ['Music', 'Travel', 'Reading'],
      fb_ok : '✅ Correct! Guitars, pianos and drums!',
      fb_bad: '❌ Nope — think instruments!'
    },
    {
      clue : '✈️ I explore cultures, food, and history around the world…',
      answer: 'Travel',
      opts  : ['Reading', 'Travel', 'Music'],
      fb_ok : '✅ Spot on! The world is a big classroom.',
      fb_bad: '❌ Not quite — think suitcases!'
    },
    {
      clue : '📖 "Dragon Pearl" is one of my current favourites…',
      answer: 'Reading',
      opts  : ['Travel', 'Music', 'Reading'],
      fb_ok : '✅ Yes! A great sci-fi book.',
      fb_bad: '❌ Wrong — open a book!'
    },
    {
      clue : '🥁 I want to start a band with my friends one day!',
      answer: 'Music',
      opts  : ['Reading', 'Travel', 'Music'],
      fb_ok : '✅ Rock on! 🎸',
      fb_bad: '❌ Close — think stage lights!'
    }
  ];

  let qi = 0;   // current question index

  const clueEl   = document.getElementById('quizClue');
  const optsEl   = document.getElementById('quizOpts');
  const fbEl     = document.getElementById('quizFb');

  function loadQ (idx) {
    const q = quizData[idx];
    clueEl.textContent = q.clue;
    fbEl.textContent   = '';
    fbEl.className     = 'quiz-fb';
    optsEl.innerHTML   = '';

    q.opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className    = 'quiz-opt';
      btn.textContent  = opt;
      btn.id           = `qOpt_${opt}`;
      btn.addEventListener('click', () => checkAnswer(opt, q, btn));
      optsEl.appendChild(btn);
    });
  }

  function checkAnswer (selected, q, btn) {
    const allBtns = optsEl.querySelectorAll('.quiz-opt');
    allBtns.forEach(b => b.classList.add('disabled'));

    if (selected === q.answer) {
      btn.classList.add('correct');
      fbEl.textContent = q.fb_ok;
      fbEl.className   = 'quiz-fb ok';
    } else {
      btn.classList.add('wrong');
      // highlight correct
      allBtns.forEach(b => { if (b.textContent === q.answer) b.classList.add('correct'); });
      fbEl.textContent = q.fb_bad;
      fbEl.className   = 'quiz-fb bad';
    }

    // auto-advance
    setTimeout(() => {
      qi = (qi + 1) % quizData.length;
      loadQ(qi);
    }, 2000);
  }

  loadQ(qi);

  /* ══════════════════
     5. EMOJI HOVER FX on instruments / flags
  ══════════════════ */
  document.querySelectorAll('.instrument, .country-flag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.animation = 'none';      // reset
      el.style.transform = 'scale(1.4) rotate(8deg)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

});
