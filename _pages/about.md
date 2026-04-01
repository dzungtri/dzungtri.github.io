---
layout: page
title: About Me
permalink: /about/
description: Background, trajectory, and areas of work of Dzung Tri.
---
{% assign profile = site.data.profile %}
{% capture profile_markdown %}{% include profile.md %}{% endcapture %}

<section class="page-hero" data-reveal>
  <p class="eyebrow">About Me</p>
  <h1>About Me</h1>
  <p class="lead">{{ profile.title }}</p>
</section>

<section class="page-section prose" data-reveal>
  {{ profile_markdown | markdownify }}
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Current profile</p>
  <ul class="compact-list">
    <li>CTO and technical founder with delivery ownership</li>
    <li>Built across Vietnam and Japan in both product and service environments</li>
    <li>Applied AI experience across OCR, eKYC, facial recognition, and smart building systems</li>
    <li>Current depth in Generative AI, AI agents, coding agents, and modernization workflows</li>
  </ul>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Operating strengths</p>
  <div class="principles-grid">
    {% for item in profile.operatingPrinciples %}
      <article class="principle-row">
        <p class="meta-label">0{{ forloop.index }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.body }}</p>
      </article>
    {% endfor %}
  </div>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Trajectory</p>
  <div class="timeline-list">
    {% for item in profile.trajectory %}
      <article class="timeline-row">
        <p class="timeline-period">{{ item.period }}</p>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Selected work</p>
  <div class="work-list">
    {% for item in profile.signatureWork %}
      <article class="work-row">
        <div class="work-index meta-label">0{{ forloop.index }}</div>
        <div class="work-meta">
          <p class="meta-label">{{ item.period }}</p>
          <h3>{{ item.name }}</h3>
          <p class="work-role">{{ item.role }}</p>
          {% if item.url %}
            <a class="text-link" href="{{ item.url }}" target="_blank" rel="noreferrer">Open reference</a>
          {% endif %}
        </div>
        <div class="work-body">
          <p>{{ item.summary }}</p>
          <ul>
            {% for point in item.highlights %}
              <li>{{ point }}</li>
            {% endfor %}
          </ul>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Current focus</p>
  <div class="focus-layout">
    <div class="focus-grid">
      {% for item in profile.focusAreas %}
        <article class="focus-row">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p class="focus-stack"><span class="meta-label">Tech</span>{{ item.stack }}</p>
        </article>
      {% endfor %}
    </div>
    <aside class="focus-side">
      <div class="recognition-list">
        {% for item in profile.recognition %}
          <article class="recognition-row">
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        {% endfor %}
      </div>
    </aside>
  </div>
</section>

<section class="contact-band" data-reveal>
  <div>
    <p class="section-kicker">Next</p>
    <h2>{{ profile.contactCta }}</h2>
  </div>
  <div class="cta-row">
    <a class="btn solid" href="{{ '/' | relative_url }}">Read Writing</a>
    <a class="btn ghost" href="{{ '/projects/' | relative_url }}">Projects</a>
    <a class="btn ghost" href="mailto:{{ site.email }}">Contact</a>
  </div>
</section>
