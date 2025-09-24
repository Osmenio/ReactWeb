import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://rnjbwlqkjpzahaoxxthj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamJ3bHFranB6YWhhb3h4dGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTA1MzYsImV4cCI6MjA2ODU4NjUzNn0.bsHevIldAsfdihoeqE6WdlWLeNn06q2VDvGVfJ08_Qs"

const Database = createClient(supabaseUrl, supabaseKey);

export { Database };

export function formatError(error?: { details?: string; message?: string } | null): string | undefined {
    if (!error) return undefined;

    if (error.details && error.message) {
        return `${error.details}: ${error.message}`;
    }

    return error.details || error.message || undefined;
}