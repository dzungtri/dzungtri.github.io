---
layout: post
title: Programming the loop, not just the prompt
date: 2026-04-06
description: A practical response to Geoffrey Huntley's 'everything is a ralph loop', focused on loop-based coding-agent workflows, bounded autonomy, and turning repeated failures into harness improvements.
tags: [coding-agent, ai, workflow, software-engineering, automation]
post_styles:
  - /assets/posts/programming-the-loop-not-just-the-prompt/post.css
---

# Programming the loop, not just the prompt

Geoffrey Huntley's post [everything is a ralph loop](https://ghuntley.com/loop/), published on **January 17, 2026**, is intentionally loud.

The tone is combative. The claims are maximal. But underneath that style there is a genuinely useful idea: the biggest change in AI-assisted software work is not faster code generation. It is learning to design and run loops.

That distinction matters.

If I only use a coding agent as a faster autocomplete system, I am still working mostly the old way. I am just moving bricks faster. The more interesting shift happens when I stop thinking in single prompts and start thinking in bounded cycles:

- define the goal
- provide the backing specs and constraints
- run the task
- inspect the result
- feed failures back into the loop
- repeat until the output is acceptable or the loop itself needs improvement

That is the part of Huntley's article I think is worth keeping.

<figure class="post-figure">
  <img src="/assets/posts/programming-the-loop-not-just-the-prompt/loop-system.png" alt="Diagram showing a bounded coding-agent loop with goal, context, execution, verification, and harness repair." />
  <figcaption>
    The useful part of the loop mindset: not infinite autonomy, but a repeatable cycle with explicit goals, verification, and a path to improve the harness when the same failure shows up again.
  </figcaption>
</figure>

## The best idea in the article: every repeated failure is harness debt

What I find most valuable in the piece is the suggestion that a failure should not always be treated as a one-off execution problem.

If an agent keeps making the same kind of mistake, the right response is often not "watch it more carefully next time." The right response is to improve the loop:

- sharpen the instructions
- add a missing example
- encode a structural rule
- add a fast check
- narrow the task shape
- make the deployment or verification path more legible

That is a strong engineering instinct.

It reframes agent usage from "babysit the model forever" to "repair the environment so the mistake becomes less likely next time." In other words, the repeated error is telling you something about the harness, not just about the model.

## Single-process autonomy is often better than a swarm

Another part of the article I broadly agree with is the warning against defaulting to multi-agent complexity too early.

Huntley argues that a single loop inside one repository is often better than a noisy mesh of non-deterministic agents talking to each other. I think that is mostly right.

There are good reasons to prefer a bounded, monolithic loop first:

- the context stays coherent
- the responsibility boundary is easier to reason about
- verification is simpler
- failure analysis is clearer
- retries are cheaper
- orchestration overhead is lower

This is very similar to why teams should resist premature microservices. Distributed complexity is expensive even when the components are deterministic. It gets worse when the components are probabilistic.

So my default posture is:

1. Start with one loop.
2. Make it legible.
3. Add fast verification.
4. Split only when there is a clear parallel boundary.

That is a much safer path than building an agent swarm because it feels advanced.

## What the loop should actually contain

The article pushes the idea that we should "program the new computer." I think that phrase is directionally right, but it becomes much more useful when turned into concrete workflow pieces.

For me, a serious coding loop usually needs five ingredients:

1. **Goal**: a clear task with explicit success criteria.
2. **Backing context**: architecture notes, examples, repo rules, constraints, and known invariants.
3. **Execution step**: a bounded implementation attempt.
4. **Verification step**: deterministic checks first, semantic review second.
5. **Harness repair path**: a way to improve the instructions or checks when the same failure reappears.

Without the fifth item, the system does not really learn. It only retries.

That is where the loop idea becomes more than "run the model again."

## I would separate looping from fantasy

This is also where I part ways with the rhetoric in the article.

I do think loop-based agent workflows are real. I do think they can produce very high leverage. I do think many teams still underestimate what can be automated.

But claims like "software development is dead" are less useful to me than the quieter operational question:

> Which parts of software work can be turned into reliable loops, and what controls make those loops trustworthy?

That question leads to better systems.

The loop is powerful when it is bounded by evidence. Without that, autonomy becomes theater. You are not really programming a new computer. You are just running a stochastic process repeatedly and hoping the output converges.

## Verification is the center of the loop, not the epilogue

If I had to reduce the whole article to one practical rule, it would be this:

> The quality of an autonomous loop is mostly determined by the quality of its verification.

This is why the article's examples around verification and self-correction are more important than the big declarations around the future of engineering.

An autonomous loop becomes useful when it can answer questions like:

- what exactly failed?
- can the agent observe the failure directly?
- is the failure signal precise enough to act on?
- can the loop distinguish a real fix from a superficial patch?
- when should the loop stop and ask for human judgment?

If those questions are weak, more looping does not create reliability. It only creates more activity.

<figure class="post-figure">
  <img src="/assets/posts/programming-the-loop-not-just-the-prompt/failure-feedback-v2.png" alt="Diagram showing how repeated agent failures should flow into harness improvements such as rules, tests, and examples." />
  <figcaption>
    My preferred interpretation of the article's message: when the loop fails in a familiar way, turn that failure into a better guide or sensor instead of treating it as pure execution noise.
  </figcaption>
</figure>

## The human still owns loop design

The strongest autonomous workflows I have seen still rely on a human in a very specific role: not doing every step manually, but deciding what the loop is allowed to optimize and what evidence counts as success.

That means the engineer still owns:

- the success criteria
- the acceptable trade-offs
- the stopping conditions
- the boundaries of automation
- the choice of which failures deserve a harness fix

That is why I think "programming the loop" is a better phrase than "replacing the programmer." The human remains the designer of the operating system around the model.

## What I would apply in a real repository

If I were translating the article into repo-level practice, I would do a few concrete things before chasing bigger autonomy:

- make task goals and acceptance checks explicit
- keep one primary execution loop per repo or per task lane
- add fast local verification that can run beside the agent
- log repeated failure modes and convert them into rules, examples, or tests
- avoid multi-agent choreography until a single-loop design is stable
- treat deployment automation as part of the loop only after verification is already trustworthy

That last point matters. Automatic deployment sounds impressive, but it is only responsible when the verification layer is strong enough to justify it.

## Final thought

I do not read Huntley's article as a literal blueprint. I read it as a useful provocation.

The valuable part is not the swagger. It is the workflow insight underneath it: stop treating agent use as isolated prompting and start treating it as loop design.

Once you do that, the engineering questions get better. You think less about clever prompts and more about goals, evidence, retries, failure domains, and harness repair.

That is where agentic software work starts to become disciplined.

<div class="source-note">
  <p><strong>Source and attribution.</strong> This post is an original response inspired by Geoffrey Huntley's article <a href="https://ghuntley.com/loop/">everything is a ralph loop</a>, published on January 17, 2026.</p>
</div>
