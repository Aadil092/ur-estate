import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// API Route for Creating a Listing
export async function POST(req) {
  try {
    const data = await req.json();

    // Insert new listing into the Supabase 'listings' table
    const { error } = await supabase.from('listings').insert([data]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: 'Listing created successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
