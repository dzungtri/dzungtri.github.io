---
layout: page
title: Books
permalink: /books/
description: Public technical books and tutorial tracks.
---
{% assign profile = site.data.profile %}

<section class="page-hero" data-reveal>
  <p class="eyebrow">Books</p>
  <h1>Books</h1>
  <p class="lead">Technical books and tutorial tracks that turn working systems into reusable learning surfaces.</p>
</section>

<section class="page-section prose" data-reveal>
  <p>
    I keep Books separate from Projects on purpose. A project is the system or repository itself.
    A book is the structured teaching surface around that system: audience, language tracks,
    learning progression, and navigation. For <code>mini-claw-code</code>, the book is now a
    product in its own right, with multiple technical tracks and multilingual variants.
  </p>
</section>

<section class="page-section" data-reveal>
  <p class="panel-label">Library</p>
  <div class="work-list">
    {% for book in profile.books %}
      <article class="work-row">
        <div class="work-index meta-label">0{{ forloop.index }}</div>
        <div class="work-meta">
          <h3>{{ book.title }}</h3>
          <a class="text-link" href="{{ book.landingUrl }}" target="_blank" rel="noreferrer">Open landing page</a>
          <p class="work-role">Public technical book · multilingual tracks</p>
        </div>
        <div class="work-body">
          <p>{{ book.description }}</p>
          {% if book.entries %}
            <ul>
              {% for entry in book.entries %}
                <li><a href="{{ entry.url }}" target="_blank" rel="noreferrer">{{ entry.label }}</a></li>
              {% endfor %}
            </ul>
          {% endif %}
          {% if book.notes %}
            <ul>
              {% for note in book.notes %}
                <li>{{ note }}</li>
              {% endfor %}
            </ul>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="contact-band" data-reveal>
  <div>
    <p class="section-kicker">Explore</p>
    <h2>Browse the systems behind the books and the books built on top of those systems.</h2>
  </div>
  <div class="cta-row">
    <a class="btn solid" href="{{ '/projects/' | relative_url }}">Projects</a>
    <a class="btn ghost" href="{{ '/' | relative_url }}">Writing</a>
    <a class="btn ghost" href="mailto:{{ site.email }}">Contact</a>
  </div>
</section>
