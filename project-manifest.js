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
        tagline: 'Digital Wedding Invitation Platform',
        label: 'My Own Business',
        labelTone: 'business',
        role: 'Founder & Developer',
        accent: 'rgba(212,175,55,.12)',
        emphasis: true,
        intro:
          'A digital wedding invitation platform and online store I founded and built end to end — storefront, live invitation demos, ordering flow, and the admin dashboard that runs the business.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Vercel'],
        ...media('memora'),
        caseStudy: {
          summary:
            'Memora is my own business — a digital wedding invitation platform and online store. Customers browse a curated collection of invitation products and bundles, preview live interactive demos, and place orders through a structured e-commerce flow. I designed the business model, created the invitation products, developed the platform, and handle all customer operations.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'Memora is a digital wedding invitation platform and online store that allows customers to explore products and bundles, preview live demos, and place orders through a structured ordering flow.',
                'The system is made of two connected halves: the customer-facing store, and the admin dashboard I use to run the business — analysing orders, managing products and bundles, updating prices, and reviewing customer order details.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Couples looking for digital wedding invitations face either generic templates that lack personality or expensive custom design services with long turnaround times. There was no unified platform for browsing, previewing live demos, and ordering custom invitations with direct creator communication.',
              solution:
                'I built Memora as an end-to-end e-commerce platform for digital wedding invitations. Customers browse products or bundles, see exactly what they are getting through live interactive demos, and complete their order through a guided step-by-step flow with InstaPay payment and WhatsApp communication.'
            },
            { type: 'part', title: 'Store', intro: 'The customer-facing side of Memora — discovery, live demos, and the ordering flow.' },
            { type: 'gallery', group: 'store' },
            {
              type: 'features',
              title: 'Store Features',
              items: [
                'E-commerce store with individual products and curated bundles',
                'Live interactive invitation demos customers can preview before purchase',
                'Structured step-by-step ordering flow with input validation',
                'InstaPay payment link integration',
                'Generated WhatsApp order links for direct communication',
                'Product categorisation, filtering, and detailed product pages'
              ]
            },
            {
              type: 'flow',
              title: 'Customer Flow',
              intro: 'Customers follow a structured purchasing flow from discovery to order confirmation:',
              flows: [
                {
                  steps: ['Browse', 'Choose Product / Bundle', 'Live Demo', 'Start Your Order', 'Enter Details', 'Payment', 'Order Confirmed']
                }
              ]
            },
            { type: 'part', title: 'Admin Dashboard', intro: 'The management system I use to run Memora from a single interface.' },
            { type: 'gallery', group: 'admin' },
            {
              type: 'features',
              title: 'Admin Features',
              items: [
                'Order analytics and tracking dashboard',
                'Full product management — add, edit, and remove products with images',
                'Bundle creation and management system',
                'Pricing control across all products and bundles',
                'Detailed customer order view with complete order information',
                'WhatsApp direct message button on every order'
              ]
            },
            {
              type: 'flow',
              title: 'Admin Workflow',
              flows: [
                { steps: ['Dashboard Overview', 'Orders', 'Products', 'Bundles', 'Analytics', 'Customer Communication'] }
              ]
            },
            { type: 'divider' },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'Supabase serves as the backend database for products, bundles, orders, and customer data. The ordering flow is a multi-step form that validates input at each step and generates a final order record in the database.',
                'InstaPay payment links are generated from the order total, and WhatsApp links are constructed with pre-filled order details so I can communicate directly with each customer. Live demos load actual invitation templates with sample data so customers see exactly what they will receive.',
                'The admin dashboard reads the same Supabase data as the store, so the dashboard always reflects the current state of orders and products. The platform is deployed on Vercel.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Built a complete e-commerce flow as a solo developer — from product display to payment and order management',
                'Designed a multi-step ordering process that guides customers without overwhelming them',
                'Integrated third-party communication (WhatsApp) and payment (InstaPay) into a seamless experience',
                'Created a flexible product and bundle system to handle different invitation types and pricing'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'The platform is live and serving real customers, handling the full lifecycle from product browsing to order completion and customer communication. As the founder, I continue to design new invitation products and manage all business operations through the admin dashboard.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'Founder & Developer. I designed and developed the Memora platform from the ground up, including the storefront, ordering system, admin dashboard, and digital invitation experiences.'
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
        title: 'CRM',
        tagline: 'Ring Road Real Estate',
        role: 'Full-Stack Developer',
        accent: 'rgba(230,126,34,.1)',
        intro:
          'A complete CRM built for a real estate business — client records, a stage-based deal pipeline, calendar follow-ups, a TeleSales module, and sales analytics in one platform.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
        ...media('crm'),
        caseStudy: {
          summary:
            'A complete Customer Relationship Management system I built for Ring Road Real Estate to centralise client management, track deals, and streamline sales operations.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'I developed a complete CRM system for Ring Road Real Estate. The platform provides a centralised hub for managing clients, tracking property deals through a pipeline, scheduling follow-ups with calendar integration, running outbound sales through a TeleSales module, and monitoring overall sales performance through an analytics dashboard.'
              ]
            },
            {
              type: 'problem',
              problem:
                "The real estate company's client information was scattered across different tools. Follow-ups were being missed, there was no clear view of the sales pipeline, and management had no centralised way to monitor team performance or deal progress.",
              solution:
                'I built a custom CRM designed around real estate workflows — centralising all client data, tracking deals through pipeline stages, automating follow-up reminders with calendar integration, and providing analytics dashboards for management oversight.'
            },
            { type: 'gallery', group: 'main' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Client management with status tracking, filtering, and detailed contact records',
                'Deal pipeline with stage-based progression and status updates',
                'Follow-up scheduling with calendar integration and reminders',
                'TeleSales module for organising outbound sales workflows',
                'Property listing management with detailed property records',
                'Analytics dashboard with performance metrics and reporting',
                'Sold properties tracking with completion records',
                'Advanced search and multi-criteria filtering'
              ]
            },
            {
              type: 'flow',
              title: 'How the System Works',
              intro: 'The CRM follows the real estate sales cycle from lead acquisition to closing:',
              flows: [
                { steps: ['Dashboard', 'Clients', 'Properties', 'Deals', 'Follow-Ups', 'TeleSales', 'Analytics'] }
              ]
            },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'Client records support status-based filtering to quickly identify prospects, active clients, and closed deals. The deal pipeline tracks each interaction through defined stages with status updates, giving the team visibility into where every deal stands.',
                'Calendar integration links follow-ups to specific dates with reminder functionality so no client interaction is missed. The TeleSales module organises outbound call workflows and tracks outcomes, while the analytics dashboard aggregates data across clients, deals, and sales activity to provide management with actionable insights.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Designed a data model flexible enough to represent the full real estate sales cycle',
                'Built an intuitive interface that sales agents could adopt without extensive training',
                'Implemented a follow-up system with calendar views that prevents missed client interactions',
                'Created analytics that give management visibility into individual and team performance'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'The CRM is deployed and used by the Ring Road Real Estate team for daily client management and sales operations. It replaced scattered tools with a single unified platform, giving the team a clear view of their pipeline and ensuring consistent follow-up with every client.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I served as the sole developer on this project. I designed the system architecture, built all frontend and backend components, structured the database, and deployed the application. I worked closely with the business team to understand their sales workflow and translated their requirements into a functional CRM system.'
              ]
            }
          ]
        }
      },

      /* ────────────────────────── 03 — ATTENDANCE APP ────────────────────────── */
      {
        id: 'attendance-app',
        title: 'Attendance App',
        tagline: 'Workforce Management System',
        role: 'Full-Stack Developer',
        accent: 'rgba(37,99,235,.12)',
        intro:
          'An attendance system that grew into a full workforce platform — location-verified clock in/out, leave rules, shifts, permissions, salary rules, and payroll.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Supabase Auth', 'Vercel'],
        ...media('attendance-app'),
        caseStudy: {
          summary:
            'A web-based attendance and workforce management system for companies to manage employee attendance, working hours, leave requests, salary rules, permissions, and payroll in one place.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'The Attendance Management System provides employees and administrators with a centralised platform for managing daily attendance and workforce-related operations.',
                'Employees can clock in and clock out manually while the system verifies their physical location. Attendance can only be registered when the employee is within a 150-meter radius of the company.',
                'As the project evolved, I expanded the system with additional workforce-management functionality, including salary rules, shift management, payroll, employee permissions, and role-based business rules.'
              ]
            },
            {
              type: 'problem',
              problem:
                'The company needed a reliable way to verify employee attendance at the office — not just trust-based manual check-ins. They also needed structured leave management with clear rules around schedule changes, and administrators needed real-time visibility into workforce data.',
              solution:
                "I built a system that verifies the employee's physical location before allowing clock in or clock out — enforcing a 150-meter radius boundary. The system also includes leave balance tracking, a request workflow with tiered approval rules, and a full admin dashboard with reports."
            },
            { type: 'gallery', group: 'main' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Location-based clock in / clock out with coordinate verification',
                '150-meter company radius boundary enforcement',
                'Automatic working hours calculation from attendance records',
                'Real-time attendance status with immediate success and error feedback',
                'Leave request management with remaining balance tracking',
                'Tiered leave-change approval rules',
                'Notification system for approvals, alerts, and status changes',
                'Secure authentication for employees and administrators',
                'Admin dashboard with attendance reports and employee management',
                'Weekend and day-off scheduling and change management'
              ]
            },
            {
              type: 'flow',
              title: 'How the System Works',
              flows: [
                { label: 'For Employees', steps: ['Login', 'Clock In (location verified)', 'Work', 'Clock Out (location verified)', 'Hours Calculated'] },
                { label: 'For Leave Requests', steps: ['Submit Request', 'Check Balance', 'Approval Workflow', 'Balance Updated'] },
                { label: 'For Administrators', steps: ['Dashboard', 'Monitor Attendance', 'Manage Employees', 'Review Requests', 'Reports'] }
              ]
            },
            {
              type: 'rules',
              title: 'Leave Management Rules',
              intro: 'Leave-day changes follow defined company rules, keeping the process controlled and transparent:',
              items: [
                { value: '1st', title: 'First Change', note: 'No approval needed' },
                { value: '2nd', title: 'Second Change', note: 'Requires admin approval' },
                { value: '3rd', title: 'Third Change', note: 'Not allowed' }
              ]
            },
            { type: 'divider' },
            {
              type: 'part',
              title: 'Workforce Management Expansion',
              intro: 'A later development phase extended the system beyond attendance with salary, shift, permission, and payroll logic.'
            },
            {
              type: 'text',
              title: 'Salary Rules & Shifts',
              body: [
                'I introduced a salary-rules system to define salary-related configurations for employees, with rules for different roles including Sales and Developers. This creates a structured foundation for connecting employee information with payroll calculations.',
                'The system supports multiple working schedules — 9:00 AM – 5:00 PM, 10:00 AM – 6:00 PM, and 11:00 AM – 7:00 PM — so employees on different schedules can use the same attendance system while following the appropriate working-hours rules.',
                'A 15-minute grace period was added to the attendance rules, so attendance calculations take the company’s defined tolerance into account instead of applying the same interpretation to every arrival.'
              ]
            },
            {
              type: 'features',
              title: 'Role-Based Business Rules',
              items: [
                'Developers and engineers: Friday and Saturday are treated as weekend days',
                'Sales: one weekend day between Friday and Saturday',
                'Monthly employee permission requests within a defined limit, with approval requirements that change as requests are used',
                'Employee functionality separated from administrative functionality by role',
                'Authentication handled through Supabase Auth with role and permission based access'
              ]
            },
            {
              type: 'flow',
              title: 'Payroll',
              intro: 'A payroll section connects employee information and attendance rules with salary management:',
              flows: [{ steps: ['Employee', 'Shift', 'Attendance', 'Salary Rules', 'Payroll'] }]
            },
            { type: 'divider' },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'One of the main technical challenges was combining attendance actions with physical location verification. Before registering a clock-in or clock-out action, the system checks whether the employee is within the defined company radius, creating an additional validation layer around attendance records.',
                'Another major part of the project was implementing company-specific business rules: leave-change limits, approval requirements, salary rules, grace periods, different shifts, role-specific weekend schedules, and monthly permission limits. Rather than treating attendance as simple clock-in/clock-out records, the system applies these rules to represent how the company actually operates.',
                'The expansion also had to extend an existing application without replacing its original attendance functionality — the new features work together with the existing authentication, attendance, employee management, leave management, admin dashboard, and database structure.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Combined several business processes — employees, roles, shifts, attendance, leave, permissions, salary rules, and payroll — into one connected system',
                'Implemented location verification while providing immediate and understandable feedback when an attendance action succeeds or fails',
                'Designed the tiered leave approval workflow with business rules that prevent abuse while staying flexible',
                'Extended a live system with new workforce features while keeping existing workflows consistent'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'The project evolved from a basic attendance-management application into a broader workforce-management platform combining location-based attendance, working-hours tracking, leave management, approval rules, notifications, employee management, attendance reports, salary rules, shift management, grace periods, role-based weekend rules, employee permissions, payroll, and administrative management.',
                'This provides both employees and administrators with a centralised system for managing attendance and related workforce operations.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I worked on the design and development of the Attendance Management System and its continued expansion — attendance workflows, location verification, leave management, administrative functionality, database-related features, and the newer salary, payroll, permissions, shift, and business-rule functionality.'
              ]
            }
          ],
          links: [{ label: 'GitHub', url: 'https://github.com/Mostafahamada-cpu/Attendance', kind: 'github' }]
        }
      },

      /* ───────────────────────────── 04 — CLIENTVIEW ───────────────────────────── */
      {
        id: 'clientview',
        title: 'ClientView',
        tagline: 'Ring Road Real Estate',
        role: 'Full-Stack Developer',
        accent: 'rgba(230,126,34,.1)',
        intro:
          'A client-facing property portal where each client browses listings, compares options side by side, and reviews property details with video walkthroughs.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
        ...media('clientview'),
        caseStudy: {
          summary:
            'A dedicated client-facing interface for Ring Road Real Estate where each client can browse properties, compare options side by side, and access their personalised profile.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'I built a dedicated client-facing portal for Ring Road Real Estate that gives each client access to their personalised profile, property listings, a side-by-side comparison tool, detailed property pages with video walkthroughs, and activity tracking — designed as a self-service experience that reduces the need for constant contact with agents.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Clients had to rely on phone calls and meetings with agents to get property information, compare options, or check their status. There was no self-service tool where clients could independently browse properties and evaluate their options at their own pace.',
              solution:
                'I created a clean, responsive client portal where each client can log in to view their profile, browse curated property listings, compare properties side by side, watch video walkthroughs, and track their activity — all without needing to contact the business directly.'
            },
            { type: 'gallery', group: 'main' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Personalised client profiles with status updates and activity history',
                'Property listing browser with detailed property pages',
                'Side-by-side property comparison tool for evaluating options',
                'Property video walkthroughs embedded alongside photos and specs',
                'Responsive design optimised for desktop, tablet, and mobile',
                'Real-time data sync with the CRM backend'
              ]
            },
            {
              type: 'flow',
              title: 'How the System Works',
              intro: 'Clients navigate a streamlined self-service experience:',
              flows: [
                { steps: ['Login', 'Personal Profile', 'Browse Properties', 'Compare', 'Property Details & Video', 'Track Activity'] }
              ]
            },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'The comparison tool allows clients to select multiple properties and view them in a synchronised side-by-side layout, highlighting differences in specifications and pricing. Property detail pages embed video walkthroughs alongside photos and technical specifications.',
                'The interface is fully responsive, providing a consistent experience across device sizes. Client profiles are linked to the CRM backend, so any updates made by agents — status changes, new property recommendations — are reflected in the client portal in real time.'
              ]
            },
            {
              type: 'features',
              title: 'Challenges / What I Solved',
              items: [
                'Built a property comparison engine that handles variable data across different property types',
                'Designed a client-first interface intuitive enough for non-technical users',
                'Integrated video content alongside property details without degrading page performance',
                'Connected the portal to the existing CRM backend for synchronised data'
              ]
            },
            {
              type: 'text',
              title: 'Results / Purpose',
              body: [
                'The ClientView portal is live, providing Ring Road Real Estate clients with a modern self-service property browsing experience. It reduces the workload on agents by giving clients direct access to property information, comparison tools, and their account status.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I served as the sole developer. I designed the client experience, built the entire interface, and integrated it with the existing CRM data so that updates made by agents are reflected in the client portal in real time.'
              ]
            }
          ],
          links: [{ label: 'Live Client View', url: 'https://ring-road-client.vercel.app/', kind: 'primary' }]
        }
      },

      /* ───────────────────────────── 05 — STANCEPRO ───────────────────────────── */
      {
        id: 'stancepro',
        title: 'StancePro',
        tagline: 'Car Accessories E-Commerce',
        role: 'Designer & Developer',
        accent: 'rgba(20,184,166,.12)',
        intro:
          'A connected e-commerce system for a car accessories business — a storefront built around the full browse-to-order workflow, and the admin dashboard that manages it.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Firebase Storage', 'Vercel'],
        ...media('stancepro'),
        caseStudy: {
          summary:
            'A custom e-commerce platform built for a car accessories business, designed around the complete purchasing workflow rather than a product showcase — with an admin dashboard on the same backend.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'StancePro is a custom e-commerce platform built for a car accessories business. The goal was to create a complete online shopping experience where customers can browse products, view product details, place orders, provide payment proof, and communicate their order information directly to the business.',
                'Instead of building only a product showcase, I designed the project around the complete purchasing workflow — and built the admin dashboard on the same backend so the storefront and management side work as one application.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Small online businesses often depend heavily on social media and manual messaging to manage product sales. That makes it difficult to organise products, display product information clearly, track customer orders, manage inventory, collect payment proof, and keep order information organised.',
              solution:
                'I built a responsive e-commerce storefront connected to a backend database, plus a dedicated admin dashboard on the same data. Customers browse products, open product pages, and start an order directly from the website, while the business manages products, inventory, images, and orders through the dashboard.'
            },
            { type: 'part', title: 'Store', intro: 'The customer-facing storefront, designed around the real ordering workflow.' },
            { type: 'gallery', group: 'store' },
            {
              type: 'features',
              title: 'Store Features',
              items: [
                'Product catalog rendered dynamically from the database rather than hard-coded pages',
                'Product records with name, price, description, images, available quantity, and stock information',
                'Product detail pages that keep the purchasing action accessible',
                'Order system that collects the information required to process an order',
                'InstaPay payment flow with payment-proof screenshot upload',
                'WhatsApp integration that sends the prepared order information to the business'
              ]
            },
            {
              type: 'flow',
              title: 'Ordering Flow',
              intro: 'The ordering process was designed around the actual business workflow:',
              flows: [
                {
                  steps: ['Browse Products', 'Product Details', 'Start Order', 'Enter Customer Information', 'Payment', 'Upload Payment Proof', 'Confirm Order']
                }
              ]
            },
            { type: 'part', title: 'Admin Dashboard', intro: 'The management side of the same system, connected to the same backend.' },
            { type: 'gallery', group: 'admin' },
            {
              type: 'features',
              title: 'Admin Features',
              items: [
                'Add, edit, and remove products through the interface',
                'Update product information, quantities, and stock',
                'Manage multiple product images through the storage system',
                'Access structured customer orders instead of disconnected messages',
                'Review order and payment information and process it accordingly'
              ]
            },
            {
              type: 'flow',
              title: 'Connected System',
              intro: 'The store and dashboard share one backend, which creates a connected business workflow rather than two separate applications:',
              flows: [
                { label: 'Product updates', steps: ['Admin updates product', 'Firebase', 'Store displays updated product'] },
                { label: 'Orders', steps: ['Customer creates order', 'Firebase', 'Admin sees order'] }
              ]
            },
            { type: 'divider' },
            {
              type: 'text',
              title: 'Important Technical Details',
              body: [
                'Firebase provides the persistent data layer for products and orders, while Firebase Storage handles uploaded product and payment-proof images. The application is deployed through Vercel.',
                'One of the main technical aspects of the project was designing the relationship between products, images, stock, orders, customer information, and payment information. The dashboard provides a UI layer on top of that data so the business can manage it without technical knowledge.'
              ]
            },
            {
              type: 'text',
              title: 'Why I Built It This Way',
              body: [
                'The goal was not to build an overly complicated payment infrastructure. Instead, I designed the system around the actual business process and connected the website to the tools the business already uses. That made the application simpler to operate while still providing a structured e-commerce experience.'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I designed and developed both sides of the system — the storefront experience, product system, ordering workflow, payment-proof flow, the admin dashboard, and the backend integration that connects them.'
              ]
            }
          ],
          links: [{ label: 'Live Store', url: 'https://stance-pro.vercel.app/', kind: 'primary' }]
        }
      },

      /* ──────────────────────────── 06 — MONEY TRACKER ──────────────────────────── */
      {
        id: 'money-tracker',
        title: 'Money Tracker',
        tagline: 'Personal Finance Application',
        label: 'Personal',
        labelTone: 'personal',
        role: 'Designer & Developer',
        accent: 'rgba(59,130,246,.1)',
        intro:
          'A personal finance app built on a real transaction model — expenses, income, and transfers across multiple accounts, embeddable directly inside Notion.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
        ...media('money-tracker'),
        caseStudy: {
          summary:
            'A personal finance application for tracking income, expenses, transfers, accounts, and spending categories in one place — built around a structured transaction model rather than a flat expense list.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'Money Tracker is a personal finance application designed to help users track income, expenses, transfers, accounts, and spending categories in one place.',
                'The project goes beyond simply recording expenses by introducing a structured transaction model and support for multiple accounts.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Basic expense trackers often treat every transaction as simply "money spent." That approach does not accurately represent real personal finances. For example, moving money from a bank card to cash is not an expense — it is a transfer between accounts.',
              solution:
                'I created a transaction-based financial system where each transaction contains structured information and can be categorised as an expense, income, or transfer. This allows the application to represent real financial activity more accurately.'
            },
            { type: 'gallery', group: 'main' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Transaction types: expense, income, and transfer',
                'Multiple accounts such as cash and card, so users track where money is located',
                'Categories such as car, fuel, transport, and family to reveal spending patterns',
                'Date-based tracking as a foundation for reviewing activity over different periods',
                'A dedicated validation layer that catches incorrect or incomplete data before it is stored',
                'Embedded application behaviour designed for use inside Notion'
              ]
            },
            {
              type: 'text',
              title: 'Notion Integration',
              body: [
                'One of the most interesting parts of the project was making the application suitable for use inside Notion. Instead of requiring users to leave their workspace and open a separate application, Money Tracker can be used as an embedded application.',
                'This required working with iframe embedding, security headers, frame-ancestors, Notion compatibility, and embedded/compact UI behaviour.'
              ]
            },
            {
              type: 'flow',
              title: 'Technical Concept',
              flows: [{ steps: ['Notion Workspace', 'Embedded Money Tracker', 'Application', 'Database'] }]
            },
            {
              type: 'features',
              title: 'Technical Highlights',
              items: [
                'Transaction modeling',
                'Data validation',
                'Multiple account types',
                'Expense / income / transfer logic',
                'Database-backed data',
                'Embedded application architecture',
                'Responsive UI',
                'Notion compatibility'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I designed and developed Money Tracker, including the transaction model, financial workflows, validation, interface, and embedded application experience.'
              ]
            }
          ]
        }
      },

      /* ─────────────────────────────── 07 — TO-DO ─────────────────────────────── */
      {
        id: 'to-do',
        title: 'To-Do',
        tagline: 'Productivity Application',
        label: 'Personal',
        labelTone: 'personal',
        role: 'Designer & Developer',
        accent: 'rgba(20,184,166,.1)',
        intro:
          'A focused task manager built around reducing unnecessary interaction — create, review, and complete work from one clean workspace, in light and dark themes.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        ...media('to-do'),
        caseStudy: {
          summary:
            'A productivity application designed to help users organise and manage daily tasks through a clean and focused interface, with the structure needed to keep track of ongoing work.',
          blocks: [
            {
              type: 'text',
              title: 'Project Overview',
              body: [
                'To-Do is a productivity application designed to help users organise and manage their daily tasks through a clean and focused interface.',
                'The main objective was to make task management simple while still providing the structure needed to keep track of ongoing work.'
              ]
            },
            {
              type: 'problem',
              problem:
                'Managing tasks through scattered notes or multiple applications makes it difficult to understand what needs to be done. A good task management application needs to make creating, reviewing, updating, completing, and organising work quick.',
              solution:
                'I built a task management interface focused on reducing unnecessary interaction, so the user can manage tasks from a centralised workspace instead of relying on separate notes or lists.'
            },
            { type: 'gallery', group: 'main' },
            {
              type: 'features',
              title: 'Key Features',
              items: [
                'Task creation designed as a quick action rather than a complicated process',
                'Task management that keeps the list relevant as task state changes',
                'Task organisation that distinguishes work needing attention from completed work'
              ]
            },
            {
              type: 'text',
              title: 'UX Approach',
              body: [
                'The design focuses on keeping the application centred around the tasks themselves. Rather than filling the interface with unnecessary elements, the goal was a clean productivity environment where the user can immediately understand what is happening.'
              ]
            },
            {
              type: 'features',
              title: 'Technical Focus',
              items: [
                'UI components',
                'Application state',
                'User interactions',
                'Forms and validation',
                'Task data and CRUD operations',
                'Responsive interface behaviour'
              ]
            },
            {
              type: 'text',
              title: 'My Role',
              body: [
                'I designed and developed the To-Do application, focusing on both the user experience and the underlying task-management functionality.'
              ]
            }
          ]
        }
      },

      /* ───────────────────────────── 08 — AION WEB ───────────────────────────── */
      {
        id: 'aion-web',
        title: 'AION Web',
        tagline: 'AION Innovations',
        status: 'Coming Soon',
        accent: 'rgba(99,102,241,.1)',
        intro: 'A website for AION Innovations. Currently in development — the case study will follow once the project ships.',
        ...media('aion-web')
      },

      /* ──────────────────────────── 09 — AION STORE ──────────────────────────── */
      {
        id: 'aion-store',
        title: 'AION Store',
        tagline: 'AION Innovations',
        status: 'Coming Soon',
        accent: 'rgba(99,102,241,.1)',
        intro: 'An e-commerce storefront for AION products. Currently in development — the case study will follow once the project ships.',
        ...media('aion-store')
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
