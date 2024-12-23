<p align="center">
    <picture>
        <img width="420" alt="SaaS Starter Header reading: The open source, fast, and free to host SaaS template" src="https://github.com/CriticalMoments/CMSaasStarter/assets/848343/12f47617-e5be-4694-affc-23310e54b885">
    </picture>
</p>

<p align="center">
  <a href="https://github.com/CriticalMoments/CMSaasStarter/actions/workflows/build.yml" target="_blank"><img src="https://github.com/CriticalMoments/CMSaasStarter/actions/workflows/build.yml/badge.svg?branch=main" alt="Built Status"></a>
  <a href="https://github.com/CriticalMoments/CMSaasStarter/actions/workflows/format.yml" target="_blank"><img src="https://github.com/CriticalMoments/CMSaasStarter/actions/workflows/format.yml/badge.svg?branch=main" alt="Format Check"></a>
  <a href="https://github.com/CriticalMoments/CMSaasStarter/actions/workflows/linting.yml" target="_blank"><img src="https://github.com/CriticalMoments/CMSaasStarter/actions/workflows/linting.yml/badge.svg?branch=main" alt="Linting"></a>
  <a href="https://github.com/CriticalMoments/CMSaasStarter/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen?labelColor=32383f" alt="License"></a>
</p>

<p align="center">
  <a href="https://saasstarter.work"><strong>Demo & Homepage</strong></a> •
  <a href="https://github.com/CriticalMoments/CMSaasStarter#quick-start"><strong>Quick Start Guide</strong></a> • 
  <a href="https://github.com/CriticalMoments/CMSaasStarter/issues"><strong>Issues</strong></a>
</p>

<br/>

# SaaS Starter: A SvelteKit Boilerplate/Template

- [Feature Rich](#features): user auth, user dashboard, marketing site, blog engine, billing/subscriptions, pricing page, search, emails, and more.
- [Lightning Performance](#performance--best-practices): fast pre-rendered pages which score 100/100 on Google PageSpeed.
- [Delighful Developer Experience](#tech-stack): tools you'll love working with, including SvelteKit, Tailwind, DaisyUI, Postgres, and Supabase.
- Extensible: all the tools you need to make additional marketing pages, UI components, user dashboards, admin portals, database backends, API endpoints, and more.
- [Hosting](#suggested-hosting-stack): Our suggested hosting stack is free to host, cheap to scale, easy to manage, and includes automatic deployments.
- [MIT Open Source](https://github.com/CriticalMoments/CMSaasStarter/blob/main/LICENSE)
- [Fully Functional Demo](https://saasstarter.work)
- [Quick Start](#quick-start): Full docs from `git clone` to deployment.

Created by the folks at [Critical Moments](https://criticalmoments.io)! Check out our website site for an example deployment of SaaS Starter.

**Make mobile apps?** Improve conversion rates and ratings with [Critical Moments](https://criticalmoments.io).

## Demo

You can explore all the features using our fully functional demo [saasstarter.work](https://saasstarter.work).

[![Try it Now](https://img.shields.io/badge/Try_it_Now-37a779?style=for-the-badge "Try it Now")](https://saasstarter.work)

See [criticalmoments.io](https://criticalmoments.io) for an example of what’s possible after this template has design, content, and functionality added.

<a href="https://saasstarter.work">
<kbd>
<img width="500" alt="homepage" src="https://github.com/CriticalMoments/CMSaasStarter/assets/848343/34944c09-df72-4ac2-9099-01d25d99911b">
</kbd>
<br>
<kbd>
<img width="200" alt="pricing page" src="https://github.com/CriticalMoments/CMSaasStarter/assets/848343/c3cb2ab7-3739-473e-a1fe-f82a4a31e844">
</kbd><kbd>
<img width="200" alt="settings page" src="https://github.com/CriticalMoments/CMSaasStarter/assets/848343/2d947c97-3cc7-4ff5-a5b1-7c8478b6f31a">
</kbd><kbd>
<img width="200" alt="payments portal" src="https://github.com/CriticalMoments/CMSaasStarter/assets/848343/0c4749c3-0d29-4edc-ae87-d8a4eefea3c9">
</kbd>
</a>

## Features

Everything you need to get started for a SaaS company:

- User Authentication: Sign up, sign out, forgot password, email verification, and oAuth. Powered by Supabase Auth. GDPR cookie warning for European users.
- Marketing Page with SEO optimization and Sitemap
- Blog engine with rich formatting, RSS and SEO optimization.
- User Dashboard with user profile, user settings, update email/password, billing, and more
- Subscriptions powered by Stripe Checkout
- Pricing page
- Emails: send emails to users, including template support
- Search: lightning fast site search, without a backend
- Contact-us form
- Billing portal: self serve to change card, upgrade, cancel, or download receipts
- Onboarding flow after signup: collect user data, and select a payment plan
- Style toolkit: theming and UI components
- Responsive: designed for mobile and desktop.
- Extensible: all the tools you need to make additional marketing pages, UI components, admin portals, database backends, API endpoints, and more.

## Introduction Blog Post

What to learn why we picked the technologies we did, and how to keep your fork lightning fast as you add content? Check out [our blog post](https://criticalmoments.io/blog/how_we_built_our_marketing_page) on the process. Yes, it's hosted on a SaaS Starter fork!

## Tech Stack

- Web Framework: SvelteKit
- CSS / Styling
  - Framework: TailwindCSS
  - Component library: DaisyUI
- Suggested Hosting Stack
  - Host + CDN: Cloudflare Pages
  - Serverless compute: Cloudflare Workers
  - Authentication: Supabase Auth
  - Database: Supabase Postgres
- Payments
  - Stripe Checkout
  - Stripe Portal

## Suggested Hosting Stack

**There’s no cost for using this template**. The costs below reflect our suggested hosting stack.

- **$0/mo** — Supabase free tier, Cloudflare free tier.
  - Pros:
    - Free!
    - Can scale to thousands of users.
    - Unlimited static page requests.
    - 100k serverless functions/day.
  - Cons:
    - Does not include database backups. The frugal among you could hook up pgdump backups on lambda/S3 for a few cents per month.
    - Will auto-pause your database when not in use for 7 days.
  - Who it’s for:
    - This tier is perfectly functional for a hobby project, or pre-revenue company (up to 50,000 monthly active users). It’s easy to scale up once revenue starts, but it’s also fine to keep at this scale indefinitely.
- **$30/mo** - Supabase Pro, Cloudfare [Workers Paid](https://www.cloudflare.com/plans/developer-platform/)
  - Pros:
    - Database backups.
    - Never pauses database.
    - Over 1M serverless functions per day, with linear pricing for additional invocations.
  - Cons:
    - none
  - Who it’s for:
    - I suggest moving to this once you have paid customers or investors.

## Performance / Best Practices

The selected tech stack creates lightning fast websites.

- Pre-rendering (static generation) for marketing pages, pricing and blog
- Instant navigation: the best of CSR + SSR in one. SSR your first page for fastest possible initial load times. For subsequent pages, the content is pre-loaded and rendered with CSR, for instant rendering.
- CDN optimized, for high edge-cache hit ratios
- Edge-functions for dynamic APIs/pages
- Svelte and Tailwind compile out unused HTML, CSS and JS at deploy time for smaller pages
- Linting to find accessibility and syntax issues

The result is a perfect Google PageSpeed Insights score in all categories!

<img width="420" alt="Screenshot 2024-01-18 at 11 31 32 AM" src="https://github.com/CriticalMoments/CMSaasStarter/assets/848343/46b5e960-2aa0-4fb5-acd7-4f84b380e1d0">

# Quick Start

## Create a Copy of the Template

To get started, create your own copy of the project for development. There are two options:

- "Use this template": use this Github button if you want to build your own project using CMSaasStarter as a starter template and you aren't planning on contributing work back to the public open source project. See [Github Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).
- "Fork": use this button if you want contribute some or all of your work back to the public open source project. It will keep the full commit history, and be easier to create PRs back to CMSaasStarter.

## Setup Local Development

On your development machine:

```
git pull [Your Repo Created Above]
cd CMSaasStarter ## or your repo name if different
npm install
## Create an env file. You'll replace the values in this in later steps.
cp .env.example .env.local
## Run the project locally in dev mode, and launch the browser
npm run dev -- --open
```

**Note:** some features won't work until you complete the rest of the setup steps below!

## Developer Tools

The repo includes [CI scripts](https://aws.amazon.com/devops/continuous-integration/) designed for [GitHub Actions](https://github.com/features/actions). These confirm you don’t break your [build](https://github.com/CriticalMoments/CMSaasStarter/blob/main/.github/workflows/build.yml), you use [proper code formatting](https://github.com/CriticalMoments/CMSaasStarter/blob/main/.github/workflows/format.yml), [code linting and typechecking passes](https://github.com/CriticalMoments/CMSaasStarter/blob/main/.github/workflows/linting.yml), and even spell checking.

### Enabling GitHub Actions

Github disables CI on new forks by default, so be sure to go into the Github Actions page for your repo and enable workflows.

### Running Developer Tools Locally

To manually run all these tools run the following script. You can view it's contents for individual commands.

```
# first time only: chmod +x ./checks.sh
./checks.sh
```

### Running Developer Tools in your IDE

Installing extensions in your editor can automatically format-on-save, show linting/type issues inline, and run your test cases:

- Svelte for Svelte and accessibility issues: [VSCode](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) or [other editors](https://sveltesociety.dev/tools#editor-support)
- ESLint for type checking and linting: [VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [other editors](https://eslint.org/docs/latest/use/integrations)
- Vitest for testing if you add tests: [VSCode](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) or [other editors](https://vitest.dev/guide/ide)

### Running Developer Tools from Git Hooks

To catch build, formatting, linting and test issues before you commit changes, we suggest the following local git hook. It will run before you commit, stop you from breaking the build, and show any issues that are found. Add the lines below to an executable git hook script at the location `.git/hooks/pre-commit`.

```
#!/bin/sh
# Run standard checks before committing
cd "$(dirname "$0")"
sh ../../checks.sh
```

### Disabling Developer Tools

If you find build, formatting or linting rules too tedious, you can disable enforcement by deleting the CI files (`.github/workflows/*`) and removing the git hook (`.git/hooks/pre-commit`).

## Setup Supabase Project

- Create a Supabase account
- Create a new Supabase project in the console
- Wait for the database to launch
- Set up your database schema:
  - For new Supabase projects:
    - Go to the [SQL Editor](https://supabase.com/dashboard/project/_/sql) page in the Dashboard.
    - Run the SQL from `database_migration.sql` to create the initial schema.
  - For existing projects:
    - Apply migrations from the `supabase/migrations` directory:
      1. Go to the Supabase dashboard's SQL Editor.
      2. Identify the last migration you applied, then run the SQL content of each subsequent file in chronological order.
- Enable user signups in the [Supabase console](https://app.supabase.com/project/_/settings/auth): sometimes new signups are disabled by default in Supabase projects
- Go to the [API Settings](https://supabase.com/dashboard/project/_/settings/api) page in the Dashboard. Find your Project-URL (PUBLIC_SUPABASE_URL), anon (PUBLIC_SUPABASE_ANON_KEY) and service_role (PRIVATE_SUPABASE_SERVICE_ROLE).
  - For local development: create a `.env.local` file:
    ```
    PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    PRIVATE_SUPABASE_SERVICE_ROLE=your service_role secret
    ```
  - For production, add these two keys to your deployment environment (see below). We suggest you encrypt your service role.
- Auth Callback
  - Set your default callback URL for auth in the Supabase Auth console. For example, for the demo page we added: `https://saasstarter.work/auth/callback` . Also add that same URL to the the “allowed redirect URL” list in the Supabase auth console further down the page.
  - Add a link to the redirect URL allow list which allows parameters to your auth callback. For example we added the following for the demo page: `https://saasstarter.work/auth/callback?*`
  - Also add any local development URLs you want to use in testing to the list for your dev environment. For example, we added the following for local development: `http://localhost:5173/auth/callback` and `http://localhost:5173/auth/callback?*`.
  - Test that the "sign up" and "forgot password" emails link back to your domain correctly by checking the have a redirect_to parameter to your `yourdomain.com/auth/callback`. If they link to the base URL or another page, double check you have the config above set correctly.
- OAuth Logins
  - Decide which oauth logins you want to support, and set them up in the Supabase Auth console under “Auth Providers”. Be sure to provide them the Supabase callback URL. Also be sure to set any platform specific permissions/settings to retrieve their email as part of the login (for example, for Github it's under `Account Permissions > Email Address > Read Only Access`
  - Edit `oauthProviders` list in `/src/routes/(marketing)/login/login_config.ts` with the list of providers you chose. If you don’t want any OAuth options, make this an empty array.
  - Test each provider to ensure you setup the client ID, client secret and callback correctly for each
- Auth Email SMTP
  - Supabase has a limit of 4 emails per hour on their development server. You should [Configure a Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp) sending emails from your own domain.
  - Customize the email templates in the Supabase Auth console to include your product name and branding
- Test authentication
  - Open the `/login` page in your browser, and ensure you can sign up, confirm email, log in, and edit your account.

## Setup Stripe

- Create a Stripe account
- Create a product and price Tiers
  - Create your [products](https://stripe.com/docs/api/products) and their [prices](https://stripe.com/docs/api/prices) in the Dashboard or with the Stripe CLI.
  - SaaS Starter works best if you define each tier as a separate product (eg, `SaaS Starter Free`, `Saas Starter Pro`, `Saas Starter Enterprise`). Include a monthly and annual price for each product if you want to support multiple billing periods.
  - You do not need to create a free plan in Stripe. The free plan is managed within the app.
- Setup your environment
  - Get your [Secret API](https://dashboard.stripe.com/test/apikeys) key, and add it as an environment variable PRIVATE_STRIPE_API_KEY (`.env.local` locally, and Cloudflare environment for prod). Be sure to use test keys for development, and keep your production/live keys secret and secure.
- Optional: theme your Stripe integration
  - Change the colors and fonts to match your brand [here](https://dashboard.stripe.com/settings/branding)
- Update your pricing plan data to align to your stripe data
  - See `/src/routes/(marketing)/pricing/pricing_plans.ts` and Fill in all fields for each plan. stripe_price_id and stripe_product_id should only be omitted on a single “free” plan. Multiple free plans are not supported.
    - The product in Stripe can contain several prices for the same product (annual, monthly, etc). The stripe_price_id you choose to put in this json will be the default we use for the checkout experience. However, if you have more prices configured for a product configured, the user can switch between them in the management portal.
  - Set the `defaultPlanId` to the plan the user will see as their “current plan” after signup, but before subscribing to a paid plan (typically “free”). It should align to the plan with no stripe_price_id.
  - if you want an item highlighted on `/pricing`, specify that plan ID in `/src/routes/(marketing)/pricing/+page.svelte`
- Update your portal configuration
  - Open [stripe portal config](https://dashboard.stripe.com/test/settings/billing/portal) and make the following changes
    - Disallow editing email under customer information (since we allow editing in primary portal)
    - Optional: setup a custom domain so Stripe pages use your own domain
- Repeat steps in production environment

## Deploy

We have two documented options for deploying SaaS Starter: Cloudflare Pages and Vercel. However, it can be hosted anywhere you can host a SvelteKit app.

Our [official demo](https://saasstarter.work) is hosted on Cloudflare Pages, and deployed each time the main branch is updated.

### Deploy To Cloudflare

Cloudflare Pages and Workers is one of the most popular options for deploying SvelteKit and we recommend it. [Follow Cloudflare’s instructions](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/#deploy-with-cloudflare-pages) to deploy in a few clicks. Be sure to select “SvelteKit” as framework, and the rest of the defaults will work.

When prompted: add environment variables for your production environment (PUBLIC_SUPABASE_URL,
PUBLIC_SUPABASE_ANON_KEY, PRIVATE_SUPABASE_SERVICE_ROLE, and PRIVATE_STRIPE_API_KEY).

Optional: enable [Cloudflare Analytics](https://www.cloudflare.com/en-ca/application-services/products/analytics/) for usage metrics.

### Deploy to Vercel

Deploy using Vercel's deploy button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCriticalMoments%2FCMSaasStarter&env=PUBLIC_SUPABASE_URL,PUBLIC_SUPABASE_ANON_KEY,PRIVATE_SUPABASE_SERVICE_ROLE,PRIVATE_STRIPE_API_KEY&envDescription=Each%20environment%20variable%20is%20documented%20in%20our%20quick%20start%20guide%3A%20https%3A%2F%2Fgithub.com%2FCriticalMoments%2FCMSaasStarter%3Ftab%3Dreadme-ov-file%23quick-start&envLink=https%3A%2F%2Fgithub.com%2FCriticalMoments%2FCMSaasStarter%3Ftab%3Dreadme-ov-file%23quick-start&demo-title=SaasStarter%20Demo&demo-description=A%20live%20demo%20of%20this%20template%2C%20deployed%20from%20the%20main%20branch.&demo-url=https%3A%2F%2Fsaasstarter.work&demo-image=https%3A%2F%2Fprivate-user-images.githubusercontent.com%2F848343%2F297197975-34944c09-df72-4ac2-9099-01d25d99911b.png%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE0NTAwMzMsIm5iZiI6MTcyMTQ0OTczMywicGF0aCI6Ii84NDgzNDMvMjk3MTk3OTc1LTM0OTQ0YzA5LWRmNzItNGFjMi05MDk5LTAxZDI1ZDk5OTExYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzIwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyMFQwNDI4NTNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zY2E4ZmY3YjVhMTc3YWE5YmI2MzI3YWE3MWQ2OWIzMjI3MGU2YzhmZDJjNjhlNDJhY2VjMDExMDk5ZjMyM2M4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.O8e9x5qFiij0TILjUncTOXjAs5Di2-8221K-N0YttbE)

Here is a demo of of Saas Starter hosted on Vercel: [vercel.saasstarter.work](https://vercel.saasstarter.work)

### Deploy Alternatives

If you prefer another host you can explore alternatives:

- [SvelteKit official adapters](https://kit.svelte.dev/docs/adapters) including Netlify, Vercel, and Node
- [Community adapters](https://sveltesociety.dev/components#adapters) including Github pages, AppEngine, Azure, and more
- [Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/sveltekit) if you want one host for everything. Note: they do charge $10 a month for custom domains, unlike Cloudflare.

## Setup Emailer -- Optional

SaaS Starter includes email capabilities for sending emails to users and admins.

These are optional and disabled by default. See [email docs](email_docs.md) for details on how to enable and customize them.

## Add Your Content

After the steps above, you’ll have a working version like the demo page. However, it’s not branded, and doesn’t have your content. The following checklist helps you customize the template to make a SaaS homepage for your company.

- Describe your site with a name, description and base URL in in `src/config.ts:`. These values are used for SEO.
- Content
  - Add actual content for marketing homepage
  - Add actual content for your blog (or delete the blog)
    - Update all fields in `src/routes/(marketing)/blog/posts.ts`, and replace the post pages under `src/routes/(marketing)/blog/posts` to align to the urls from `posts.ts`.
    - Alternatively remove the blog by removing the src/routes/(marketing)/blog directory, and remove any links to the blog in the header and footer. You can always bring it back later.
  - Add any pages you want on top of our boiler plate (about, terms of service, etc). Be sure to add links to them in the header, mobile menu header, and footer as appropriate (`src/routes/(marketing)/+layout.svelte`).
  - Note: if you add any dynamic content to the main marketing page, pricing page or blog, be sure to set `prerender = false` in the appropriate `+page.ts` file. These are currently pre-rendered and served as static assets for performance reasons, but that will break if you add server side rendering requirements.
- Update SEO content
  - Update title and meta description tags for every public page. We include generic ones using your site name (`src/config.ts`), but the more specific these are the better.
  - This done automatically for blog posts from `posts.ts` metadata
- Style
  - Create a new DaisyUI Theme matching your brand or use one of the built in themes from DaisyUI (see `tailwind.config.js`)
  - Update the marketing page layout `src/routes/(marketing)/+layout.svelte`: customize design, delete unwanted pages from header and footer
  - Style: make it your own look and feel.
  - Update the favicon in the `/static/` directory
  - The Authentication UI should automatically update based on your DaisyUI style, but check out the login in pages, and further design tweaks can be made in `src/routes/(marketing)/login/login_config.ts` (see [Auth UI](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#customization) for options).
- Site Search: any [prerendered](https://kit.svelte.dev/docs/page-options#prerender) content will automatically be indexed by the site search. To exclude a page, add it to `excludePaths` in `src/lib/build_index.ts`.
- Functionality
  - Add actual SaaS functionality!
  - Replace the admin dashboard with real content (`/src/routes/(admin)/account/+page.svelte`).
  - Add API endpoints and database tables as needed to deliver your SaaS product.
- Analytics: optionally add analytics to your project. [guide](/analytics_docs.md)

## Community Extensions

The open source community is extending and improving SaasStarter!

These extensions are reference implementations of commonly needed features. We don't integrate them into the main branch to keep our dependencies minimal and simplify maintenance. However, if you need them you can cherry pick into your fork/repo:

- Internationalization: [branch](https://github.com/CriticalMoments/CMSaasStarter/tree/extension/internationalization), and [instructions](https://github.com/CriticalMoments/CMSaasStarter/pull/49)
- Dark mode theme: [branch](https://github.com/CriticalMoments/CMSaasStarter/tree/extension/dark_mode), and [instructions](https://github.com/CriticalMoments/CMSaasStarter/pull/47)
- Fork using Shadcn/ui instead of DaisyUI: [kizivat/saas-kit](https://github.com/kizivat/saas-kit)

### Icons Credits

Homescreen Icons are from [Solar Broken Line Icons](https://www.svgrepo.com/collection/solar-broken-line-icons/) and [Solar Linear Icons](https://www.svgrepo.com/collection/solar-linear-icons) via CC Attribution License.

# Sponsor

We hope you enjoy SaaS Starter! If you build mobile apps, please check out its sponsor/creator.

**[Kiln AI](https://getkiln.ai):** Free apps and tools for building high quality AI products.

```
PlexSaas
├─ # Database Structure - Paper Inventory S.sql.md
├─ .eslintignore
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           └─ main
│  ├─ objects
│  │  ├─ 01
│  │  │  ├─ 6e5eeab5eb84b8757cbbdeb86fabe3a0b3ba2d
│  │  │  └─ b6efc9bb6cfba056028704d41fe762f5699883
│  │  ├─ 03
│  │  │  └─ 9f13e9cacb598b63695d885868c61703723844
│  │  ├─ 04
│  │  │  └─ d59110fded4066d2ae4346fd9612c7987a1800
│  │  ├─ 07
│  │  │  └─ 88e71f64f84a84984287c6fb383bd331bd9548
│  │  ├─ 08
│  │  │  └─ 61116edc0968f845e07b817af1457696943cd0
│  │  ├─ 09
│  │  │  ├─ 15f67c5268ce39dde467a602712736cefc7a20
│  │  │  ├─ 1f9dce5dca048bde8f8d84407712c019b50a41
│  │  │  └─ 5b4d67817d6494fca5eb01ea6cbfce6b2d7490
│  │  ├─ 0a
│  │  │  └─ f8849e62499089dfb40e6d510884116f6a9859
│  │  ├─ 0b
│  │  │  └─ 38ca7af424f1d61fc34f7c7dbf476b92376255
│  │  ├─ 0f
│  │  │  └─ de0166ecd512488c1b9c423990235943672d39
│  │  ├─ 10
│  │  │  └─ a744da209a65a6b5be184b967810bd982a5477
│  │  ├─ 12
│  │  │  ├─ 64d1432e381c8c23d8f1276a65b81616bc2e48
│  │  │  ├─ a1af9fce773a97dbdc723105da887ace5ea484
│  │  │  └─ b7fdfcb098fd836d2283e6df13930aaf80ad54
│  │  ├─ 17
│  │  │  └─ dcf39758f51954795796c5136e95c6adfefeb6
│  │  ├─ 18
│  │  │  └─ 8712aba50050931b8fcb57d2caa19556da3517
│  │  ├─ 1a
│  │  │  └─ 3e9409b92aa4a1ab0360fa9d0a9fe60338b3bf
│  │  ├─ 1c
│  │  │  └─ 375a240036f2896b3428c96a9b1349547c7c3b
│  │  ├─ 1d
│  │  │  ├─ 6ead268ff2a36ddf2a7180e74324fb70b6a047
│  │  │  └─ cb18759e3a1b289f42a555cbe9241352849dd8
│  │  ├─ 1e
│  │  │  └─ 55eea5452f74573f89c708282f3fe2346e8ccb
│  │  ├─ 1f
│  │  │  ├─ 0760f911fb2b6a59665f3d93aec5874cedefda
│  │  │  └─ 155b0f2dde572e61a0c8ac08cd30d1ecf9149a
│  │  ├─ 20
│  │  │  └─ 7d55d3fd276eef406c6ba1ccb13c0b243ea199
│  │  ├─ 22
│  │  │  └─ b787ac1b1b62cc66481b158d27a0bb8cd5e126
│  │  ├─ 23
│  │  │  ├─ 76dff2f356910a20037dad36d7fbf36e7954f8
│  │  │  └─ a023e71996bab5cac0ab416dead4e496917a54
│  │  ├─ 24
│  │  │  └─ 0959c9c9c1cf8d3826798e6267756745bb2489
│  │  ├─ 27
│  │  │  └─ 0f3d9426fb27f0f847a917222e95a4cfd49f79
│  │  ├─ 29
│  │  │  ├─ 56434f34b6454d30bf21272b430e8aa89b0bc3
│  │  │  └─ ed2b1bcd947440769b81e794c9ff48319f3266
│  │  ├─ 2a
│  │  │  ├─ 5098470bc0f148a562dfe1459e31e38a28b01c
│  │  │  └─ 996b604b46856ed130dc6167b430a31ff5129e
│  │  ├─ 2b
│  │  │  └─ d21be1b418d66d9d49e4fe70bb9f9e4bc1141f
│  │  ├─ 2d
│  │  │  └─ 67ffe27527ac3dc73a5e64e26d5108e71db3c8
│  │  ├─ 2e
│  │  │  ├─ 57ddbce6e8c6f1f17a5bd7ed2040a3154d085d
│  │  │  └─ de1470eb11ac674d57fd4dd3f12ed9ceb7bf37
│  │  ├─ 2f
│  │  │  └─ 88e304f9c97aadf3fb9149219a2ec83ccceedb
│  │  ├─ 30
│  │  │  ├─ 9b592e40baf34433b193abba68a4e19ec86f82
│  │  │  └─ b862d71255db923c61abd436d3689acb0cfff3
│  │  ├─ 31
│  │  │  └─ bc7d1808dac5d662d5ed80cbac275d19d33255
│  │  ├─ 32
│  │  │  └─ cbd17f99c1744903a9e31e52eb838bd20ece1b
│  │  ├─ 33
│  │  │  └─ a6983c0b1aa260f4ebe41583c8a03b5bd7601f
│  │  ├─ 34
│  │  │  └─ 05e36edae995b0b97b9e47193d835a2fedb356
│  │  ├─ 36
│  │  │  └─ d83367291c3c5b8926aceb78e0464c7346a25d
│  │  ├─ 37
│  │  │  ├─ 8095327f767562b2f1b20162413b7b768a3f92
│  │  │  ├─ b8b33cdc63d05e074a8cefa37c33334824c680
│  │  │  ├─ c299d195987c5efdde909340bbd5a4354c783f
│  │  │  └─ ea40045ad6bb5089d5d30e9f80448dacf9c3c5
│  │  ├─ 38
│  │  │  └─ 90a19428c1c08dcfe1db16eb931f2506e76bc4
│  │  ├─ 39
│  │  │  └─ cc538c0f9cf5672fae62bbaf8c85626f5e8676
│  │  ├─ 3c
│  │  │  └─ 50ab781e22fef52572ee173342853745960ca4
│  │  ├─ 3d
│  │  │  └─ b96ed7468d19059dd0d59e4ca914f662a41b25
│  │  ├─ 3e
│  │  │  └─ a75e43778d6cf4f7f4d3baa0bd73ee172cb3a8
│  │  ├─ 3f
│  │  │  ├─ 2e41c29934481722e40157e2e82b04d1b298bd
│  │  │  └─ e687a675f9bc6f8eb1157b003ca67b9341dc7f
│  │  ├─ 40
│  │  │  └─ 5edef4c45e4e157d180695f924f2b369f7256a
│  │  ├─ 42
│  │  │  └─ 94c72ee473c2ddbfb9e5cb0c6f6f7da036e8c0
│  │  ├─ 46
│  │  │  └─ be75c40997a12eb1643161c36768c5f6999ebf
│  │  ├─ 47
│  │  │  └─ 97384f6592e038b0bdf1265f86188dd9552faf
│  │  ├─ 4a
│  │  │  └─ b05b6163cc183b5314aa37754d7f655cbc52f5
│  │  ├─ 4b
│  │  │  ├─ 3229fa3708ef68c5bdf7e7518c3bc6ed7f181d
│  │  │  └─ d772a996a8ee9b1a0ea08ed3738d59eb626d75
│  │  ├─ 4c
│  │  │  └─ 991a680ef9115a20ffd0c511bbc69677a88bfe
│  │  ├─ 4d
│  │  │  ├─ 05e10a8a9d7f1dc8900f6960348ac66d2dda97
│  │  │  └─ 5f76ea8c4753b0a3cc8aad8618251df160d114
│  │  ├─ 4e
│  │  │  ├─ 4fd9716c542947d13bb4de00a8abe5d3ecb7f9
│  │  │  └─ c87733b2910b6670261651853a838e27ee18f8
│  │  ├─ 4f
│  │  │  └─ 6274a7088b06918db0cfc524b2ee0385d00691
│  │  ├─ 50
│  │  │  └─ e005cdeeccef33b163b5957a45e13701f5f96d
│  │  ├─ 52
│  │  │  └─ 8002f9d4567d998ad948bd321dff18586c0d3f
│  │  ├─ 53
│  │  │  └─ e949667d35adaf4066fdf044687cf3a9249cc7
│  │  ├─ 55
│  │  │  └─ cd33fed5d49702e246eab228b0b841ae123b5b
│  │  ├─ 56
│  │  │  ├─ 2b369c77b64938ddc84a450779a9295a4dc696
│  │  │  └─ 52e9b0af68b7badb80fbd9c9a8a3aeed3c1377
│  │  ├─ 57
│  │  │  └─ e35f454a7ccf0a30d20c920d2d57a8c7eb092b
│  │  ├─ 58
│  │  │  ├─ a0fcde60902f76afa1315cc4ea989f9388b909
│  │  │  └─ a1c381a6a8d972ffb3219587dec4e3117952cc
│  │  ├─ 5a
│  │  │  └─ a2f4637c2bcdb49cc3d4b969daad2090c9bbb0
│  │  ├─ 5c
│  │  │  ├─ 2a7c0ae40002658f5b42634000fe104f3a14e5
│  │  │  └─ f465db5186e2232709fb8d9272286e64f21060
│  │  ├─ 60
│  │  │  ├─ 2b02464fef5999fab182ae8475a7c1f42eaf41
│  │  │  └─ c289ee4dc048fa24e109ba4eb52cc9db3a1a4b
│  │  ├─ 62
│  │  │  └─ 31a7607b5eff88a1ba024b6517ecd7dde20dab
│  │  ├─ 66
│  │  │  └─ 4d6733e14e809bf7845012ec509e1a5df91988
│  │  ├─ 68
│  │  │  └─ 6e7d47c1c988ec5127fac429efcd6af392ee16
│  │  ├─ 69
│  │  │  ├─ 07a37ac407fd2fe4d11c8cd1776aabac392946
│  │  │  └─ 3ab6edfc72c08dfcc84f118e49c256617cfd98
│  │  ├─ 6a
│  │  │  └─ f48ea9bb91c0c0ae1c308f491fd39dbe4f9cb5
│  │  ├─ 6b
│  │  │  └─ f9c865eece8421e6b15714d48f8f32564fef8b
│  │  ├─ 6c
│  │  │  ├─ 43db48d16f2b106e399f85e09b27bc8c7ba3db
│  │  │  ├─ 6b166ae447bae9f1ec8dfb4be55f0c9341510b
│  │  │  └─ b3b8cc55f6a9d6938aa2ad083a5aedd6fa8e54
│  │  ├─ 6e
│  │  │  └─ 9ab2e2e297100710e0b2f23faf9dbdef664979
│  │  ├─ 6f
│  │  │  ├─ 489da0f092195fde2d693db277483491445a75
│  │  │  └─ a1f8b4fb1f08c92a34cab066807fbd3bc2140f
│  │  ├─ 70
│  │  │  └─ 7fe37f318cea49d21386887da08c28e1f6d57c
│  │  ├─ 72
│  │  │  └─ ba5e2bd206f3c634301f9054b56b1db6a2b08d
│  │  ├─ 75
│  │  │  └─ 05b0d80f45c5ebe9d582cde4e00eeb7f222443
│  │  ├─ 76
│  │  │  └─ 231378be6f2b98096a75730f46b220a469ffca
│  │  ├─ 7a
│  │  │  └─ 8db24ba6adf085ff3c95186091752c1a038bae
│  │  ├─ 7d
│  │  │  └─ d82a70782d064dfd8d557defaae4a5ccb56e3a
│  │  ├─ 80
│  │  │  └─ 8324994d46498c017666640b099bf7b9b18d41
│  │  ├─ 81
│  │  │  ├─ 2e63024e10d92338f4d2d53a15f06891592aae
│  │  │  └─ 5bf0412f931a3cf7c45398e3cfc3368b159a6c
│  │  ├─ 84
│  │  │  └─ f560fface1e2f9b0363cf4a4c94681aa0f1879
│  │  ├─ 85
│  │  │  └─ 5ccd005366ad2917bed3022f6f0eac4a5e6fcb
│  │  ├─ 87
│  │  │  ├─ 474f161ba36339b787694847333c3d0ba5cfd7
│  │  │  └─ 5fa6fab4c62188d2d141ca2ba81d1651edc110
│  │  ├─ 88
│  │  │  └─ 6accfd4dbcefa86975c1aaa2d917f6cd9c1d24
│  │  ├─ 89
│  │  │  └─ f0b3072d8e1bd1fac785069772dbee2c89032f
│  │  ├─ 8a
│  │  │  └─ ff51f247ce0ca5f94ab83ba82d564286177d93
│  │  ├─ 8e
│  │  │  └─ 13846b5c9b7b0c6fb1fdc02427afb8d0004e13
│  │  ├─ 92
│  │  │  ├─ 28060369749e4eb56cd4b4542b3ca28b1e99d9
│  │  │  ├─ 509d527481147afa978ce498fe3b05b41938ae
│  │  │  └─ 81e9ede2a0755c0cec01c930be9425f83facc0
│  │  ├─ 93
│  │  │  ├─ 234dc5145b5112cd29882ea4c294d7dc23676e
│  │  │  └─ 8994e0a3de5def0525878ee69d85a679fecc75
│  │  ├─ 94
│  │  │  └─ ce66e5fcfae4ca7bdf6ce3f29b856d5f0cc68c
│  │  ├─ 95
│  │  │  └─ c049aac8b540ce56e5101cac970ae4e1bade2e
│  │  ├─ 96
│  │  │  └─ 7445914f508846f6d42ba11b53551d406d49fe
│  │  ├─ 99
│  │  │  └─ 4c0664c5497b315ef2d1a3b319cb8f41938d08
│  │  ├─ 9a
│  │  │  ├─ 06a5787a0107e5d0fe1a98ca145df6dd99023e
│  │  │  └─ 090bc51862e1fd9b6de9e2ac39f6f028c32e66
│  │  ├─ 9b
│  │  │  └─ 0f9b07a631012912dad39562edbbb2902612d8
│  │  ├─ 9c
│  │  │  └─ 26cf3a57f16caa59a65bef5592692790f7c2e8
│  │  ├─ 9d
│  │  │  └─ bd12328de2be5aa58f0bf19ade25bb1d497254
│  │  ├─ 9e
│  │  │  └─ 1484a32f798dde1ce1704927b9102b458d7d06
│  │  ├─ 9f
│  │  │  ├─ 544762ac5c8c6b56ff76e0cf9b88edb8c5859d
│  │  │  └─ 5d47d2461cfde5f49bff1d8ea119ff58d4b68c
│  │  ├─ a0
│  │  │  ├─ 367dc670b4fee6518c99d68db6db9270e3bb30
│  │  │  ├─ f1e120d83eaac5dff1cdb67dfbb3cd680df207
│  │  │  └─ f3e044fa19952b1ea85c1e13d76a37f7a2d12b
│  │  ├─ a2
│  │  │  └─ deb54344f7d947d0e94c56b9bc9d34d9c688cf
│  │  ├─ a3
│  │  │  └─ 4e14dc60aa9524afcd265360af6ba6d1e633c7
│  │  ├─ a4
│  │  │  ├─ 90aec077e972cfd7278270ad3b7349279c81b4
│  │  │  └─ bb9d4d49d290e5edb2df77f52adc2bb3ee3b2d
│  │  ├─ a5
│  │  │  └─ 8cde8a67b31c387d236cefc86135e3f829f832
│  │  ├─ a7
│  │  │  ├─ 70b5b3d73c5433575dcad9cfd93955aecc8cf0
│  │  │  ├─ b44785083ba9453185932ab7d436cee3619d86
│  │  │  ├─ d4edd27369b1e08e6fbf27bfd56f6201f6beec
│  │  │  └─ f8cb693d3c3a666d9c313e093f6a3efe2e08ce
│  │  ├─ a8
│  │  │  └─ 4530cbc82db86a60625eec32875c8b7a115d80
│  │  ├─ a9
│  │  │  └─ 251998edc10ad9ab6daf9aa917aab619624bd4
│  │  ├─ aa
│  │  │  └─ 26cfae0998d66725358f2f1d029c567e45e33c
│  │  ├─ ae
│  │  │  └─ 2d92d1d6fee9a862e1aa2929f045d623db5771
│  │  ├─ af
│  │  │  ├─ 262f6c423b6f881d454c10d1aa1dd0acaa28f1
│  │  │  └─ 445aac553afa8272bc6e831f868b76aa3e927a
│  │  ├─ b5
│  │  │  └─ b3a989defa9509781236768988b0732ccf261e
│  │  ├─ b6
│  │  │  └─ 3ce45789390936d67a94b40b072828fa8b32c8
│  │  ├─ b7
│  │  │  └─ e6656ebc510b5b6c21b88bd1d5ce2830fafec7
│  │  ├─ b8
│  │  │  ├─ 514cb300b615d6afe64557fd6c8b8a3c3c19c4
│  │  │  └─ c840254cd1a681cf9626cbd1b7f35f01222e9c
│  │  ├─ ba
│  │  │  ├─ 4c7973056234beba57ba5c50ab4d1ac450031e
│  │  │  └─ fc1a492d96e84823ee0b1d47e0702e049e69d3
│  │  ├─ bc
│  │  │  └─ 77f4755303b5c8995c9c406ba294f1537d861d
│  │  ├─ bd
│  │  │  └─ 31393311ee05b247f14f6bd66f6ba2d2d0cb30
│  │  ├─ be
│  │  │  ├─ 08be14db0e5b6ecf2bb60d7dcf9ba341027384
│  │  │  ├─ 7a17efe346dcf1ac66007f0e912604842866be
│  │  │  └─ af19c9d2afd27c98898647b15aa9e240ce5e13
│  │  ├─ bf
│  │  │  ├─ 5f94c6cb183bcdfd04b91b82c4c209abc777ca
│  │  │  └─ 95eea123d7e8da888d37271674485931968ac3
│  │  ├─ c2
│  │  │  └─ 1c2f5ddcef30b7fc4cce0924edc0451e1373a6
│  │  ├─ c4
│  │  │  └─ 86dd7ecb99764e20692de79f49ce6cd153da20
│  │  ├─ c5
│  │  │  └─ ff2d4c839005380d2cd8a4d3af7645ec8c1b5f
│  │  ├─ c7
│  │  │  ├─ 128993cc4f4ca7067a66c4ab65a5648ba56215
│  │  │  └─ 699a19d97f3ae01040548b2c13b83324c31cc1
│  │  ├─ ca
│  │  │  ├─ 7140a9aeb9838688ac563c2431a8296175c555
│  │  │  └─ c88ed6177b54c3a4469e773e1227031a86d06f
│  │  ├─ cc
│  │  │  └─ 3300f49d608fb85423698669f098284a3239c5
│  │  ├─ cd
│  │  │  ├─ 9c178ef43cf5b4de9bf9daf8c27989698ba726
│  │  │  └─ a1a3ffb0881655f74b6a46a67758eb97ae54a2
│  │  ├─ cf
│  │  │  ├─ 58fb676a9965d3fc0a727deb2126398ed82079
│  │  │  └─ 93673f63afac8b679dd49da5b1b3d8f665d918
│  │  ├─ d0
│  │  │  └─ 82683a6667085819587446e700af65086d2b47
│  │  ├─ d1
│  │  │  ├─ 0fc45e2e9468a3e6e316ab02a838509faaed28
│  │  │  ├─ ab988d376697c4eadf69fef6a973183724e225
│  │  │  └─ cf8e0e4737ec2e91d397bb8f6a56362de3b5dc
│  │  ├─ d4
│  │  │  └─ 5c953787633945bd4816ee2550deb947f4219b
│  │  ├─ d5
│  │  │  ├─ 97badb5626ccc0176fbd455672885ae479cc99
│  │  │  └─ 97ff93a5bd75979770f520490e6545c41b70f0
│  │  ├─ d6
│  │  │  ├─ 48c3e6f318797f5bb6984c6d4a83bfcea3d064
│  │  │  ├─ 8f8e2afbfb54df9a956de862c5526cf56812ba
│  │  │  └─ a101c07aab50559339a0638be4199f790d4c32
│  │  ├─ d7
│  │  │  ├─ 16f61c91ef805e64e1e875040969c3c8c6eb55
│  │  │  ├─ 6876dd96b3da1ab5a180d82a01dec45980c2eb
│  │  │  └─ f42194dc935b6b524dcdae28ab7f5344d5f227
│  │  ├─ da
│  │  │  └─ 1b176f53cc5eacc5f5c5a4b427c084a2b7e23a
│  │  ├─ db
│  │  │  └─ e258d1f23dc64a007c6acadd2e67be29ce764a
│  │  ├─ dd
│  │  │  └─ 1069ae0a8c86f59814ea7fa41f0d65bc33f6cd
│  │  ├─ e0
│  │  │  ├─ 1bf1fd005be651c8cdcf3419c9f56c4eb58aed
│  │  │  └─ 4f2b34b72414c4f67edb1112b215c85e59d606
│  │  ├─ e4
│  │  │  ├─ 54270e067145dc3a64636ce45f3ac546d38660
│  │  │  └─ d6e2a74db05c8cb7b94f2774a8d3e608f307c7
│  │  ├─ e5
│  │  │  ├─ a3d32409fe278120bcdb49c596c51ca7ce81ce
│  │  │  ├─ b811ebf6479699009a20bb7982932f5d1ad4cf
│  │  │  └─ fa764d97c63cccfe23550f4cea64299ab2df6d
│  │  ├─ e6
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ ea
│  │  │  └─ 9dcec95df8d39d3ae85f9030cef8b25c97ad06
│  │  ├─ eb
│  │  │  ├─ 2db74b749c08b0ce1f00426ddcd8838ce17a3b
│  │  │  └─ c0ae6feda8a199e0188301f852e91bd62b43fd
│  │  ├─ f0
│  │  │  └─ fec5a90ddde3dc37e80a3af015bcf3af55847f
│  │  ├─ f1
│  │  │  └─ 0dda69b5a94b611f806e489ea246d5c853657f
│  │  ├─ f2
│  │  │  ├─ 0d6b443560053c9266e7cbe73ad77e3ac9f0cc
│  │  │  └─ c56f3287abbfed68cc95711c28327427543159
│  │  ├─ f3
│  │  │  ├─ 649d085bfa5230449fcae3d33cc0876bfed525
│  │  │  └─ b0554f6da84de03b9f7a40c821ec6d2601e2a1
│  │  ├─ f7
│  │  │  └─ 49e92850d481ce9fd31681dc8f422d455b871b
│  │  ├─ fa
│  │  │  └─ 8457962f7a7437023d2a58f71c86bc8fbff6f3
│  │  ├─ fb
│  │  │  └─ 129bb0d6df02e88ce7c84688e8071fa1c2e70e
│  │  ├─ fc
│  │  │  ├─ 9c1fea8d9ee2a577af732d6f918d515c12f1cd
│  │  │  └─ e49a704bc37fe0cfc8a2eabff3e5da563902c9
│  │  ├─ fd
│  │  │  ├─ af5bd7dd7ff127dd05a2291edce105ac9182a5
│  │  │  └─ f620d864ce69a3662f4049f3310f5e758acc69
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-1ebe12e4114800f7d25bd8d519dd7074d08df679.idx
│  │     ├─ pack-1ebe12e4114800f7d25bd8d519dd7074d08df679.pack
│  │     └─ pack-1ebe12e4114800f7d25bd8d519dd7074d08df679.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     └─ main
│     └─ tags
├─ .github
│  └─ workflows
│     ├─ build.yml
│     ├─ format.yml
│     ├─ linting.yml
│     └─ tests.yml
├─ .gitignore
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ .svelte-kit
│  ├─ ambient.d.ts
│  ├─ generated
│  │  ├─ client
│  │  │  ├─ app.js
│  │  │  ├─ matchers.js
│  │  │  └─ nodes
│  │  │     ├─ 0.js
│  │  │     ├─ 1.js
│  │  │     ├─ 10.js
│  │  │     ├─ 11.js
│  │  │     ├─ 12.js
│  │  │     ├─ 13.js
│  │  │     ├─ 14.js
│  │  │     ├─ 15.js
│  │  │     ├─ 16.js
│  │  │     ├─ 17.js
│  │  │     ├─ 18.js
│  │  │     ├─ 19.js
│  │  │     ├─ 2.js
│  │  │     ├─ 20.js
│  │  │     ├─ 21.js
│  │  │     ├─ 22.js
│  │  │     ├─ 23.js
│  │  │     ├─ 24.js
│  │  │     ├─ 25.js
│  │  │     ├─ 26.js
│  │  │     ├─ 27.js
│  │  │     ├─ 28.js
│  │  │     ├─ 29.js
│  │  │     ├─ 3.js
│  │  │     ├─ 30.js
│  │  │     ├─ 31.js
│  │  │     ├─ 32.js
│  │  │     ├─ 33.js
│  │  │     ├─ 34.js
│  │  │     ├─ 35.js
│  │  │     ├─ 36.js
│  │  │     ├─ 37.js
│  │  │     ├─ 38.js
│  │  │     ├─ 39.js
│  │  │     ├─ 4.js
│  │  │     ├─ 40.js
│  │  │     ├─ 41.js
│  │  │     ├─ 42.js
│  │  │     ├─ 5.js
│  │  │     ├─ 6.js
│  │  │     ├─ 7.js
│  │  │     ├─ 8.js
│  │  │     └─ 9.js
│  │  ├─ root.js
│  │  ├─ root.svelte
│  │  └─ server
│  │     └─ internal.js
│  ├─ non-ambient.d.ts
│  ├─ tsconfig.json
│  └─ types
│     ├─ route_meta_data.json
│     └─ src
│        └─ routes
│           ├─ $types.d.ts
│           ├─ (admin)
│           │  └─ account
│           │     ├─ (menu)
│           │     │  ├─ billing
│           │     │  │  └─ manage
│           │     │  └─ settings
│           │     │     ├─ change_email
│           │     │     ├─ change_email_subscription
│           │     │     ├─ change_password
│           │     │     ├─ delete_account
│           │     │     ├─ edit_profile
│           │     │     └─ reset_password
│           │     ├─ api
│           │     ├─ create_profile
│           │     ├─ select_plan
│           │     ├─ sign_out
│           │     └─ subscribe
│           │        └─ [slug]
│           ├─ (auth)
│           │  ├─ $types.d.ts
│           │  └─ account
│           │     ├─ $types.d.ts
│           │     ├─ (menu)
│           │     │  ├─ $types.d.ts
│           │     │  ├─ billing
│           │     │  │  ├─ $types.d.ts
│           │     │  │  ├─ manage
│           │     │  │  │  ├─ $types.d.ts
│           │     │  │  │  └─ proxy+page.server.ts
│           │     │  │  └─ proxy+page.server.ts
│           │     │  └─ settings
│           │     │     ├─ $types.d.ts
│           │     │     ├─ change_email
│           │     │     │  └─ $types.d.ts
│           │     │     ├─ change_email_subscription
│           │     │     │  └─ $types.d.ts
│           │     │     ├─ change_password
│           │     │     │  └─ $types.d.ts
│           │     │     ├─ delete_account
│           │     │     │  └─ $types.d.ts
│           │     │     ├─ edit_profile
│           │     │     │  └─ $types.d.ts
│           │     │     └─ reset_password
│           │     │        └─ $types.d.ts
│           │     ├─ api
│           │     │  └─ $types.d.ts
│           │     ├─ create_profile
│           │     │  └─ $types.d.ts
│           │     ├─ proxy+layout.server.ts
│           │     ├─ select_plan
│           │     │  └─ $types.d.ts
│           │     ├─ sign_out
│           │     │  └─ $types.d.ts
│           │     └─ subscribe
│           │        └─ [slug]
│           │           ├─ $types.d.ts
│           │           └─ proxy+page.server.ts
│           ├─ (csr)
│           │  ├─ $types.d.ts
│           │  └─ draftOrder
│           ├─ (marketing)
│           │  ├─ auth
│           │  │  └─ callback
│           │  ├─ blog
│           │  │  ├─ (posts)
│           │  │  │  ├─ awesome_post
│           │  │  │  ├─ example_blog_post
│           │  │  │  └─ how_we_built_our_41kb_saas_website
│           │  │  └─ rss.xml
│           │  ├─ contact_us
│           │  ├─ draftOrder
│           │  │  └─ createDraftOrder
│           │  ├─ knowledge-base
│           │  │  └─ api
│           │  ├─ login
│           │  │  ├─ current_password_error
│           │  │  ├─ forgot_password
│           │  │  ├─ sign_in
│           │  │  └─ sign_up
│           │  ├─ pricing
│           │  ├─ quote
│           │  ├─ quoteChat
│           │  │  └─ api
│           │  │     └─ chatGPT
│           │  ├─ search
│           │  │  └─ api.json
│           │  └─ sitemap.xml
│           ├─ (protected)
│           │  ├─ $types.d.ts
│           │  ├─ draftOrder
│           │  │  ├─ $types.d.ts
│           │  │  └─ api
│           │  │     └─ createDraftOrder
│           │  │        └─ $types.d.ts
│           │  ├─ knowledge-base
│           │  │  ├─ $types.d.ts
│           │  │  └─ api
│           │  │     └─ $types.d.ts
│           │  └─ proxy+layout.server.ts
│           ├─ (public)
│           │  ├─ $types.d.ts
│           │  ├─ auth
│           │  │  └─ callback
│           │  │     └─ $types.d.ts
│           │  ├─ blog
│           │  │  ├─ $types.d.ts
│           │  │  ├─ (posts)
│           │  │  │  ├─ $types.d.ts
│           │  │  │  ├─ awesome_post
│           │  │  │  │  └─ $types.d.ts
│           │  │  │  ├─ example_blog_post
│           │  │  │  │  └─ $types.d.ts
│           │  │  │  └─ how_we_built_our_41kb_saas_website
│           │  │  │     └─ $types.d.ts
│           │  │  └─ rss.xml
│           │  │     └─ $types.d.ts
│           │  ├─ contact_us
│           │  │  ├─ $types.d.ts
│           │  │  └─ proxy+page.server.ts
│           │  ├─ login
│           │  │  ├─ $types.d.ts
│           │  │  ├─ current_password_error
│           │  │  │  └─ $types.d.ts
│           │  │  ├─ forgot_password
│           │  │  │  └─ $types.d.ts
│           │  │  ├─ proxy+layout.server.ts
│           │  │  ├─ sign_in
│           │  │  │  └─ $types.d.ts
│           │  │  └─ sign_up
│           │  │     └─ $types.d.ts
│           │  ├─ pricing
│           │  │  └─ $types.d.ts
│           │  ├─ proxy+layout.server.ts
│           │  ├─ quote
│           │  │  └─ $types.d.ts
│           │  ├─ quoteChat
│           │  │  ├─ $types.d.ts
│           │  │  └─ api
│           │  │     └─ chatGPT
│           │  │        └─ $types.d.ts
│           │  ├─ search
│           │  │  ├─ $types.d.ts
│           │  │  └─ api.json
│           │  │     └─ $types.d.ts
│           │  └─ sitemap.xml
│           │     └─ $types.d.ts
│           ├─ api
│           │  └─ shopify
│           │     └─ cart
│           │        └─ $types.d.ts
│           └─ proxy+layout.server.ts
├─ .vscode
│  └─ settings.json
├─ LICENSE
├─ README.md
├─ SECURITY.md
├─ analytics_docs.md
├─ checks.sh
├─ database_migration.sql
├─ email_docs.md
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ src
│  ├─ DatabaseDefinitions.ts
│  ├─ ambient.d.ts
│  ├─ app.css
│  ├─ app.d.ts
│  ├─ app.html
│  ├─ config.ts
│  ├─ hooks.server.ts
│  ├─ index.test.ts
│  ├─ lib
│  │  ├─ apiTools
│  │  │  ├─ graphQL
│  │  │  │  └─ graphqlClient.ts
│  │  │  └─ shopify
│  │  │     ├─ adminQueries.ts
│  │  │     ├─ adminService.ts
│  │  │     ├─ shopifyQueries.ts
│  │  │     └─ shopifyService.ts
│  │  ├─ build_index.ts
│  │  ├─ components
│  │  │  └─ chat
│  │  │     ├─ ChatInterface.svelte
│  │  │     └─ ChatMessage.svelte
│  │  ├─ emails
│  │  │  ├─ welcome_email_html.hbs
│  │  │  └─ welcome_email_text.hbs
│  │  ├─ index.js
│  │  ├─ load_helpers.ts
│  │  ├─ mailer.test.ts
│  │  ├─ mailer.ts
│  │  ├─ quoteEngine
│  │  │  ├─ flatPrintingCalculator-v2.js
│  │  │  └─ index.ts
│  │  ├─ server
│  │  │  └─ config
│  │  │     └─ flatConfig.js
│  │  ├─ shipping
│  │  │  └─ shipping-calc.js
│  │  └─ users
│  │     └─ auth.ts
│  ├─ params
│  │  └─ lowercase.ts
│  └─ routes
│     ├─ (auth)
│     │  ├─ +layout.svelte
│     │  └─ account
│     │     ├─ (menu)
│     │     │  ├─ +layout.svelte
│     │     │  ├─ +page.server.ts
│     │     │  ├─ +page.svelte
│     │     │  ├─ billing
│     │     │  │  ├─ +page.server.ts
│     │     │  │  ├─ +page.svelte
│     │     │  │  └─ manage
│     │     │  │     └─ +page.server.ts
│     │     │  └─ settings
│     │     │     ├─ +page.svelte
│     │     │     ├─ change_email
│     │     │     │  └─ +page.svelte
│     │     │     ├─ change_email_subscription
│     │     │     │  └─ +page.svelte
│     │     │     ├─ change_password
│     │     │     │  └─ +page.svelte
│     │     │     ├─ delete_account
│     │     │     │  └─ +page.svelte
│     │     │     ├─ edit_profile
│     │     │     │  └─ +page.svelte
│     │     │     ├─ reset_password
│     │     │     │  └─ +page.svelte
│     │     │     └─ settings_module.svelte
│     │     ├─ +layout.server.ts
│     │     ├─ +layout.svelte
│     │     ├─ +layout.ts
│     │     ├─ api
│     │     │  ├─ +page.server.ts
│     │     │  └─ page.server.test.ts
│     │     ├─ create_profile
│     │     │  ├─ +page.server.ts
│     │     │  ├─ +page.svelte
│     │     │  └─ +page.ts
│     │     ├─ select_plan
│     │     │  └─ +page.svelte
│     │     ├─ sign_out
│     │     │  └─ +page.svelte
│     │     ├─ subscribe
│     │     │  └─ [slug]
│     │     │     └─ +page.server.ts
│     │     └─ subscription_helpers.server.ts
│     ├─ (csr)
│     │  └─ +layout.svelte
│     ├─ (protected)
│     │  ├─ +layout.server.ts
│     │  ├─ +layout.svelte
│     │  ├─ draftOrder
│     │  │  ├─ +page.server.ts
│     │  │  ├─ +page.svelte
│     │  │  └─ api
│     │  │     └─ createDraftOrder
│     │  │        └─ +server.ts
│     │  └─ knowledge-base
│     │     ├─ +page.svelte
│     │     └─ api
│     │        └─ +server.js
│     ├─ (public)
│     │  ├─ +layout.server.ts
│     │  ├─ +layout.svelte
│     │  ├─ +page.svelte
│     │  ├─ +page.ts
│     │  ├─ auth
│     │  │  └─ callback
│     │  │     └─ +server.js
│     │  ├─ blog
│     │  │  ├─ (posts)
│     │  │  │  ├─ +layout.svelte
│     │  │  │  ├─ awesome_post
│     │  │  │  │  └─ +page.svelte
│     │  │  │  ├─ example_blog_post
│     │  │  │  │  └─ +page.svelte
│     │  │  │  └─ how_we_built_our_41kb_saas_website
│     │  │  │     └─ +page.svelte
│     │  │  ├─ +layout.ts
│     │  │  ├─ +page.svelte
│     │  │  ├─ posts.ts
│     │  │  └─ rss.xml
│     │  │     └─ +server.ts
│     │  ├─ contact_us
│     │  │  ├─ +page.server.ts
│     │  │  └─ +page.svelte
│     │  ├─ login
│     │  │  ├─ +layout.server.ts
│     │  │  ├─ +layout.svelte
│     │  │  ├─ +layout.ts
│     │  │  ├─ +page.svelte
│     │  │  ├─ current_password_error
│     │  │  │  └─ +page.svelte
│     │  │  ├─ forgot_password
│     │  │  │  ├─ +page.server.ts
│     │  │  │  └─ +page.svelte
│     │  │  ├─ login_config.ts
│     │  │  ├─ sign_in
│     │  │  │  ├─ +page.server.ts
│     │  │  │  └─ +page.svelte
│     │  │  └─ sign_up
│     │  │     ├─ +page.server.ts
│     │  │     └─ +page.svelte
│     │  ├─ pricing
│     │  │  ├─ +page.svelte
│     │  │  ├─ +page.ts
│     │  │  ├─ pricing_module.svelte
│     │  │  └─ pricing_plans.ts
│     │  ├─ quote
│     │  │  ├─ +page.server.ts
│     │  │  └─ +page.svelte
│     │  ├─ quoteChat
│     │  │  ├─ +page.server.ts
│     │  │  ├─ +page.svelte
│     │  │  └─ api
│     │  │     └─ chatGPT
│     │  │        └─ +server.ts
│     │  ├─ search
│     │  │  ├─ +page.server.ts
│     │  │  ├─ +page.svelte
│     │  │  └─ api.json
│     │  │     └─ +server.ts
│     │  └─ sitemap.xml
│     │     └─ +server.ts
│     ├─ (user)
│     ├─ +error.svelte
│     ├─ +layout.server.ts
│     ├─ +layout.svelte
│     └─ api
│        └─ shopify
│           └─ cart
│              └─ +server.ts
├─ static
│  ├─ favicon.png
│  ├─ images
│  │  ├─ Docs
│  │  │  ├─ ERP
│  │  │  │  ├─ .cursorignore
│  │  │  │  │  └─ _old-AI MIS-12-6-24
│  │  │  │  └─ AI MIS-v2
│  │  │  └─ catering
│  │  ├─ cm_logo.svg
│  │  ├─ example-home.png
│  │  └─ rss.svg
│  ├─ markdowns project management
│  │  ├─ FP-save12-6-24.md
│  │  ├─ MIS First Pass.md
│  │  ├─ Principles of Manufacturing Business.md
│  │  ├─ import tests
│  │  │  ├─ custom shapes example
│  │  │  ├─ departments example
│  │  │  ├─ finish sizes example
│  │  │  ├─ fold catalog example
│  │  │  ├─ guillotene example
│  │  │  ├─ indigo press example.txt
│  │  │  ├─ machines example
│  │  │  ├─ materials that arent stock example
│  │  │  ├─ operations Finishing category example
│  │  │  ├─ operations component example
│  │  │  ├─ operations example
│  │  │  ├─ operations imposition requirements example
│  │  │  ├─ operations parameter example
│  │  │  ├─ press process mapping example
│  │  │  ├─ press speed set example
│  │  │  ├─ press spoils example
│  │  │  ├─ production ordering example
│  │  │  ├─ quote questions example
│  │  │  ├─ rates example
│  │  │  ├─ stock cutting rules example
│  │  │  ├─ stock example
│  │  │  └─ stock group example
│  │  ├─ sql editor shortcuts
│  │  ├─ sql search for all triggers
│  │  ├─ supabase triggers
│  │  ├─ supabase_database_structure.md
│  │  └─ tag-process.md
│  └─ robots.txt
├─ supabase
│  └─ migrations
│     ├─ 20240730010101_initial.sql
│     └─ 20240731051052_add_unsubscribed_to_profiles.sql
├─ svelte.config.js
├─ tailwind.config.js
├─ tsconfig.json
└─ vite.config.ts

```