# AIgency

**A merchant protocol for visual AI prompts: list prompts, set prices, get paid per generation.**

Built for the [X402 Hackathon](https://dorahacks.io/hackathon/x402/tracks) — **Overall Track: Best Agentic App / Agent.**

---

## Hackathon context

- **Hackathon:** [X402 Hackathon on DoraHacks](https://dorahacks.io/hackathon/x402/tracks)
- **Track:** **Best Agentic App / Agent** (Overall Track)
- **Angle:** **Merchant protocol** — creators and agents act as *merchants*: they publish prompt templates, set a price per generation, and receive payment (USDC) via the X402 protocol when users or other agents call the generation API.

AIgency is a **merchant-facing app**: prompt engineers (human or agent) create prompts with variables, release them to a **Marketplace** (paid/free) or **Showroom** (showcase), and earn when others use **Create Now** to generate images. Payments are handled with X402; the app is the merchant that exposes paid endpoints and settles on-chain.

---

## What it does

- **Marketplace & Showroom** — Browse prompts; each card shows price per generation (USDC) or FREE.
- **Prompt Editor** — Create prompts with variables (text, slider, select, checkbox); encrypt content; set price (fractional USDC); release to Marketplace or Showroom.
- **Generator (Create Now)** — Pick a prompt, fill variables, pay per generation (X402), generate an image; result is stored in your gallery.
- **Payments** — X402 flow: wallet connect, pay USDC on supported chains (e.g. Base Sepolia), then call the generation API. The **merchant** (this app) receives payment and serves the generation.

**Merchant protocol in one sentence:** Creators list prompts and set a price; the app exposes paid generation endpoints; X402 handles pay‑before‑call and settlement so the merchant gets paid per use.

---

## Tech stack

| Layer        | Choice |
|-------------|--------|
| **Framework** | Next.js 16 (App Router) |
| **Database**  | **MySQL** (schema in `backend/schema-phpmyadmin.sql`) |
| **Auth & wallets** | Thirdweb (In-App Wallets, connect wallet for payments) |
| **Payments**  | **X402** (pay-per-call, USDC, merchant receives to `SERVER_WALLET_ADDRESS`) |
| **Image generation** | Google Gemini (Nano Banana); optional Pollinations |
| **Styling**  | Tailwind CSS 4, Radix UI, shadcn/ui |

Supabase is **not** used; persistence is **MySQL** only.

---

## Prerequisites

- **Node.js** 20+
- **npm**
- **MySQL** 8 (local or hosted) — e.g. XAMPP, MySQL Server, or a cloud instance
- **Thirdweb** account (client ID + secret key) for wallets and X402
- **Google AI Studio** API key (Gemini) for image generation

---

## Quick start (hackathon)

### 1. Clone and install

```bash
git clone <repo-url>
cd frontend-aman
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` (or create `.env.local`) and set:

```bash
# ---- MySQL (required for prompts, generations, likes) ----
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=symphora

# Or a single connection string:
# DATABASE_URL=mysql://user:password@localhost:3306/symphora

# ---- X402 / Merchant payments (required for Create Now) ----
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
SERVER_WALLET_ADDRESS=0xYourWalletAddress   # Merchant receives payments here

# ---- Encryption (required for prompt content) ----
FIELD_ENCRYPTION_KEY_B64=your_base64_32_byte_key
# Or: PROMPT_ENCRYPTION_KEY=your_32_byte_hex_key

# ---- Image generation (required for Create Now) ----
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

- **Thirdweb:** [thirdweb.com/dashboard](https://thirdweb.com/dashboard) → create app → Client ID + Secret Key.
- **SERVER_WALLET_ADDRESS:** Any EVM address that will receive USDC (e.g. Base Sepolia for testnet).
- **Encryption key:** 32-byte key, base64 or hex; e.g. `openssl rand -base64 32` for `FIELD_ENCRYPTION_KEY_B64`.
- **Gemini:** [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

### 3. Database (MySQL)

Create a database (e.g. `symphora`), then import the schema:

**Option A — phpMyAdmin**

1. Open phpMyAdmin, select (or create) the database.
2. **Import** → choose `backend/schema-phpmyadmin.sql` → **Go**.

**Option B — MySQL CLI**

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS symphora CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p symphora < backend/schema-phpmyadmin.sql
```

The schema creates:

- `symphora_prompts` — marketplace/showroom prompts (encrypted content, variables, pricing).
- `symphora_prompt_likes` — likes per user per prompt.
- `symphora_generations` — user generations (prompt id, user id, variable values, status, image).
- `symphora_users` — optional user profiles.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Connect a wallet, create a prompt in the editor, release it to Marketplace or Showroom, then use **Create Now** on a prompt to pay (X402) and generate an image.

---

## Project layout (relevant to hackathon)

- `app/` — Next.js App Router (pages, API routes).
- `components/` — UI (Navbar, GeneratorInterface, PromptEditor, ArtworkGrid, etc.).
- `backend/` — MySQL schema, Symphora storage, encryption, X402/facilitator, Gemini image generation.
- `hooks/` — useX402PaymentProduction, wallet balance, etc.
- `lib/` — payment config, query client, utils.

**Important API surface (merchant protocol):**

- `POST /api/symphora/prompts` — Create/update prompt (creator).
- `GET /api/symphora/prompts/marketplace` — List marketplace prompts.
- `GET /api/symphora/prompts/showroom` — List showroom prompts.
- `GET /api/prompts/[id]` — Get prompt (for generator).
- `POST /api/generations` — Create generation (variable substitution, encrypt final prompt); then image is generated via X402-paid `/api/generate-image` (or similar) and the merchant receives payment.

---

## X402 and merchant protocol

- **X402** is used for pay‑before‑call: the client obtains a payment token and sends it with the request; the server (this app) verifies and settles, then runs the generation.
- This app is the **merchant**: it defines the resource (e.g. “generate image with this prompt”), sets the price (from prompt’s `pricing.pricePerGeneration`), and receives USDC to `SERVER_WALLET_ADDRESS`.
- **Best Agentic App / Agent** fit: agents can list prompts and earn (merchant); users and other agents can discover prompts and pay to generate (client). The protocol is the same for humans and agents.

---

## License

See repository license file.
