# Vercel Deployment Guide

This guide will help you deploy AIgency to Vercel successfully.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub repository connected to Vercel
3. Required API keys and credentials

## Required Environment Variables

You must configure these environment variables in your Vercel project settings before deployment:

### 🔴 Critical (Required for Build & Runtime)

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# AI Service
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Blockchain
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
TREASURY_ADDRESS=0xYourTreasuryAddressHere

# Security (MUST be at least 32 characters!)
JWT_SECRET=your_jwt_secret_minimum_32_characters_long_here
SESSION_SECRET=your_session_secret_minimum_32_characters_long_here
```

### 🟡 Recommended

```bash
# Application
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
CORS_ORIGINS=https://your-app.vercel.app

# Logging
LOG_LEVEL=info
```

### 🟢 Optional

```bash
# Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
IPFS_GATEWAY_URL=https://api.universalprofile.cloud/ipfs

# Feature Flags
ENABLE_IPFS_STORAGE=false
ENABLE_LUKSO_PROFILES=true
ENABLE_PAYMENTS=false
ENABLE_ANALYTICS=false

# Monitoring
SENTRY_DSN=your_sentry_dsn
```

## Step-by-Step Deployment

### 1. Generate Secrets

Generate strong secrets for JWT and SESSION:

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate SESSION_SECRET
openssl rand -base64 32
```

### 2. Set Up Database

You'll need a PostgreSQL database. Options:

- **Vercel Postgres**: Create a Postgres database in your Vercel project
- **Supabase**: Sign up at https://supabase.com
- **Railway**: Sign up at https://railway.app
- **Neon**: Sign up at https://neon.tech

Copy the connection string (DATABASE_URL).

### 3. Get API Keys

#### Google Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy the key

#### Thirdweb Secret Key
1. Go to https://thirdweb.com/dashboard
2. Create or select a project
3. Go to Settings → API Keys
4. Create a secret key
5. Copy the key

### 4. Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each required variable:
   - Click **Add New**
   - Enter the variable name (e.g., `DATABASE_URL`)
   - Enter the value
   - Select environments: **Production**, **Preview**, and **Development**
   - Click **Save**

### 5. Deploy

#### Option A: Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Vercel will automatically deploy
3. Monitor the deployment logs

#### Option B: Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 6. Verify Deployment

After deployment completes:

1. Visit your deployment URL
2. Check the health endpoint: `https://your-app.vercel.app/api/health`
3. You should see a JSON response with service statuses

## Troubleshooting

### Build Fails with "String must contain at least 32 character(s)"

**Problem**: `JWT_SECRET` or `SESSION_SECRET` is too short or missing.

**Solution**:
1. Generate a new secret: `openssl rand -base64 32`
2. Add it to Vercel environment variables
3. Ensure it's added to all environments (Production, Preview, Development)
4. Redeploy

### Database Connection Errors

**Problem**: Can't connect to database.

**Solution**:
1. Verify `DATABASE_URL` is correctly formatted
2. Check if your database allows connections from Vercel IPs
3. Ensure SSL is enabled if required
4. Test connection locally first

### API Routes Return 500 Errors

**Problem**: Missing environment variables at runtime.

**Solution**:
1. Check `/api/health` endpoint for detailed error info
2. Verify all required env vars are set in Vercel
3. Check deployment logs for specific errors
4. Ensure environment variables are set for the correct environment

### Build Succeeds but App Doesn't Work

**Problem**: Environment variables not applied or wrong values.

**Solution**:
1. After changing env vars, trigger a new deployment
2. Environment variables are only applied during build/deployment
3. Use the "Redeploy" button in Vercel dashboard

## Environment Variable Checklist

Before deploying, ensure you have:

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `GOOGLE_GEMINI_API_KEY` - From Google AI Studio
- [ ] `THIRDWEB_SECRET_KEY` - From Thirdweb dashboard
- [ ] `TREASURY_ADDRESS` - Valid Ethereum address (0x...)
- [ ] `JWT_SECRET` - At least 32 characters
- [ ] `SESSION_SECRET` - At least 32 characters
- [ ] `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL
- [ ] `CORS_ORIGINS` - Your Vercel deployment URL

## Post-Deployment

### Set Up Custom Domain (Optional)

1. Go to Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update `NEXT_PUBLIC_APP_URL` and `CORS_ORIGINS` to match
4. Redeploy

### Monitor Your App

1. Check Vercel Analytics for performance insights
2. Set up Sentry for error tracking (add `SENTRY_DSN`)
3. Monitor database usage and connections
4. Review API rate limits

## Security Best Practices

1. **Never commit secrets to Git**
   - Use `.env.local` for local development
   - Keep `.env.example` updated without real values

2. **Rotate secrets regularly**
   - Change `JWT_SECRET` and `SESSION_SECRET` periodically
   - Update API keys if compromised

3. **Use different secrets per environment**
   - Production should have different secrets than Preview/Development

4. **Restrict CORS origins**
   - Only allow your actual domain(s)
   - Don't use wildcards (`*`) in production

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review `/api/health` endpoint response
3. Check browser console for client-side errors
4. Review GitHub Issues for similar problems

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
