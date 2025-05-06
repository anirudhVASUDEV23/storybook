# 🌟 Enterprise Design System

A scalable, reusable component library built with **React**, **TypeScript**, **TailwindCSS**, and **Storybook** for enterprise-grade applications.

## 🔗 Links

- **GitHub Repo:** [anirudhVASUDEV23/storybook](https://github.com/anirudhVASUDEV23/storybook)
- **Storybook Live Preview:** [Open Storybook](https://681976f77b1c41f3c4361f7b-tpkjibxgrk.chromatic.com/)
---

## 📁 Folder Structure

- `src/`
  - `components/`
    - `feedback/`
      - `index.ts`
      - `Modal.tsx`
      - `Modal.stories.tsx`
      - `Toast.tsx`
      - `Toast.stories.tsx`
    - `inputs/`
      - `index.ts`
      - `TextInput.tsx`
      - `TextInput.stories.tsx`
      - `Dropdown.tsx`
      - `Dropdown.stories.tsx`
    - `typography/`
      - `index.ts`
      - `Typography.tsx`
      - `Typography.stories.tsx`
    - `ui/`
      - `index.ts`
      - `Button.tsx`
  - `lib/`
    - `utils.ts`
  - `App.tsx`
  - `main.tsx`
  - `index.css`
  - `vite-env.d.ts`


## 🚀 Tech Stack

- **React + TypeScript**
- **TailwindCSS**
- **Storybook** for UI documentation
- **Vite** for bundling and fast dev experience

---

## 📦 Available Components

### 🧱 Typography
- `Typography.tsx`
  - Supports: Headings (H1–H6), Paragraphs, Captions, Labels
  - Responsive, accessible contrast, light/dark theming
  - Uses design tokens for `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`

### 🧩 Inputs
- `TextInput.tsx`
- `Dropdown.tsx`
  - States: default, hover, focus, error, disabled
  - Variants: size options, icon support
  - ARIA roles & keyboard navigation

### ⚠️ Feedback
- `Modal.tsx`
- `Toast.tsx`
  - Configurable content, mount/unmount behavior
  - ARIA roles, accessible focus management
  - Size and variant support (info, success, warning, error)

---

## 📘 Storybook Documentation

### ✅ What's Included
- Component **name** + **description**
- **Props / API reference**
- **Usage examples** + use cases
- **Structure & anatomy**
- **Variants & states**
- **Interaction behavior**
- **Accessibility notes**
- **Theming** (light/dark)
- **Best practices / Do’s and Don’ts**
