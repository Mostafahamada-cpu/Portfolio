const projectAssets = window.portfolioProjectAssets || {};
window.portfolioProjectManifest = {
  categories: [
    {
      id: 'featured',
      title: 'Featured Projects',
      note: 'Business products and client systems',
      projects: [
        {
          id: 'memora',
          title: 'Memora',
          folder: 'Memora',
          intro: 'A digital wedding invitation platform and online store built as a real product/business, combining the storefront and admin workflow into one system.',
          accent: 'rgba(212,175,55,.1)',
          initials: 'M',
          label: 'My Own Business',
          cover: 'Memora/Logo.jpeg',
          tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Vercel'],
          images: projectAssets.memora || [],
          galleries: [
            { title: 'Store / Customer Experience', images: (projectAssets.memora || []).filter(image => image.startsWith('Memora/Store/')) },
            { title: 'Admin Dashboard', images: (projectAssets.memora || []).filter(image => image.startsWith('Memora/Admin/')) }
          ],
          content: `# Memora

**Digital Wedding Invitation Platform**

Memora is a digital wedding invitation platform and online store that allows customers to explore products and bundles, preview live demos, and place orders through a structured ordering flow.

### What I Built

* E-commerce Store
* Products & Bundles System
* Customer Ordering Flow
* InstaPay Payment Link
* Generated WhatsApp Order Links
* Admin Dashboard
* Order Analytics & Management
* Product & Bundle Management
* Live Invitation Demos

### Customer Flow

**Browse → Choose Product/Bundle → Live Demo → Start Your Order → Enter Details → Payment → Order**

### Admin Dashboard

The admin dashboard allows the business to analyze orders, manage products and bundles, update prices, and review customer order details.

Each order also includes a direct message button that opens a WhatsApp conversation with the customer.

### Tech Stack

**HTML · CSS · JavaScript · Supabase · Vercel**

### Role

**Founder & Developer**

Designed and developed the Memora platform from the ground up, including the storefront, ordering system, admin dashboard, and digital invitation experiences.

### Links

**Live Store:** https://memora-store.vercel.app/
**GitHub:** https://github.com/Mostafahamada-cpu/MemoraStore`
        },
        {
          id: 'crm',
          title: 'CRM',
          folder: 'CRM',
          intro: 'A complete business CRM for managing clients, properties, deals, follow-ups, and sales analytics.',
          accent: 'rgba(230,126,34,.1)',
          initials: 'C',
          cover: 'CRM/Dashboard.png',
          tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
          images: projectAssets.crm || [],
          existingOverlayId: 'crm'
        },
        {
          id: 'attendance-app',
          title: 'Attendance App',
          folder: 'Attendance',
          intro: 'A workforce-management system with GPS attendance, leave rules, payroll support, permissions, and role-based business logic.',
          accent: 'rgba(37,99,235,.1)',
          initials: 'A',
          cover: 'Attendance/Home.png',
          tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Supabase Auth', 'Vercel'],
          images: projectAssets['attendance-app'] || [],
          existingOverlayId: 'attendance'
        },
        {
          id: 'clientview',
          title: 'ClientView',
          folder: 'RingRoad',
          intro: 'A client-facing property interface for browsing listings, comparing options, and viewing property details with video walkthroughs.',
          accent: 'rgba(230,126,34,.1)',
          initials: 'CV',
          cover: 'RingRoad/Logo.jpeg',
          tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
          images: projectAssets.clientview || [],
          existingOverlayId: 'client-view'
        },
        {
          id: 'stancepro',
          title: 'StancePro',
          folder: 'StancePro',
          intro: 'A connected e-commerce system that combines the storefront and admin dashboard into one business workflow.',
          accent: 'rgba(20,184,166,.1)',
          initials: 'SP',
          cover: 'StancePro/Store/Home.png',
          tech: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Firebase Storage', 'Vercel'],
          images: projectAssets.stancepro || [],
          galleries: [
            { title: 'Store', images: (projectAssets.stancepro || []).filter(image => image.startsWith('StancePro/Store/')) },
            { title: 'Admin Dashboard', images: (projectAssets.stancepro || []).filter(image => image.startsWith('StancePro/Admin/')) }
          ],
          content: `# StancePro

A connected e-commerce platform for a car accessories business.

## Store

The storefront lets customers browse products, view product details, place orders, upload payment proof, and send order information through the business workflow.

## Admin Dashboard

The admin dashboard gives the business a central place to manage products, inventory, images, and orders.

## Technical Stack

* HTML
* CSS
* JavaScript
* Firebase
* Firebase Storage
* Vercel

## Role

I designed and developed both sides of the system so the storefront and admin dashboard work together as one business application.

## Link

https://stance-pro.vercel.app/`
        }
      ]
    },
    {
      id: 'personal',
      title: 'Personal Projects',
      note: 'Smaller productivity and finance tools',
      projects: [
        {
          id: 'money-tracker',
          title: 'Money Tracker',
          folder: 'MoneyTracker',
          intro: 'A personal finance app built around structured transaction handling, multiple accounts, and real spending categories.',
          accent: 'rgba(59,130,246,.1)',
          initials: 'MT',
          label: 'Personal',
          cover: 'MoneyTracker/DashBoard.png',
          tech: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
          images: projectAssets['money-tracker'] || [],
          content: `# Money Tracker

Money Tracker is a personal finance application designed to help users track income, expenses, transfers, accounts, and spending categories in one place.

## Overview

The project goes beyond simply recording expenses by introducing a structured transaction model and support for multiple accounts.

## The Problem

Basic expense trackers often treat every transaction as simply "money spent." That approach doesn't accurately represent real personal finances.

For example, moving money from a bank card to cash isn't an expense. It is a transfer between accounts.

## The Solution

I created a transaction-based financial system where each transaction contains structured information.

Transactions can be categorized as:

* Expense
* Income
* Transfer

## Accounts

The application supports different accounts, such as:

* Cash
* Card

## Categories

Transactions can be organized into categories such as:

* Car
* Fuel
* Transport
* Family

## Validation

I also implemented a dedicated validation layer for transaction data.

## Notion Integration

One of the most interesting parts of the project was making the application suitable for use inside Notion.

## Technical Highlights

* Transaction modeling
* Data validation
* Multiple account types
* Expense/income/transfer logic
* Database-backed data
* Embedded application architecture
* Responsive UI
* Notion compatibility

## My Role

I designed and developed Money Tracker, including the transaction model, financial workflows, validation, interface, and embedded application experience.`
        },
        {
          id: 'to-do',
          title: 'To-Do',
          folder: 'ToDoList',
          intro: 'A focused productivity app for creating, reviewing, and completing tasks without unnecessary interface noise.',
          accent: 'rgba(20,184,166,.1)',
          initials: 'TD',
          label: 'Personal',
          cover: 'ToDoList/Home BrightMode.png',
          tech: ['HTML', 'CSS', 'JavaScript'],
          images: projectAssets['to-do'] || [],
          content: `# To-Do

To-Do is a productivity application designed to help users organize and manage their daily tasks through a clean and focused interface.

## The Problem

Managing tasks through scattered notes or multiple applications can make it difficult to understand what needs to be done.

## The Solution

I built a task management interface focused on reducing unnecessary interaction.

## Key Features

* Task Creation
* Task Management
* Task Organization

## Technical Focus

* UI components
* Application state
* User interactions
* Forms
* Validation
* Task data
* CRUD operations
* Responsive interface behavior

## My Role

I designed and developed the To-Do application, focusing on both the user experience and the underlying task-management functionality.`
        }
      ]
    },
    {
      id: 'embedded',
      title: 'Other / Embedded Projects',
      note: 'Smaller web experiences used as embedded components',
      projects: [
        {
          id: 'aion-web',
          title: 'AION Web',
          folder: 'AION',
          intro: 'A website for AION Innovations, currently in progress.',
          accent: 'rgba(99,102,241,.08)',
          initials: 'AW',
          cover: 'AION(Wuillt)/aion-logo.png',
          tech: ['Web Development'],
          images: projectAssets['aion-web'] || [],
          status: 'Coming Soon',
          content: `# AION Web

A website for AION Innovations.

Project details and case study content coming soon.`
        },
        {
          id: 'aion-store',
          title: 'AION Store',
          folder: 'AION',
          intro: 'An e-commerce storefront for AION smart home and automation products, currently in progress.',
          accent: 'rgba(99,102,241,.08)',
          initials: 'AS',
          cover: 'AION(Wuillt)/aion-logo.png',
          tech: ['E-Commerce'],
          images: projectAssets['aion-store'] || [],
          status: 'Coming Soon',
          content: `# AION Store

An e-commerce storefront for AION smart home and automation products.

Project details and case study content coming soon.`
        }
      ]
    }
  ]
};
