# VORQEN International – Netlify Deployment Guide

This project is fully configured for deployment on **Netlify** with zero configuration friction. It includes:
1. **`netlify.toml`**: Automatic build commands (`npm run build`), publish directory (`dist`), SPA redirects, and security headers.
2. **Netlify Serverless Functions** (`netlify/functions/`):
   - `inquiries.ts`: Handles inquiries, dispatches SMTP emails to `vorqenimpex@gmail.com`, sends automated buyer confirmation, and provides WhatsApp fallback links.
   - `email-status.ts`: Real-time SMTP and deliverability check.
   - `email-test.ts`: Live test email dispatch to verify inbox receipt.
3. **Netlify Forms Integration**: Automatic dual-backup form submissions captured into Netlify's Forms inbox.
4. **`public/_redirects`**: Ensures proper client-side SPA routing for all subpaths.

---

## Quick Deployment Steps

### Method 1: Deploy via Git (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "VORQEN VIP brand website ready for Netlify"
   git remote add origin https://github.com/your-username/vorqen-website.git
   git push -u origin main
   ```

2. **Log into Netlify** ([app.netlify.com](https://app.netlify.com)):
   - Click **"Add new site"** &rarr; **"Import an existing project"**.
   - Select your Git provider and pick your repository.

3. **Verify Build Settings** (automatically read from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

4. **Add Environment Variables in Netlify**:
   Go to **Site configuration** &rarr; **Environment variables** &rarr; **Add a variable** (or **Import from .env**):

   | Variable Name | Value | Description |
   | ------------- | ----- | ----------- |
   | `SMTP_HOST` | `smtp.gmail.com` | SMTP Server Host |
   | `SMTP_PORT` | `465` | SSL Port (or 587 for TLS) |
   | `SMTP_SECURE` | `true` | Use SSL encryption |
   | `SMTP_USER` | `vorqenimpex@gmail.com` | Official Gmail address |
   | `SMTP_PASS` | `xxxx xxxx xxxx xxxx` | 16-character Google App Password |
   | `INQUIRY_RECIPIENT_EMAIL` | `vorqenimpex@gmail.com` | Destination inbox |

5. **Click "Deploy Site"**:
   Netlify will compile the React app and package serverless functions in ~60 seconds.

---

### Method 2: Instant Form Notifications (Zero-Code Fallback)

Netlify Forms is pre-configured on `index.html` with form name `vorqen-inquiries`.

To receive an email notification for every inquiry immediately:
1. In your Netlify Site Dashboard, navigate to **Site configuration** &rarr; **Forms**.
2. Scroll to **Form notifications** and click **Add notification** &rarr; **Email notification**.
3. Select form **`vorqen-inquiries`**.
4. Enter `vorqenimpex@gmail.com` as the notification recipient.
5. Click **Save**.

Now, whenever any customer submits the contact form or requests a catalog quote, Netlify automatically emails the complete inquiry details straight to `vorqenimpex@gmail.com`!

---

### Custom Domain & Free SSL Setup

1. In Netlify Dashboard &rarr; **Domain management** &rarr; **Add domain alias**.
2. Enter your custom domain (e.g., `vorqen.com` or `vorqenimpex.com`).
3. Point your DNS records (CNAME or A record) at your domain registrar as prompted by Netlify.
4. Netlify will automatically provision a free Let's Encrypt SSL certificate.

---

## Local Development vs. Netlify Production

- **Local Development**: Runs via `npm run dev` with Express (`server.ts`) on port 3000.
- **Netlify Production**: Runs via Vite static output in `dist` + Serverless Functions in `netlify/functions` + Netlify Forms.

Both environments deliver all customer inquiries to **`vorqenimpex@gmail.com`**.
