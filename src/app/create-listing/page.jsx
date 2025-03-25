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
    parking: '', // Boolean field
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = {
        ...formData,
        parking: !!formData.parking, // Ensure boolean value for parking
        bedrooms: Number(formData.bedrooms), // Ensure numeric value for bedrooms
        bathrooms: Number(formData.bathrooms), // Ensure numeric value for bathrooms
        squareFeet: Number(formData.squareFeet), // Ensure numeric value for square feet
        regularPrice: formData.type === 'rent' ? Number(formData.regularPrice) : null, // Null if not 'rent'
        sellingPrice: formData.type === 'sell' ? Number(formData.sellingPrice) : null, // Null if not 'sell'
      };

      // Insert data into the 'avatars' table
      const { error: dbError } = await supabase
        .from('avatars') // Replace 'avatars' with your table name
        .insert([validatedData]);

      if (dbError) {
        console.error('Error inserting data into the database:', dbError);
        alert('Failed to create listing. Please try again.');
        return;
      }

      alert('Listing created successfully!');
      router.push('/'); // Redirect to the home page or another relevant page
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <main className="px-10 md:px-36 my-10">
      <h1 className="font-bold text-2xl">Enter Details About Your Listing</h1>
      <form className="p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
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
          
          <h2>Bedrooms</h2>
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

          <div>
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
          </div>

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
            <FileUpload setImages={setUploadedImages}/>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}