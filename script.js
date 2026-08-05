const projects = [
  {name:'fiducia-cloud',kind:'Coordination',group:'Systems & tooling',description:'Distributed coordination primitives for locks, leases, consensus-aware scheduling, and resilient cron execution.',tags:['Distributed','Consensus','Cloud'],url:'https://github.com/fiducia-cloud'},
  {name:'cliptown',kind:'Productivity',group:'Product studios',description:'Cross-device clipboard history, pinned snippets, and secure sync across desktop, mobile, and web.',tags:['Clipboard','Flutter','Sync'],url:'https://github.com/cliptown'},
  {name:'sonus-auris',kind:'Audio',group:'Product studios',description:'Privacy-first, always-on audio capture with encrypted storage, searchable review, and multi-platform clients.',tags:['Audio','E2EE','Flutter + Rust'],url:'https://github.com/sonus-auris'},
  {name:'memebank',kind:'Media',group:'Product studios',description:'A searchable personal media library using OCR, embeddings, and pluggable cloud storage for memes and screenshots.',tags:['Vision','Search','Storage'],url:'https://github.com/memebank'},
  {name:'daedalus-fab',kind:'Manufacturing',group:'Product studios',description:'Fabrication planning for additive, subtractive, and hybrid manufacturing—from a goal to validated machine instructions.',tags:['Fabrication','Planning','Rust'],url:'https://github.com/daedalus-fab'},
  {name:'quaestor-ledger',kind:'Fintech',group:'Product studios',description:'Shared billing and ledger infrastructure for metering, subscriptions, invoices, and financial events across products.',tags:['Billing','Ledger','Platform'],url:'https://github.com/quaestor-ledger'},
  {name:'scintilla-run',kind:'Runtime',group:'Systems & tooling',description:'A BEAM-powered lambda runtime with warm processes, multiple language runtimes, and durable workflows.',tags:['BEAM','Serverless','Workflows'],url:'https://github.com/scintilla-run'},
  {name:'3FA-app',kind:'Security',group:'Product studios',description:'Multi-device authentication and secure messaging built around Signal-style keys, offline workers, and shared identity.',tags:['Security','Signal protocol','Flutter'],url:'https://github.com/3FA-app'},
  {name:'zed-pkg',kind:'Developer tooling',group:'Systems & tooling',description:'A source-first package manager for polyglot repositories, recursive dependency graphs, and Git-submodule interoperability.',tags:['Packages','Polyglot','Git'],url:'https://github.com/zed-pkg'},
  {name:'akrion-sim',kind:'Simulation',group:'Product studios',description:'A research-grade football simulation combining multi-agent control, reinforcement learning, MPC, and self-play.',tags:['Simulation','RL','Optimal control'],url:'https://github.com/akrion-sim'},
  {name:'declarative-migrations',kind:'Data',group:'Systems & tooling',description:'Declarative, ORM-agnostic PostgreSQL migration: diff real catalogs, emit reviewable SQL, and prove convergence.',tags:['PostgreSQL','Rust','Migrations'],url:'https://github.com/declarative-migrations'},
  {name:'discrete-event-systems',kind:'Simulation',group:'Systems & tooling',description:'Open simulation engines and browser labs for queues, factories, elevators, tactics, and event-driven decisions.',tags:['Simulation','Optimization','Rust'],url:'https://github.com/discrete-event-systems'},
  {name:'drone-mngr',kind:'Robotics',group:'Media & emerging',description:'Control-plane, web, embedded, and MCP components for managing drones and connected pointing hardware.',tags:['Robotics','Embedded','Control'],url:'https://github.com/drone-mngr'},
  {name:'embedded-alerts',kind:'Incubating',group:'Media & emerging',description:'An emerging toolkit for embedding product alerts, notification surfaces, and delivery workflows into applications.',tags:['Alerts','Components','Platform'],url:'https://github.com/embedded-alerts'},
  {name:'fanwaave',kind:'Incubating',group:'Media & emerging',description:'An emerging platform for fan communities, creator engagement, and audience-facing digital experiences.',tags:['Community','Creators','Early-stage'],url:'https://github.com/fanwaave'},
  {name:'evento-globolo',kind:'Incubating',group:'Media & emerging',description:'An emerging event-discovery and coordination platform for organizing experiences across places and communities.',tags:['Events','Discovery','Early-stage'],url:'https://github.com/evento-globolo'},
  {name:'hypesiege',kind:'Social',group:'Media & emerging',description:'A social-publishing workspace for scheduling posts, coordinating campaigns, and managing multiple channels.',tags:['Social','Scheduling','Campaigns'],url:'https://github.com/hypesiege'},
  {name:'streempilot',kind:'Streaming',group:'Media & emerging',description:'A browser-first live production and multistreaming studio with WebRTC workflows for creators and teams.',tags:['WebRTC','Streaming','Browser'],url:'https://github.com/StreemPilot'},
  {name:'file-tunnel',kind:'Networking',group:'Media & emerging',description:'Secure file movement through explicit tunnels, with reusable clients and infrastructure for controlled transfers.',tags:['Networking','File transfer','Security'],url:'https://github.com/file-tunnel'},
  {name:'opto-sync',kind:'Data',group:'Systems & tooling',description:'Offline-first synchronization primitives spanning IndexedDB, SQLite, PostgreSQL, Supabase, and background clients.',tags:['Sync','Offline-first','Data'],url:'https://github.com/opto-sync'},
  {name:'sagitta-stack',kind:'Full stack',group:'Systems & tooling',description:'One straight line through the stack: Dart on the server, SSR, web, mobile, and isolate-per-connection systems.',tags:['Dart','Flutter','Full stack'],url:'https://github.com/sagitta-stack'}
];

const orgGrid = document.querySelector('#org-grid');
const megaMenu = document.querySelector('#mega-menu');
const filter = document.querySelector('#project-filter');
const count = document.querySelector('#project-count');
const noResults = document.querySelector('#no-results');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');
const projectMenu = document.querySelector('#project-menu');

const escapeHtml = value => value.replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));

const renderCards = () => {
  orgGrid.innerHTML = projects.map((project,index) => {
    const search = [project.name,project.kind,project.description,...project.tags].join(' ').toLowerCase();
    return `<article class="project-card org-card" data-search="${escapeHtml(search)}">
      <div class="card-meta"><span>${escapeHtml(project.kind)}</span><b>${String(index + 1).padStart(2,'0')}</b></div>
      <h3><a href="${project.url}">${escapeHtml(project.name)}</a></h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="tag-list">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      <a class="card-link" href="${project.url}">Explore organization <span aria-hidden="true">↗</span></a>
    </article>`;
  }).join('');
};

const renderMenu = () => {
  const groups = ['Systems & tooling','Product studios','Media & emerging'];
  megaMenu.innerHTML = groups.map(group => `<div class="mega-group"><h2>${group}</h2>${projects.filter(project => project.group === group).map(project => `<a href="${project.url}">${escapeHtml(project.name)}</a>`).join('')}</div>`).join('');
};

const updateFilter = () => {
  const term = filter.value.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll('.org-card').forEach(card => {
    const matches = !term || card.dataset.search.includes(term);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  count.textContent = String(visible);
  noResults.hidden = visible !== 0;
};

renderCards();
renderMenu();
filter.addEventListener('input',updateFilter);

navToggle.addEventListener('click',() => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded',String(open));
});

nav.addEventListener('click',event => {
  if (event.target.closest('a') && window.matchMedia('(max-width: 980px)').matches) {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded','false');
  }
});

document.addEventListener('click',event => {
  if (projectMenu.open && !projectMenu.contains(event.target)) projectMenu.open = false;
});

document.addEventListener('keydown',event => {
  if (event.key === 'Escape') {
    projectMenu.open = false;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded','false');
  }
});

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
