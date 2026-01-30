---
# Example project in Markdown
# File: src/content/project/site.md

title: Chasing the “Perfect” Game Engine
description: A simple 2D game engine built with C# and Raylib.
date: 2026-01-29
repo: https://github.com/andarms/arpg
thumbnail: /images/projects/game-engine-thumbnails.png
tags: [astro, site]
draft: false
---

For the last several years, I’ve been stuck in a loop.

Not a bad loop — more like a creative one. A cycle of building tools, abandoning them, switching languages, redesigning architectures, coming back to old ideas, and starting again with more experience than before.

When I first started learning game programming at university, I fell in love with how game development actually works under the hood. That curiosity slowly pushed me beyond just using engines and into understanding how they are built.

But there’s something important about my motivation that makes this story different.

## I Didn’t Dream About “The Dream Game”

A lot of people dream about making _the perfect game_.

I didn’t.

I dreamed about making **the perfect game engine**.

The perfect API.
The perfect syntax.
The perfect developer experience.

I genuinely enjoy programming. I love writing code, designing systems, refining APIs, and building tools that feel good to use.

And game development is one of the most challenging playgrounds any programmer can face. It forces you to deal with real-time systems, performance, architecture, tooling, UX, math, and creativity — all at the same time.

That challenge is what hooked me.

## Experimenting With Everything

My journey started with curiosity, not with a roadmap.

Over time, I experimented with more tools and technologies than I can easily remember:

- Unity
- GameMaker
- RPG Maker XP, RPG Maker MV
- Pokémon Essentials
- Phaser
- PixiJS
- Custom JavaScript engines and render loops
- Python + Pygame
- Browser-based prototypes
- Custom renderers and low-level experiments

Some were powerful.
Some were limiting.
Some were great for learning but painful for scaling.

But all of them taught me something.

And all of them slowly pointed me toward the same conclusion.

## Code First, Always

I’m a fullstack web developer by background.

My natural workflow is code-first.

When I design systems, I imagine structures, flows, and behaviors directly in the editor. I like defining logic, data, and relationships with code and then watching those ideas come alive when I hit run.

Visual editors are great. Node graphs, inspectors, drag-and-drop components — they help many developers move faster.

But for me, they often feel like an extra translation layer.

Instead of:

> Think → Code → Execute

It becomes:

> Think → Click → Drag → Configure → Debug UI → Execute

And that breaks my mental flow.

Again, this is not about engines being bad.

It’s about personal mindflow.

## Why I Avoid Both Extremes

There’s another important detail about my preferences.

I don’t want to work directly with low-level graphics APIs like Vulkan or DirectX.

But I also don’t like massive engine abstractions that hide everything behind layers of magic.

That’s why I never seriously used Unreal.

I live somewhere in the middle:

- Close enough to the metal to understand what’s happening
- High-level enough to stay productive
- Simple enough to reason about
- Flexible enough to extend

Raylib fits this philosophy almost perfectly.

## Finding Balance With Raylib and Godot Ideas

At some point, I found myself coming back again and again to two ideas:

**Raylib**, because it gives me freedom and simplicity.
No heavy abstractions. No magic. Just code, rendering, input, and control.

**Godot**, not just as an engine, but as architectural inspiration.
Its scene tree, composition model, and modular design made sense to me from a software engineering perspective.

That combination clicked.

It wasn’t about copying either tool.

It was about building something that matched how I think.

## Trying “Too Many” Languages

Along this journey, I didn’t just change engines.

I changed languages. A lot.

From mainstream ones to more experimental ones:

- JavaScript
- Python
- Ruby
- C++
- Odin
- D
- Crystal
- Haxe

Each one taught me different lessons about:

- Type systems
- Performance models
- Tooling ecosystems
- Compile-time vs runtime tradeoffs
- Syntax design

Eventually, I settled on **C#**.

Not just because I already use it at work — but because it has evolved into a language that borrows the best ideas from many ecosystems:

- Strong tooling
- Modern syntax features
- Great async model
- Performance improvements
- Excellent editor support
- Cross-platform ecosystem

It became the best balance between productivity and control.

## Building My Own Engine (Multiple Times)

Since then, I’ve built and rebuilt my own engine more times than I can count:

- Raylib-based engines
- Custom editors using Dear ImGui
- GameMaker-style workflows
- ECS systems with messaging and coroutines
- Godot-inspired scene trees with components
- Lightweight physics systems with collisions, hitboxes, knockback, and pushable objects

Some versions were abandoned.

Some were rewritten.

Some were ugly prototypes.

But all of them taught me something.

Every iteration refined my taste and sharpened my design instincts.

## The “Engine First” Trap

For a long time, I had another problem.

I had many game ideas — but most of them were big ideas with huge scope.

And game development always felt like a secondary task.

Because I kept telling myself:

> “First I need the engine. Then I’ll make the game.”

So the engine kept growing…

And the game never started.

Then I realized something obvious:

**Most engines were born from games. Not the other way around.**

That idea changed everything.

## Building a Small Game Alongside the Engine

Now I build a small game at the same time as the engine.

Not a dream project.
Not a massive RPG.
Just something real.

This gives me:

- Real constraints
- Real feedback
- Real problems
- Real validation

If something feels bad while building the game, the engine design is wrong.

Simple as that.

Now the engine is shaped by gameplay — not by theory.

## The Engine Was Never the Real Goal

Here’s the final realization:

I wasn’t chasing the perfect engine.

I was chasing the perfect _developer experience_.

A workflow that:

- Matches how I think
- Keeps logic visible
- Feels expressive
- Stays predictable
- Doesn’t fight me

The engine is just the vehicle.

The real product is the creative flow.

## Where I Am Now

Today my approach is calmer and more focused:

- Raylib as foundation
- C# as primary language
- Composition-first architecture
- Code-driven tooling
- Small, focused systems

I still experiment.

I still refactor.

But now it feels like evolution — not chaos.

## Final Thoughts

If you’re also looping between tools, engines, and languages:

You’re probably not lost.

You’re just discovering what kind of developer you actually are.

Eventually, you stop waiting for perfection…

And start building systems that grow with you.
