---
name: supabase-setup
description: Automates Supabase database management using MCP server tools and TypeScript type generation.
---
# Supabase Setup Skill

This skill automates the management of your Supabase database schema and TypeScript typings within your IDE.

## Prerequisites

Ensure the following variables are present in your `.env.local` file:
* `SUPABASE_URL`
* `SUPABASE_SERVICE_ROLE_KEY`

## Workflow

1. **Read Environment Variables**: Read `.env.local` to verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured.
2. **Database Introspection**: Use the Supabase MCP server tools (like `list_tables` or `execute_sql`) to inspect the current state of the database.
3. **Draft SQL Plan**: ALWAYS generate a SQL migration or execution plan artifact for the user to review.
4. **Execution**: **Wait for user approval** before running any destructive or schema-altering SQL commands.
5. **Generate Types**: After any schema change is successfully executed, automatically run the Supabase CLI command to generate TypeScript types into `src/types/supabase.ts` (or equivalent location like `lib/types.ts`).

## Notes
* Always err on the side of caution before executing SQL.
* If the user requests a schema change, perform steps 2-5.
