---
layout: post
title: How I think about harness engineering for coding agents
date: 2026-04-06
description: An applied reading of Birgitta Böckeler's harness engineering article, focused on how to build safer, more useful coding-agent workflows in day-to-day software delivery.
tags: [coding-agent, ai, software-engineering, workflow, architecture, testing]
post_styles:
  - /assets/posts/how-i-think-about-harness-engineering-for-coding-agents/post.css
---

# How I think about harness engineering for coding agents

I have been trying to make coding agents more useful without pretending they are already trustworthy by default.

That is why Birgitta Böckeler's article, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html), published on **April 2, 2026** on MartinFowler.com, landed for me at exactly the right time.

The article gives a better frame than the usual "prompt better" advice. The core shift is this: if I want more autonomy from a coding agent, I should not only improve the prompt. I should improve the environment around the agent so that good outcomes become more likely and bad outcomes become easier to detect and correct.

My simplified takeaway is:

> A coding agent becomes more trustworthy when it works inside a system of guides and sensors, not when it receives a longer prompt.

This post is not a summary of the full article. It is my working interpretation of the ideas I want to keep applying in real repositories.

<figure class="post-figure">
  <img src="/assets/posts/how-i-think-about-harness-engineering-for-coding-agents/harness-loop-v3.png" alt="Diagram showing a coding-agent harness with guides, sensors, and a human steering loop." />
  <figcaption>
    My mental model after reading the article: guides shape the first attempt, sensors shape the correction loop, and the human keeps improving the harness instead of manually redoing every task.
  </figcaption>
</figure>

## The most useful distinction: guides versus sensors

The article separates two kinds of control:

- **Guides** shape what the agent does before it acts.
- **Sensors** inspect what the agent produced after it acts.

That sounds simple, but it is a very practical lens.

When I look at an agent workflow through that lens, I stop asking "which model should I use?" and start asking better questions:

- what do I want the agent to know up front?
- what can I check automatically after it edits code?
- which failures should trigger a retry, not a human rescue?

In practice, my guides are things like `AGENTS.md`, architecture notes, repo-specific skills, lint rules, code generation scripts, and clear examples. My sensors are tests, type checks, static analysis, review agents, build logs, and browser checks.

The important part is that neither side is enough alone. A guide-only setup can still drift into bad code without noticing. A sensor-only setup catches problems later and wastes cycles producing avoidable mistakes.

## Deterministic checks and semantic checks should not be mixed up

Another part of the article I found especially useful is the split between **computational** and **inferential** controls.

- **Computational controls** are deterministic tools: tests, linters, type checkers, structural rules, dependency checks.
- **Inferential controls** are judgment-heavy tools: AI review, LLM-as-judge, semantic comparison, architectural critique.

That distinction matters because these tools should not carry the same burden.

I want computational controls everywhere because they are cheap, fast, and reliable. If a type checker can catch the issue, I do not want an LLM review to be the primary safety net. Inferential controls are still useful, but they belong where judgment is needed: awkward naming, duplicated intent, suspicious architecture choices, vague requirements, or brute-force fixes that technically pass.

This is one of the easiest ways to reduce noise in agent workflows. Use deterministic checks for enforcement. Use inferential checks for interpretation.

<div class="insight-grid">
  <section class="insight-card">
    <p class="insight-label">Cheap enough to run every time</p>
    <h3>Computational controls</h3>
    <p>Types, tests, linting, structural rules, schema checks, build verification, coverage gates.</p>
  </section>
  <section class="insight-card">
    <p class="insight-label">Useful when semantics matter</p>
    <h3>Inferential controls</h3>
    <p>AI review, behavioral critique, design review, semantic duplication checks, requirement interpretation.</p>
  </section>
</div>

## Shift quality left, then keep it running

One of the strongest ideas in the article is not new, but it becomes more urgent in an agent-driven workflow: quality has to move left.

If an agent can write code in seconds, it can also write the wrong code in seconds. That changes the economics. Late detection becomes much more expensive because the agent can generate a lot of believable but misaligned work before a human looks closely.

So the harness should stack checks by timing:

1. Before or during local generation: guides, examples, repo rules, fast linting, fast tests.
2. Immediately after local edits: type checks, focused test runs, structural checks, AI review.
3. After integration: broader pipeline validation, slower semantic review, mutation or architecture testing.
4. Continuously: drift detection, dependency scanning, runtime signals, quality audits.

That sequence helps me think about agent quality as a delivery-system problem, not a prompt-writing problem.

<figure class="post-figure">
  <img src="/assets/posts/how-i-think-about-harness-engineering-for-coding-agents/harness-lifecycle-v2.png" alt="Diagram showing a coding-agent quality loop moving from local generation to integration and continuous health checks." />
  <figcaption>
    The practical version of "keep quality left": fast feedback should sit beside the agent, while slower and broader checks should keep running after integration.
  </figcaption>
</figure>

## Three things I want the harness to regulate

The article separates harness goals into three categories, and that is a helpful way to avoid fuzzy thinking:

- **Maintainability**: Is the code understandable, consistent, and structurally sane?
- **Architecture fitness**: Does the change preserve the system qualities we care about, such as boundaries, performance, observability, or security posture?
- **Behavior**: Does the software actually do the right thing for the user?

I like this separation because teams often overinvest in the first category and mentally round that up to overall safety.

Maintainability is the easiest place to start. We already have many tools for it. Architecture fitness is harder but still tractable when the codebase has explicit boundaries and measurable qualities. Behavior is the hard problem. Green tests do not automatically mean the agent understood the product intent.

That last point is the one I want to remember. If the task definition is weak, even a strong harness only proves that the agent produced internally consistent work, not necessarily the right work.

## Harnessability matters as much as the harness itself

The article also introduces a useful meta-question: how harnessable is the codebase?

Some repositories are naturally easier for agents:

- strong typing gives you more reliable sensors
- explicit module boundaries give you architecture checks
- clear conventions reduce ambiguous choices
- templates and scaffolds reduce accidental variation

Other repositories fight back. Weak boundaries, inconsistent patterns, hidden requirements, and long-lived debt all make the agent harder to steer.

This is where the article's idea of **harness templates** becomes interesting. If a team repeatedly builds the same kinds of services, the best move may be to package the guides and sensors for each topology rather than rebuilding the harness from scratch every time.

That is more ambitious than a starter template. It is a reusable control system.

## The human role changes, but it does not disappear

My favorite point in the article is the most grounded one: the human is still the steering function.

Experienced engineers bring tacit judgment that the model does not have:

- which convention is load-bearing and which one is cosmetic
- which trade-off is acceptable in this team right now
- which shortcut will create long-term pain
- which requirements are underspecified even if the prompt sounds precise

Harnesses help externalize some of that judgment, but they do not eliminate the need for it.

For me, the real promise is narrower and more believable: make the human spend less time catching avoidable mistakes and more time steering the few decisions that actually require context, trade-offs, and accountability.

## What I want to add to my own workflow

After reading the article, these are the upgrades I would prioritize in any repository where I use coding agents seriously:

- keep `AGENTS.md` concrete and repo-specific instead of aspirational
- make fast local verification the default path, not an optional cleanup step
- encode architectural boundaries as tests or structural rules where possible
- add one or two inferential review passes only where semantic judgment is genuinely needed
- track repeated agent failure modes and convert them into guides or sensors
- treat template repos and scaffolds as future harness assets, not only productivity shortcuts

That last point is probably the biggest change in mindset. A template is not just a faster starting point for humans. It can be a way to constrain and govern agent behavior from day one.

## Final thought

The article helped me put a name on something many teams are already discovering by trial and error.

Better models help. Better prompts help. But the durable gains seem to come from building a better operating environment around the model: sharper guides, better sensors, faster correction loops, and codebases that are easier to govern.

That is the level where coding-agent workflows start to look like engineering instead of improvisation.

<div class="source-note">
  <p><strong>Source and attribution.</strong> This post is an original interpretation inspired by Birgitta Böckeler's article <a href="https://martinfowler.com/articles/harness-engineering.html">Harness engineering for coding agent users</a>, published on MartinFowler.com on April 2, 2026.</p>
</div>
