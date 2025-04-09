"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FiHome, FiTag, FiMapPin } from "react-icons/fi"; // Icons for better UI

// Supabase Configuration
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function AdminPanel() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [selectedSection, setSelectedSection] = useState("TotalProperties");
  const [totalPropertiesCount, setTotalPropertiesCount] = useState(0);
  const [sellPropertiesCount, setSellPropertiesCount] = useState(0);
  const [rentPropertiesCount, setRentPropertiesCount] = useState(0);

  // Fetch Property Listings and calculate counts
  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
      .from("listing")
      .select("*");
      console.log("Properties:", data, error);
      if (error) {
        console.error(error);
      } else {
        setProperties(data);

        // Calculate counts for Total, Sell, and Rent properties
        setTotalPropertiesCount(data.length);
        setSellPropertiesCount(data.filter((property) => property.status === "Sell").length);
        setRentPropertiesCount(data.filter((property) => property.status === "Rent").length);
      }
    };
    fetchProperties();
  }, []);

  // Sidebar options
  const sidebarOptions = [
    { id: "TotalProperties", label: "Total Properties" },
    { id: "SellProperties", label: "Sell Properties" },
    { id: "RentProperties", label: "Rent Properties" },
    { id: "SellDetails", label: "Sell Details" },
    { id: "RentDetails", label: "Rent Details" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-4">
          {sidebarOptions.map((option) => (
            <li
              key={option.id}
              className={`cursor-pointer p-2 rounded ${selectedSection === option.id ? "bg-purple-500" : "hover:bg-gray-700"
                }`}
              onClick={() => setSelectedSection(option.id)}
            >
              {option.label}
            </li>
          ))}
        </ul>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full px-4 py-2 bg-red-500 rounded hover:bg-red-400"
        >
          Back to Home
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6">{selectedSection}</h2>

        {/* Total Properties */}
        {selectedSection === "TotalProperties" && (
          <div className="space-y-6">
            {/* Property Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Properties Card */}
              <div className="p-6 bg-gray-700 rounded-lg shadow flex items-center gap-4">
                <FiHome size={40} className="text-purple-500" />
                <div>
                  <h3 className="text-lg font-bold text-white">Total Properties</h3>
                  <p className="text-2xl font-semibold text-white">{totalPropertiesCount}</p>
                </div>
              </div>

              {/* Sell Properties Card */}
              <div className="p-6 bg-gray-700 rounded-lg shadow flex items-center gap-4">
                <FiTag size={40} className="text-green-500" />
                <div>
                  <h3 className="text-lg font-bold text-white">Sell Properties</h3>
                  <p className="text-2xl font-semibold text-white">{sellPropertiesCount}</p>
                </div>
              </div>

              {/* Rent Properties Card */}
              <div className="p-6 bg-gray-700 rounded-lg shadow flex items-center gap-4">
                <FiMapPin size={40} className="text-blue-500" />
                <div>
                  <h3 className="text-lg font-bold text-white">Rent Properties</h3>
                  <p className="text-2xl font-semibold text-white">{rentPropertiesCount}</p>
                </div>
              </div>
            </div>

            {/* Property Listings */}
            {properties.map((property) => (
              <div key={property.id} className="p-6 bg-gray-900 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{property.property_name}</h3>
                <p>Address: {property.address}</p>
                <p>Price: ₹{property.price}</p>
                <p>Status: {property.status}</p>
              </div>
            ))}
          </div>
        )}

        {/* Sell Properties */}
        {selectedSection === "SellProperties" && (
       <div className="space-y-6">
    {properties
      .filter((property) => property.status === "Sell")
      .map((property) => (
        <div key={property.id} className="p-6 bg-gray-900 rounded-lg shadow">
          <h3 className="text-xl font-semibold">{property.property_name}</h3>

          {/* Ensure listingimages exists before accessing */}
          {property.listingimages && property.listingimages.length > 0 && (
            <img
              src={property.listingimages[0].url}
              width={400}
              height={300}
              alt="Listing Image"
              className="rounded-lg object-cover mb-4"
            />
          )}

          <p>Address: {property.address}</p>
          <p>Price: ₹{property.price}</p>
          <p>Description: {property.description}</p>
          <p>Parking: {property.parking}</p>
          <p>Bedroom: {property.bedroom}</p>
          <p>Bathroom: {property.bathroom}</p>
          <p>Area: {property.area} sq.ft</p>
          <p>Built In: {property.built_in}</p>
          <p>Lot Size: {property.lot_size} sq.ft</p>
        </div>
      ))}
  </div>
)}

{selectedSection === "RentProperties" && (
  <div className="space-y-6">
    {properties
      .filter((property) => property.status === "Rent")
      .map((property) => (
        <div key={property.id} className="p-6 bg-gray-900 rounded-lg shadow">
          <h3 className="text-xl font-semibold">{property.property_name}</h3>

          {/* Ensure listingimages exists before accessing */}
          {property.listingimages && property.listingimages.length > 0 && (
            <img
              src={property.listingimages[0].url}
              width={400}
              height={300}
              alt="Listing Image"
              className="rounded-lg object-cover mb-4"
            />
          )}

          <p>Address: {property.address}</p>
          <p>Price: ₹{property.price}</p>
          <p>Description: {property.description}</p>
          <p>Bedroom: {property.bedroom}</p>
          <p>Bathroom: {property.bathroom}</p>
          <p>Area: {property.area} sq.ft</p>

          {/* Contact Seller Section */}
          
        </div>
      ))}
  </div>
)}
      </main>
    </div>
  );
}

export default AdminPanel;