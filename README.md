# AIgency

An AI art generation and prompt marketplace platform powered by Supabase.

## Installation & Setup

### Prerequisites

- Node.js 20 or higher
- npm
- Supabase project

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase (required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Encryption (required for prompt content)
FIELD_ENCRYPTION_KEY_B64=your-32-byte-base64-key

# Thirdweb (required for wallet connection and payments)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key

# Gemini (optional - for prompt enhancement)
GEMINI_API_KEY=
```

### Supabase Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  display_name text,
  bio text,
  avatar_url text,
  stats jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prompts table
CREATE TABLE IF NOT EXISTS public.prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  encrypted_content text NOT NULL,
  iv text NOT NULL,
  auth_tag text NOT NULL,
  user_id text,
  category text,
  tags text[],
  ai_model text DEFAULT 'gemini',
  price numeric DEFAULT 1,
  aspect_ratio text,
  photo_count integer DEFAULT 1,
  prompt_type text DEFAULT 'create-now',
  uploaded_photos text[],
  resolution text,
  is_free_showcase boolean DEFAULT false,
  public_prompt_text text,
  downloads integer DEFAULT 0,
  rating numeric DEFAULT 0,
  is_featured boolean DEFAULT false,
  published_at timestamptz,
  ai_settings jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Variables table
CREATE TABLE IF NOT EXISTS public.variables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES public.prompts(id) ON DELETE CASCADE,
  name text NOT NULL,
  label text NOT NULL,
  description text,
  type text NOT NULL,
  default_value jsonb,
  required boolean DEFAULT false,
  position integer DEFAULT 0,
  min integer,
  max integer,
  options jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Generations table (image history)
CREATE TABLE IF NOT EXISTS public.generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key text NOT NULL,
  prompt text,
  image_url text NOT NULL,
  provider text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON public.prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON public.prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_variables_prompt_id ON public.variables(prompt_id);
CREATE INDEX IF NOT EXISTS idx_generations_user_key ON public.generations(user_key, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth & Wallets**: Thirdweb (In-App Wallets with email, Google, phone, passkeys)
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI + shadcn/ui
- **Image Generation**: Pollinations API + Gemini (optional enhancement)
