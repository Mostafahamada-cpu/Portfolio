/*
 * Project data for the Projects section.
 *
 * This file holds copy only. Every image path, gallery group and cover comes
 * from `project-assets.generated.js`, which is produced by
 * `node generate-project-assets.js` from the real project folders.
 *
 * A case study is an ordered list of blocks. The renderer in
 * `featured-projects.js` knows how to draw each block type, so no project has
 * its own layout code:
 *
 *   { type: 'text',     title, body: [paragraph, ...] }
 *   { type: 'problem',  problem, solution }
 *   { type: 'features', title, items: [...] }
 *   { type: 'flow',     title, intro?, flows: [{ label?, steps: [...] }] }
 *   { type: 'rules',    title, intro?, items: [{ value, title, note }] }
 *   { type: 'gallery',  title?, group: '<group id>' | 'all' }
 *   { type: 'part',     title, intro? }
 *   { type: 'divider' }
 *
 * `status` ('Live' | 'In Production' | 'In Development' | 'Coming Soon') shows
 * as a pill on the card. A project without a case study is drawn as an
 * upcoming project: it can list what is being built in `focus` and a short
 * `note` in place of the case-study button.
 */
(() => {
  const assets = window.portfolioProjectAssets || {};

  /* Pull a gallery group discovered from the folder structure. */
  const group = (projectId, groupId) => {
    const project = assets[projectId] || {};
    const groups = project.groups || [];
    if (groupId === 'all' || !groupId) {
      return { images: project.images || [], orientation: 'mixed', aspect: null };
    }
    const match = groups.find(item => item.id === groupId);
    return { images: match ? match.images : [], orientation: match ? match.orientation : 'landscape', aspect: match ? match.aspect : null };
  };

  const media = projectId => {
    const project = assets[projectId] || {};
    return {
      brand: project.brand || null,
      cover: project.cover || null,
      images: project.images || [],
      groups: project.groups || []
    };
  };

  window.portfolioProjectManifest = {
    projects: [
      /* ───────────────────────────── 01 — MEMORA ───────────────────────────── */
      {
        id: 'memora',
        title: 'Memora',
        tagline: 'Digital Invitation Platform',
        label: 'Founder',
        labelTone: 'business',
        status: 'Live',
        role: 'Founder & Developer',
        accent: 'rgba(212,175,55,.12)',
        emphasis: true,
        intro:
          'The digital invitation business I founded and run. I design the invitations and built the platform that sells them: a bilingual storefront with live demos for weddings, engagements, henna nights, birthdays and more, a five-step ordering flow, and the admin dashboard behind it.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Vercel', 'Supabase Edge Functions'],
        ...media('memora'),
        caseStudy: {
          summary:
            'Memora is my own business: a premium digital invitation brand for weddings, engagements, henna nights, birthdays, gender reveals, bachelorettes and dates. I designed the business model, I design the invitation products, and I built the platform that sells and delivers them. I also handle customer operations myself.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'Memora is a digital invitation platform and online store. Customers browse invitations by occasion, open a live demo of every design, customise it with add-ons, and place an order through a structured five-step flow that ends in checkout and a WhatsApp confirmation.',
                'The platform has two connected halves. One is the customer-facing store, in English and Arabic. The other is the admin dashboard I use to run the business: orders and custom requests, the product catalog, bundles, add-ons, coupons, analytics and settings.'
              ]
            },
            {
              type: 'problem',
              problem:
                'People planning a wedding or a celebration usually have two options: a generic template with no personality, or an expensive custom design with a long turnaround. Few services let you see the finished invitation live, price it with the extras you want, and order it in one place.',
              solution:
                'I built Memora as an end-to-end invitation store. Every design has a live demo, pricing is transparent (base price plus add-ons), and the order flow collects everything needed to produce the invitation. Payment goes through InstaPay, and each order is confirmed on WhatsApp so I can talk to the customer directly.'
            },
            { type: 'part', title: 'Store', intro: 'The customer-facing side of Memora: discovery, live demos, pricing and the ordering flow.' },
            { type: 'gallery', group: 'store' },
            {
              type: 'features',
              title: 'Store Features',
              items: [
                'Invitations for seven occasions, served from Supabase and managed from the admin dashboard',
                'A live demo for every design, so customers see the real invitation before ordering',
                'Standard and Premium wedding tiers, plus bundles that pair occasions or add a Love NFC card',
                'Paid add-ons such as RSVP, gallery, music and background animation',
                'Interactive price builder (base + add-ons = total) that pre-fills the order form',
                'Five-step order form covering the invitation, customisation, details, event and review',
                'Checkout with InstaPay and a pre-filled WhatsApp confirmation, with every order saved to the database',
                'English and Arabic throughout, with full RTL layout',
                'Separate request flow for fully custom invitations'
              ]
            },
            {
              type: 'flow',
              title: 'Customer Flow',
              intro: 'Customers follow a structured flow from discovery to a confirmed order:',
              flows: [
                {
                  steps: ['Browse by Occasion', 'Live Demo', 'Customise & Add-ons', 'Order Details', 'Checkout (InstaPay)', 'Confirm on WhatsApp']
                }
              ]
            },
            { type: 'part', title: 'Admin Dashboard', intro: 'The management system I use to run Memora from a single interface.' },
            { type: 'gallery', group: 'admin', note: 'Admin screens show demo orders, not real customers.' },
            {
              type: 'features',
              title: 'Admin Features',
              items: [
                'Dashboard with confirmed revenue, pending orders, and monthly revenue and order-volume charts',
                'Orders table with search, sorting and full order details (customer, event and purchase)',
                'Mark as Paid, which records the income in MoneyTracker automatically',
                'MoneyTracker sync status on every paid order, with a one-click retry if a sync fails',
                'Product, bundle and coupon management, with image uploads to Supabase Storage',
                'Analytics: revenue, paid orders, average order value, top products and categories',
                'A WhatsApp button on every order for direct customer contact'
              ]
            },
            {
              type: 'flow',
              title: 'Admin Workflow',
              flows: [
                { steps: ['Dashboard', 'Orders', 'Mark as Paid', 'MoneyTracker sync', 'Products & Bundles', 'Analytics'] }
              ]
            },
            {
              type: 'flow',
              title: 'Connected to Money Tracker',
              intro:
                'Paid orders flow into my personal finance app as income. The dashboard is a static site and cannot hold a webhook secret, so a Supabase Edge Function verifies the admin session and forwards the order on its behalf:',
              flows: [{ steps: ['Order marked Paid', 'Supabase Edge Function', 'Money Tracker webhook', 'Income transaction'] }]
            },
            { type: 'divider' },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'Supabase (Postgres) stores the catalog (categories, products, bundles, add-ons) and all orders. Row Level Security gives the storefront public read access to the catalog only; orders cannot be read publicly. If the database cannot be reached, the store falls back to a seed catalog bundled with the site, so it keeps working.',
                'The order form builds a structured order record including the chosen design, add-ons and event details. Checkout saves that record, shows the InstaPay payment details and opens WhatsApp with the order pre-filled. The admin dashboard reads the same data, so it always reflects the current state of the business.',
                'Performance was part of the build: card images are served as WebP renditions through <picture> with the original as a fallback, and fonts load through preconnected <link> tags instead of CSS imports. The platform is deployed on Vercel.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Built a complete commerce flow as a solo developer, from product display to payment, order management and customer communication',
                'Designed a pricing model (tiers, add-ons, bundles and custom work) that stays easy to understand on the storefront',
                'Made the whole store bilingual, with full RTL support for Arabic',
                'Connected two of my own systems securely without exposing a secret in the browser'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'The platform is live and serving real customers, handling the full lifecycle from browsing a demo to a paid, confirmed order. As the founder, I keep designing new invitation products and run the business from the admin dashboard.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'Founder & Developer. I built the Memora brand and product line and designed the invitations. I also developed the entire platform: storefront, live demos, ordering system, admin dashboard and integrations.'
              ]
            }
          ],
          links: [
            { label: 'Live Store', url: 'https://memora-store.vercel.app/', kind: 'primary' },
            { label: 'GitHub', url: 'https://github.com/Mostafahamada-cpu/MemoraStore', kind: 'github' }
          ]
        }
      },

      /* ─────────────────────────────── 02 — CRM ─────────────────────────────── */
      {
        id: 'crm',
        title: 'RingRoad CRM',
        tagline: 'Real Estate Management Platform',
        status: 'In Production',
        role: 'Full-Stack Developer',
        accent: 'rgba(230,126,34,.1)',
        intro:
          'A bilingual (EN/AR) CRM for a real estate company. It covers listings with approvals and media, a deals pipeline, follow-ups, teams, tasks and calendar, and telesales assignment. Four-role access control is enforced in the database with Supabase Row Level Security.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'PostgreSQL', 'Vercel'],
        ...media('crm'),
        caseStudy: {
          summary:
            'The internal platform for Ring Roads Real Estate. It centralises properties, clients, deals, teams and sales operations in one bilingual workspace, with permissions enforced in the database.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'RingRoad CRM is the company’s main workspace. Agents, team leaders and management use it to manage property listings, move clients through a deals pipeline, schedule follow-ups, run telesales, organise teams, tasks and calendars, and track performance through analytics.',
                'The same platform also receives leads from the public ClientView site. It hosts the RingRoad Attendance System as a section, so the team has one login for sales and attendance.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Client information was scattered across different tools, follow-ups were being missed, and there was no clear view of the sales pipeline. Management had no single place to see team performance or deal progress, and no reliable way to control who could edit which listings.',
              solution:
                'I built a CRM around the real estate sales cycle. It centralises listings and client data, tracks deals through defined stages, schedules follow-ups, and gives management analytics. Every permission is enforced by the database rather than the UI.'
            },
            { type: 'gallery', group: 'main', note: "Screens use the platform's own demo seed data (demo teams, clients and listings). Property photos from Unsplash." },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Property listings with 20+ fields, drag-and-drop image uploads, videos, approvals, sold and archive modules',
                'Clients and a stage-based deals pipeline (lead → contacted → property visit → negotiation → reservation)',
                'Follow-up scheduling with calendar views',
                'Teams module with team dashboards, KPIs, approvals and tasks',
                'Telesales: assign apartments manually or distribute them evenly across the team, with an audit trail',
                'Leads inbox fed by the public ClientView site',
                'Analytics dashboards and CSV export',
                'Full English / Arabic interface with RTL layout'
              ]
            },
            {
              type: 'rules',
              title: 'Role-Based Access',
              intro: 'Four roles, each with its own scope. The same rules are enforced by the UI and by Row Level Security in Postgres:',
              items: [
                { value: 'Admin', title: 'Full control', note: 'Users, roles, every listing' },
                { value: 'Mgmt', title: 'Management', note: 'Teams, approvals, analytics' },
                { value: 'Lead', title: 'Team Leader', note: 'Own team’s listings & tasks' },
                { value: 'Agent', title: 'Agent', note: 'Own listings, new ones go to pending' }
              ]
            },
            {
              type: 'flow',
              title: 'How the System Works',
              intro: 'The CRM follows the sales cycle from lead to closing:',
              flows: [
                { steps: ['Lead (CRM or ClientView)', 'Client', 'Deal Pipeline', 'Follow-Ups', 'Property Visit', 'Sold'] }
              ]
            },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'The front end is plain ES modules with no build step. It includes a hash router with role guards, an EN/AR i18n layer, and a small component library (data tables, modals, form fields, an image uploader and a gallery with lightbox). The app talks to Supabase Auth, PostgREST and Storage directly.',
                'Security lives in the database. Security-definer helper functions resolve the caller’s role and team and drive every RLS policy. A trigger creates a profile for each new account, and a guard trigger blocks non-admins from escalating their own role. Telesales assignment and distribution run as Postgres RPCs, so the logic cannot be bypassed from the browser.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Designed a data model flexible enough to represent the full real estate sales cycle',
                'Enforced a four-level permission hierarchy in the database, not just in the interface',
                'Extended the platform with telesales, public leads, property videos and attendance without breaking existing workflows',
                'Built a bilingual interface that works in both LTR and RTL'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'The CRM is deployed and used by the Ring Roads team for daily client management and sales operations. It replaced scattered tools with one platform and gave the team a clear view of the pipeline.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'Sole developer. I designed the architecture and database schema, wrote the security policies, built every page, and deployed the platform. I worked closely with the business team to turn their sales workflow into the system.'
              ]
            }
          ]
        }
      },

      /* ────────────────────────── 03 — ATTENDANCE SYSTEM ────────────────────────── */
      {
        id: 'attendance-app',
        title: 'RingRoad Attendance System',
        tagline: 'Workforce & Payroll Platform',
        status: 'In Production',
        role: 'Full-Stack Developer',
        accent: 'rgba(37,99,235,.12)',
        intro:
          'An attendance app that grew into a full workforce platform. It has geofenced clock in/out verified on the server, leave with two-stage approval, shifts, tiered late deductions, and payroll that is calculated in the database.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'PostgreSQL', 'Supabase Auth', 'Vercel'],
        ...media('attendance-app'),
        caseStudy: {
          summary:
            'A mobile-first attendance and workforce management system for RingRoad. It handles attendance, leave, permissions, shifts, salary rules and payroll in one place, and every rule is enforced by the database.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'The Attendance System gives employees and administrators one platform for daily attendance and the HR work around it. Employees clock in and out from their phone, and the server checks that they are inside the office geofence (150 m by default, adjustable by an admin between 100 and 200 m).',
                'Over successive versions I extended it into a workforce platform. New additions included leave with two-stage approval, weekend changes and rest days, shifts and grace periods, salary rules, tiered late deductions, monthly leave permissions, payroll, an accountant role and user management. The same system is also mounted inside RingRoad CRM.'
              ]
            },
            {
              type: 'problem',
              problem:
                'The company needed a reliable way to verify that employees were actually at the office when checking in, instead of trust-based manual check-ins. It also needed structured leave management with clear rules, and payroll deductions that followed the company’s real policies.',
              solution:
                'I built a system where the database itself verifies location, applies the leave and lateness rules, and calculates payroll. Employees get a clean mobile app. Administrators get dashboards, approvals and a payroll breakdown that explains every deduction.'
            },
            { type: 'gallery', title: 'Employee App', group: 'employee' },
            { type: 'gallery', title: 'Admin', group: 'admin', note: 'Screens show demo employees and demo attendance data.' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Geofenced clock in / clock out, with every allowed and blocked attempt logged',
                'Live distance-from-office strip and a clear explanation for each GPS failure',
                'Leave requests with live day counts, attachments and two-stage approval',
                'Weekend changes and rest days with per-employee balances',
                'Three work shifts, a 15-minute grace period and role-based days off',
                'Tiered late deductions (quarter, half or full day) applied the same way on every screen',
                'Monthly leave permissions with an automatic approval threshold',
                'Payroll with a per-employee breakdown of every deduction',
                'Admin dashboard: who is in right now, analytics, Kanban employee board',
                'Separate employee, manager, accountant and admin access'
              ]
            },
            {
              type: 'flow',
              title: 'How the System Works',
              flows: [
                { label: 'For Employees', steps: ['Login', 'Clock In (geofence verified)', 'Work', 'Clock Out (verified)', 'Hours & Lateness Calculated'] },
                { label: 'For Leave Requests', steps: ['Submit Request', 'Availability Check', 'Two-Stage Approval', 'Balance Updated'] },
                { label: 'For Payroll', steps: ['Employee', 'Shift', 'Attendance', 'Salary Rules', 'Payroll'] }
              ]
            },
            {
              type: 'rules',
              title: 'Weekend Change Rules',
              intro: 'Weekend changes follow defined company rules, keeping the process controlled and transparent:',
              items: [
                { value: '1st', title: 'First Change', note: 'Applied automatically' },
                { value: '2nd', title: 'Second Change', note: 'Requires admin approval' },
                { value: '3rd', title: 'Third Change', note: 'Not allowed' }
              ]
            },
            {
              type: 'rules',
              title: 'Late-Arrival Deductions',
              intro: 'Lateness is measured from each employee’s own shift start and priced by one rule the admin can configure:',
              items: [
                { value: '0–15', title: 'Minutes late', note: 'Within grace, no deduction' },
                { value: '16–30', title: 'Minutes late', note: '¼ of the daily rate' },
                { value: '31–60', title: 'Minutes late', note: '½ of the daily rate' },
                { value: '61+', title: 'Minutes late', note: 'One full daily rate' }
              ]
            },
            { type: 'divider' },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'The geofence check does not rely on the browser alone. The clock-in and clock-out RPCs recompute the distance in Postgres and reject missing or implausible coordinates. Employees have no direct write access to attendance rows, so the RPCs are the only way to record attendance.',
                'Every sensitive write (leave review, balances, salary rules, shifts, permissions) runs through a SECURITY DEFINER function that re-validates the rule and locks rows where two requests could race. Payroll is never stored. It is recalculated from attendance each time, so refreshing the page can never duplicate a deduction.',
                'Row Level Security is enabled on every table. Employees see only their own data, and even managers cannot see colleagues’ salaries.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Combined employees, roles, shifts, attendance, leave, permissions, salary rules and payroll into one connected system',
                'Moved business rules into the database so they cannot be bypassed from DevTools',
                'Gave employees immediate, understandable feedback when location checks fail',
                'Extended a live system version by version without breaking existing workflows or data'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'The project evolved from a basic attendance app into the company’s workforce management platform, used as a standalone app and inside RingRoad CRM. Employees and administrators have one place for attendance, time off and payroll.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I designed and developed the system and every expansion since. That covers the attendance workflows, geofencing, leave and permission logic, the admin and accounting workspaces, the database schema and security policies, and the salary and payroll engine.'
              ]
            }
          ]
        }
      },

      /* ───────────────────────────── 04 — CLIENTVIEW ───────────────────────────── */
      {
        id: 'clientview',
        title: 'ClientView',
        tagline: 'Public Property Portal · RingRoad',
        status: 'Live',
        role: 'Full-Stack Developer',
        accent: 'rgba(230,126,34,.1)',
        intro:
          'A public, login-free property site connected to RingRoad CRM. Clients can search, save, compare and share listings, watch property videos, and contact the assigned agent on WhatsApp. Enquiries arrive in the CRM as leads.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Vercel'],
        ...media('clientview'),
        caseStudy: {
          summary:
            'The public face of RingRoad CRM: a mobile-first property site where clients browse the company’s live listings without an account, and every enquiry flows straight into the sales pipeline.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'ClientView is a separate, mobile-first property site. Visitors never sign in or register. They can search and filter the listings, save favourites, compare up to four properties side by side, share a link to any property, and message the assigned agent on WhatsApp.',
                'It reads from the same Supabase database as RingRoad CRM through a limited public view. When an agent publishes a property or attaches a video in the CRM, it appears on the site automatically.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Clients had to rely on calls and meetings with agents to get property details or compare options. Enquiries coming from outside the CRM were easy to lose.',
              solution:
                'I built a self-service property site on top of the CRM’s data. Clients explore listings at their own pace, reach the right agent directly, and a “Request details” form files each enquiry into the CRM as a lead.'
            },
            { type: 'gallery', title: 'Desktop', group: 'desktop' },
            { type: 'gallery', title: 'Mobile', group: 'mobile', note: "Rendered from the current code with the platform's demo listings. Property photos from Unsplash." },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Property listing with search, filters and sorting',
                'Detailed property pages with photos and videos (YouTube, Vimeo or uploaded files)',
                'Favourites saved on the device',
                'Side-by-side comparison of up to four properties',
                'Shareable links: every property has a permanent RR-#### code and URL',
                'WhatsApp deep link to the agent assigned to that property',
                '“Request details” form that creates a lead in the CRM'
              ]
            },
            {
              type: 'flow',
              title: 'How the System Works',
              intro: 'Clients move through a simple self-service flow:',
              flows: [
                { steps: ['Properties', 'Search / Filter / Sort', 'Property Details & Video', 'Favourite · Compare · Share', 'WhatsApp or Request Details', 'Lead in CRM'] }
              ]
            },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'Anonymous visitors can read exactly one thing, a public listings view, and write exactly one thing: an RPC that submits a property request. Everything else in the CRM stays private behind Row Level Security. Each property gets a unique RR-#### code from a Postgres sequence and trigger, which is what shared links resolve to.',
                'The router supports clean paths on Vercel (via rewrites) and falls back to hash routing on plain static hosting. Share links, WhatsApp messages and in-app links all come from one helper, so a shared link always reopens the exact property.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Exposed live CRM data publicly without exposing anything else in the database',
                'Turned every enquiry into a CRM lead so nothing gets lost between the site and the sales team',
                'Showed property videos on the portal while keeping a single video system shared with the CRM',
                'Built a client-first interface that works well on phones'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'ClientView is live and gives RingRoad’s clients a modern way to browse properties. Agents spend less time answering basic questions, and every enquiry arrives in the CRM ready for follow-up.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'Sole developer. I designed the client experience, built the site, and wrote the database views, RPC and policies that connect it safely to the CRM.'
              ]
            }
          ],
          links: [{ label: 'Live Site', url: 'https://ring-road-client.vercel.app/', kind: 'primary' }]
        }
      },

      /* ───────────────────────────── 05 — STANCEPRO ───────────────────────────── */
      {
        id: 'stancepro',
        title: 'StancePro',
        tagline: 'Car Accessories E-Commerce',
        status: 'Live',
        role: 'Designer & Developer',
        accent: 'rgba(20,184,166,.12)',
        intro:
          'A car accessories store and admin dashboard, built around the business’s real order workflow. It supports cash on delivery or InstaPay with private payment-proof uploads and a WhatsApp handover, in English and Arabic.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Cloudinary', 'Vercel Serverless Functions'],
        ...media('stancepro'),
        caseStudy: {
          summary:
            'A custom e-commerce platform for a car accessories business. It is designed around the complete purchasing workflow rather than a product showcase, and includes an admin dashboard on the same backend.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'StancePro is a custom e-commerce platform for a car accessories business. Customers browse the shop, add products to a cart, check out with cash on delivery or InstaPay, and hand the order to the business on WhatsApp.',
                'The admin dashboard runs on the same backend, so the storefront and the management side work as one application. Both are available in English and Arabic.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Small online businesses often depend on social media and manual messaging to sell. That makes it hard to organise products, track orders and stock, verify payments, and keep order information in one place.',
              solution:
                'I built a responsive storefront and a dedicated admin dashboard on shared data. Customers order directly from the website, and the business manages products, stock, images, orders and store settings from the dashboard.'
            },
            { type: 'part', title: 'Store', intro: 'The customer-facing storefront, designed around the real ordering workflow.' },
            { type: 'gallery', group: 'store' },
            {
              type: 'features',
              title: 'Store Features',
              items: [
                'Product catalog rendered from Firestore, with search and category filters',
                'Product pages with image gallery, quantity selection and add to cart',
                'Cart with quantity editing and totals',
                'Checkout with cash on delivery or InstaPay / bank transfer',
                'InstaPay orders upload a payment screenshot that only admins can view',
                'Order confirmation with a pre-filled “Send Order via WhatsApp” handover',
                'English / Arabic toggle'
              ]
            },
            {
              type: 'flow',
              title: 'Ordering Flow',
              intro: 'The ordering process follows the business’s actual workflow:',
              flows: [
                {
                  steps: ['Browse Products', 'Product Details', 'Cart', 'Checkout', 'COD or InstaPay + Proof', 'Order Confirmation', 'WhatsApp Handover']
                }
              ]
            },
            { type: 'part', title: 'Admin Dashboard', intro: 'The management side of the same system, connected to the same backend.' },
            { type: 'gallery', group: 'admin' },
            {
              type: 'features',
              title: 'Admin Features',
              items: [
                'Add, edit and remove products, with multiple images uploaded to Cloudinary',
                'Stock quantities and low-stock thresholds',
                'Structured orders with status updates instead of scattered messages',
                'Secure viewing of payment screenshots',
                'Store settings: WhatsApp, social links, InstaPay and bank details, currency',
                'Arabic and English dashboard'
              ]
            },
            {
              type: 'flow',
              title: 'Connected System',
              intro: 'The store and dashboard share one backend, so they work as one business workflow rather than two separate apps:',
              flows: [
                { label: 'Product updates', steps: ['Admin updates product', 'Firestore', 'Store shows updated product'] },
                { label: 'Orders', steps: ['Customer places order', 'Serverless API', 'Firestore', 'Admin sees order'] }
              ]
            },
            { type: 'divider' },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'Firebase Authentication and Firestore hold admins, products and orders, protected by Firestore security rules. Order placement and admin actions run in Vercel Serverless Functions. Admin endpoints verify the caller’s Firebase ID token with the Admin SDK.',
                'Payment screenshots are treated as financial records. The server signs each upload as a private Cloudinary asset with no public URL. Admins view them through an endpoint that creates a two-minute signed URL on the server and streams the image back, so no shareable link ever exists. Product photos use a separate public upload path.'
              ]
            },
            {
              type: 'text',
              title: 'Why I Built It This Way',
              body: [
                'The goal was not to build complicated payment infrastructure. I designed the system around the business’s actual process and connected it to the tools it already uses, like InstaPay and WhatsApp. I also avoided services that would force a paid Firebase plan. That keeps the store simple to operate while still being structured and secure.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I designed and developed both sides of the system: the storefront, product system, cart and checkout, payment-proof flow, admin dashboard, serverless API, and the security rules connecting them.'
              ]
            }
          ],
          links: [{ label: 'Live Store', url: 'https://stance-pro.vercel.app/', kind: 'primary' }]
        }
      },

      /* ──────────────────────────── 06 — MONEY TRACKER ──────────────────────────── */
      {
        id: 'money-tracker',
        title: 'MoneyTracker',
        tagline: 'Personal Finance Application',
        label: 'Personal',
        labelTone: 'personal',
        role: 'Designer & Developer',
        accent: 'rgba(59,130,246,.1)',
        intro:
          'A personal finance app that replaced my Notion money tracker. It is built on a real transaction model (expenses, income, transfers and gifts across accounts), covered by unit tests, and embeddable inside Notion.',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL (Neon)', 'Tailwind CSS', 'Zod', 'Vitest', 'Vercel'],
        ...media('money-tracker'),
        caseStudy: {
          summary:
            'A finance application designed around my real historical data rather than a generic budgeting template. It tracks transactions, accounts, budgets and projects, and runs inside Notion as an embed.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'MoneyTracker replaced a Notion-based money tracker. Before writing code I analysed the old export to learn what the data actually contained, then designed the schema around those findings.',
                'It tracks expenses, income, transfers and gifts across cash and card accounts. It also has budgets, a buying list, analytics charts, and project views that total costs across transactions.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Basic expense trackers treat every transaction as money spent. In the old data, a transfer was recorded as two rows, which inflated both income and expenses. Gifts carried a value but moved no money, and inconsistent category names split the same spending into several buckets.',
              solution:
                'I built a structured transaction model. A transfer is one row from one account to another, with an optional fee, so double-counting is impossible. Gifts are their own type and never touch balances. Categories have aliases and a search that understands transliterated Arabic.'
            },
            { type: 'gallery', group: 'main', note: 'Screens show demo data, including Memora income recorded through the webhook.' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Transaction types: expense, income, transfer and gifted',
                'Multiple accounts, with balances shown both live and all-time',
                'Categories with kinds (spending, person, income source) and aliases',
                'Budgets, a buying list and analytics charts',
                'Transfer detection that suggests pairs with a confidence score for me to confirm or undo',
                'Validation with Zod on every write',
                'Optional PIN lock with a hashed PIN and signed session tokens',
                'Paid Memora orders arrive as income through a secured, idempotent webhook'
              ]
            },
            {
              type: 'text',
              title: 'Notion Integration',
              body: [
                'MoneyTracker is designed to run inside Notion as an embedded app, so I never have to leave my workspace. Getting this right took real work on iframe embedding, security headers and frame-ancestors, and compact embedded layouts.',
                'The Notion mobile app was the hardest case. Its WebView drops cookies and cannot handle redirects inside an embed. So the session token can also travel as a request header, and the lock screen is served at the app’s own URL instead of redirecting.'
              ]
            },
            {
              type: 'flow',
              title: 'Technical Concept',
              flows: [{ steps: ['Notion Workspace', 'Embedded MoneyTracker', 'Next.js App', 'Prisma', 'Neon Postgres'] }]
            },
            {
              type: 'features',
              title: 'Technical Highlights',
              items: [
                'Money stored as integer minor units, never floats',
                'Pure finance functions tested directly against the historical CSV',
                '58 unit tests covering the money and finance rules',
                'Idempotent Notion CSV import that keeps every original row verbatim',
                'Validation script that checks totals, balances and a byte-for-byte round trip of the source data',
                'Export that regenerates the original Notion CSV exactly'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I designed and developed MoneyTracker end to end: the data analysis, schema, transaction model, import and validation tooling, interface, security, and the Notion embed.'
              ]
            }
          ]
        }
      },

      /* ───────────────────────────── 07 — CAMPUSRIDE ───────────────────────────── */
      {
        id: 'campusride',
        title: 'CampusRide',
        tagline: 'Student Carpool App',
        label: 'Personal',
        labelTone: 'personal',
        status: 'In Development',
        role: 'Designer & Developer',
        accent: 'rgba(37,99,235,.1)',
        intro:
          'A private carpool app for university students. Students sign in with their university ID, offer or join rides, and contact drivers on WhatsApp. Seat booking is race-safe, and Firestore security rules protect phone numbers.',
        tech: ['React', 'Vite', 'Firebase Auth', 'Cloud Firestore', 'React Router'],
        ...media('campusride'),
        caseStudy: {
          summary:
            'An invite-only carpool app for students at my university. Drivers share their empty seats, and other students find a ride, contact the driver and join, all without anyone’s phone number being exposed in bulk.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'CampusRide helps students share rides to and from campus. A driver posts a ride with pickup, destination, time and seats, and says whether they are driving their own car or taking an Uber. Other students filter the available rides, open the details, message the driver on WhatsApp, and join if a seat is free.',
                'The app is mobile-first, with a bottom navigation bar on phones and a top navigation bar from tablet size up. An admin area manages users, rides, the invite code and password resets.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Students heading the same way usually coordinate rides in group chats. Seats get double-booked, messages get lost, and everyone’s phone number is visible to the whole group.',
              solution:
                'A dedicated app where seats are tracked accurately and joining is atomic. Students can reach a driver before committing, and phone numbers are only readable where they are actually needed.'
            },
            { type: 'part', title: 'Mobile', intro: 'The main experience, designed for phones. Screens show demo data only.' },
            { type: 'gallery', group: 'mobile' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Registration with university ID, phone, password and an invite code; no email needed',
                'Find a ride with filters for pickup, destination, date and time',
                'Offer a ride as a driver with your own car, or while taking an Uber',
                'Ride details with route, passengers and a WhatsApp “Contact driver” button',
                'My Trips: upcoming, rides I offer, rides I joined, and past trips',
                'Profile editing and in-app password change',
                'Admin: users, rides, passengers, role promotion, invite code rotation and password resets'
              ]
            },
            {
              type: 'flow',
              title: 'How It Works',
              flows: [
                { label: 'For Passengers', steps: ['Find a Ride', 'Ride Details', 'Contact Driver on WhatsApp', 'Join Ride', 'My Trips'] },
                { label: 'For Drivers', steps: ['Offer a Ride', 'Passengers Join', 'Manage Ride', 'Trip'] }
              ]
            },
            { type: 'part', title: 'Desktop', intro: 'From 768px the layout switches to a top navigation bar and a centred, max-width layout.' },
            { type: 'gallery', group: 'desktop' },
            { type: 'divider' },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'Joining a ride runs inside a Firestore transaction. It re-reads the ride, checks that the student is not the driver, has not already joined and that a seat is free, then writes the participant and the new seat count in one commit. The participant document ID is ride + user, so a duplicate join is impossible even if two requests race. Firestore rules enforce the same pairing on the server.',
                'Phone numbers are kept off every document students can read in bulk. The ride list carries no phone data. A driver’s number is only fetched per ride when a student opens it, and passenger numbers are visible only to that ride’s driver. Numbers are normalised to the international format WhatsApp needs, and invalid ones are rejected at registration.',
                'Sign-in uses Firebase Auth behind the scenes, with an internal address derived from the university ID. Only a SHA-256 hash of the invite code is stored, and the rules check it when a profile is created.'
              ]
            },
            {
              type: 'text',
              title: 'Current Status',
              body: [
                'CampusRide is deployed as a private, invite-only app and is in active development. Recent work added ride types (own car or Uber) to the offer flow and ride details.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I designed and built the whole app: the React interface, the Firestore data model and security rules, the transactional booking logic, WhatsApp contact, and the admin tools.'
              ]
            }
          ]
        }
      },

      /* ──────────────────────────────── 08 — AION ──────────────────────────────── */
      {
        id: 'aion',
        title: 'AION',
        tagline: 'Smart-Home Website & Store · AION Innovations',
        status: 'Coming Soon',
        accent: 'rgba(16,151,172,.12)',
        intro:
          'The website and online store for AION Innovations, a designer and producer of easy-to-install smart-home solutions. I’m building custom interactive sections for the company’s Wuilt site to present its product lines and the app experience.',
        focus: [
          'Interactive home showcase with product hotspots',
          'Product-line gallery: lighting, shutters, IR remote control and smart door locks',
          'Smart-home app experience section: control, scenes and dashboard'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Wuilt'],
        note: 'Launching soon',
        ...media('aion')
      }
    ]
  };

  /* Resolve `{ type: 'gallery', group }` blocks to real image lists once, here,
     so the renderer never has to know where images come from. */
  for (const project of window.portfolioProjectManifest.projects) {
    const blocks = project.caseStudy?.blocks;
    if (!blocks) continue;
    for (const block of blocks) {
      if (block.type !== 'gallery') continue;
      const resolved = group(project.id, block.group);
      block.images = resolved.images;
      block.orientation = resolved.orientation;
      block.aspect = resolved.aspect;
    }
    project.caseStudy.blocks = blocks.filter(block => block.type !== 'gallery' || block.images.length);
  }
})();
