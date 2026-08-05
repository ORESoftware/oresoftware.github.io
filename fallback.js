const data = await fetch('/src/data/projects.json').then((response) => {
  if (!response.ok) throw new Error(`Unable to load project data: ${response.status}`);
  return response.json();
});

const initials = (name) => name.split('-').slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');

const renderCard = (project) => {
  const card = document.createElement('a');
  card.className = 'project-card';
  card.href = project.href;
  card.target = '_blank';
  card.rel = 'noreferrer';
  card.dataset.search = [project.name, project.kind, project.description, ...project.tags].join(' ').toLowerCase();

  const top = document.createElement('div');
  top.className = 'project-card__topline';
  const mark = document.createElement('span');
  mark.className = 'project-card__mark';
  mark.setAttribute('aria-hidden', 'true');
  mark.textContent = initials(project.name);
  const kind = document.createElement('span');
  kind.className = 'project-card__kind';
  kind.textContent = project.kind;
  const arrow = document.createElement('span');
  arrow.className = 'project-card__arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  top.append(mark, kind, arrow);

  const title = document.createElement('h3');
  title.textContent = project.name;
  const description = document.createElement('p');
  description.textContent = project.description;
  const tags = document.createElement('ul');
  tags.className = 'tag-list';
  tags.setAttribute('aria-label', `${project.name} topics`);
  for (const tag of project.tags) {
    const item = document.createElement('li');
    item.textContent = tag;
    tags.append(item);
  }

  card.append(top, title, description, tags);
  return card;
};

const renderMenuLink = (project) => {
  const link = document.createElement('a');
  link.href = project.href;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.append(project.name);
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  link.append(arrow);
  return link;
};

const featuredGrid = document.querySelector('#featured-grid');
const organizationGrid = document.querySelector('#organization-grid');
const repositoryMenu = document.querySelector('#repo-menu');
const organizationMenu = document.querySelector('#org-menu');

featuredGrid?.append(...data.featuredRepositories.map(renderCard));
const organizationCards = data.organizations.map(renderCard);
organizationGrid?.append(...organizationCards);
repositoryMenu?.append(...data.featuredRepositories.map(renderMenuLink));
organizationMenu?.append(...data.organizations.slice(0, 10).map(renderMenuLink));

const filter = document.querySelector('#project-filter');
const noResults = document.querySelector('#no-results');
filter?.addEventListener('input', () => {
  const query = filter.value.trim().toLowerCase();
  let hasMatches = false;
  for (const card of organizationCards) {
    const matches = !query || card.dataset.search.includes(query);
    card.hidden = !matches;
    hasMatches ||= matches;
  }
  if (noResults) noResults.hidden = hasMatches;
});

const viewAll = document.createElement('a');
viewAll.className = 'nav-menu__all';
viewAll.href = '#organizations';
viewAll.innerHTML = 'View all core projects <span aria-hidden="true">↓</span>';
organizationMenu?.append(viewAll);
