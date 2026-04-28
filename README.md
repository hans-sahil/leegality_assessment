# 🛍️ E-Commerce Product Listing App

A modern, responsive product listing application built using Next.js, React Query, and Tailwind CSS. It supports filtering, sorting, search, and pagination with a clean UI and optimized data fetching.

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 🧠 Assumptions Made

- This is a **medium-scale frontend assessment**, not a full production-grade enterprise app.
- Global state management tools like Redux were **intentionally avoided** to reduce complexity.
- Instead, **React Query (TanStack Query)** is used for:
  - API data fetching
  - Caching
  - Synchronization

- Filters are managed using **local component state**, which is sufficient for this scope.

---

## 🏗️ Architectural Decisions

### 1. **Data Fetching Layer**

- Used **TanStack Query** for:
  - Automatic caching
  - Background refetching
  - Loading & error states

- Centralized API logic in `/lib/api.ts`

---

### 2. **Component Structure**

- Modular and reusable components:
  - `ProductCard`
  - `Filters`
  - `Pagination`
  - `Header`

- Separation of concerns:
  - UI components vs data hooks (`useProducts`, `useCategories`)

---

### 3. **State Management**

- Local state (`useState`) used for filters
- Debounced filters to prevent excessive API calls
- Pagination controlled via state instead of URL

---

### 4. **Performance Optimizations**

- Debouncing filter updates
- Memoization (`useMemo`) for derived values
- Avoided unnecessary re-renders
- API results cached via React Query

---

### 5. **UI/UX Decisions**

- Responsive layout using Tailwind CSS
- Collapsible filter sections
- Clean empty state UI
- Skeleton loaders for better perceived performance
- Search with suggestions dropdown

---

### 6. **Type Safety**

- Strong TypeScript usage across:
  - API layer
  - Components
  - Filters

- Avoided `any` to ensure better maintainability

---

## ⚡ Features Implemented

- Product listing with pagination
- Category, brand, and price filtering
- Sorting (price & rating)
- Search with suggestions
- Debounced API calls
- Responsive design
- Loading skeletons
- Empty state handling

---

## 🔮 Improvements (If Given More Time)

### 1. **Authentication**

- Implement login using:
  - https://dummyjson.com/auth/login

- Manage user sessions

---

### 2. **Admin Dashboard**

- Add product management features:
  - Create: https://dummyjson.com/products/add
  - Update/Delete: https://dummyjson.com/products/1

---

### 3. **Cart Functionality**

- Add products to cart:
- https://dummyjson.com/carts/add
- Show cart summary and checkout flow

---

### 6. **Testing**

- Unit tests using Jest / React Testing Library
- Integration tests for API flows

---

## 🧩 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query**
- **Lucide React Icons**
- **shadcn/ui**

---

## 📌 Final Notes

This project focuses on **clean architecture, scalability, and user experience** while keeping the implementation simple and maintainable for the given scope.

---
