# UCM Entrepreneurs Club - Website

The website of the Entrepreneurs Club at University College Maastricht.
It is built with [Eleventy](https://www.11ty.dev/), hosted on **GitHub Pages**, and managed through a **Decap CMS** admin console at `/admin/`.

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

To use the admin console locally (no login needed), open a second terminal and run:

```bash
npm run cms
```

Then go to http://localhost:8080/admin/ and click **Login**. Changes are written directly to the files in this folder.


## Set up the admin login (Decap CMS)

Decap CMS saves posts by committing to the GitHub repository, so editors log in with their GitHub account.
GitHub Pages cannot complete that login on its own, so you need a small, free **OAuth proxy**. This only has to be done once.

1. **Deploy an OAuth proxy.** The simplest option is a free Cloudflare Worker such as
   [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth), which works with Decap CMS. Follow its README; you will get a URL like
   `https://sveltia-cms-auth.<your-account>.workers.dev`.
2. **Create a GitHub OAuth App** at GitHub -> Settings -> Developer settings -> OAuth Apps -> New OAuth App:
   - Homepage URL: your site URL
   - Authorization callback URL: `<your worker URL>/callback`

   Copy the Client ID and a new Client Secret into the worker's settings, as described in its README.
3. **Edit `src/admin/config.yml`:**
   ```yaml
   backend:
     name: github
     repo: your-username/your-repo-name
     branch: main
     base_url: https://sveltia-cms-auth.<your-account>.workers.dev
   ```
4. Give access to repo to allow publishing posts (Settings -> Collaborators).

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
  admin/            Decap CMS admin console and its config.yml
  assets/           CSS, JavaScript, images (CMS uploads go to images/uploads)
  news/posts/       News posts as Markdown files
  index.njk         Home
  about.njk         About
  partnerships.njk  Partnerships
  contact.njk       Contact
eleventy.config.js  Eleventy configuration
```
