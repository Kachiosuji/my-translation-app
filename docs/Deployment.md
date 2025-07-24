# Deployment Guide

## _Vercel Setup_

1. **Import repository → Vercel.**  
   _Framework preset_: “Other (Vite)”.  
   _Build command_: `npm run build`  
   _Output dir_: `dist/`

2. **Environment variables**

| Key                   | Value (example)                 |
| --------------------- | ------------------------------- |
| `VITE_GOOGLE_API_KEY` | `AIza...` (Translation API key) |

3. **Custom Domain (optional)**  
   Add CNAME → Vercel, update HTTP-referrer restrictions on the API key.

4. **CI/CD**  
   Vercel auto-builds on every push to `main`; preview URLs for pull requests.

---

## Live URL

> https://translationapp-kappa.vercel.app/

🏷️ Optional – .env.example

```env
# Copy to .env and fill in your own key
VITE_GOOGLE_API_KEY=YOUR_GOOGLE_TRANSLATE_KEY
```
