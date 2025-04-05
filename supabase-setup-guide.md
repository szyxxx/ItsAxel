# Supabase Setup Guide for Journal Application

This guide will help you set up Supabase for your journal application.

## 1. Create a Supabase Project

1. Go to [https://supabase.com/](https://supabase.com/) and sign in or create an account
2. Click "New Project" and follow the setup wizard
3. Choose a name for your project (e.g., "AxelJournal")
4. Set a secure database password (save this somewhere safe)
5. Choose the region closest to you
6. Click "Create new project"

## 2. Set Up Environment Variables

1. Copy the `.env.example` file to a new file named `.env`:
   ```
   cp .env.example .env
   ```

2. In your Supabase project dashboard, go to Project Settings → API
3. Copy the "Project URL" and paste it as the value for `SUPABASE_URL` in your `.env` file
4. Copy the "anon public" key and paste it as the value for `SUPABASE_KEY` in your `.env` file

## 3. Create Database Tables

1. In your Supabase dashboard, go to the SQL Editor
2. Click "New Query"
3. Copy and paste the contents of the `supabase-schema.sql` file
4. Click "Run" to execute the SQL and create your tables

## 4. Update Your Code to Use Supabase

1. Open `pages/experiments/journal/index.vue`
2. Find where you're importing the journal composable:
   ```js
   import { useMockJournal } from '~/composables/useJournal'
   ```

3. Change it to use the real Supabase implementation:
   ```js
   import { useJournal } from '~/composables/useJournal'
   ```

4. Update any references from `useMockJournal()` to `useJournal()`
5. Update the function calls to match the Supabase implementation:
   - Change `getEntries()` to `await fetchEntries()`
   - Change `getEntryById(id)` to `await fetchEntry(id)`
   - Change `createEntry(entry)` to `await createEntry(entry)`

## 5. Handle Authentication

Since the Supabase implementation requires authentication, you'll need to:

1. Set up authentication in your app (if not already done)
2. Make sure users are signed in before they can create journal entries
3. Associate entries with the current user

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify your Supabase credentials are correct in the `.env` file
3. Make sure the tables were created successfully in the Supabase dashboard
4. Check that Row Level Security (RLS) policies are set up correctly

## Testing

To test if your Supabase integration is working:

1. Run your application
2. Try to create a new journal entry
3. Check the Supabase dashboard to see if the entry was added to the `diary_entries` table
