(() => {
  const projects = [
    {
      id: 'stancepro-store',
      title: 'StancePro Store',
      folder: 'StancePro / Store',
      intro: 'A responsive e-commerce storefront for a car accessories business, designed around the full browse-to-order workflow.',
      accent: 'rgba(212,175,55,.1)',
      initials: 'SP',
      images: [
        'StancePro/Store/Home.png',
        'StancePro/Store/Feutared Products.png',
        'StancePro/Store/Categories.png',
        'StancePro/Store/Cart.png',
        'StancePro/Store/CheckOut.png',
        'StancePro/Store/Payment.png',
        'StancePro/Store/OrderConfirmation1.png',
        'StancePro/Store/OrderConfirmation2.png',
        'StancePro/Store/Footer.png'
      ],
      content: `Overview

StancePro Store is a custom e-commerce platform built for a car accessories business. The goal was to create a complete online shopping experience where customers can browse products, view product details, place orders, provide payment proof, and communicate their order information directly to the business.

Instead of building only a product showcase, I designed the project around the complete purchasing workflow.

The Problem

Small online businesses often depend heavily on social media and manual messaging to manage product sales. This can make it difficult to:

Organize products
Display product information clearly
Track customer orders
Manage inventory
Collect payment proof
Keep order information organized

The goal was to create a dedicated storefront that could centralize this process.

The Solution

I built a responsive e-commerce storefront connected to a backend database.

Customers can browse available products, open individual product pages, review product information, and start an order directly from the website.

The ordering process was designed around the actual business workflow:

Browse Products → Product Details → Start Order → Enter Customer Information → Payment → Upload Payment Proof → Confirm Order

Key Features
Product Catalog

Products are displayed dynamically rather than being hard-coded into individual pages.

Each product can contain information such as:

Product name
Price
Description
Images
Available quantity
Stock information

Product Details

Customers can open a product and view more information before deciding to order.

The product page focuses on presenting the important information clearly while keeping the purchasing action accessible.

Order System

Customers can start an order directly from the storefront.

The system collects the information required to process the order and associates it with the selected product.

InstaPay Payment Flow

The current payment workflow uses InstaPay.

After making the payment, the customer can provide payment proof through the ordering process.

Payment Screenshot

Customers can upload a screenshot as proof of payment.

This gives the business a way to manually verify the transaction before processing the order.

WhatsApp Integration

After the order information is prepared, the system can send the relevant order information through WhatsApp.

This connects the website's ordering workflow with the business's existing communication process.

Technical Implementation

The project uses:

Frontend web technologies
Firebase
Firebase database services
Firebase Storage for product images
Vercel for deployment

Firebase provides the persistent data layer for products and orders while Storage handles uploaded images.

Why I Built It This Way

The goal wasn't to build an overly complicated payment infrastructure.

Instead, I designed the system around the actual business process and connected the website to the tools the business already uses.

This made the application simpler to operate while still providing a structured e-commerce experience.

My Role

I designed and developed the StancePro Store, including the storefront experience, product system, ordering workflow, payment-proof flow, and backend integration.
Link:https://stance-pro.vercel.app/`
    },
    {
      id: 'stancepro-admin',
      title: 'StancePro Admin',
      folder: 'StancePro / Admin',
      intro: 'An admin dashboard for managing products, inventory, images, and orders behind the storefront.',
      accent: 'rgba(212,175,55,.1)',
      initials: 'SA',
      images: [
        'StancePro/Admin/DashBoard.png',
        'StancePro/Admin/AddProducts.png',
        'StancePro/Admin/Products.png',
        'StancePro/Admin/Orders.png'
      ],
      content: `Overview

StancePro Admin is the management dashboard behind the StancePro Store.

While the storefront is designed for customers, the Admin Dashboard was built to give the business owner a central place to manage products, inventory, images, and orders.

The Problem

Managing an online store manually becomes difficult as the number of products and orders increases.

The business needs a way to manage its data without directly modifying the database or source code.

The Solution

I built a dedicated admin dashboard connected to the same backend used by the storefront.

This creates a complete system:

Customer → StancePro Store → Database → Admin Dashboard

The admin can manage the information that customers see on the storefront.

Product Management

The dashboard allows the administrator to manage products through the UI.

This includes functionality such as:

Adding products
Editing products
Updating product information
Managing product images
Updating quantities
Managing stock
Removing products

Image Management

Products can have multiple images, which are stored using the application's storage system.

This means product content can be managed without modifying the website manually.

Order Management

The Admin Dashboard provides access to customer orders.

Instead of receiving disconnected messages, the business can access structured order information through the dashboard.

The admin can review the relevant order and payment information and process it accordingly.

Database Integration

The Admin Dashboard and Store use the same backend data.

For example:

Admin updates product → Firebase → Store displays updated product

And:

Customer creates order → Firebase → Admin sees order

This creates a connected business workflow rather than two separate applications.

Technical Highlights

One of the main technical aspects of the project was designing the relationship between:

Products
Images
Stock
Orders
Customer information
Payment information

The dashboard provides a UI layer on top of this data so the business can manage it without technical knowledge.

My Role

I designed and developed the StancePro Admin Dashboard and connected it to the storefront and backend infrastructure.`
    },
    {
      id: 'to-do',
      title: 'To-Do',
      folder: 'ToDoList',
      intro: 'A focused productivity app for creating, reviewing, and completing tasks without unnecessary interface noise.',
      accent: 'rgba(20,184,166,.1)',
      initials: 'TD',
      images: [
        'ToDoList/Home BrightMode.png',
        'ToDoList/Home DarkMode.png',
        'ToDoList/Categories.png'
      ],
      content: `Overview

To-Do is a productivity application designed to help users organize and manage their daily tasks through a clean and focused interface.

The main objective was to make task management simple while still providing the structure needed to keep track of ongoing work.

The Problem

Managing tasks through scattered notes or multiple applications can make it difficult to understand what needs to be done.

A good task management application needs to make the following actions quick:

Creating a task
Reviewing tasks
Updating tasks
Completing tasks
Organizing ongoing work

The Solution

I built a task management interface focused on reducing unnecessary interaction.

The user can manage tasks from a centralized workspace instead of relying on separate notes or lists.

Key Features

Task Creation

Users can create new tasks and provide the necessary information.

The interface is designed to make adding a task a quick action rather than a complicated process.

Task Management

Tasks can be updated as their state changes.

This allows the user to keep the list relevant instead of maintaining static information.

Task Organization

The interface provides a structured way to review tasks and distinguish between work that still needs attention and work that has already been completed.

UX Approach

The design focuses on keeping the application centered around the tasks themselves.

Rather than filling the interface with unnecessary elements, the goal was to create a clean productivity environment where the user can immediately understand what is happening.

Technical Focus

From a development perspective, the project demonstrates work with:

UI components
Application state
User interactions
Forms
Validation
Task data
CRUD operations
Responsive interface behavior

My Role

I designed and developed the To-Do application, focusing on both the user experience and the underlying task-management functionality.`
    },
    {
      id: 'money-tracker',
      title: 'Money Tracker',
      folder: 'MoneyTracker',
      intro: 'A personal finance app built around structured transaction handling, multiple accounts, and real spending categories.',
      accent: 'rgba(59,130,246,.1)',
      initials: 'MT',
      images: [
        'MoneyTracker/DashBoard.png',
        'MoneyTracker/Budget.png',
        'MoneyTracker/BuyingList.png',
        'MoneyTracker/Charts.png'
      ],
      content: `Overview

Money Tracker is a personal finance application designed to help users track income, expenses, transfers, accounts, and spending categories in one place.

The project goes beyond simply recording expenses by introducing a structured transaction model and support for multiple accounts.

The Problem

Basic expense trackers often treat every transaction as simply "money spent."

That approach doesn't accurately represent real personal finances.

For example, moving money from a bank card to cash isn't an expense. It is a transfer between accounts.

The application was designed around this distinction.

The Solution

I created a transaction-based financial system where each transaction contains structured information.

Transactions can be categorized as:

Expense
Income
Transfer

This allows the application to represent real financial activity more accurately.

Accounts

The application supports different accounts, such as:

Cash
Card

This allows users to track not only how much money they have, but also where that money is located.

For example:

Card → Cash

can be recorded as a transfer rather than incorrectly appearing as an expense.

Categories

Transactions can be organized into categories such as:

Car
Fuel
Transport
Family

This makes it possible to understand spending patterns instead of simply looking at a long list of transactions.

Date-Based Tracking

Each transaction is associated with a date.

This provides a foundation for reviewing financial activity over different periods and understanding when money was earned, spent, or transferred.

Validation

I also implemented a dedicated validation layer for transaction data.

This ensures that incorrect or incomplete information is caught before it is stored.

This is important because financial applications depend heavily on data consistency.

Notion Integration

One of the most interesting parts of the project was making the application suitable for use inside Notion.

Instead of requiring users to leave their workspace and open a separate application, the Money Tracker can be used as an embedded application.

This required working with:

iframe embedding
Security headers
frame-ancestors
Notion compatibility
Embedded/compact UI behavior

Technical Concept

The overall experience becomes:

Notion Workspace → Embedded Money Tracker → Application → Database

This makes the application part of the user's existing productivity workflow rather than a completely separate tool.

Technical Highlights

The project demonstrates work with:

Transaction modeling
Data validation
Multiple account types
Expense/income/transfer logic
Database-backed data
Embedded application architecture
Responsive UI
Notion compatibility

My Role

I designed and developed Money Tracker, including the transaction model, financial workflows, validation, interface, and embedded application experience.`
    },
    {
      id: 'attendance-new-features',
      title: 'Attendance App — New Features',
      folder: 'Attendance',
      intro: 'A workforce-management system that extends the original attendance app with leave rules, payroll support, permissions, and role-based business logic.',
      accent: 'rgba(37,99,235,.1)',
      initials: 'AA',
      images: [
        'Attendance/Home.png',
        'Attendance/Days.png',
        'Attendance/Alerts.png',
        'Attendance/DashBoard.png',
        'Attendance/Employees.png',
        'Attendance/Employee 2.png',
        'Attendance/Requests.png',
        'Attendance/Balances.png',
        'Attendance/ChangeWeekEnd.png',
        'Attendance/ChoseWeekDay.png',
        'Attendance/Deductions and attendance history.png',
        'Attendance/LeavePermission.png',
        'Attendance/Permissions.png',
        'Attendance/Salary.png',
        'Attendance/Salary&Rules.png',
        'Attendance/Analysis.png'
      ],
      content: `# Attendance Management System

A web-based attendance and workforce management system designed for companies to manage employee attendance, working hours, leave requests, salary rules, permissions, and payroll in one place.

## Overview

The Attendance Management System provides employees and administrators with a centralized platform for managing daily attendance and workforce-related operations.

Employees can clock in and clock out manually while the system verifies their physical location. Attendance can only be registered when the employee is within a 150-meter radius of the company.

The system also provides leave management, attendance status, working-hours calculation, notifications, and administrative reporting.

As the project evolved, I expanded the system with additional workforce-management functionality, including salary rules, shift management, payroll, employee permissions, and role-based business rules.

---

## Core Attendance System

The original system focuses on making employee attendance more controlled and reliable while reducing the need for manual attendance tracking.

### Location-Based Clock In / Clock Out

Employees can register their attendance through the application.

Before allowing the operation, the system verifies the employee's location.

The employee must be within a **150-meter radius of the company** to successfully clock in or clock out.

This helps prevent attendance registration from outside the workplace.

### Working Hours Calculation

The system calculates employee working hours based on their attendance records.

This provides administrators with a clearer view of employee attendance and working time.

### Real-Time Attendance Status

Employees can see their current attendance state through the application.

The interface provides immediate feedback after attendance actions so users know whether the operation was successful or rejected.

### Attendance Feedback

Attendance actions provide clear success and error feedback.

For example, the system can inform the employee when an attendance action cannot be completed because the location requirements are not satisfied.

---

# Leave Management

The system includes a structured leave-management workflow.

Employees can:

* Submit leave requests
* Check their remaining leave balance
* Manage scheduled leave information
* Request changes to previously scheduled leave days

## Leave Day Change Rules

Leave-day changes follow defined company rules.

The system currently applies the following workflow:

* The **first change** can be made without administrator approval.
* The **second change** requires administrator approval.
* The **third change** is not allowed.

This prevents unlimited changes and creates a controlled and transparent leave-management process.

---

# Notification System

The application includes notifications to keep users informed about important actions and requests.

Notifications can be used around attendance and leave-management workflows so employees and administrators can stay aware of changes that require their attention.

---

# Admin Dashboard

Administrators have access to a dedicated dashboard for managing and monitoring the workforce.

The administrative side of the system provides access to:

* Employee management
* Attendance information
* Leave requests
* Notifications
* Working-hours information
* Attendance reports
* Employee activity

This gives administrators a centralized view instead of requiring them to manage attendance information manually.

---

# Employee Management

The system allows administrators to manage employee information and attendance-related data.

Employee information can also be used by the system when applying workforce rules such as shifts, salary configuration, permissions, and weekend schedules.

---

# New Workforce Management Features

As part of the latest development phase, I expanded the system beyond basic attendance management and introduced additional business logic for salaries, shifts, permissions, and payroll.

These additions turn the application into a more complete workforce-management system.

---

## Salary Rules

I introduced a salary-rules system to define salary-related configurations for employees.

The current salary rules include configurations for different roles, including:

* Sales
* Developers

This creates a structured foundation for connecting employee information with payroll calculations.

---

## Shift Management

The system supports multiple employee working schedules.

Current shift configurations include:

* **9:00 AM – 5:00 PM**
* **10:00 AM – 6:00 PM**
* **11:00 AM – 7:00 PM**

This allows employees with different schedules to use the same attendance system while following the appropriate working-hours rules.

---

## Grace Period

A **15-minute grace period** was added to the attendance rules.

This allows the system to account for the company's defined tolerance when evaluating employee arrival times.

Instead of applying the same interpretation to every arrival, attendance calculations can take the configured grace period into account.

---

# Role-Based Weekend Rules

Different employee roles can follow different weekend schedules.

The current rules include:

### Developers and Engineers

Friday and Saturday are treated as weekend days.

### Sales

Sales employees have one weekend day between Friday and Saturday.

This required the attendance system to consider the employee's role and assigned schedule when applying working-day rules.

---

# Payroll

A payroll section was added to connect employee information and attendance-related rules with salary management.

The overall workflow can be represented as:

**Employee → Shift → Attendance → Salary Rules → Payroll**

This creates a stronger relationship between the employee's working schedule, attendance records, and salary-related information.

---

# Employee Permissions

I added a permissions system for employees to manage their monthly permission requests.

Employees can request permissions within a defined monthly limit, while approval requirements can change depending on how many requests have already been used.

This introduces another layer of business logic into the workforce-management system.

---

# Role-Based Access

Because the application handles employee, attendance, leave, and payroll-related information, different users require different levels of access.

The system separates employee functionality from administrative functionality so users only interact with the features relevant to their role.

---

# Authentication

The application provides secure authentication for both employees and administrators.

Authentication is handled using **Supabase Auth**, while user access is controlled according to the application's role and permissions model.

---

# Technical Implementation

## Frontend

**HTML, CSS, JavaScript**

The frontend provides the employee-facing attendance experience as well as the administrative dashboard.

## Backend & Database

**Supabase**

Supabase is used as the backend and database layer for storing and managing:

* Employees
* Attendance records
* Leave requests
* Permissions
* Salary-related data
* Payroll information
* Notifications

## Authentication

**Supabase Auth**

Authentication is used to securely manage employee and administrator accounts.

## Deployment

**Vercel**

The application is deployed through Vercel for production hosting.

---

# Technical Highlights

## Location Verification

One of the main technical challenges was combining attendance actions with physical location verification.

Before registering a clock-in or clock-out action, the system checks whether the employee is within the defined company radius.

This creates an additional validation layer around attendance records.

## Business Rules

Another major part of the project was implementing company-specific business rules.

These rules include:

* Leave-change limits
* Approval requirements
* Salary rules
* Grace periods
* Different shifts
* Role-specific weekend schedules
* Monthly permission limits

Rather than treating attendance as simple clock-in/clock-out records, the system applies these rules to represent how the company actually operates.

## Extending an Existing System

A major part of the latest development phase was extending an existing application without replacing its original attendance functionality.

The new features had to work together with the existing:

* Authentication
* Attendance
* Employee management
* Leave management
* Admin dashboard
* Database structure

This required introducing new functionality while keeping the existing workflows consistent.

---

# Project Challenges

The main challenge was combining several business processes into one system.

Attendance alone is relatively straightforward, but real workforce management requires relationships between multiple areas:

**Employees → Roles → Shifts → Attendance → Leave → Permissions → Salary Rules → Payroll**

Each new feature therefore needed to work with the existing employee and attendance data.

Another challenge was implementing location verification while providing immediate and understandable feedback to employees when an attendance action succeeds or fails.

---

# Results

The project evolved from a basic attendance-management application into a broader workforce-management platform.

The final system combines:

* Location-based attendance
* Working-hours tracking
* Leave management
* Leave-change approval rules
* Notifications
* Employee management
* Attendance reports
* Salary rules
* Shift management
* Grace periods
* Role-based weekend rules
* Employee permissions
* Payroll functionality
* Administrative management

This provides both employees and administrators with a centralized system for managing attendance and related workforce operations.

---

# My Role

I worked on the design and development of the Attendance Management System and its continued expansion.

My work included implementing attendance workflows, location verification, leave management, administrative functionality, database-related features, and the newer salary, payroll, permissions, shift, and business-rule functionality.

---

# Technologies

* HTML
* CSS
* JavaScript
* Supabase
* Supabase Auth
* Vercel

---

## Portfolio Summary

### Short Description

A web-based attendance and workforce management system with location-based attendance, leave management, employee administration, salary rules, payroll, permissions, shifts, and role-based business logic.

### One-Line Highlight

An attendance system evolved into a complete workforce-management platform by combining location verification with real-world HR and payroll business rules.

### Tech Stack

**HTML · CSS · JavaScript · Supabase · Supabase Auth · Vercel**`
    }
  ];

  const featuredOverlay = document.getElementById('featured-overlay');
  const featuredOverlayInner = document.getElementById('featured-overlay-inner');
  const featuredGrid = document.getElementById('featured-projects-grid');
  const featuredClose = document.getElementById('featured-close');

  function pathToUrl(path) {
    return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function inlineMarkdown(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  function normalizeMarkdown(raw) {
    const knownMajor = new Set([
      'overview',
      'the problem',
      'the solution',
      'problem',
      'solution',
      'problem & solution',
      'project overview',
      'key features',
      'technical implementation',
      'technical highlights',
      'technical details',
      'technologies',
      'technologies used',
      'tech stack',
      'how it works',
      'how the system works',
      'my role',
      'results',
      'results / purpose',
      'project challenges',
      'challenges',
      'leave management rules',
      'accounts',
      'categories',
      'validation',
      'notion integration',
      'core attendance system',
      'new workforce management features',
      'role-based weekend rules',
      'role-based access',
      'authentication',
      'employee management',
      'salary rules',
      'shift management',
      'grace period',
      'payroll',
      'employee permissions',
      'extending an existing system',
      'portfolio summary',
      'short description',
      'one-line highlight'
    ]);

    const knownMinor = new Set([
      'product catalog',
      'product details',
      'order system',
      'instapay payment flow',
      'payment screenshot',
      'whatsapp integration',
      'image management',
      'order management',
      'database integration',
      'product management',
      'task creation',
      'task management',
      'task organization',
      'ux approach',
      'date-based tracking',
      'technical focus',
      'technical concept',
      'business rules',
      'location verification',
      'frontend',
      'backend & database',
      'authentication',
      'deployment'
    ]);

    const lines = String(raw).replace(/\r\n/g, '\n').split('\n');
    const out = [];
    let fragmentMode = false;

    for (const original of lines) {
      const line = original.trim();
      if (!line) {
        fragmentMode = false;
        out.push('');
        continue;
      }

      if (/^#{1,6}\s/.test(line) || /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line) || /^---+$/.test(line)) {
        fragmentMode = false;
        out.push(line);
        continue;
      }

      const lower = line.toLowerCase();
      if (knownMajor.has(lower)) {
        fragmentMode = false;
        out.push(`## ${line}`);
        continue;
      }

      if (knownMinor.has(lower)) {
        fragmentMode = false;
        out.push(`### ${line}`);
        continue;
      }

      if (line.endsWith(':')) {
        fragmentMode = true;
        out.push(line);
        continue;
      }

      if (fragmentMode) {
        out.push(`- ${line}`);
        continue;
      }

      fragmentMode = false;
      out.push(line);
    }

    return out.join('\n');
  }

  function renderMarkdown(raw) {
    const text = normalizeMarkdown(raw);
    const lines = text.split('\n');
    const blocks = [];
    let paragraph = [];
    let listType = null;
    let listItems = [];

    function flushParagraph() {
      if (!paragraph.length) return;
      blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
      paragraph = [];
    }

    function flushList() {
      if (!listItems.length) return;
      const items = listItems.map(item => `<li>${inlineMarkdown(item)}</li>`).join('');
      blocks.push(listType === 'ol' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`);
      listItems = [];
      listType = null;
    }

    for (const line of lines) {
      if (!line.trim()) {
        flushParagraph();
        flushList();
        continue;
      }

      if (/^---+$/.test(line.trim())) {
        flushParagraph();
        flushList();
        blocks.push('<hr>');
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        flushParagraph();
        flushList();
        const level = heading[1].length;
        blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        continue;
      }

      const bullet = line.match(/^[-*]\s+(.*)$/);
      if (bullet) {
        flushParagraph();
        if (listType && listType !== 'ul') flushList();
        listType = 'ul';
        listItems.push(bullet[1]);
        continue;
      }

      const numbered = line.match(/^\d+\.\s+(.*)$/);
      if (numbered) {
        flushParagraph();
        if (listType && listType !== 'ol') flushList();
        listType = 'ol';
        listItems.push(numbered[1]);
        continue;
      }

      flushList();
      paragraph.push(line);
    }

    flushParagraph();
    flushList();
    return blocks.join('\n');
  }

  function extractLinks(raw) {
    const matches = Array.from(new Set((String(raw).match(/https?:\/\/[^\s)]+/g) || [])));
    return matches.map(url => ({ label: new URL(url).hostname.replace(/^www\./, ''), url }));
  }

  function extractTech(raw) {
    const keywords = [
      'HTML',
      'CSS',
      'JavaScript',
      'Firebase',
      'Firebase Storage',
      'Supabase',
      'Supabase Auth',
      'Vercel',
      'MySQL',
      'SQL',
      'Python',
      'C++'
    ];

    const lower = String(raw).toLowerCase();
    const result = [];
    for (const keyword of keywords) {
      if (lower.includes(keyword.toLowerCase())) result.push(keyword);
    }
    return result;
  }

  function firstParagraph(raw) {
    const lines = String(raw).replace(/\r\n/g, '\n').split('\n').map(line => line.trim()).filter(Boolean);
    const startIndex = lines.findIndex(line => !/^#{1,6}\s/.test(line) && !/^[-*]\s+/.test(line) && !/^\d+\.\s+/.test(line));
    if (startIndex === -1) return '';
    const collected = [];
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      if (/^#{1,6}\s/.test(line) || /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line) || /^---+$/.test(line)) break;
      collected.push(line);
      if (line.endsWith('.')) break;
    }
    return collected.join(' ');
  }

  function projectCard(project) {
    const tech = extractTech(project.content).slice(0, 4);
    return `
      <article class="featured-project-card" style="--brand-glow:${project.accent}">
        <div class="featured-project-top">
          <div class="featured-project-badge">${escapeHtml(project.folder)}</div>
          <h3 class="featured-project-title">${escapeHtml(project.title)}</h3>
          <p class="featured-project-intro">${escapeHtml(project.intro)}</p>
        </div>
        ${tech.length ? `<div class="featured-project-tags">${tech.map(item => `<span class="featured-project-tag">${escapeHtml(item)}</span>`).join('')}</div>` : ''}
        <div class="featured-project-actions">
          <button class="card-btn" type="button" data-open-project="${escapeHtml(project.id)}">View case study <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
        </div>
      </article>
    `;
  }

  function sliderMarkup(project) {
    if (!project.images || !project.images.length) return '';
    const multiple = project.images.length > 1;
    const slides = project.images.map((image, index) => `
      <div class="project-slide">
        <img src="${pathToUrl(image)}" alt="${escapeHtml(project.title)} screenshot ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
      </div>
    `).join('');
    const dots = multiple ? project.images.map((_, index) => `<button class="project-slider-dot${index === 0 ? ' active' : ''}" type="button" data-slider-dot="${index}" aria-label="Go to screenshot ${index + 1}"></button>`).join('') : '';
    return `
      <div class="project-slider${multiple ? '' : ' single'}" data-project-slider data-project-id="${escapeHtml(project.id)}">
        <div class="project-slider-frame">
          <div class="project-slider-track" tabindex="0" aria-label="${escapeHtml(project.title)} screenshots">
            ${slides}
          </div>
        </div>
        ${multiple ? `
          <div class="project-slider-nav" aria-hidden="true">
            <button class="project-slider-btn" type="button" data-slider-prev aria-label="Previous screenshot"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
            <button class="project-slider-btn" type="button" data-slider-next aria-label="Next screenshot"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></button>
          </div>
          <div class="project-slider-dots">${dots}</div>
        ` : ''}
      </div>
    `;
  }

  function projectOverlayMarkup(project) {
    const links = extractLinks(project.content);
    const tech = extractTech(project.content);
    const intro = firstParagraph(project.content) || project.intro;
    const article = renderMarkdown(project.content);
    const techHtml = tech.length ? `
      <div class="cs-sec">
        <h2 class="cs-sec-title">Technologies / Tech Stack</h2>
        <div class="tech-row">${tech.map(item => `<span class="tech"><i></i>${escapeHtml(item)}</span>`).join('')}</div>
      </div>
    ` : '';
    const linkHtml = links.length ? `
      <div class="cs-sec">
        <h2 class="cs-sec-title">Project Links</h2>
        <div class="cs-links">${links.map(link => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener" class="cs-link cs-link-p"><svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>${escapeHtml(link.label)}</a>`).join('')}</div>
      </div>
    ` : '';

    return `
      <div class="project-header">
        <div class="project-kicker">${escapeHtml(project.folder)}</div>
        <h1 class="cs-title">${escapeHtml(project.title)}</h1>
        <div class="cs-role-badge">${escapeHtml(project.initials)} Project</div>
        <p class="project-intro">${escapeHtml(intro)}</p>
      </div>
      ${sliderMarkup(project)}
      <div class="markdown-content">
        ${article}
      </div>
      ${techHtml}
      ${linkHtml}
    `;
  }

  function getSliderElements(slider) {
    if (!slider) return null;
    const track = slider.querySelector('.project-slider-track');
    const slides = Array.from(slider.querySelectorAll('.project-slide'));
    const dots = Array.from(slider.querySelectorAll('.project-slider-dot'));
    return { slider, track, slides, dots };
  }

  function updateSliderState(elements) {
    if (!elements) return;
    const index = Math.max(0, Math.min(elements.slides.length - 1, Math.round(elements.track.scrollLeft / elements.track.clientWidth)));
    elements.dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
  }

  function moveSlider(elements, direction) {
    if (!elements) return;
    elements.track.scrollBy({ left: direction * elements.track.clientWidth, behavior: 'smooth' });
  }

  function setupSlider(slider) {
    const elements = getSliderElements(slider);
    if (!elements) return;
    if (elements.slides.length <= 1) return;

    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');

    prev?.addEventListener('click', () => moveSlider(elements, -1));
    next?.addEventListener('click', () => moveSlider(elements, 1));

    elements.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.sliderDot || 0);
        elements.track.scrollTo({ left: index * elements.track.clientWidth, behavior: 'smooth' });
      });
    });

    let dragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    elements.track.addEventListener('scroll', () => updateSliderState(elements));
    elements.track.addEventListener('pointerdown', event => {
      dragging = true;
      startX = event.clientX;
      startScrollLeft = elements.track.scrollLeft;
      elements.track.classList.add('dragging');
      elements.track.setPointerCapture(event.pointerId);
    });
    elements.track.addEventListener('pointermove', event => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      elements.track.scrollLeft = startScrollLeft - delta;
    });
    const stopDragging = event => {
      if (!dragging) return;
      dragging = false;
      elements.track.classList.remove('dragging');
      if (event.pointerId !== undefined && elements.track.hasPointerCapture(event.pointerId)) {
        elements.track.releasePointerCapture(event.pointerId);
      }
    };
    elements.track.addEventListener('pointerup', stopDragging);
    elements.track.addEventListener('pointercancel', stopDragging);
    elements.track.addEventListener('pointerleave', stopDragging);
    elements.track.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveSlider(elements, -1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveSlider(elements, 1);
      }
    });

    updateSliderState(elements);
    window.addEventListener('resize', () => updateSliderState(elements), { passive: true });
  }

  function openProject(projectId) {
    const project = projects.find(item => item.id === projectId);
    if (!project) return;
    featuredOverlayInner.innerHTML = projectOverlayMarkup(project);
    featuredOverlay.classList.remove('closing');
    featuredOverlay.classList.add('active');
    featuredOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setupSlider(featuredOverlayInner.querySelector('[data-project-slider]'));
  }

  function closeProject() {
    if (!featuredOverlay.classList.contains('active')) return;
    featuredOverlay.classList.add('closing');
    setTimeout(() => {
      featuredOverlay.classList.remove('active', 'closing');
      featuredOverlay.setAttribute('aria-hidden', 'true');
      featuredOverlayInner.innerHTML = '';
      document.body.style.overflow = '';
    }, 500);
  }

  function init() {
    if (featuredGrid) featuredGrid.innerHTML = projects.map(projectCard).join('');

    featuredGrid?.addEventListener('click', event => {
      const button = event.target.closest('[data-open-project]');
      if (!button) return;
      openProject(button.dataset.openProject);
    });

    featuredClose?.addEventListener('click', closeProject);
    featuredOverlay?.addEventListener('click', event => {
      if (event.target === featuredOverlay) closeProject();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeProject();
      if (!featuredOverlay.classList.contains('active')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const slider = featuredOverlayInner.querySelector('[data-project-slider]');
        const elements = getSliderElements(slider);
        if (!elements || elements.slides.length <= 1) return;
        event.preventDefault();
        moveSlider(elements, event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();