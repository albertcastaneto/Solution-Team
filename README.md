# Solution Team — Static Website

A 5-page static site (Home, About, Our Projects, News, Contact) built in plain
HTML, CSS and JavaScript. No build step, no frameworks — just open the files or
drop them on any web host.

## Run it
Open `index.html` in a browser. That's it. (For local testing with correct paths
you can also run a tiny server: `python3 -m http.server` then visit
http://localhost:8000)

## File structure
```
solution-team/
├── index.html      Home
├── about.html      About
├── projects.html   Our Projects
├── news.html       News
├── contact.html    Contact (the dynamic form page)
├── css/styles.css  All styling
├── js/main.js      Mobile nav, scroll reveals, contact-form validation
└── images/         All images (see below)
```

## Replacing the placeholder images
Every photo is a labeled SVG placeholder in `images/` that shows its purpose and
recommended size. Two easy ways to swap in your real assets:

1. **Keep the filename:** save your image (e.g. a `.jpg`) with the SAME base name,
   then update the `src` extension in the HTML — e.g. change
   `images/hero.svg` to `images/hero.jpg`. Or just save your file as the exact
   placeholder name to avoid editing HTML.
2. **Use your own name:** drop your file in `images/` and point the `src` to it.

Recommended sizes (width × height), all flexible:
| Slot                         | File(s)                         | Size       |
|------------------------------|---------------------------------|------------|
| Hero (full-bleed background) | `hero-bg.svg`                   | 1600 × 640 |
| Featured / project cards     | `project-1.svg` … `project-6.svg` | 520 × 360 |
| News cards                   | `news-1.svg` … `news-6.svg`     | 520 × 340  |
| About main image             | `about-main.svg`                | 720 × 560  |
| Team photos                  | `team-1.svg` … `team-4.svg`     | 360 × 360  |
| Contact map                  | `map.svg`                       | 760 × 420  |
| Logo                         | `logo.svg` / `favicon.svg`      | square     |

The hero is a **full-bleed background image** with a blue gradient laid over it
(text sits on the left, the photo shows through on the right). To swap it, replace
`images/hero-bg.svg` or change the URL in the `style="background-image:..."` on the
`<section class="hero">` in `index.html`. Use a wide landscape photo so it fills
the banner; the blue overlay keeps the headline readable over any image.

The logo and the small service icons are real SVGs (not placeholders), so the site
looks complete out of the box — swap them only if you have your own.

## The contact form
Because this is a static site, the form has no server. Out of the box it
**validates in the browser** and shows a success message. To actually receive
submissions, connect it to a form service (no backend needed):

1. Create a free endpoint at e.g. https://formspree.io
2. In `index.html` and `contact.html`, change the form tag to:
   `<form data-contact action="https://formspree.io/f/YOUR_ID" method="POST">`
3. In `js/main.js`, inside the `if (valid)` block, either remove the
   `e.preventDefault()` so the browser submits normally, or send it with `fetch`.

## Editing content
Text, project titles, news items and dates are all plain HTML — edit them directly
in the page files. Colors and fonts live as CSS variables at the top of
`css/styles.css` (`--navy`, `--gold`, etc.).
