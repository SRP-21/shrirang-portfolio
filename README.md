# Shrirang Pai — Communications Portfolio

A premium editorial-style portfolio website showcasing communications, PR, event marketing and visual storytelling experience, with a technology background.

**Target Role:** Communications and CSR Engagement Specialist at Texas Instruments India (Job ID: 25013702)

---

## 🚀 Quick Start

### Run Locally

```bash
# Navigate to the project directory
cd c:\shrirang_exp

# Start a local server (Python 3)
python -m http.server 8000

# Open in browser
# http://localhost:8000
```

No build step required — this is a static HTML/CSS/JS site optimized for performance.

---

## 📁 Project Structure

```
shrirang_exp/
├── index.html              # Main page (all sections)
├── css/
│   └── styles.css          # Complete design system & styles
├── js/
│   └── main.js             # All interactivity (vanilla JS)
├── images/
│   ├── dhruva/             # Dhruva Club images (replace placeholders)
│   ├── eighthmile/         # 8th Mile fest images
│   ├── events/             # Event photography
│   ├── reels/              # Reel thumbnails
│   ├── tech/               # Technology project images
│   └── placeholders/       # SVG placeholder images
├── README.md               # This file
└── _redirects              # Netlify redirects (if deploying to Netlify)
```

---

## 🖼️ How to Replace Images

1. **Add your images** to the appropriate folder inside `images/`
2. **Open `index.html`** and find the `<img>` tag for the placeholder you want to replace
3. **Change the `src` attribute** from the placeholder path to your image path
4. **Update the `alt` attribute** with a descriptive caption

Example:
```html
<!-- Before -->
<img src="images/placeholders/event-1.svg" alt="Dhruva Club event" loading="lazy">

<!-- After -->
<img src="images/dhruva/workshop-2024.jpg" alt="Dhruva Club workshop on IoT, October 2024" loading="lazy">
```

**Image recommendations:**
- Use `.jpg` or `.webp` format for photos (not `.png`)
- Resize images to max 1600px wide before adding
- Keep file sizes under 500KB each
- Use descriptive filenames (e.g., `dhruva-workshop-2024.jpg`)

---

## 🎬 How to Replace Reel Links

1. Find the reel cards in `index.html` (search for `data-url="[REEL LINK]"`)
2. Replace `[REEL LINK]` with the actual Instagram/YouTube URL
3. Replace the reel thumbnail image similarly

Example:
```html
<!-- Before -->
<article class="reel-card" data-url="[REEL LINK]">

<!-- After -->
<article class="reel-card" data-url="https://www.instagram.com/reel/ABC123/">
```

---

## 📄 How to Update Resume

1. Add your resume PDF to the project root: `resume.pdf`
2. In `index.html`, update the resume links:

```html
<!-- Hero section -->
<a href="resume.pdf" class="btn btn--secondary" target="_blank">Resume</a>

<!-- Contact section -->
<a href="resume.pdf" class="contact__link" target="_blank">
```

---

## 🔗 How to Update LinkedIn / Email

Search `index.html` for these values and replace:

| Placeholder | Replace With |
|---|---|
| `https://linkedin.com/in/shrirangpai` | Your actual LinkedIn URL |
| `shrirangpai@email.com` | Your actual email address |

---

## 📊 How to Fill In Placeholders

Search `index.html` for `[ADD` to find all content placeholders:

| Placeholder | Location | What to Add |
|---|---|---|
| `[ADD EVENT NAME]` | Dhruva section, Gallery | Actual event names |
| `[ADD NUMBER OF EVENTS]` | Dhruva section | e.g., "12+" |
| `[ADD REACH]` | Dhruva section | e.g., "5,000+ students" |
| `[ADD NUMBER]` | Impact sections | Actual metrics |
| `[ADD RESULT]` | Impact sections | Campaign results |
| `[ADD CAMPAIGN RESULT]` | Impact sections | Specific outcomes |
| `[ADD FEST SCALE]` | 8th Mile section | e.g., "15,000+ attendees" |
| `[ADD YEAR]` | 8th Mile section | e.g., "2024–2025" |
| `[ADD DESCRIPTION]` | Reels section | Brief reel descriptions |
| `[REEL LINK]` | Reels section | Instagram/YouTube URLs |

---

## 🏗️ Build for Production

This is a static site — no build step needed! The files are production-ready as-is.

For optimal performance before deployment:
1. Replace all SVG placeholders with optimized real images
2. Compress images using [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
3. Test all links work correctly
4. Fill in all `[ADD ...]` placeholders

---

## 🌐 How to Deploy

### Option 1: Netlify (Recommended — Easiest)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop the entire `shrirang_exp` folder onto the Netlify dashboard
3. Done! You'll get a URL like `https://your-site.netlify.app`
4. Optionally connect a custom domain

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Your site will be live at `https://your-project.vercel.app`

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push the project files
3. Go to Settings → Pages → Source: Deploy from branch (main)
4. Your site will be at `https://username.github.io/repo-name`

---

## ✅ Pre-Send Checklist

Before sending the URL to a recruiter:

- [ ] All placeholder images replaced with real photos
- [ ] All `[ADD ...]` text placeholders filled in
- [ ] LinkedIn URL is correct and links to your actual profile
- [ ] Email address is correct
- [ ] Resume PDF is linked and downloadable
- [ ] All reel links point to actual content
- [ ] Tested on desktop (Chrome, Safari, Firefox)
- [ ] Tested on mobile phone (actual device, not just browser DevTools)
- [ ] All images load correctly
- [ ] No console errors in browser DevTools
- [ ] Site loads in under 3 seconds
- [ ] Proofread all text for spelling/grammar

---

## 📐 Design Details

- **Typography:** Inter (Google Fonts)
- **Colors:** Warm off-white (#F7F6F3), near-black (#141414), steel blue accent (#2B5A83)
- **Responsive:** Mobile-first, tested at 375px, 390px, 768px, 1024px, 1280px, 1440px
- **Performance:** No frameworks, lazy loading, semantic HTML, minimal JS
- **Accessibility:** Keyboard navigation, focus states, ARIA labels, reduced-motion support

---

## 📝 License

Personal portfolio — not for redistribution.
