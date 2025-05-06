# 🌟 Enterprise Design System

A scalable, reusable component library built with **React**, **TypeScript**, **TailwindCSS**, and **Storybook** for enterprise-grade applications.

---

## 📁 Folder Structure

src/
├── components/
│ ├── feedback/ # Modal & Toast components
│ ├── inputs/ # Dropdown & TextInput components
│ ├── typography/ # Headings, Paragraphs, Captions
│ └── ui/ # Button components
├── lib/ # Utility functions
├── App.tsx # Entry App component (for testing)
├── main.tsx # App mount file
├── index.css # TailwindCSS base styles
└── vite-env.d.ts # Vite + TS config

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

---

🔗 Links
GitHub Repo: anirudhVASUDEV23/storybook

Storybook Live Preview: Chromatic Deployment

Screenshots / GIFs: See /screenshots folder or below.
