/*
 * Projects experience.
 *
 * One implementation, reused by every project:
 *   ProjectSection -> ProjectCard -> ProjectCover
 *   CaseStudy      -> case-study blocks -> ProjectGallery -> Slider
 *
 * Data comes from `project-manifest.js` (copy) and
 * `project-assets.generated.js` (images, produced from the real folders).
 */
(() => {
  'use strict';

  const manifest = window.portfolioProjectManifest || { projects: [] };
  const projects = manifest.projects || [];

  const grid = document.getElementById('featured-projects-grid');
  const overlay = document.getElementById('featured-overlay');
  const overlayInner = document.getElementById('featured-overlay-inner');
  const overlayClose = document.getElementById('featured-close');
  const overlayTitle = document.getElementById('featured-overlay-title');

  const CLOSE_MS = 420;
  let lastTrigger = null;
  let openId = null;
  let closeTimer = null;

  /* ───────────────────────────── helpers ───────────────────────────── */

  const esc = value =>
    String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  /* Folder names contain spaces and parentheses — encode per segment. */
  const src = filePath => String(filePath).split('/').map(encodeURIComponent).join('/');

  const num = index => String(index + 1).padStart(2, '0');

  const html = (strings, ...values) => strings.reduce((out, part, i) => out + part + (values[i] ?? ''), '');

  /* Screens are described by their role, never by their file name. */
  const screenAlt = (project, index, total) =>
    `${project.title} interface screenshot ${index + 1} of ${total}`;

  /* ───────────────────────────── slider ───────────────────────────── */

  const ARROW_PREV = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
  const ARROW_NEXT = '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>';
  const DOT_LIMIT = 8;

  function Slider(project, images, key, orientation = 'landscape', aspect = null) {
    const total = images.length;
    if (!total) return '';
    const many = total > 1;
    const useDots = many && total <= DOT_LIMIT;

    const slides = images
      .map(
        (image, index) => html`
          <figure class="slider-slide">
            <img
              src="${src(image.src)}"
              alt="${esc(screenAlt(project, index, total))}"
              ${image.w ? `width="${image.w}" height="${image.h}"` : ''}
              loading="${index === 0 ? 'eager' : 'lazy'}"
              decoding="async"
              draggable="false"
            >
          </figure>`
      )
      .join('');

    const dots = useDots
      ? images
          .map(
            (_, index) =>
              `<button class="slider-dot${index === 0 ? ' is-active' : ''}" type="button" data-dot="${index}" aria-label="Go to screen ${index + 1}"></button>`
          )
          .join('')
      : '';

    return html`
      <div class="slider${many ? '' : ' is-single'}${orientation === 'portrait' ? ' is-portrait' : ''}" data-slider="${esc(key)}"${aspect ? ` style="--slide-aspect:${aspect}"` : ''}>
        <div class="slider-stage">
          <div class="slider-track" tabindex="0" role="group" aria-roledescription="carousel" aria-label="${esc(project.title)} screens">
            ${slides}
          </div>
          ${many
            ? html`
                <div class="slider-nav" aria-hidden="true">
                  <button class="slider-btn" type="button" data-prev aria-label="Previous screen">${ARROW_PREV}</button>
                  <button class="slider-btn" type="button" data-next aria-label="Next screen">${ARROW_NEXT}</button>
                </div>`
            : ''}
        </div>
        ${many
          ? html`
              <div class="slider-foot">
                ${useDots ? `<div class="slider-dots">${dots}</div>` : ''}
                <p class="slider-count" aria-live="polite"><span data-index>1</span> / ${total}</p>
              </div>`
          : ''}
      </div>`;
  }

  function initSlider(root) {
    const track = root.querySelector('.slider-track');
    const slides = Array.from(root.querySelectorAll('.slider-slide'));
    if (!track || slides.length <= 1) return;

    const dots = Array.from(root.querySelectorAll('.slider-dot'));
    const counter = root.querySelector('[data-index]');
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    let ticking = false;

    const indexOf = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    const clamp = value => Math.max(0, Math.min(slides.length - 1, value));

    function sync() {
      const index = clamp(indexOf());
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      if (counter) counter.textContent = String(index + 1);
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
    }

    function goTo(index, smooth = true) {
      track.scrollTo({ left: clamp(index) * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
    }

    track.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          sync();
        });
      },
      { passive: true }
    );

    prev?.addEventListener('click', () => goTo(indexOf() - 1));
    next?.addEventListener('click', () => goTo(indexOf() + 1));
    dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.dot))));

    track.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      goTo(indexOf() + (event.key === 'ArrowLeft' ? -1 : 1));
    });

    /* Mouse drag only — touch uses the native scroller so it stays smooth. */
    let dragging = false;
    let originX = 0;
    let originScroll = 0;
    let moved = 0;

    track.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragging = true;
      moved = 0;
      originX = event.clientX;
      originScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    });

    track.addEventListener('pointermove', event => {
      if (!dragging) return;
      const delta = event.clientX - originX;
      if (Math.abs(delta) > moved) moved = Math.abs(delta);
      if (moved > 4 && !track.hasPointerCapture(event.pointerId)) track.setPointerCapture(event.pointerId);
      track.scrollLeft = originScroll - delta;
    });

    const endDrag = event => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      if (event.pointerId !== undefined && track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
      if (moved > 4) goTo(indexOf());
    };

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);

    /* A drag should never be mistaken for a click into the lightbox. */
    track.addEventListener('click', event => {
      if (moved > 4) {
        event.stopPropagation();
        event.preventDefault();
        moved = 0;
      }
    }, true);

    window.addEventListener('resize', sync, { passive: true });
    sync();
  }

  /* ───────────────────────── project section ───────────────────────── */

  /* The project's own logo, on its own background colour. Never stretched or
     cropped — `object-fit: contain` keeps the artwork's proportions. */
  function ProjectCover(project) {
    const image = project.cover;
    if (!image) return '<div class="project-cover is-empty" aria-hidden="true"></div>';
    const isBrand = Boolean(project.brand) && image.src === project.brand.src;
    const isPortrait = Boolean(image.w && image.h) && image.h > image.w;
    /* A logo with no background of its own is an icon mark, not a lockup —
       it gets more breathing room so it reads at the same weight. */
    const isMark = isBrand && !image.plate;
    const plate = isBrand && image.plate ? ` style="--plate:${esc(image.plate)}"` : '';
    return html`
      <div class="project-cover${isBrand ? ' is-brand' : ''}${isMark ? ' is-plain' : ''}${isPortrait ? ' is-portrait' : ''}"${plate}>
        <img
          src="${src(image.src)}"
          alt="${esc(project.title)}${isBrand ? ' logo' : ' preview'}"
          ${image.w ? `width="${image.w}" height="${image.h}"` : ''}
          loading="lazy"
          decoding="async"
        >
      </div>`;
  }

  function ProjectCard(project, index) {
    const hasCase = Boolean(project.caseStudy);
    const tech = (project.tech || []).slice(0, 5);
    const shots = project.images?.length || 0;

    return html`
      <article class="project${project.emphasis ? ' is-lead' : ''}${hasCase ? '' : ' is-upcoming'}" style="--project-accent:${project.accent || 'rgba(20,184,166,.1)'}">
        <div class="project-media">${ProjectCover(project)}</div>
        <div class="project-copy">
          <div class="project-meta">
            <span class="project-num">${num(index)}</span>
            ${project.label ? `<span class="project-label tone-${esc(project.labelTone || 'default')}">${esc(project.label)}</span>` : ''}
            ${shots > 1 ? `<span class="project-shots">${shots} screens</span>` : ''}
          </div>
          <h3 class="project-title">${esc(project.title)}</h3>
          ${project.tagline ? `<p class="project-tagline">${esc(project.tagline)}</p>` : ''}
          <p class="project-intro">${esc(project.intro)}</p>
          ${tech.length ? `<ul class="project-tech">${tech.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}
          ${hasCase
            ? `<button class="project-action" type="button" data-open="${esc(project.id)}">View Case Study <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>`
            : `<span class="project-soon">${esc(project.status || 'Coming Soon')}</span>`}
        </div>
      </article>`;
  }

  function ProjectSection() {
    return projects.map((project, index) => ProjectCard(project, index)).join('');
  }

  /* ───────────────────────── case study blocks ───────────────────────── */

  const paragraphs = body => (Array.isArray(body) ? body : [body]).map(text => `<p>${esc(text)}</p>`).join('');

  const sectionTitle = title => (title ? `<h2 class="cs-sec-title">${esc(title)}</h2>` : '');

  const blockRenderers = {
    text: block => html`
      <section class="cs-sec">
        ${sectionTitle(block.title)}
        <div class="cs-text">${paragraphs(block.body)}</div>
      </section>`,

    problem: block => html`
      <section class="cs-sec">
        ${sectionTitle(block.title || 'Problem & Solution')}
        <div class="cs-highlight">
          <div class="cs-hl-box problem">
            <div class="cs-hl-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>The Problem</div>
            <p>${esc(block.problem)}</p>
          </div>
          <div class="cs-hl-box solution">
            <div class="cs-hl-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>The Solution</div>
            <p>${esc(block.solution)}</p>
          </div>
        </div>
      </section>`,

    features: block => html`
      <section class="cs-sec">
        ${sectionTitle(block.title)}
        <ul class="feat-grid">
          ${block.items.map(item => `<li class="feat"><span class="feat-dot"></span><span>${esc(item)}</span></li>`).join('')}
        </ul>
      </section>`,

    flow: block => html`
      <section class="cs-sec">
        ${sectionTitle(block.title)}
        ${block.intro ? `<p class="cs-text cs-text-lead">${esc(block.intro)}</p>` : ''}
        ${block.flows
          .map(
            flow => html`
              <div class="flow-group">
                ${flow.label ? `<p class="flow-label">${esc(flow.label)}</p>` : ''}
                <div class="flow">
                  ${flow.steps
                    .map(step => `<span class="flow-s">${esc(step)}</span>`)
                    .join('<span class="flow-a" aria-hidden="true">&rarr;</span>')}
                </div>
              </div>`
          )
          .join('')}
      </section>`,

    rules: block => html`
      <section class="cs-sec">
        ${sectionTitle(block.title)}
        ${block.intro ? `<p class="cs-text cs-text-lead">${esc(block.intro)}</p>` : ''}
        <div class="rules">
          ${block.items
            .map(
              item => html`
                <div class="rule">
                  <b>${esc(item.value)}</b>
                  <strong>${esc(item.title)}</strong>
                  <small>${esc(item.note)}</small>
                </div>`
            )
            .join('')}
        </div>
      </section>`,

    gallery: (block, project, index) => html`
      <section class="cs-sec cs-gallery">
        ${sectionTitle(block.title)}
        ${Slider(project, block.images, `${project.id}-${index}`, block.orientation, block.aspect)}
      </section>`,

    part: block => html`
      <div class="cs-part">
        <h2 class="cs-part-title">${esc(block.title)}</h2>
        ${block.intro ? `<p class="cs-part-intro">${esc(block.intro)}</p>` : ''}
      </div>`,

    divider: () => '<div class="cs-div"></div>'
  };

  const LINK_ICONS = {
    github:
      '<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    primary:
      '<svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
  };

  function CaseStudy(project) {
    const study = project.caseStudy;
    const blocks = (study.blocks || [])
      .map((block, index) => {
        const render = blockRenderers[block.type];
        return render ? render(block, project, index) : '';
      })
      .join('');

    const tech = (project.tech || []).length
      ? html`
          <section class="cs-sec">
            ${sectionTitle('Technologies')}
            <div class="tech-row">${project.tech.map(item => `<span class="tech"><i></i>${esc(item)}</span>`).join('')}</div>
          </section>`
      : '';

    const links = (study.links || []).length
      ? html`
          <section class="cs-sec">
            ${sectionTitle('Project Links')}
            <div class="cs-links">
              ${study.links
                .map(
                  link => html`
                    <a class="cs-link ${link.kind === 'primary' ? 'cs-link-p' : 'cs-link-s'}" href="${esc(link.url)}" target="_blank" rel="noopener">
                      ${LINK_ICONS[link.kind] || LINK_ICONS.primary}${esc(link.label)}
                    </a>`
                )
                .join('')}
            </div>
          </section>`
      : '';

    const index = projects.indexOf(project);

    return html`
      <article class="cs" style="--project-accent:${project.accent || 'rgba(20,184,166,.1)'}">
        <header class="cs-head">
          <div class="cs-head-meta">
            <span class="project-num">${num(index)}</span>
            ${project.label ? `<span class="project-label tone-${esc(project.labelTone || 'default')}">${esc(project.label)}</span>` : ''}
          </div>
          <h1 class="cs-title">${esc(project.title)}</h1>
          ${project.tagline ? `<p class="cs-tagline">${esc(project.tagline)}</p>` : ''}
          ${project.role ? `<p class="cs-role-badge">${esc(project.role)}</p>` : ''}
          <p class="cs-desc">${esc(study.summary || project.intro)}</p>
        </header>
        ${blocks}
        ${tech}
        ${links}
      </article>`;
  }

  /* ─────────────────────────── open / close ─────────────────────────── */

  function openCase(id, { fromHistory = false } = {}) {
    if (id === openId) return;
    const project = projects.find(item => item.id === id);
    if (!project || !project.caseStudy || !overlay) return;

    /* Reopening during the closing animation must not be wiped by its timer. */
    clearTimeout(closeTimer);
    closeTimer = null;

    overlayInner.innerHTML = CaseStudy(project);
    if (overlayTitle) overlayTitle.textContent = project.title;
    overlayInner.querySelectorAll('[data-slider]').forEach(initSlider);

    overlay.classList.remove('is-closing');
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.scrollTop = 0;
    /* Images settling can otherwise let scroll anchoring restore the previous
       case study's offset — reset again once layout has run. */
    requestAnimationFrame(() => {
      if (openId === id) overlay.scrollTop = 0;
    });
    document.body.classList.add('is-locked');
    openId = id;
    overlayClose?.focus({ preventScroll: true });

    if (!fromHistory) {
      try {
        history.pushState({ caseStudy: id }, '', `#case-${id}`);
      } catch (error) {
        /* file:// or blocked history — the overlay still works. */
      }
    }
  }

  function closeCase({ fromHistory = false } = {}) {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.add('is-closing');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    openId = null;

    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      closeTimer = null;
      overlay.classList.remove('is-open', 'is-closing');
      overlayInner.innerHTML = '';
    }, CLOSE_MS);

    lastTrigger?.focus({ preventScroll: true });
    lastTrigger = null;

    if (!fromHistory && location.hash.startsWith('#case-')) {
      try {
        history.back();
      } catch (error) {
        /* ignore */
      }
    }
  }

  /* ───────────────────────────── lightbox ───────────────────────────── */

  function openLightbox(image) {
    const box = document.getElementById('lb');
    const target = document.getElementById('lb-img');
    if (!box || !target) return;
    target.src = image.currentSrc || image.src;
    target.alt = image.alt || '';
    box.classList.add('active');
  }

  /* ─────────────────────────────── init ─────────────────────────────── */

  function init() {
    if (!grid) return;
    grid.innerHTML = ProjectSection();

    grid.addEventListener('click', event => {
      const button = event.target.closest('[data-open]');
      if (!button) return;
      lastTrigger = button;
      openCase(button.dataset.open);
    });

    overlayClose?.addEventListener('click', () => closeCase());

    overlayInner?.addEventListener('click', event => {
      const image = event.target.closest('.slider-slide img');
      if (image) openLightbox(image);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && openId) closeCase();
    });

    /* The URL is the single source of truth: /#case-memora opens that case
       study, whether it arrives from a fresh load, a pasted link, or Back. */
    function syncFromHash() {
      const match = location.hash.match(/^#case-(.+)$/);
      const id = match ? decodeURIComponent(match[1]) : null;
      if (id && id !== openId) openCase(id, { fromHistory: true });
      else if (!id && openId) closeCase({ fromHistory: true });
    }

    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);
    syncFromHash();

    /* Entrance animation, matched to the rest of the page. */
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12 }
      );
      grid.querySelectorAll('.project').forEach(card => {
        card.classList.add('will-reveal');
        observer.observe(card);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
