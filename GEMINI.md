# ContentHive - Project Overview

## What This App Is
This project is a full-stack SaaS client dashboard built for a content writing business. It enables clients to:
- View pending and past content orders.
- Create new content orders via a simple, user-friendly form.
- Configure their user profiles and settings.

The UI prioritizes a highly modern, clean, minimal, and premium aesthetic matching top-tier SaaS standards.

### Tech Stack
- **Framework**: Next.js (App Router), React 19
- **Authentication**: Clerk
- **Database Backend**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4, Radix UI Primitives, Lucide React icons
- **State Management & Forms**: Zustand, React Hook Form, Zod

## Everything Done So Far
- **App Scaffold & Routing**: Initialized the Next.js App Router project and base structure.
- **Clerk Authentication setup**: Integrated Clerk for secure user sign-up, login, and session management.
- **Supabase Integration & Database Fixes**:
  - Connected Supabase for the database layer.
  - Resolved `uuid` type matching errors by updating Supabase SQL schema and Row Level Security (RLS) policies to handle Clerk's string-based user IDs.
  - Created automated database management tooling via a workspace skill (`supabase-setup`). This tool uses MCP to handle SQL schema migrations and automatically syncs the database to Next.js TypeScript types.
- **UI & Dashboard Redesign**: 
  - Resolved `globals.css` Tailwind Custom Variant errors.
  - Deeply modernized the Dashboard UI, improving layout composition, padding/margins, typography, and charts to feel cinematic and premium.
  - Fixed interactive input bugs, ensuring full functionality for users creating and viewing their content orders.

## Instructions for Future Models
If you are picking up this project context to continue work, please adhere strictly to these guidelines:
1. **Data Relationships (Clerk + Supabase)**: The app uses Clerk for auth and Supabase for data storage. Clerk `user_id`s are **strings**. When writing SQL migrations or RLS policies in Supabase, ensure you handle the reference IDs as `text` or `varchar`, NOT standard Postgres `UUID`s.
2. **Database Schema & Types**: Use the workspace skill `supabase-setup` (located at `.agent/skills/supabase-setup/SKILL.md`) when making database changes. This script relies on MCP tools to execute SQL plans securely and auto-generate the updated TypeScript types from your Supabase backend.
3. **Design Aesthetic**: Visual excellence is a core requirement. Whenever you introduce new pages or components, adhere to the established, modern Tailwind CSS design language (fluid utility structures, crisp Lucide icons, Radix accessible primitives, and thoughtful whitespace). Do not output generic or unstyled "minimum viable" pages.
4. **Component Architecture**: Keep components modular within the `/components` folder and utilize Radix/tailwind-merge/clsx to maintain a scalable component library.
