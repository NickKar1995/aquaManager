# Aquaculture Production Management UI

<p align="center"><a href="https://devexpress.github.io/devextreme-angular/" target="_blank"><img src="https://skillicons.dev/icons?i=angular" /></a></p>

A modern, dynamic, business-grade Angular application that simulates the core workflows of an aquaculture production environment, tailored for performance, modularity, and user experience.

## 🌟 Objective

To showcase real-world front-end architecture and implementation of a fish farm management system with:

* Fully interactive cage and fish operations
* Advanced grid-based UIs
* Real-time, reactive state management
* Scalability-focused architecture

---

## 🔧 Tech Stack

* **Angular** (v19.2.0) – Modern web framework
* **DevExtreme** – UI library for all forms, grids & pivot charts
* **Angular Signals** – Reactive state and computed values
* **LocalStorage** – For persistent mock data
* **Prettier & ESLint** – Configured for consistency, scalability, and team collaboration

---

## ⚙️ Key Features

### 🪝 Signals-Driven Reactive Architecture

* Used Angular Signals across the app for reactive state flow.
* Achieved fine-grained reactivity and fully declarative updates without RxJS boilerplate.

### 🧱 Modular Structure

* Feature-based folders with lazy-loaded modules
* Shared UI and logic layers
* Clear separation between components, services, and domain logic

### 💥 Lazy Loading with Smart Preloading

* Each core domain (Cages, Stocking, Mortality, Transfers, Analysis) is a standalone lazy module
* PreloadingStrategy implemented to anticipate user flows for instant interaction

### 📊 DevExtreme Power

* All views powered by DevExtreme DataGrid, Forms, PivotGrid, and Chart widgets
* In-place editing, validation, error states, and visual feedback using the DevExtreme reactive API

### 🧠 Core Business Rules Enforced

* Real-time validation prevents invalid fish transfers
* Stock balances never drop below 0
* Visual warnings and UI blocks when business constraints are violated

### 📈 Pivot-Style Mortality Dashboard

* Drag-and-drop pivot controls
* Breakdown by cage, month, or year
* Insights powered directly from transactional data with no backend snapshots

---

## 🗂️ Project Structure

```
/src
├── app
│   ├── core/                 # Singleton services, interceptors
│   ├── shared/               # Reusable UI and utility components
│   └── features/             # Feature modules
│       ├── cages/            
│       ├── daily-stock-balance/
│       ├── fish-stocking/
│       ├── fish-transfers/
│       ├── mortalities/
│       └── pivot-analysis/
```

---

## 🧺 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NickKar1995/aquaManager.git
cd aquaManager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
ng serve
```

### 4. Build for production

```bash
ng build --configuration production
```

---

## 🤖 AI Tools Used

* **Claude** – Assisted with architectural suggestions, UX polish ideas, and TypeScript helpers.
* **Gemini** – Evaluated thought process on complex data structure analysis.

All code has been reviewed, optimized, and understood by me.

---

## ✅ Evaluation Highlights

* ✅ Fully working, feature-rich Angular UI
* ✅ Stock logic, validation, and dynamic behavior implemented end-to-end
* ✅ Strong UX focus with minimal friction
* ✅ Built for extensibility, scalability, and real-world adaptation

---

## 📃 License

This project is provided as a technical demonstration and is free to use for evaluation and educational purposes.

---

Enjoy building and managing your digital fish farm ecosystem! 🐟🌊
