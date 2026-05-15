# Angular 21 Authentication & User Management Boilerplate

A comprehensive Angular 21 boilerplate featuring a full authentication flow, user management, and an admin dashboard. This project uses a fake backend for demonstration purposes, allowing you to run it immediately without a real database.

## 🚀 Features

- **Authentication:** Login, Registration, Email Verification.
- **Password Management:** Forgot Password, Reset Password.
- **User Profile:** View and Update profile details.
- **Admin Dashboard:**
    - Role-based access control (Admin only).
    - Manage all user accounts (Create, Edit, Delete).
- **Architecture:**
    - **JWT Interceptor:** Automatically attaches tokens to API requests.
    - **Error Interceptor:** Centralized error handling and automatic logout on 401/403.
    - **Auth Guard:** Protects routes based on authentication status and user roles.
    - **Fake Backend:** Simulates a REST API with `localStorage` persistence.
    - **Path Aliases:** Uses `@app/*` and `@environments/*` for clean imports.

## 🛠️ Prerequisites

- **Node.js:** v18.x or higher (v20+ recommended)
- **Angular CLI:** v17.x or higher

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Angular-21-Auth-Boiler
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🏃 Running the Project

1. **Start the development server:**
   ```bash
   npm start
   ```
2. **Open your browser:**
   Navigate to [http://localhost:4200/](http://localhost:4200/)

### Default Credentials (Fake Backend)
- **Admin Email:** `admin@example.com`
- **Password:** `password123`

## 🏗️ Project Structure

- `src/app/_components`: Reusable UI components (e.g., Alert).
- `src/app/_helpers`: Interceptors, Guards, and the Fake Backend logic.
- `src/app/_models`: TypeScript interfaces and classes for data (Account, Role, Alert).
- `src/app/_services`: Services for API communication (Account, Alert).
- `src/app/account`: Components for the authentication flow (Login, Register, Reset).
- `src/app/admin`: Admin-specific components and account management modules.
- `src/app/profile`: User profile management components.

## 🔧 Configuration

The project uses TypeScript path aliases defined in `tsconfig.json`:
- `@app/*` maps to `src/app/*`
- `@environments/*` maps to `src/environments/*`

## 🧪 Testing

- **Unit Tests:** Run `npm test` to execute tests via Karma.
- **Linting:** (Optional) Add your preferred linter.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Created by [Wilson Gayo](https://wilschoy78.github.io/)
