---
layout: post
title: Building for agent legibility
date: 2026-04-06
description: An applied reading of OpenAI's February 11, 2026 harness engineering article, focused on what changes when engineers stop optimizing only for human readability and start optimizing repositories for agent legibility.
tags: [coding-agent, ai, software-engineering, workflow, architecture, documentation]
post_styles:
  - /assets/posts/building-for-agent-legibility/post.css
---

# Building for agent legibility

OpenAI's article [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/), published on **February 11, 2026**, is one of the most concrete public write-ups I have seen about what agent-first engineering actually looks like inside a real software team.

The headline claim is attention-grabbing: a small team built and shipped an internal beta with no manually written code, using Codex as the implementation engine and humans as the steering layer.

What I find more useful than the headline, though, is the operating model underneath it.

The article does not really argue that engineering discipline goes away. It argues almost the opposite: when agents generate most of the code, discipline moves upward into scaffolding, documentation, architecture rules, verification, and cleanup loops.

My strongest takeaway is this:

> In an agent-first repository, the key question is no longer only "is this readable for humans?" It becomes "is this legible enough for the next agent run to reason about safely?"

That is a very different optimization target.

<figure class="post-figure">
  <img src="/assets/posts/building-for-agent-legibility/repo-legibility-v2.png" alt="Diagram showing a repository organized for agent legibility with AGENTS.md as map, docs as system of record, and tools for verification and execution." />
  <figcaption>
    My interpretation of the article's core idea: a good agent-first repository gives the model a map, a system of record, mechanical checks, and enough observable runtime state to reason about its own work.
  </figcaption>
</figure>

## The role of the engineer shifts up a layer

One of the most important points in the OpenAI article is the redefinition of engineering work.

Instead of humans spending most of their time writing application code directly, they spend more time doing things like:

- defining the task and acceptance criteria
- improving the repository structure
- encoding missing capabilities into tools and skills
- tightening architectural constraints
- making runtime behavior visible to the agent
- turning review feedback into rules or documentation

This feels believable to me because it matches what good agent workflows already reward. When an agent fails repeatedly, the fix is often not "type a smarter prompt." The fix is to repair the environment so the agent can succeed with less ambiguity next time.

That is why I think the article is really about leverage engineering, not prompt engineering.

## A repository should teach, not just store

The section I liked most is the one about moving away from a giant `AGENTS.md`.

OpenAI describes treating `AGENTS.md` as a table of contents rather than an encyclopedia, while the deeper system of record lives in a structured, versioned `docs/` tree. That is a strong pattern.

The reason is straightforward:

- giant instruction files crowd out task-specific context
- monolithic guidance becomes stale quickly
- one huge blob is hard to validate mechanically
- agents need progressive disclosure more than raw volume

That last point matters. A repository should not only contain information. It should reveal information in the right order.

If the agent always starts from a short stable map and can discover the right deeper artifact from there, the repository becomes easier to navigate and easier to maintain. The codebase starts behaving more like an operating manual with indexes, not a junk drawer of tribal knowledge.

## If the agent cannot see it, it does not exist

The bluntest and most useful sentence in the article, in my view, is the idea that anything the agent cannot access in-context effectively does not exist.

That has real consequences.

Knowledge sitting in Slack, private docs, or someone's head may be perfectly available to a human team, but it is invisible to the agent. In an agent-first workflow, invisible knowledge is operationally equivalent to missing knowledge.

That suggests a simple rule:

1. If the information matters repeatedly, put it in the repo.
2. If it matters critically, make it discoverable from the repo entry points.
3. If drift would be expensive, validate it mechanically.

That is a higher standard than normal documentation hygiene, but it is also a healthier one. Many of the things that make a repository legible to agents also make it better for new human contributors.

## Architecture and taste need mechanical enforcement

The article also makes a point that I strongly agree with: documentation alone does not keep a fast-moving, agent-generated repository coherent.

If output velocity rises, soft conventions are not enough. The important invariants have to become executable.

That can mean:

- dependency direction rules
- structural tests
- boundary validation
- naming conventions
- file size limits
- logging requirements
- platform-specific reliability checks

Once those constraints are machine-enforced, the agent can move quickly without eroding the foundation.

This is where the article's framing becomes especially useful: do not micromanage every implementation detail. Enforce the invariants that keep the system healthy, then allow local freedom inside those boundaries.

That is how platform engineering already works for human teams. Agent-first engineering just makes the need sharper and earlier.

<div class="takeaway-band">
  <section class="takeaway-card">
    <p class="takeaway-label">Do enforce</p>
    <p>Boundaries, validation, logging, structure, quality floors, and repository discoverability.</p>
  </section>
  <section class="takeaway-card">
    <p class="takeaway-label">Do not over-specify</p>
    <p>Every local implementation detail, stylistic preference, or library choice that does not protect an actual invariant.</p>
  </section>
</div>

## Runtime legibility matters too

Another practical point in the OpenAI write-up is that repository legibility alone is not sufficient. The running system also has to become legible to the agent.

The article describes giving Codex direct access to application instances, UI state, browser tooling, logs, metrics, and traces in isolated worktrees. That is a major step because it turns verification from indirect guesswork into direct observation.

Once the agent can see the app, drive the UI, inspect logs, and measure runtime behavior, prompts like "keep startup under 800ms" or "verify this user journey is fixed" stop being aspirational and start becoming actionable.

That seems like one of the biggest practical gaps in many current agent workflows. People invest in better prompts, but not enough in making the software itself observable to the agent that is supposed to maintain it.

## Throughput changes which bottlenecks matter

The OpenAI team also makes a point that would sound irresponsible in a normal low-throughput workflow: when agent throughput is very high and correction is cheap, some traditional merge philosophy changes.

I would translate that carefully.

This does not mean "quality does not matter." It means that if:

- pull requests are short-lived
- fixes are cheap to regenerate
- review can be heavily automated
- validation is strong
- human attention is the scarcest resource

then waiting for perfect manual gatekeeping on every small change may be the wrong optimization.

That only works if the correction loop is fast and trustworthy. Otherwise, it is just a fancy excuse for chaos.

## Entropy becomes a first-class problem

One of the most grounded sections in the article is the one about entropy and garbage collection.

Agents copy patterns. If bad or uneven patterns exist in the repository, the agent will amplify them. That means cleanup can no longer be treated as an occasional heroic effort. It has to become a routine background function.

I like the article's framing here:

- encode golden principles
- scan for drift regularly
- open targeted cleanup pull requests
- keep human taste captured once, then enforced repeatedly

That is exactly how I would want to run an agent-heavy codebase. The goal is not to stop entropy forever. The goal is to make cleanup cheap, continuous, and codified.

<figure class="post-figure">
  <img src="/assets/posts/building-for-agent-legibility/entropy-loop-v2.png" alt="Diagram showing entropy in an agent-generated codebase being controlled through golden principles, drift detection, targeted cleanup PRs, and continuous quality scoring." />
  <figcaption>
    The part of the article I expect to matter most over time: fast generation creates drift, so quality needs its own standing loop for detection, grading, and garbage collection.
  </figcaption>
</figure>

## What I would actually copy from this model

If I were applying this article's lessons to a normal product team, I would not start with the "zero manually written code" philosophy.

I would start with the parts that compound safely:

- keep `AGENTS.md` short and navigational
- move durable guidance into indexed repo-local docs
- make plans and design decisions first-class repository artifacts
- encode the most important architecture rules as tests or lints
- give agents access to the software's real observable behavior, not only the source tree
- run recurring cleanup tasks that reduce drift before it spreads

Those are all moves that improve both autonomy and maintainability.

## Final thought

What I like about the OpenAI article is that it moves the conversation beyond model quality.

The interesting question is not just whether the model can generate code. The interesting question is whether the environment around the model is structured well enough that generated code can accumulate into a coherent product.

That is what "building for agent legibility" means to me.

It means designing repositories, tools, docs, and feedback loops so that future agent runs inherit a system they can actually understand. If teams get that part right, agent speed stops looking like chaos and starts looking like compounding leverage.

<div class="source-note">
  <p><strong>Source and attribution.</strong> This post is an original interpretation inspired by OpenAI's article <a href="https://openai.com/index/harness-engineering/">Harness engineering: leveraging Codex in an agent-first world</a>, published on February 11, 2026.</p>
</div>
