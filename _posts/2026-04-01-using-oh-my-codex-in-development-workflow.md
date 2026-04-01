---
layout: post
title: Using oh-my-codex in my development workflow
date: 2026-04-01
description: Why I like using oh-my-codex as a workflow layer around Codex, and why claw-code is a concrete example of that approach producing real output.
tags: [workflow, codex, oh-my-codex, ai]
---

# Using oh-my-codex in my development workflow

Lately I have been paying more attention to workflow, not just models.

One tool I keep coming back to is [oh-my-codex (OmX)](https://github.com/Yeachan-Heo/oh-my-codex), a project by Yeachan Heo. The project describes itself as a workflow layer for OpenAI Codex CLI, and that framing matches my experience with it. The simplest way I think about it is this: Codex is still the execution engine, but OmX gives the session better structure.

That structure matters in day-to-day development work. Instead of treating every task like a blank prompt, I can route work with reusable surfaces such as `$architect`, `$plan`, `$team`, and `$ralph`. In practice, that means:

- use `$architect` to frame a problem before touching code
- use planning-oriented workflows before implementation gets messy
- use `$team` when parallel review or multi-lane execution is worth the overhead
- use `$ralph` when I want persistent execution loops with verification instead of a one-shot attempt

What I like most about OmX is that it makes the workflow explicit. Plans, logs, notes, and runtime state live in `.omx/`, so the session has more memory and more operational shape than a plain chat loop.

A good concrete example is [claw-code](https://github.com/instructkr/claw-code). As of April 1, 2026, its README still includes a Backstory section about a March 31, 2026 porting session driven with OmX. That is interesting to me because it turns workflow ideas into something tangible: a public repository, a working codebase, and a documented process. The project has already kept moving, but that backstory is still a strong snapshot of what the workflow can produce.

This is the note I wanted to keep here because it captures the spirit of the workflow clearly:

> The whole thing was orchestrated end-to-end using oh-my-codex (OmX) by @bellman_ych — a workflow layer built on top of OpenAI's Codex (@OpenAIDevs). I used $team mode for parallel code review and $ralph mode for persistent execution loops with architect-level verification. The entire porting session — from reading the original harness structure to producing a working Python tree with tests — was driven through OmX orchestration.
>
> The result is a clean-room Python rewrite that captures the architectural patterns of Claude Code's agent harness without copying any proprietary source. I'm now actively collaborating with @bellman_ych — the creator of OmX himself — to push this further. The basic Python foundation is already in place and functional, but we're just getting started. Stay tuned — a much more capable version is on the way.

That kind of backstory is exactly why I think workflow tooling matters. Good workflows do not just help with speed. They help with repeatability, separation of roles, verification discipline, and keeping large tasks from collapsing into prompt chaos.

So for me, OmX is not mainly about adding more commands. It is about making development sessions more deliberate:

- analyze first
- plan before heavy edits
- parallelize when the task is truly big enough
- verify before calling something done

That is the development habit I want more of, and [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) is one of the most interesting workflow layers I have seen built around that idea.
