"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Listing from "./Listing";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function DisplayListing() {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    getLatestListing();
  }, []);

  // getLatestListing fetches published property details from the "avatars" table.
  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("avatars")
      .select("*")
      .eq("isPublished", true)
      .order("created_at", { ascending: false });

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server Side Error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Property Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side: Display fetched property listings */}
        <div>
          <Listing listing={listing} />
        </div>
        {/* Right side: Placeholder area (e.g., Map or additional details) */}
        <div>
          <p className="text-lg font-medium">
            Map
          </p>
        </div>
      </div>
    </div>
  );
}

export default DisplayListing;