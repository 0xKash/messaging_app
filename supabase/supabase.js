require("dotenv").config();

//imports
const { createClient } = require("@supabase/supabase-js");

//setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
