"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function DisplayListing() {
  const [listings, setListings] = useState([]); // All listings data
  const [filteredListings, setFilteredListings] = useState([]); // Listings filtered by Rent or Sell
  const [loading, setLoading] = useState(true); // Loading state
  const [filterType, setFilterType] = useState("Rent"); // Filter type: Rent or Sell

  useEffect(() => {
    getLatestListing();
  }, []);

  useEffect(() => {
    // Filter listings based on the selected filter type (Rent or Sell)
    const filtered = listings.filter((listing) => listing.rentOrSell === filterType);
    setFilteredListings(filtered);
  }, [filterType, listings]);

  const getLatestListing = async () => {
    try {
      setLoading(true);
      const { data: listingsData, error: listingsError } = await supabase
        .from("listing")
        .select(`
          id,
          address,
          price,
          bedroom,
          bathroom,
          parking,
          rentOrSell,
          listingimages (url)
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      if (listingsError) throw listingsError;
      setListings(listingsData);
    } catch (err) {
      console.error("Error fetching listings:", err.message);
      toast.error("Unable to load latest listings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/pexels-marketingtuig-87223.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-10 md:px-36 flex-grow bg-opacity-60">
        <h2 className="font-bold text-2xl mb-6 text-white">Available Listings</h2>
        {loading && <p className="text-white">Loading listings...</p>}
        {!loading && filteredListings.length === 0 && (
          <p className="text-white">No listings found.</p>
        )}

        {/* Rent or Sell Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4 text-white">Filter by Type</h3>
          <div className="flex gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="filterType"
                value="Rent"
                checked={filterType === "Rent"}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-800"
              />
              <span className="font-bold text-white">Rent</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="filterType"
                value="Sell"
                checked={filterType === "Sell"}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-800"
              />
              <span className="font-bold text-white">Sell</span>
            </label>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Link key={listing.id} href={`/view-listing/${listing.id}`}>
              <div className="p-6 rounded-lg shadow-md bg-transparent border border-gray-700 cursor-pointer hover:bg-gray-800">
                {/* Display First Image */}
                {listing.listingimages.length > 0 && (
                  <img
                    src={listing.listingimages[0].url}
                    width={400}
                    height={300}
                    alt="Listing Image"
                    className="rounded-lg object-cover mb-4"
                  />
                )}

                {/* Listing Details */}
                <h3 className="font-bold text-xl mb-4 text-zinc-300">₹{listing.price}</h3>
                <p className="text-zinc-300 mb-2">
                  <strong>Address:</strong> {listing.address}
                </p>
                <p className="text-zinc-300 mb-2">
                  <strong>Bedrooms:</strong> {listing.bedroom}
                </p>
                <p className="text-zinc-300 mb-2">
                  <strong>Bathrooms:</strong> {listing.bathroom}
                </p>
                <p className="text-zinc-300 mb-2">
                  <strong>Parking:</strong> {listing.parking}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayListing;