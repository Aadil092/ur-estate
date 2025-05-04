import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function FileUpload() {
  const [imagePreview, setImagePreview] = useState([]); // Preview for selected images
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files
  const [loading, setLoading] = useState(false); // Loading state
  const [listingId, setListingId] = useState(null); // New listing ID

  // Create a new listing when the component initializes
  useEffect(() => {
    const createNewListing = async () => {
      const { data, error } = await supabase
        .from("listing")
        .insert({})
        .select("id")
        .single(); // Insert a new listing and fetch its ID

      if (error) {
        console.error("Error creating new listing:", error.message);
        return;
      }

      if (data && data.id) {
        setListingId(data.id); // Set the new listing ID
      }
    };

    createNewListing();
  }, []);

  // Handle file selection and preview generation
  const handleFileUpload = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // Handle file upload to Supabase (Store file in bucket and URL in DB)
  const uploadFiles = async () => {
    if (!listingId) {
      alert("Listing ID not found. Try again later.");
      return;
    }

    setLoading(true);
    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const filePath = `${Date.now()}_${file.name}`;

        // Upload image file to Supabase storage bucket
        const { data, error } = await supabase.storage
          .from("listingimages")
          .upload(filePath, file);

        if (error) {
          console.error("Error uploading file:", error.message);
          alert("Error uploading file. Please try again.");
          return null;
        }

        // Construct file URL
        const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listingimages/${filePath}`;

        // Insert file URL into listingimages table
        const { error: insertError } = await supabase
          .from("listingimages")
          .insert({
            listing_id: listingId,
            url: fileUrl,
          });

        if (insertError) {
          console.error("Error inserting file URL into database:", insertError.message);
          alert("Error saving file URL to the database. Please try again.");
          return null;
        }

        console.log("File uploaded and URL saved successfully:", fileUrl);
        return fileUrl;
      });

      await Promise.all(uploadPromises);
      alert("All files uploaded successfully!");
    } catch (error) {
      console.error("Error during upload:", error.message);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* File Input */}
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-800"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 800x400px)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple
          accept="image/png, image/jpeg, image/gif"
          onChange={handleFileUpload}
        />
      </label>

      {/* Image Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {imagePreview.map((image, index) => (
          <div key={index} className="relative">
            <Image src={image} width={150} height={150} alt={`Preview ${index}`} className="rounded-lg object-cover" />
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        className="mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-400"
        onClick={uploadFiles}
        disabled={loading || !listingId}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Display Listing ID */}
      {listingId ? (
        <p className="mt-4 text-gray-500">New Listing ID: {listingId}</p>
      ) : (
        <p className="mt-4 text-red-500">No listing ID created yet!</p>
      )}
    </div>
  );
}

export default FileUpload;