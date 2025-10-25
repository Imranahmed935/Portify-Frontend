
# 🌐 Portify (Next.js + TypeScript)

A **modern, responsive portfolio website frontend** built with **Next.js (TypeScript)** and **Tailwind CSS**, featuring a dashboard for admin content management, dynamic blogs, and project showcases.
The app integrates **NextAuth** for secure login and connects with the **Express + Prisma/MongoDB** backend API.

---

## 🔗 Live Demo

👉 **Frontend (Live):** [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)
👉 **Backend API:** [https://your-backend-server.onrender.com](https://your-backend-server.onrender.com)

---

## 🧠 Overview

This frontend acts as the **public and admin interface** for the portfolio system.

* Visitors can explore **About Me**, **Projects**, and **Blogs**.
* The owner (admin) can log in and manage content through a **private dashboard**.
* Uses **Incremental Static Regeneration (ISR)** for better SEO and faster load times.

---

## ✨ Features

### 🌍 Public Features

* 🏠 **Home/About Me** — Static profile info, fetched using **SSG**.
* 💼 **Projects Page** — Dynamic project showcase using **ISR**.
* 📰 **Blog Page** — Fetches blogs from backend and supports static generation.
* 📖 **Single Blog Page** — Uses `getStaticPaths` + `revalidate` for on-demand generation.

### 🔐 Private (Admin Only)

* 🔑 **Login with NextAuth** using backend credentials.
* 🧭 **Dashboard** – Accessible only by the logged-in admin.
* 📝 **Create/Edit/Delete Blogs** securely.
* 💻 **Create/Edit/Delete Projects** dynamically.

---

## 🧰 Tech Stack

| Category       | Technology                       |
| -------------- | -------------------------------- |
| Framework      | Next.js (App Router, TypeScript) |
| Styling        | Tailwind CSS                     |
| Forms          | React Hook Form + Zod            |
| Authentication | NextAuth (JWT-based)             |
| Notifications  | react-hot-toast                  |
| UI Library     | shadcn/ui                        |
| Icons          | Lucide-react                     |
| Deployment     | Vercel                           |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/portfolio-frontend.git
cd portfolio-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

If using GitHub/Google OAuth in the future, also include:

```bash
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

---

## 🧩 Available Scripts

| Command         | Description                                         |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Start development server at `http://localhost:3000` |
| `npm run build` | Build for production                                |
| `npm start`     | Run production build                                |
| `npm run lint`  | Check code for lint errors                          |

---

## 📁 Folder Structure

```
portfolio-frontend/
│
├── app/
│   ├── (public pages)
│   ├── dashboard/         # Admin area (protected)
│   ├── api/               # NextAuth API routes
│
├── components/
│   ├── ui/                # shadcn UI components
│   ├── modules/           # Page sections (Hero, About, etc.)
│
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Tailwind and global CSS
└── README.md
```

---

## 🔒 Authentication Flow

1. Admin logs in via NextAuth credentials provider.
2. NextAuth sends credentials to backend for validation.
3. If valid → JWT is returned and stored in session.
4. Dashboard pages use `useSession()` to protect routes.
5. Non-admin users can’t access private routes or links.

---

## 💬 Form Validation

All forms (login, blog, project) include:

* Required field validation
* Error messages via `FormMessage`
* Toast notifications for success/error feedback

---

## 🎨 UI/UX Enhancements

* Fully responsive (mobile → desktop)
* Smooth transitions & shadows
* Consistent theme using Tailwind utility classes
* Accessible semantic HTML
* Toasts for user feedback

---

## 🚀 Deployment

**Frontend Hosting:** [Vercel](https://vercel.com)

#### Steps:

1. Push your code to GitHub.
2. Import your repo on [Vercel](https://vercel.com/new).
3. Add environment variables in Vercel dashboard.
4. Deploy 🚀

---

## 🧾 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

Developed by **Your Name**
📧 Email: [your.email@example.com](mailto:imrantahir9918@gmail.com)
🌍 Portfolio: [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)
💼 GitHub: [https://github.com/your-username](https://github.com/your-username)


