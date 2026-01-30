---
title: Building My GOM (Game Object Model) System
description: How I designed a component-based game object architecture for my 2D game engine.
date: 2026-01-15
project: game-engine
tags: [gamedev, csharp, raylib]
draft: false
---

## Introduction

While working on my 2D action RPG, I quickly started struggling with traditional object-oriented approaches. Creating a `Player` that inherited from `Character`, which inherited from `Entity`, became unwieldy the moment I wanted to add new behaviors or create objects that didn’t fit cleanly into those hierarchies.

Inspired by the component systems I had previously used in Unity and Godot, I decided to build my own **Game Object Model (GOM)** — a flexible, component-based architecture that favors composition over inheritance.

My main goal was simple: make it easy to create diverse game entities without running into deep inheritance trees, rigid class structures, or the infamous diamond problem.

## How I Designed the Core Architecture

### The Foundation: GameObject

I started by designing the `GameObject` class as the foundation of the system — a minimal entity capable of representing any interactive object in the game world. Inspired by Unity’s GameObject concept, I kept it intentionally small and focused:

```csharp
public abstract class GameObject : IReadonlyGameObject
{
    public Vector2 Position { get; set; } = Vector2.Zero;
    public GameObjectStateMachine States { get; } = new();
    public IReadOnlyList<GameObjectComponent> Components => components;
    // ...
}
```

Each GameObject exposes three fundamental concepts:

- **Position** — The object’s location in 2D space
- **Components** — A collection of modular behaviors
- **States** — A state machine for managing complex behavior

This separation helped keep responsibilities clear and predictable.

## My Component System: Learning from Unity and Godot

Having worked with Unity’s component system and Godot’s node-based architecture, I wanted to capture the best ideas from both worlds.

Instead of building large inheritance chains, I broke behaviors into small, reusable components:

```csharp
public class GameObjectComponent
{
    protected IReadonlyGameObject Owner { get; }

    public virtual void Update(float dt) { }
    public virtual void Draw(Vector2 position) { }
    public virtual void Debug() { }
}
```

Each component focuses on a single responsibility and has access to its owning GameObject through the `Owner` reference.

This approach made behavior modular, reusable, and easy to reason about.

### Core Components I Built

These are some of the foundational components I implemented early on.

#### Sprite Component — Rendering

Handles basic texture rendering:

```csharp
public class Sprite : GameObjectComponent
{
    public Texture2D Texture { get; set; }
    public Vector2 Anchor { get; set; } = Vector2.Zero;
    public float Rotation { get; set; }
    public Color Tint { get; set; } = Color.White;
    public float Scale { get; set; } = 1.0f;
}
```

#### AnimatedSprite Component — Animations

Manages frame-based animations:

```csharp
public class AnimatedSprite : Sprite
{
    public void Play(string name) { /* ... */ }
    public void AddAnimation(string name, Animation animation) { /* ... */ }
}
```

#### Collider Component — Physics and Collisions

Handles collision detection and interaction logic:

```csharp
public class Collider : GameObjectComponent
{
    public Vector2 Offset { get; set; }
    public Vector2 Size { get; set; }
    public bool Solid { get; set; } = true;
    public GameObjectGroup CollisionMask { get; set; }
}
```

## Adding State Management for Complex Behavior

One limitation I noticed with pure component systems is handling complex state-driven logic (movement states, attack phases, animations, etc.).

Inspired by common Godot state machine patterns, I integrated a finite state machine directly into each GameObject:

```csharp
public class GameObjectStateMachine
{
    public GameObjectState? ActiveState { get; private set; }

    public void Register<T>(T state) where T : GameObjectState { /* ... */ }
    public void Transition<T>() where T : GameObjectState { /* ... */ }
}
```

States encapsulate behavior logic and allow clean transitions based on player input or game events.

This helped me avoid large conditional blocks inside Update loops.

## Designing the GameObject Lifecycle

I wanted a lifecycle that was simple, predictable, and easy to debug.

### 1. Creation and Setup

```csharp
public class Player : GameObject
{
    public Player() : base()
    {
        var animatedSprite = new AnimatedSprite() { /* ... */ };
        Add(animatedSprite);

        States.Register(new PlayerMoving());
        States.SetInitial<PlayerMoving>();
    }
}
```

### 2. Initialization Phase

```csharp
public virtual void Initialize()
{
    States.Attach(this);
    components.ForEach(c => c.Attach(this));
}
```

This ensures that all components and states are properly connected before gameplay begins.

### 3. Update Loop

```csharp
public virtual void Update(float dt)
{
    States.ActiveState?.Update(dt);
    components.ForEach(c => c.Update(dt));
}
```

States run first, followed by all component updates.

### 4. Rendering Phase

```csharp
public virtual void Draw()
{
    components.ForEach(c => c.Draw(Position));
}
```

Rendering responsibility stays inside visual components.

## Putting It All Together: Player Implementation

Here’s how the Player object comes together using this architecture:

```csharp
public class Player : GameObject
{
    public Player() : base()
    {
        var animatedSprite = new AnimatedSprite()
        {
            Texture = AssetsManager.Textures["Sprites/base"],
            Anchor = new Vector2(8, 16)
        };

        animatedSprite.AddAnimation("WalkDown", new Animation
        {
            Frames = [new Rectangle(0, 16, 16, 16), new Rectangle(16, 16, 16, 16)],
            FrameDuration = 0.2f
        });

        Add(animatedSprite);
        Add(new CameraTargetComponent());
        Add(new FacingDirection());

        var collider = new Collider
        {
            Offset = new Vector2(-4, -8),
            Size = new Vector2(8, 8),
            Solid = false,
            CollisionMask = GameObjectGroup.Obstacle
        };

        Add(collider);

        States.Register(new PlayerMoving());
        States.SetInitial<PlayerMoving>();
    }
}
```

This setup demonstrates how behaviors are composed:

- `AnimatedSprite` handles visuals
- `CameraTargetComponent` manages camera following
- `FacingDirection` tracks orientation
- `Collider` handles physics
- `PlayerMoving` controls input and movement logic

## Advanced Features

### Type-Safe Component Retrieval

Inspired by Unity’s `GetComponent<T>()`, I implemented a cached lookup system:

```csharp
public T? Get<T>() where T : GameObjectComponent
{
    var type = typeof(T);
    if (!componentCache.TryGetValue(type, out var cached))
    {
        cached = components.FirstOrDefault(c => c is T);
        componentCache[type] = cached;
    }
    return cached as T;
}
```

Usage:

```csharp
var sprite = player.Get<AnimatedSprite>();
var collider = player.Get<Collider>();
```

This provides clean syntax with O(1) access after the first lookup.

### Event-Driven Collision System

I designed collisions to behave similarly to Unity’s trigger events:

```csharp
public class Collider : GameObjectComponent
{
    public Action<Collider>? OnCollisionEnter { get; set; }
    public Action<Collider>? OnCollisionStay { get; set; }
    public Action<Collider>? OnCollisionExit { get; set; }
}
```

Example usage:

```csharp
treasureCollider.OnCollisionEnter = (other) =>
{
    if (other.Owner is Player)
        treasure.Collect();
};
```

### Collision Groups

To organize interactions, I implemented group filtering:

```csharp
public enum GameObjectGroup
{
    Player,
    Enemy,
    Obstacle,
}
```

Usage:

```csharp
CollisionMask = GameObjectGroup.Player | GameObjectGroup.Enemy;
```

## What This GOM System Gives Me

### Modularity

Components can be mixed and matched freely.

### Reusability

The same components work across different object types.

### Performance

- Cached component lookups
- Focused updates per system
- Efficient state switching

### Maintainability

- Clear separation of responsibilities
- Easy feature expansion
- Predictable lifecycle

### Debug Support

```csharp
public virtual void Debug()
{
    DrawCircleV(Position, 2, Color.Green);
    components.ForEach(c => c.Debug());
}
```

## Reflection: What I Learned

Building this GOM system taught me the real value of composition over inheritance.

Instead of trying to predict every possible object type upfront, I now build behavior using small, focused building blocks.

Need a chest that follows the player? Add a camera target.
Need an enemy that opens doors? Combine interaction and movement components.

This mindset has made my engine more flexible, my codebase easier to maintain, and my development process far more enjoyable.

If you’re building your own engine or struggling with rigid class hierarchies, I highly recommend exploring component-based architectures. Start simple, learn from existing engines, and adapt the ideas to match your own workflow.
