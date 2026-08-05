(() => {
  const descriptions = {
    'live-mutex': 'An event-driven mutex and semaphore broker for coordinating Node.js processes over TCP or Unix domain sockets—without polling.',
    'flags-2-env': 'Describe command-line flags once, then map them into environment overrides through a small, portable native core.',
    'scintilla-run': 'A BEAM-powered lambda runtime with warm processes, multiple language runtimes, and durable workflows.',
    'akrion-sim': 'A research-grade football simulation combining multi-agent control, reinforcement learning, MPC, and self-play.',
    'declarative-migrations': 'Declarative PostgreSQL migration tooling that diffs real catalogs, emits reviewable SQL, and verifies convergence.',
    'discrete-event-systems': 'Simulation engines and browser labs for queues, factories, elevators, tactics, and event-driven decisions.',
    'embedded-alerts': 'An emerging toolkit for embedding product alerts, notification surfaces, and delivery workflows into applications.',
    'fanwaave': 'An emerging platform for fan communities, creator engagement, and audience-facing digital experiences.',
    'evento-globolo': 'An event-discovery and coordination platform for organizing experiences across places and communities.',
    'sagitta-stack': 'A full-stack platform connecting Dart services, SSR, web, mobile, and isolate-per-connection systems.'
  };

  const ecosystem = document.getElementById('ecosystem-grid');
  const input = document.getElementById('project-filter');
  const count = document.getElementById('project-count');
  const noResults = document.getElementById('no-results');

  document.querySelectorAll('.project-card').forEach(card => {
    const name = card.querySelector('h3')?.textContent?.trim().toLowerCase();
    const copy = card.querySelector('p');
    if (name && descriptions[name] && copy) copy.textContent = descriptions[name];
  });

  if (ecosystem && input && count && noResults) {
    const cards = [...ecosystem.querySelectorAll('.project-card')];
    cards.forEach(card => { card.dataset.search = card.textContent.toLowerCase(); });
    const update = () => {
      const term = input.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const matches = !term || card.dataset.search.includes(term);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      count.textContent = String(visible);
      noResults.hidden = visible !== 0;
    };
    input.addEventListener('input', update);
    update();
  }

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
