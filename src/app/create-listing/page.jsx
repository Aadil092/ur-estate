"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; // To navigate to the home page
import FileUpload from "../api/listing/_components/FileUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    rentOrSell: "Rent",
    propertyType: "",
    bedroom: "",
    bathroom: "",
    builtIn: "",
    parking: "",
    lotSize: "",
    area: "",
    price: "",
    description: "",
  });

  const [listingId, setListingId] = useState(null); // To store the created listing ID
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to toggle AlertDialog
  const router = useRouter(); // To navigate to the home page

  // Handle text input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle custom field changes
  const handleCustomChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const saveListing = async () => {
    try {
      setLoading(true);

      // Insert listing into the database
      const { data: listingData, error: listingError } = await supabase
        .from("listing")
        .insert([{ ...formData, active: true }]) // Add a listing and make it active
        .select();

      if (listingError) throw listingError;

      // Save the listing ID
      setListingId(listingData[0].id);

      toast.success("Listing saved & published successfully!");

      // Navigate to the home page after 2 seconds to display the success message briefly
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      toast.error("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
      setIsAlertOpen(false); // Close the AlertDialog after successful save
    }
  };

  return (
    <div className="px-10 md:px-36 bg-gray-900 text-gray-200">
      <h2 className="font-bold text-4xl mb-10">Enter Details About Your Listing</h2>
      <div className="p-8 rounded-lg shadow-md bg-gray-800 border border-gray-700">
        {/* Address Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <Label className="font-medium mb-2" htmlFor="address">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter address"
              className="bg-gray-700 text-gray-200 placeholder-gray-500 border-gray-600 focus:ring-purple-500 focus:border-purple-500"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Rent or Sell Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Rent or Sell?</h2>
          <RadioGroup
            defaultValue={formData.rentOrSell}
            onValueChange={(value) => handleCustomChange("rentOrSell", value)}
          >
            <div className="flex items-center space-x-4 mb-3">
              <RadioGroupItem
                value="Rent"
                id="Rent"
                style={{ accentColor: "purple" }}
                className="bg-white"
              />
              <Label className="font-medium text-gray-200" htmlFor="Rent">
                Rent
              </Label>
            </div>
            <div className="flex items-center space-x-4">
              <RadioGroupItem
                value="Sell"
                id="Sell"
                style={{ accentColor: "purple" }}
                className="bg-white"
              />
              <Label className="font-medium text-gray-200" htmlFor="Sell">
                Sell
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Property Type Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-4">Property Type</h2>
          <Select onValueChange={(value) => handleCustomChange("propertyType", value)}>
            <SelectTrigger className="w-full md:w-[180px] bg-gray-700 text-gray-200 border-gray-600 focus:ring-purple-500 focus:border-purple-500">
              <SelectValue placeholder="Select Property Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-200">
              <SelectItem value="Town House">Town House</SelectItem>
              <SelectItem value="Flat House">Flat House</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
          {[
            { id: "bedroom", label: "Bedroom", placeholder: "Bedrooms" },
            { id: "bathroom", label: "Bathroom", placeholder: "Bathrooms" },
            { id: "builtIn", label: "Built In", placeholder: "Year Built" },
            { id: "parking", label: "Parking", placeholder: "Parking Spaces" },
            { id: "lotSize", label: "Lot Size", placeholder: "Lot Size (sq ft)" },
            { id: "area", label: "Area", placeholder: "Area (sq ft)" },
            { id: "price", label: "Price", placeholder: "Enter Price" },
            { id: "description", label: "Description", placeholder: "Enter Description" },
          ].map((input) => (
            <div key={input.id} className="flex flex-col">
              <Label className="font-medium mb-2" htmlFor={input.id}>
                {input.label}
              </Label>
              <Input
                id={input.id}
                type="text"
                placeholder={input.placeholder}
                className="bg-gray-700 text-gray-200 placeholder-gray-500 border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                value={formData[input.id]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Pass the listingId as a prop to FileUpload */}
        <FileUpload listingId={listingId} />
      </div>

      {/* Save & Publish Button */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="px-6 py-2 rounded bg-purple-500 text-gray-200 font-semibold hover:bg-purple-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          onClick={() => setIsAlertOpen(true)} // Open the AlertDialog
        >
          {loading ? "Saving..." : "Save & Publish"}
        </button>
      </div>

      {/* AlertDialog */}
      {isAlertOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Confirm Publish</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to publish this listing? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-400"
                onClick={() => setIsAlertOpen(false)} // Cancel action
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-purple-500 text-gray-200 hover:bg-purple-400"
                onClick={saveListing} // Confirm action
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateListing;