'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function DisplayListings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch listings from the Supabase database
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);

        // Fetch data from the 'listings' table
        const { data, error } = await supabase
          .from('avatars') // Replace with your table name
          .select(`*,listing-image(
               url,
               avatars_id
          )`) // Fetch all columns
          .eq('isPublished',true)
          .eq('type',type)
        if (error) {
          console.error('Error fetching listings:', error.message);
          return;
        }

        setListings(data); // Save fetched data in state
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []); // Empty dependency array ensures the fetch happens only once

  if (isLoading) {
    return <p>Loading listings...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Available Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              {/* Display listing image */}
              {listing.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listing-image/${listing.image}`}
                  alt={listing.name}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
              )}

              {/* Display other listing details */}
              <h2 className="text-xl font-bold">{listing.name}</h2>
              <p className="text-gray-600">{listing.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {listing.type}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Price:</strong> ₹{listing.type === 'sell' ? listing.sellingPrice : listing.regularPrice}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Bedrooms:</strong> {listing.bedrooms} | <strong>Bathrooms:</strong> {listing.bathrooms}
              </p>

              {/* More info or actions */}
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View More
              </button>
            </div>
          ))
        ) : (
          <p>No listings available.</p>
        )}
      </div>
    </div>
  );
}

export default DisplayListings;