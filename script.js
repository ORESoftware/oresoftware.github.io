const featuredRepositories = [
  {
    name: 'live-mutex',
    description: 'Event-driven mutexes and semaphores for coordinating Node.js processes over TCP or Unix domain sockets without polling.',
    tags: ['TypeScript', 'Concurrency', 'IPC'],
    url: 'https://github.com/ORESoftware/live-mutex'
  },
  {
    name: 'SumanJS',
    description: 'A Node.js test runner focused on parallel execution, process isolation, extensible reporting, and practical command-line workflows.',
    tags: ['JavaScript', 'Testing', 'Tooling'],
    url: 'https://github.com/sumanjs/suman'
  },
  {
    name: 'flags-2-env',
    description: 'Define command-line flags once, then expose consistent environment overrides to applications written in different languages.',
    tags: ['CLI', 'Configuration', 'Polyglot'],
    url: 'https://github.com/ORESoftware/flags-2-env'
  },
  {
    name: 'r2g',
    description: 'Validate packages as real downstream dependencies before release with repeatable tests in realistic consumer environments.',
    tags: ['Release QA', 'Node.js', 'Automation'],
    url: 'https://github.com/ORESoftware/r2g'
  }
];

const coreProjects = [
  {
    name: 'fiducia-cloud',
    label: 'Distributed systems',
    description: 'Coordination primitives for locks, leases, consensus-aware scheduling, and resilient cron execution.',
    tags: ['Consensus', 'Coordination', 'Cloud'],
    url: 'https://github.com/fiducia-cloud',
    group: 'Systems & developer tools'
  },
  {
    name: 'cliptown',
    label: 'Productivity / sync',
    description: 'Cross-device clipboard history, pinned snippets, and secure synchronization across desktop, mobile, and web.',
    tags: ['Clipboard', 'Flutter', 'Sync'],
    url: 'https://github.com/cliptown',
    group: 'Products & platforms'
  },
  {
    name: 'sonus-auris',
    label: 'Audio / security',
    description: 'Privacy-first continuous audio capture with encrypted storage, searchable review, and multi-platform clients.',
    tags: ['Audio', 'Encryption', 'Flutter + Rust'],
    url: 'https://github.com/sonus-auris',
    group: 'Products & platforms'
  },
  {
    name: 'memebank',
    label: 'Media / search',
    description: 'A searchable media library using OCR, embeddings, and pluggable storage for memes, screenshots, and visual references.',
    tags: ['Vision', 'Search', 'Storage'],
    url: 'https://github.com/memebank',
    group: 'Products & platforms'
  },
  {
    name: 'daedalus-fab',
    label: 'Manufacturing / planning',
    description: 'Fabrication planning for additive, subtractive, and hybrid manufacturing, from intent to validated machine instructions.',
    tags: ['Fabrication', 'Planning', 'Rust'],
    url: 'https://github.com/daedalus-fab',
    group: 'Simulation & hardware'
  },
  {
    name: 'quaestor-ledger',
    label: 'Billing / ledger',
    description: 'Shared billing and ledger infrastructure for metering, subscriptions, invoices, and financial events.',
    tags: ['Billing', 'Ledger', 'Platform'],
    url: 'https://github.com/quaestor-ledger',
    group: 'Products & platforms'
  },
  {
    name: 'scintilla-run',
    label: 'Runtime / serverless',
    description: 'A BEAM-powered lambda runtime with warm processes, multiple language runtimes, and durable workflows.',
    tags: ['BEAM', 'Serverless', 'Workflows'],
    url: 'https://github.com/scintilla-run',
    group: 'Systems & developer tools'
  },
  {
    name: '3FA-app',
    label: 'Identity / security',
    description: 'Multi-device authentication and secure messaging built around Signal-style keys, offline workers, and shared identity.',
    tags: ['Identity', 'Signal protocol', 'Flutter'],
    url: 'https://github.com/3FA-app',
    group: 'Products & platforms'
  },
  {
    name: 'zed-pkg',
    label: 'Developer tooling',
    description: 'A source-first package manager for polyglot repositories, recursive dependency graphs, and Git interoperability.',
    tags: ['Packages', 'Polyglot', 'Git'],
    url: 'https://github.com/zed-pkg',
    group: 'Systems & developer tools'
  },
  {
    name: 'akrion-sim',
    label: 'Gaming / simulation',
    description: 'A research-grade football simulation combining multi-agent control, reinforcement learning, MPC, and self-play.',
    tags: ['Gaming', 'Simulation', 'Optimal control'],
    url: 'https://github.com/akrion-sim',
    group: 'Simulation & hardware'
  },
  {
    name: 'declarative-migrations',
    label: 'Data / migrations',
    description: 'Declarative, ORM-agnostic PostgreSQL migrations that diff real catalogs, emit reviewable SQL, and prove convergence.',
    tags: ['PostgreSQL', 'Rust', 'Migrations'],
    url: 'https://github.com/declarative-migrations',
    group: 'Systems & developer tools'
  },
  {
    name: 'discrete-event-systems',
    label: 'Simulation / optimization',
    description: 'Open simulation engines and browser labs for queues, factories, elevators, tactics, and event-driven decisions.',
    tags: ['Simulation', 'Optimization', 'Rust'],
    url: 'https://github.com/discrete-event-systems',
    group: 'Simulation & hardware'
  },
  {
    name: 'drone-mngr',
    label: 'Robotics / control',
    description: 'Control-plane, web, embedded, and MCP components for managing drones and connected pointing hardware.',
    tags: ['Robotics', 'Embedded', 'Control'],
    url: 'https://github.com/drone-mngr',
    group: 'Simulation & hardware'
  },
  {
    name: 'embedded-alerts',
    label: 'Embedded / alerts',
    description: 'Reusable alert surfaces, notification components, and delivery workflows for connected applications and devices.',
    tags: ['Alerts', 'Embedded', 'Components'],
    url: 'https://github.com/embedded-alerts',
    group: 'Products & platforms'
  },
  {
    name: 'fanwaave',
    label: 'Social / marketing',
    description: 'Tools for fan communities, creator engagement, campaign activation, and audience-facing digital experiences.',
    tags: ['Community', 'Marketing', 'Creators'],
    url: 'https://github.com/fanwaave',
    group: 'Products & platforms'
  },
  {
    name: 'evento-globolo',
    label: 'Events / community',
    description: 'Global event discovery and management across communities, organizers, venues, and attendee networks.',
    tags: ['Events', 'Discovery', 'Community'],
    url: 'https://github.com/evento-globolo',
    group: 'Products & platforms'
  },
  {
    name: 'hypesiege',
    label: 'Social / marketing',
    description: 'A social-publishing workspace for scheduling content, coordinating campaigns, and managing multiple channels.',
    tags: ['Social', 'Marketing', 'Scheduling'],
    url: 'https://github.com/hypesiege',
    group: 'Products & platforms'
  },
  {
    name: 'streempilot',
    label: 'Streaming / production',
    description: 'A browser-first live-production and multistreaming studio with WebRTC workflows for creators and teams.',
    tags: ['WebRTC', 'Streaming', 'Browser'],
    url: 'https://github.com/StreemPilot',
    group: 'Products & platforms'
  },
  {
    name: 'file-tunnel',
    label: 'Networking / security',
    description: 'Secure file movement through explicit tunnels, reusable clients, and infrastructure for controlled transfers.',
    tags: ['Networking', 'File transfer', 'Security'],
    url: 'https://github.com/file-tunnel',
    group: 'Systems & developer tools'
  },
  {
    name: 'opto-sync',
    label: 'Data / sync',
    description: 'Offline-first synchronization primitives spanning IndexedDB, SQLite, PostgreSQL, Supabase, and background clients.',
    tags: ['Sync', 'Offline-first', 'Data'],
    url: 'https://github.com/opto-sync',
    group: 'Systems & developer tools'
  },
  {
    name: 'sagitta-stack',
    label: 'Full stack / runtime',
    description: 'One coherent path through server rendering, web, mobile, and isolate-per-connection application systems.',
    tags: ['Dart', 'Flutter', 'Full stack'],
    url: 'https://github.com/sagitta-stack',
    group: 'Systems & developer tools'
  }
];

const projectGroups = [
  'Systems & developer tools',
  'Products & platforms',
  'Simulation & hardware'
];

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
}[character]));

const featuredGrid = document.querySelector('#featured-grid');
const projectGrid = document.querySelector('#project-grid');
const megaMenu = document.querySelector('#mega-menu');
const projectMenu = document.querySelector('#project-menu');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');
const filter = document.querySelector('#project-filter');
const noResults = document.querySelector('#no-results');

if (featuredGrid) {
  featuredGrid.innerHTML = featuredRepositories.map((repository) => `
    <article class="card">
      <p class="card-label">Popular repository</p>
      <h3><a href="${repository.url}">${escapeHtml(repository.name)}</a></h3>
      <p class="card-description">${escapeHtml(repository.description)}</p>
      <div class="tag-list" aria-label="${escapeHtml(repository.name)} technologies">${repository.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      <a class="card-link" href="${repository.url}">View repository <span aria-hidden="true">↗</span></a>
    </article>
  `).join('');
}

if (projectGrid) {
  projectGrid.innerHTML = coreProjects.map((project) => {
    const search = [project.name, project.label, project.description, ...project.tags].join(' ').toLowerCase();
    return `
      <article class="card project-card" data-search="${escapeHtml(search)}">
        <p class="card-label">${escapeHtml(project.label)}</p>
        <h3><a href="${project.url}">${escapeHtml(project.name)}</a></h3>
        <p class="card-description">${escapeHtml(project.description)}</p>
        <div class="tag-list" aria-label="${escapeHtml(project.name)} technologies">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
        <a class="card-link" href="${project.url}">Explore project <span aria-hidden="true">↗</span></a>
      </article>
    `;
  }).join('');
}

if (megaMenu) {
  megaMenu.innerHTML = projectGroups.map((group) => `
    <div class="mega-group">
      <h2>${escapeHtml(group)}</h2>
      ${coreProjects.filter((project) => project.group === group).map((project) => `<a href="${project.url}">${escapeHtml(project.name)}</a>`).join('')}
    </div>
  `).join('');
}

navToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open') ?? false;
  navToggle.setAttribute('aria-expanded', String(open));
});

nav?.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a') && window.matchMedia('(max-width: 980px)').matches) {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

filter?.addEventListener('input', () => {
  const term = filter instanceof HTMLInputElement ? filter.value.trim().toLowerCase() : '';
  let hasMatches = false;

  document.querySelectorAll('.project-card').forEach((card) => {
    if (!(card instanceof HTMLElement)) return;
    const matches = !term || (card.dataset.search ?? '').includes(term);
    card.hidden = !matches;
    hasMatches ||= matches;
  });

  if (noResults instanceof HTMLElement) noResults.hidden = hasMatches;
});

document.addEventListener('click', (event) => {
  if (projectMenu instanceof HTMLDetailsElement && projectMenu.open && !projectMenu.contains(event.target instanceof Node ? event.target : null)) {
    projectMenu.open = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (projectMenu instanceof HTMLDetailsElement) projectMenu.open = false;
  nav?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
});

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
