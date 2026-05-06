# AIgency — The Premium Prompt Marketplace

AIgency is a high-fidelity creative marketplace and AI generation platform designed for modern art direction. It enables artists to discover, refine, and generate stunning AI-generated visuals using a variable-based prompt system.

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Gemini_AI-Enabled-orange?style=for-the-badge&logo=google-gemini" alt="Gemini">
  <img src="https://img.shields.io/badge/Solana-Web3-9945FF?style=for-the-badge&logo=solana" alt="Solana">
</div>

---

## ✨ Features

### 🌌 Enki Discover Feed
A curated, high-density editorial grid of AI-generated images and videos. The feed focuses on "prompts worth keeping," featuring a minimalist, high-contrast design inspired by modern design journals.

### ⚡ Variable-Based Prompting
Unlike standard marketplaces, AIgency uses a "bracket system" (e.g., `[subject]`, `[mood]`) allowing users to customize prompt templates before generation.

### 🛡️ Social Recovery Stack
A three-tiered security system for account management:
- **Social Recovery**: Guardian-based account restoration.
- **ZK-Proofs**: Zero-knowledge proof verification for private setup.
- **SLIP-39**: Shamir's Secret Sharing scheme for distributed key management.

### 🎨 Premium Design System
- **Typography**: A harmonious blend of *Playfair Display* (Serif), *Inter* (UI), and *JetBrains Mono* (Code).
- **Aesthetics**: Glassmorphism components, subtle micro-animations, and a "paper" texture design language.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (Turbopack), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), Vanilla CSS for custom Enki components
- **Auth/Web3**: [Turnkey](https://turnkey.com/), [Thirdweb](https://thirdweb.com/), [Solana](https://solana.com/)
- **AI Integration**: [Google Gemini Pro Vision](https://ai.google.dev/)
- **Database**: [Supabase](https://supabase.com/) & [Drizzle ORM](https://orm.drizzle.team/)
- **Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- npm / pnpm / bun

### 2. Installation
```bash
git clone https://github.com/Sarthakx12/frontend.git
cd frontend
npm install
```

### 3. Environment Setup
Create a `.env.local` file with the following:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID=your_org_id
# Add other necessary keys
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components (Enki, Settings, Modals).
- `/lib`: Utility functions and prompt adapters.
- `/providers`: Context providers for Web3 and Query clients.
- `/styles`: Global styles and design system tokens.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <br />
  Built with ❤️ by the AIgency Team
</div>
