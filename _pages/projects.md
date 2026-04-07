---
layout: page
title: Projects
permalink: /projects/
description: Selected public and representative work.
---
{% assign profile = site.data.profile %}

<section class="page-hero" data-reveal>
  <p class="eyebrow">Projects</p>
  <h1>Projects</h1>
  <p class="lead">Representative systems across media platforms, applied AI, agent workflows, and long-running community products.</p>
</section>

<section class="page-section prose" data-reveal>
  <p>
    I treat projects and books as different things. Projects are the systems,
    repositories, and delivery artifacts. Books are the public learning surface
    built on top of some of those projects. That separation keeps the Projects
    page focused on the work itself, while the <a href="{{ '/books/' | relative_url }}">Books</a>
    page stays optimized for readers choosing a track or language.
  </p>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Featured</p>
  <div class="work-list">
    {% assign featured = profile.projects | where: "name", "mini-claw-code" %}
    {% for item in featured %}
      <article class="work-row">
        <div class="work-index meta-label">01</div>
        <div class="work-meta">
          <h3>{{ item.name }}</h3>
          <a class="text-link" href="{{ item.url }}" target="_blank" rel="noreferrer">Open repository</a>
          <p class="work-role">Tutorial platform · coding agents · multilingual technical writing</p>
        </div>
        <div class="work-body">
          <p>{{ item.description }}</p>
          {% if item.notes %}
            <ul>
              {% for note in item.notes %}
                <li>{{ note }}</li>
              {% endfor %}
            </ul>
          {% endif %}
          <p><a class="text-link" href="{{ '/books/' | relative_url }}">Browse the books and language tracks</a></p>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Selected Systems</p>
  <div class="work-list">
    <article class="work-row">
      <div class="work-index meta-label">02</div>
      <div class="work-meta">
        <h3>Fabbi</h3>
        <p class="work-role">Engineering scale-up · delivery standards · cross-border execution</p>
      </div>
      <div class="work-body">
        <p>Founding-stage engineering buildout, delivery standards, cross-border execution, and AI capability development.</p>
      </div>
    </article>
    <article class="work-row">
      <div class="work-index meta-label">03</div>
      <div class="work-meta">
        <h3>TV Tokyo / txbiz (`テレ東BIZ`)</h3>
        <p class="work-role">Media platform architecture · web-plus-app ecosystem</p>
      </div>
      <div class="work-body">
        <p>Live streaming platform, video management system, and web-plus-app ecosystem built with microservice architecture and Agile delivery from the early stage.</p>
      </div>
    </article>
    <article class="work-row">
      <div class="work-index meta-label">04</div>
      <div class="work-meta">
        <h3>Fvision</h3>
        <p class="work-role">Applied AI · smart building · embedded deployment</p>
      </div>
      <div class="work-body">
        <p>Facial recognition and smart-building solution integrating deep learning, embedded systems, Android customization, sensors, and deployment engineering.</p>
      </div>
    </article>
    <article class="work-row">
      <div class="work-index meta-label">05</div>
      <div class="work-meta">
        <h3>Mazii</h3>
        <p class="work-role">Community product · language tooling</p>
      </div>
      <div class="work-body">
        <p>Long-running Japanese learning and lookup product for the Vietnam-Japan learner community.</p>
      </div>
    </article>
  </div>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Public Repositories</p>
  <div class="repo-list">
    {% for item in profile.projects %}
      <article class="repo-row">
        <h3><a href="{{ item.url }}" target="_blank" rel="noreferrer">{{ item.name }}</a></h3>
        <p>{{ item.description }}</p>
      </article>
    {% endfor %}
  </div>
</section>
