# UCM Entrepreneurs Club - Website

The website of the Entrepreneurs Club at University College Maastricht.
It is built with [Eleventy](https://www.11ty.dev/), hosted on **GitHub Pages**, and managed through a **Sveltia CMS** admin console at `/admin/`.

## Pages

| Page | Content | Where it is edited |
|---|---|---|
| Home | Hero, activities, latest news | `src/index.njk` |
| About | About Us, History, Board (President, Treasurer, Secretary) | Club Information |
| Partnerships | Partner Clubs and Our Sponsors | Club Information |
| News | All posts, with category filter | News & Posts |
| Contact | Email address, location, FAQ | Club Information |

## Run it locally

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npm start
```

The site runs at http://localhost:8080.

To use the admin console locally (no login needed) go to http://localhost:8080/admin/ and click **"Work with Local Repository"** and choose the project folder.

This only works in Chromium based browsers (Chrome, Edge, Brave) due to requiring a feature other browsers do not have.


## Set up the admin login (Sveltia CMS)

Give access to repo to allow publishing posts (Settings -> Collaborators).

Editors then go to `https://<username>.github.io/<repo-name>/admin/`, log in with GitHub, and publish.
Each published post is a commit.

## Writing posts

In the admin console, go to **News & Posts** then click **New Post** and fill in:

- **Title**, **Publish date** and **Category**
- **Summary**: shown on the news cards
- **Cover image** (optional): without one, a styled placeholder with the category name is shown
- **Draft**: switch on to save without publishing
- **Body**: the article itself


## Project structure

```
src/
  _data/            Site content edited via the CMS (JSON)
  _includes/        Layouts and partials (header, footer, cards)
  admin/            Sveltia CMS admin console and its config.yml
  assets/           CSS, JavaScript, images (CMS uploads go to images/uploads)
  news/posts/       News posts as Markdown files
  index.njk         Home
  about.njk         About
  partnerships.njk  Partnerships
  contact.njk       Contact
eleventy.config.js  Eleventy configuration
```
