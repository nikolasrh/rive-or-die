import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const url = "https://lcdclunxclyztgmvladr.supabase.co";
const publicKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZGNsdW54Y2x5enRnbXZsYWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NzQ3MDMsImV4cCI6MjA0OTA1MDcwM30.pfXW1WeqqOyvY08uKlc18W_gOKMoz8yaMIdnIw34gL8";
const client = createClient(url, publicKey);

export default client;
