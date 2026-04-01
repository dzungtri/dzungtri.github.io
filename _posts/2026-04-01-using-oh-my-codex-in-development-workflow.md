---
layout: post
title: A practical coding-agent workflow with oh-my-codex
date: 2026-04-01
description: A technical, tutorial-style guide to using oh-my-codex as a structured coding-agent workflow, with cheat sheets for agents, teams, modes, and day-to-day execution.
tags: [workflow, coding-agent, codex, oh-my-codex, software-engineering, ai]
---

# A practical coding-agent workflow with oh-my-codex

If you already use coding agents, the next upgrade is not only a better model. It is a better workflow.

[oh-my-codex (OmX)](https://github.com/Yeachan-Heo/oh-my-codex) is interesting because it treats Codex CLI as the execution engine and adds a workflow layer on top: roles, skills, orchestration, persistent state, team mode, and verification loops.

This post is a more technical and tutorial-style rewrite of the public [Oh My Codex documentation](https://yeachan-heo.github.io/oh-my-codex-website/docs.html). I am not trying to mirror the docs exactly. I want to turn the material into something easier to apply in real software work.

As documented on **April 1, 2026**, the public docs for **Oh My Codex v0.10.0** describe OmX as a coordination layer around Codex CLI with read-only exploration, orchestration wrappers, autonomous research, persistent memory, and team worktrees.

## Copy-paste starter commands

If you want a minimal setup and a first useful session, copy this block:

```bash
npm install -g oh-my-codex
omx setup
omx doctor
omx
```

Then once you are inside Codex CLI, try this:

```text
/prompts:architect "analyze the auth boundaries and propose the safest change"
$plan "ship OAuth callback safely"
/prompts:executor "implement the chosen approach with tests"
$ralph "finish remaining gaps and verify the change is complete"
```

And if you only want quick read-only repo discovery from the terminal:

```bash
omx explore --prompt "which files define auth routing"
```

## What problem OmX solves

A plain coding-agent session often fails for predictable reasons:

- implementation starts before the task is clear
- planning and coding are mixed together
- the same agent is asked to be architect, executor, reviewer, and tester all at once
- large work is not split correctly
- progress disappears when the session gets long
- a task is treated as done because code was generated, not because it was verified

The OmX docs summarize the philosophy clearly: **be the conductor, not the performer**. In practice, that means you should orchestrate roles and stages instead of relying on one giant free-form prompt.

## Quick start tutorial

If you want the fastest possible path from zero to useful, start here.

### 1. Install and initialize

```bash
npm install -g oh-my-codex
omx
omx setup
omx doctor
```

From the docs, these are the key starter commands:

- `omx` — launch Codex CLI with the OmX runtime
- `omx setup` — install skills, prompts, MCP servers, and AGENTS files
- `omx doctor` — verify the installation
- `omx resume` — reopen an earlier session

### 2. Learn the three core execution habits

Before you learn every feature, get comfortable with these habits:

1. **Explore first** with `omx explore`
2. **Plan before risky edits** with `$plan` or `$ralplan`
3. **Persist until verified** with `$ralph` and QA loops

### 3. Try one simple session

A realistic first session might look like this:

```bash
omx explore --prompt "which files define auth routing"
```

Then, inside Codex CLI:

```text
/prompts:architect "analyze the auth boundaries and propose the safest change"
$plan "ship OAuth callback safely"
/prompts:executor "implement the chosen approach with tests"
$ralph "finish remaining gaps and verify the change is complete"
```

That sequence already gives you a much better workflow than a one-shot prompt.

## The OmX workflow I recommend for day-to-day engineering

My default mental model is simple:

1. **Understand** the codebase or problem.
2. **Plan** the change if there is real risk or ambiguity.
3. **Execute** through the right role or mode.
4. **Parallelize** only if the work truly splits cleanly.
5. **Verify** before declaring success.

Below is the technical version of that workflow.

## Step 1: Explore before editing

The docs position `omx explore` as the default read-only exploration surface.

Use it when you need answers like:

- where is this feature implemented?
- which files define a symbol?
- what depends on this module?
- what changed in this area?

Example:

```bash
omx explore --prompt "which files define team routing"
```

The docs also note an important constraint: `omx explore` is intentionally **read-only** and **shell-only**. It is meant for safe repo discovery, not arbitrary shell work.

If you need shell-native inspection with summarized output, use:

```bash
omx sparkshell git --version
omx sparkshell --tmux-pane %12 --tail-lines 400
```

If your problem is research-heavy instead of code-heavy, use:

```bash
omx autoresearch "best retry strategy for distributed jobs"
```

### Why this matters

A lot of agent mistakes happen because implementation starts too early. Exploration is your guardrail against vague execution.

## Step 2: Plan before large or risky work

The docs include multiple planning-oriented surfaces. The most practical split is:

- use **`$plan`** for normal tasks
- use **`$ralplan`** for higher-risk or higher-ambiguity tasks

A good heuristic:

| Task shape | Suggested planning surface |
| --- | --- |
| single-file change, low ambiguity | minimal planning or direct executor prompt |
| medium feature, some uncertainty | `$plan` |
| migration, public API change, destructive refactor, high-risk work | `$ralplan` |

From the docs, `$ralplan` is the consensus-planning path: planner → architect → critic before execution. That is a very good fit for work where the wrong change is expensive.

Example:

```text
$ralplan "design a safe migration from session cookies to stateless tokens"
```

## Step 3: Execute through the right role

One of the best things in OmX is that execution is not one undifferentiated chat surface.

You can route work to a role.

Examples:

```text
/prompts:architect "analyze current auth boundaries"
/prompts:executor "implement input validation in login"
/prompts:debugger "find the root cause of the flaky timeout"
/prompts:verifier "verify the feature is complete and evidence is sufficient"
```

This role separation is valuable because planning, implementation, debugging, and verification are different jobs.

## Step 4: Use modes, not just prompts

Roles are one layer. Execution modes are another.

From the docs, these are the most important modes:

### Autopilot

The docs describe **Autopilot** as the flagship autonomous mode:

- Expansion (Analyst + Architect)
- Planning (Architect + Critic)
- Execution (Ralph + Ultrawork)
- QA Cycling (UltraQA)

Use it when the task is clear enough that you want OmX to drive the full delivery loop.

```text
$autopilot "build a React dashboard with tests"
```

### Ralph

The docs describe **Ralph** as persistence mode: *the boulder never stops*.

Key ideas from the docs:

- infinite persistence loop
- includes Ultrawork automatically
- strong verification requirements

Use it when you do not want a best-effort attempt. You want the loop to continue until the work is actually verified.

```text
$ralph "complete the refactor and verify all acceptance criteria"
```

### Ultrawork

The docs describe **Ultrawork** as maximum parallelism:

- 5+ concurrent agents
- smart model routing
- non-blocking background execution

Use it when the task truly benefits from independent parallel subtasks.

```text
$ultrawork "fix these five independent test failures"
```

## Step 5: Use team mode for real parallel delivery

For larger work, OmX has a separate `omx team` surface.

```bash
omx team 3:executor "parallelize a multi-module refactor"
```

As documented in v0.10.0, team workers run in **isolated git worktrees by default**. That is a big architectural improvement because it means:

- each worker gets its own worktree
- merge conflicts are reduced
- integration can happen incrementally
- shutdown can clean up the worktree state

You also get team lifecycle commands:

```bash
omx team status <team-name>
omx team resume <team-name>
omx team shutdown <team-name>
```

And the docs note the provider controls:

- `OMX_TEAM_WORKER_CLI`
- `OMX_TEAM_WORKER_CLI_MAP`
- `OMX_TEAM_WORKER_LAUNCH_ARGS`

Example mixed team setup from the docs:

```bash
export OMX_TEAM_WORKER_CLI_MAP=codex,claude,gemini
omx team 3:executor "full-stack implementation"
```

## Step 6: Keep state outside the chat window

One underrated part of OmX is persistent state.

According to the docs, the important locations are:

- `.omx/state/` — execution mode state
- `.omx/logs/` — audit logs
- `.omx/plans/` — plan artifacts
- `.omx/notepad.md` — resilient note system
- `.omx/project-memory.json` — project conventions and directives

The docs describe the notepad model like this:

- **Priority** — always injected into context
- **Working** — auto-pruned after 7 days
- **Manual** — never pruned

This matters because long-running engineering work needs memory that survives beyond the visible chat buffer.

## Step 7: Verify instead of assuming success

This is where agent workflows become professional.

A generated diff is not proof. A finished-looking answer is not proof.

OmX keeps verification explicit in multiple ways:

- verifier roles
- Ralph persistence loops
- UltraQA cycles
- team verify/fix stages
- build/test helper commands

The docs also expose verification-oriented commands such as:

- `npm run build:full`
- `npm run test:explore`
- `npm run test:sparkshell`

The principle is simple: if you cannot show evidence, the task is not done yet.

## Decision tree: when to use which OmX workflow

A lot of confusion goes away if you choose the workflow based on task shape instead of personal preference.

### Fast decision tree

| If your situation is... | Use this | Why |
| --- | --- | --- |
| I only need to inspect the repo safely | `omx explore` | read-only discovery without jumping into edits |
| I need shell-native inspection or tmux-pane summaries | `omx sparkshell` | better for command output and shell-oriented inspection |
| I need to think through the change first | `$plan` | lightweight planning for normal engineering work |
| The change is risky, broad, or hard to reverse | `$ralplan` | planner + architect + critic consensus before execution |
| The task is clear and mostly self-contained | `$autopilot` | full autonomous delivery loop |
| I need the system to keep going until verified | `$ralph` | persistent completion loop with stronger verification behavior |
| The work splits into multiple independent subtasks | `$ultrawork` | aggressive parallelism without full tmux team overhead |
| I need coordinated multi-worker delivery | `omx team` | explicit team orchestration with worktrees and lifecycle commands |
| I need to recover an interrupted session | `omx resume` | continue previous interactive work |

### Practical selection guide

#### Use `omx explore` when

- you are still locating files, symbols, or relationships
- you do not want to risk accidental edits
- the best next step is understanding, not execution

#### Use `$plan` when

- the task is real but still somewhat ambiguous
- you need a fix strategy before implementation
- you want more structure without full consensus overhead

#### Use `$ralplan` when

- the task affects multiple modules or boundaries
- the change is risky, destructive, or expensive to undo
- you want explicit critique before coding starts

#### Use `$autopilot` when

- the objective is clear
- one autonomous end-to-end loop is appropriate
- you want OmX to drive from task to delivered output

#### Use `$ralph` when

- the first attempt is not enough
- you want persistence until acceptance criteria are satisfied
- verification quality matters more than speed

#### Use `$ultrawork` when

- the task can be split into independent lanes
- parallel speed helps but full tmux team mode is unnecessary
- you want multiple background agents without larger coordination overhead

#### Use `omx team` when

- you need explicit worker coordination
- the task is large enough to justify worktrees and team lifecycle management
- you want separate lanes for architecture, execution, testing, or verification

### One-line rule of thumb

- **understand** → `omx explore`
- **plan** → `$plan` or `$ralplan`
- **execute** → role prompt or `$autopilot`
- **persist** → `$ralph`
- **parallelize** → `$ultrawork` or `omx team`
- **recover** → `omx resume`

## Cheat sheet: choose the right surface

### Skill and command cheat sheet

This is the minimal command vocabulary most people need.

| Surface | Best use | Example |
| --- | --- | --- |
| `omx explore` | safe repository discovery | `omx explore --prompt "which files define auth routing"` |
| `omx sparkshell` | shell-native inspection with summaries | `omx sparkshell git --version` |
| `omx autoresearch` | topic research | `omx autoresearch "OAuth device flow tradeoffs"` |
| `/prompts:architect` | design and boundaries | `/prompts:architect "analyze auth boundaries"` |
| `/prompts:executor` | implementation | `/prompts:executor "add input validation"` |
| `$plan` | normal planning | `$plan "ship callback safely"` |
| `$ralplan` | consensus planning for risky work | `$ralplan "plan the migration"` |
| `$autopilot` | end-to-end autonomous execution | `$autopilot "build the dashboard"` |
| `$ralph` | persistent completion loop | `$ralph "finish and verify"` |
| `$ultrawork` | aggressive parallelism | `$ultrawork "fix five bugs"` |
| `omx team` | tmux-based worker orchestration | `omx team 3:executor "parallel refactor"` |
| `omx resume` | recover earlier session | `omx resume` |

### Model-routing cheat sheet

The docs summarize model routing like this:

| Complexity | Model tier | Best for |
| --- | --- | --- |
| Simple | Spark | lookups, formatting, simple docs |
| Standard | Default | implementation, tests, refactoring |
| Complex | xhigh reasoning | architecture, deep debugging, planning |

### Agent catalog cheat sheet

The public docs organize the agent catalog into functional lanes. Here is the same catalog in a cleaner table.

| Lane | Purpose | Agents |
| --- | --- | --- |
| Build & Analysis / Implementation Core | search, sequencing, design, code, debugging, proof | `explore`, `planner`, `architect`, `executor`, `debugger`, `verifier` |
| Review Lane / Quality Gates | multi-angle review | `code-reviewer`, `security-reviewer`, `performance-reviewer`, `api-reviewer`, `style-reviewer` |
| Domain Specialists / Deep Expertise | specialist help | `dependency-expert`, `test-engineer`, `git-master`, `designer`, `researcher` |
| Product & Coordination / Strategy & Feedback | product, UX, challenge, vision | `product-manager`, `ux-researcher`, `critic`, `vision` |

### Team architecture cheat sheet

The docs describe a staged tmux team pipeline:

| Stage | What it means | Exit trigger |
| --- | --- | --- |
| `team-plan` | planning and decomposition | planning complete |
| `team-prd` | explicit acceptance criteria | acceptance criteria defined |
| `team-exec` | worker execution | all tasks reach terminal state |
| `team-verify` | verification gate | verification outcome available |
| `team-fix` | repair loop | fix strategy defined, then return to exec/verify |

### Team composition cheat sheet

The docs include these default team compositions.

| Team composition | Role flow | Best use |
| --- | --- | --- |
| Feature Dev | `analyst → planner → executor → test-engineer → verifier` | shipping a feature with delivery and quality gates |
| Bug Fix | `explore → debugger → executor → verifier` | debugging and fixing issues with evidence |

The docs also note that, in v0.10.0, these run in isolated git worktrees by default.

## Four workflow recipes worth memorizing

The OmX docs include several recommended workflows. These are the ones worth remembering.

| Situation | Workflow | Interpretation |
| --- | --- | --- |
| Big feature, high ambiguity | `$ralplan → $team → $ralph` | plan first, build in parallel, then persist to verified completion |
| Clear task, just get it done | `$autopilot → $ultrawork → $ralph` | autonomous execution with parallel speed and a finish loop |
| Bug fixing and debugging | `$plan → $ralph → $ultraqa` | investigate, fix persistently, then cycle test/verify/fix |
| Multiple issues at once | `omx team (architect) → omx team (workers) → $ralplan → $ralph + $ultrawork → $ultraqa` | parallel analysis, parallel execution, then convergence and verification |

## A tutorial path from beginner to professional use

If I were introducing someone to OmX, I would teach it in three levels.

### Level 1: Structured solo work

Learn these first:

- `omx explore`
- `/prompts:architect`
- `/prompts:executor`
- `$plan`
- `omx resume`

Goal: stop working in one giant prompt.

### Level 2: Persistent completion

Add these next:

- `$autopilot`
- `$ralph`
- `$ultraqa`
- `.omx/notepad.md`
- `.omx/plans/`

Goal: stop treating first-pass output as done.

### Level 3: Team orchestration

Only then move into:

- `omx team`
- worktree-based parallel execution
- mixed-provider worker setups
- HUD and notifications
- stronger verifier loops

Goal: operate coding agents like an engineering system, not a chat toy.

## My practical takeaway

What I like about OmX is not that it promises magic.

I like that it makes good engineering habits more explicit:

- explore first
- plan before risk
- separate roles
- parallelize only when justified
- keep memory outside the scrollback
- verify before you say done

If you want coding agents to feel more professional in real software development, that is the shift that matters.

## Further reading

- [Oh My Codex GitHub repository](https://github.com/Yeachan-Heo/oh-my-codex)
- [Oh My Codex public documentation](https://yeachan-heo.github.io/oh-my-codex-website/docs.html)
