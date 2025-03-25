'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import FileUpload from '../api/listing/_components/FileUpload';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CreateListing() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showDialog, setShowDialog] = useState(false); // For dialog visibility

  // State for storing form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent', // Default value for type
    bedrooms: '',
    bathrooms: '',
    builtInArea: '',
    squareFeet: '',
    regularPrice: '',
    sellingPrice: '', // Only for 'sell'
    parking: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Function to handle saving and publishing a listing
  const publishBtnHandler = async () => {
    try {
      const validatedData = {
        ...formData,
        parking: !!formData.parking, // Ensure boolean value for parking
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        squareFeet: Number(formData.squareFeet),
        regularPrice: formData.type === 'rent' ? Number(formData.regularPrice) : null,
        sellingPrice: formData.type === 'sell' ? Number(formData.sellingPrice) : null,
        images: uploadedImages, // Pass uploaded image paths
        isPublished: true, // Automatically mark the listing as published
      };

      // Insert data into the avatars table
      const { error: dbError } = await supabase
        .from('avatars') // Use the correct table name
        .insert([validatedData]);

      if (dbError) {
        console.error('Error inserting data into the database:', dbError.message || dbError);
        alert(`Failed to save and publish the listing: ${dbError.message || 'Unknown error'}`);
        return;
      }

      alert('Listing saved and published successfully!');
      router.push('/'); // Redirect to the home page or another relevant page
    } catch (error) {
      console.error('Unexpected error occurred:', error.message || error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <main className="px-10 md:px-36 my-10">
      <h1 className="font-bold text-2xl">Enter Details About Your Listing</h1>
      <form
        className="p-8 rounded-lg shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          setShowDialog(true); // Open confirmation dialog
        }}
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border p-3 rounded-lg"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            placeholder="Description"
            id="description"
            className="border p-3 rounded-lg"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border p-3 rounded-lg"
            required
            value={formData.address}
            onChange={handleChange}
          />

          {/* Radio Buttons for Rent/Sell */}
          <div className="flex gap-6 flex-wrap">
            <label className="flex gap-2">
              <input
                type="radio"
                name="type"
                value="sell"
                onChange={() => setFormData({ ...formData, type: 'sell' })}
                checked={formData.type === 'sell'}
              />
              Sell
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="type"
                value="rent"
                onChange={() => setFormData({ ...formData, type: 'rent' })}
                checked={formData.type === 'rent'}
              />
              Rent
            </label>
          </div>

          {/* Number Fields */}
          <input
            type="number"
            placeholder="Bedrooms"
            id="bedrooms"
            min="1"
            max="10"
            className="border p-3 rounded-lg"
            required
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Bathrooms"
            id="bathrooms"
            min="1"
            max="10"
            className="border p-3 rounded-lg"
            required
            value={formData.bathrooms}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Built-In Area"
            id="builtInArea"
            className="border p-3 rounded-lg"
            required
            value={formData.builtInArea}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Square Feet"
            id="squareFeet"
            min="1"
            className="border p-3 rounded-lg"
            required
            value={formData.squareFeet}
            onChange={handleChange}
          />

          {formData.type === 'sell' && (
            <input
              type="number"
              placeholder="Selling Price"
              id="sellingPrice"
              min="1000"
              required
              className="border p-3 rounded-lg"
              value={formData.sellingPrice}
              onChange={handleChange}
            />
          )}
          {formData.type === 'rent' && (
            <input
              type="number"
              placeholder="Regular Price"
              id="regularPrice"
              min="500"
              required
              className="border p-3 rounded-lg"
              value={formData.regularPrice}
              onChange={handleChange}
            />
          )}

          <input
            type="number"
            placeholder="Parking Spaces"
            id="parking"
            min="0"
            max="10"
            className="border p-3 rounded-lg"
            required
            value={formData.parking}
            onChange={handleChange}
          />
          <div>
            <FileUpload setImages={setUploadedImages} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg uppercase hover:opacity-95"
          >
            Save and Publish
          </button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold">Do you really want to publish this listing?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Once published, your listing will be visible to all users.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowDialog(false)} // Close dialog
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  setShowDialog(false); // Close dialog
                  publishBtnHandler(); // Run publish handler
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}