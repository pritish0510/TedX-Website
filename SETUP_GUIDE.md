# 🎯 Complete Backend Setup - Step by Step

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Database Setup (Neon)](#database-setup)
4. [Email Setup (Gmail)](#email-setup)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Prerequisites

Before starting, make sure you have:
- ✅ Node.js 18+ installed
- ✅ npm or yarn installed
- ✅ Git installed
- ✅ A Gmail account
- ✅ A code editor (VS Code recommended)

---

## 2️⃣ Installation

### Step 1: Install Dependencies
```bash
npm install
```

This installs all required packages including:
- `@neondatabase/serverless` - PostgreSQL database
- `nodemailer` - Email service
- `ws` - WebSocket support
- All UI components and utilities

---

## 3️⃣ Database Setup (Neon)

### Step 1: Create Neon Account
1. Visit [https://neon.tech](https://neon.tech)
2. Click "Sign Up" (free tier is sufficient)
3. Sign up with GitHub, Google, or email

### Step 2: Create New Project
1. After login, click **"New Project"**
2. Enter project name: `tedx-srmist`
3. Select region: Choose closest to your users (e.g., US East for better performance)
4. Click **"Create Project"**

### Step 3: Get Connection String
1. In your project dashboard, you'll see **"Connection Details"**
2. Click on it or find the connection string section
3. Copy the connection string - it looks like:
   ```
   postgresql://username:password@ep-cool-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Keep this safe - you'll need it next!

### Step 4: Configure Environment
1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your database URL:
   ```env
   DATABASE_URL="postgresql://your-connection-string-here"
   ```

---

## 4️⃣ Email Setup (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Find **"2-Step Verification"**
3. Click **"Get Started"** and follow the setup
4. Complete the 2FA setup process

### Step 2: Generate App Password
1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - If you don't see this page, make sure 2FA is enabled first
2. You might need to sign in again
3. Under "Select app", choose **"Mail"**
4. Under "Select device", choose **"Other (Custom name)"**
5. Type: `TEDx Website`
6. Click **"Generate"**
7. **Copy the 16-digit password** (it will look like: `xxxx xxxx xxxx xxxx`)
8. Remove the spaces so it's one continuous string: `xxxxxxxxxxxxxxxx`

### Step 3: Add Email Configuration
Open `.env.local` and add:
```env
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your16digitpassword"
ORGANIZER_EMAIL="organizer@example.com"
```

**Example:**
```env
EMAIL_USER="tedx.srmist@gmail.com"
EMAIL_APP_PASSWORD="abcdxxxxxxxxxxxx"
ORGANIZER_EMAIL="tedxorganizer@srmist.edu"
```

### Step 4: Complete the Configuration
Your `.env.local` should now look like:
```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/tedx_db?sslmode=require"
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your16digitpassword"
ORGANIZER_EMAIL="organizer@example.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 5️⃣ Testing

### Step 1: Start Development Server
```bash
npm run dev
```

You should see:
```
> tedx-app@0.1.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### Step 2: Initialize Database
Open your browser and visit:
```
http://localhost:3000/api/init-db
```

**Expected Response:**
```json
{
  "message": "Database initialized successfully!",
  "tables": ["registrations", "contacts"]
}
```

If you see this, your database is set up! ✅

### Step 3: Test Email Configuration
Run this command in a new terminal:
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type":"registration","email":"your-email@gmail.com","name":"Test User"}'
```

Or use PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/test-email" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"type":"registration","email":"your-email@gmail.com","name":"Test User"}'
```

**Expected Response:**
```json
{
  "message": "Registration confirmation email sent successfully!"
}
```

Check your email inbox! ✅

### Step 4: Test Registration Form
1. Visit: http://localhost:3000
2. Scroll to the **"Register"** section
3. Fill out the form:
   - Name: Your Name
   - Email: your-email@gmail.com
   - Phone: +919876543210
   - Role: Student
   - Message: Excited to attend!
4. Click **"Register Now"**
5. You should see a success message
6. Check your email for confirmation! ✅

### Step 5: Test Contact Form
1. Scroll to the **"Contact"** section
2. Fill out the form
3. Submit
4. Check the organizer email for notification! ✅

### Step 6: Check Admin Dashboard
1. Visit: http://localhost:3000/admin
2. Enter password: `tedx2025admin`
3. You should see your test registration! ✅

---

## 6️⃣ Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add backend integration with Neon and Nodemailer"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import your repository
5. In **"Configure Project"**:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`

### Step 3: Add Environment Variables
In Vercel project settings, add these environment variables:

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | Your Neon connection string | `postgresql://user:pass@ep-xxx...` |
| `EMAIL_USER` | Your Gmail address | `tedx@gmail.com` |
| `EMAIL_APP_PASSWORD` | Your 16-digit app password | `abcdxxxxxxxxxxxx` |
| `ORGANIZER_EMAIL` | Organizer's email | `organizer@srmist.edu` |
| `NEXT_PUBLIC_APP_URL` | Your production URL | `https://your-app.vercel.app` |

### Step 4: Deploy!
1. Click **"Deploy"**
2. Wait for deployment to complete (usually 2-3 minutes)
3. Visit your production URL

### Step 5: Initialize Production Database
Visit:
```
https://your-app.vercel.app/api/init-db
```

You should see the success message! ✅

### Step 6: Test Production
1. Test registration form on your live site
2. Test contact form
3. Check if emails are being sent
4. Access admin dashboard: `https://your-app.vercel.app/admin`

---

## 7️⃣ Troubleshooting

### ❌ Error: "Database connection failed"

**Problem:** Can't connect to Neon database

**Solutions:**
1. Check if `DATABASE_URL` in `.env.local` is correct
2. Ensure connection string includes `?sslmode=require`
3. Verify your Neon project is active (check Neon dashboard)
4. Try copying the connection string again

**Test Connection:**
```bash
# Visit this to see database errors
http://localhost:3000/api/init-db
```

---

### ❌ Error: "Email not sending"

**Problem:** Emails aren't being delivered

**Solutions:**
1. **Check Gmail Settings:**
   - Is 2FA enabled? (Required)
   - Is App Password correct?
   - Did you remove spaces from the password?

2. **Check Environment Variables:**
   ```bash
   # Make sure these are set correctly
   EMAIL_USER="your-email@gmail.com"
   EMAIL_APP_PASSWORD="16digitpassword"  # No spaces!
   ```

3. **Check Gmail Security:**
   - Go to https://myaccount.google.com/security
   - Check "Recent security activity"
   - Allow access if blocked

4. **Test Email:**
   ```bash
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"type":"registration","email":"your@email.com","name":"Test"}'
   ```

5. **Check Logs:**
   Look at your terminal for error messages

**Common Issues:**
- Forgot to enable 2FA ❌
- App password has spaces ❌
- Using real password instead of app password ❌
- Wrong email address ❌

---

### ❌ Error: "Module not found: @neondatabase/serverless"

**Problem:** Package not installed

**Solution:**
```bash
npm install @neondatabase/serverless ws
```

---

### ❌ Error: "Registration failed: Email already exists"

**Problem:** Trying to register with the same email twice

**Solution:** This is working as intended! Each email can only register once.

**To test again:**
1. Use a different email, OR
2. Delete the registration from database:
   - Go to Neon dashboard
   - Open SQL Editor
   - Run: `DELETE FROM registrations WHERE email = 'test@example.com';`

---

### ❌ Admin Dashboard Not Loading

**Problem:** Can't access /admin page

**Solutions:**
1. Make sure development server is running
2. Clear browser cache
3. Try incognito/private mode
4. Check console for errors (F12)

**Default Password:** `tedx2025admin`

**To change password:**
Edit `app/admin/page.tsx` line 29:
```typescript
if (password === 'your-new-password') {
```

---

### ❌ Environment Variables Not Working

**Problem:** `.env.local` changes not taking effect

**Solutions:**
1. **Restart the dev server:**
   - Stop with Ctrl+C
   - Run `npm run dev` again

2. **Check file name:**
   - Must be `.env.local` (not `.env.txt` or `.env`)
   - Use `ls -a` (Mac/Linux) or `dir /a` (Windows) to see hidden files

3. **Check file location:**
   - Must be in project root (same folder as `package.json`)

4. **Check syntax:**
   ```env
   # ❌ Wrong
   DATABASE_URL = "connection-string"  # No spaces around =
   
   # ✅ Correct
   DATABASE_URL="connection-string"
   ```

---

### ❌ "Cannot GET /api/init-db"

**Problem:** API route not found

**Solutions:**
1. Make sure dev server is running
2. Check file exists: `app/api/init-db/route.ts`
3. Restart dev server
4. Check for TypeScript errors

---

## 📞 Still Having Issues?

### Check These Resources:
1. **Project Documentation:**
   - `QUICKSTART.md` - Quick setup
   - `BACKEND_SETUP.md` - Detailed guide
   - `SUMMARY.md` - Overview

2. **External Documentation:**
   - Neon Docs: https://neon.tech/docs
   - Nodemailer: https://nodemailer.com
   - Next.js: https://nextjs.org/docs

3. **Common Commands:**
   ```bash
   # Install dependencies
   npm install
   
   # Start dev server
   npm run dev
   
   # Build for production
   npm run build
   
   # Check for errors
   npm run lint
   ```

---

## ✅ Success Checklist

Use this to verify everything is working:

- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created and filled
- [ ] Neon database created and connected
- [ ] Database initialized (visited `/api/init-db`)
- [ ] Gmail App Password generated
- [ ] Email test passed (test email received)
- [ ] Registration form works (form submission successful)
- [ ] Registration email received
- [ ] Contact form works
- [ ] Contact notification received
- [ ] Admin dashboard accessible
- [ ] Can view registrations in admin panel
- [ ] CSV export works

**If all checked:** You're ready to deploy! 🚀

---

## 🎉 Next Steps

1. **Customize Email Templates:**
   - Edit `lib/email.ts`
   - Update branding and content

2. **Secure Admin Page:**
   - Change default password in `app/admin/page.tsx`
   - Consider adding proper authentication

3. **Add Features:**
   - Payment integration
   - QR code generation
   - Attendance tracking
   - Email reminders

4. **Monitor:**
   - Check Neon dashboard for database usage
   - Monitor email delivery rates
   - Track registration numbers

5. **Deploy:**
   - Push to GitHub
   - Deploy on Vercel
   - Test production environment

---

**Happy Coding! 🚀**

If you have any questions, refer to the documentation or check the official docs for Neon and Nodemailer.
