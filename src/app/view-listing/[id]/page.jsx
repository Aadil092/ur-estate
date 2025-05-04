"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Get dynamic route parameters

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ViewListing = () => {
  const router = useRouter();
  const { id } = useParams(); // Extract listing ID from dynamic route
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);

        // Fetch listing details
        const { data: listingData, error: listingError } = await supabase
          .from("listing")
          .select("*")
          .eq("id", id)
          .single();

        if (listingError) throw listingError;

        // Fetch images linked to the listing
        const { data: imageData, error: imageError } = await supabase
          .from("listingimages")
          .select("url")
          .eq("listing_id", id);

        if (imageError) throw imageError;

        setListing({ ...listingData, listingimages: imageData });
      } catch (err) {
        console.error("Error fetching listing:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6">
      {loading && <p>Loading listing details...</p>}
      {!loading && listing ? (
        <div className="max-w-4xl p-6  rounded-lg shadow-md">
          {/* Display all images */}
          {listing.listingimages?.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {listing.listingimages.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  width={600}
                  height={400}
                  alt={`Listing Image ${index + 1}`}
                  className="rounded-lg object-cover"
                />
              ))}
            </div>
          )}

          {/* Property Details */}
          <h2 className="text-3xl font-bold mt-4">₹{listing.price}</h2>
          <p className="text-lg"><strong>Address:</strong> {listing.address}</p>
          <p className="text-lg"><strong>Type:</strong> {listing.rentOrSell}</p>
          <p className="text-lg"><strong>Bedrooms:</strong> {listing.bedroom}</p>
          <p className="text-lg"><strong>Bathrooms:</strong> {listing.bathroom}</p>
          <p className="text-lg"><strong>Parking:</strong> {listing.parking}</p>
          <p className="text-lg"><strong>Built-in:</strong> {listing.builtIn}/Year</p>
          <p className="text-lg"><strong>Total Area:</strong> {listing.area} sq.ft</p>
          <p className="text-lg"><strong>Description:</strong> {listing.description}</p>

          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            ← Back to Listings
          </button>
        </div>
      ) : (
        !loading && <p>No listing details found.</p>
      )}
    </div>
  );
};

export default ViewListing;