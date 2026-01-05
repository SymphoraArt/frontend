# Vercel Deployment Guide

## 🚀 Quick Setup

### 1. Required Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

#### **Required for Build & Runtime:**
```bash
# Thirdweb (REQUIRED)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key

# Server Wallet (REQUIRED)
SERVER_WALLET_ADDRESS=0xYourServerWalletAddress

# Privy (REQUIRED for wallet connection)
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_PRIVY_CLIENT_ID=your_privy_client_id

# Supabase (REQUIRED for database)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### **Optional (for full functionality):**
```bash
# MongoDB (Optional - for reputation system)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Gemini API (Optional - for prompt enhancement)
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_API_KEY=your_gemini_api_key  # Alternative name

# Application URL (Optional - auto-detected)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 2. Vercel Build Settings

**Build Command:** `npm run build` (default)
**Output Directory:** `.next` (default)
**Install Command:** `npm install` (default)

**Node.js Version:** 20.x or higher (set in Vercel project settings)

### 3. Common Build Issues & Fixes

#### Issue 1: `THIRDWEB_SECRET_KEY is not set`
**Fix:** Add `THIRDWEB_SECRET_KEY` to Vercel environment variables
- The build will still succeed, but X402 payments won't work at runtime

#### Issue 2: `SERVER_WALLET_ADDRESS is not set`
**Fix:** Add `SERVER_WALLET_ADDRESS` to Vercel environment variables
- Required for receiving payments

#### Issue 3: Module not found errors
**Fix:** Ensure all dependencies are in `package.json` (they are ✅)

#### Issue 4: TypeScript errors
**Fix:** The build should pass TypeScript checks. If not, check:
- All path aliases are correct in `tsconfig.json` ✅
- All imports use correct paths ✅

#### Issue 5: Build timeout
**Fix:** Vercel free tier has 45min limit. If timeout:
- Check for infinite loops in build scripts
- Optimize dependencies
- Contact Vercel support for higher limits

### 4. Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads: `https://your-app.vercel.app`
- [ ] Wallet connection works (Privy)
- [ ] Image generation works: `/generator/[id]`
- [ ] X402 payment modal appears when clicking "Generate"
- [ ] API routes respond: `/api/generate-image`, `/api/prompts`

### 5. Environment Variable Priority

Vercel uses this order (highest to lowest):
1. **Environment-specific** (Production, Preview, Development)
2. **Project-level** (all environments)
3. **System** (Vercel defaults)

**Recommendation:** Set all required variables at **Project-level** for consistency.

### 6. Debugging Build Logs

If build fails, check:
1. **Build logs** in Vercel dashboard
2. **Function logs** for runtime errors
3. **Network tab** in browser for API errors

Common error patterns:
- `Module not found` → Missing dependency
- `Cannot find module '@/...'` → Path alias issue
- `process.env.X is undefined` → Missing env var
- `500 Internal Server Error` → Runtime env var missing

### 7. Testing Locally Before Deploy

```bash
# Test production build locally
npm run build
npm run start

# Test with Vercel CLI
npm i -g vercel
vercel
```

### 8. Vercel Configuration (Optional)

Create `vercel.json` if you need custom settings:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

---

## ✅ Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ All routes are accessible
- ✅ Wallet connection works
- ✅ Payment modal appears
- ✅ Image generation succeeds

---

## 🆘 Need Help?

If build fails:
1. Check Vercel build logs for specific error
2. Verify all required env vars are set
3. Test build locally: `npm run build`
4. Check Node.js version (should be 20+)

