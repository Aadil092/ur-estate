import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function FileUpload({ listingId }) {
  const [imagePreview, setImagePreview] = useState([]); // Preview for selected images
  const [uploadedFiles, setUploadedFiles] = useState([]); // Files to be uploaded
  const [loading, setLoading] = useState(false); // Loading state

  // Handle file selection and preview generation
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreview((prev) => [...prev, ...previews]); // Add previews to the existing state
    setUploadedFiles((prev) => [...prev, ...files]); // Add files to the existing state
  };

  // Remove an image from the preview and files
  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index)); // Remove from previews
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index)); // Remove from files
  };

  // Handle image upload to Supabase storage and insertion into the database
  const handleUpload = async () => {
    try {
      if (!listingId) {
        toast.error("Listing ID is required to upload images.");
        return;
      }

      setLoading(true);

      for (const file of uploadedFiles) {
        const fileName = `${Date.now()}_${file.name}`; // Unique file name
        const fileExt = file.name.split(".").pop();

        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("listingimages")
          .upload(fileName, file, {
            contentType: `image/${fileExt}`, // Set appropriate content type
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError.message);
          toast.error(`Failed to upload ${file.name}: ${uploadError.message}`);
          continue;
        }

        // Generate public URL for the image
        const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${fileName}`;

        // Insert image URL and listing_id into the database
        const { error: dbError } = await supabase
          .from("listingimages")
          .insert([{ url: imageUrl, listing_id: listingId }]);

        if (dbError) {
          console.error("Error inserting image URL into database:", dbError.message);
          toast.error(`Failed to save image in database: ${dbError.message}`);
          continue;
        }
      }

      toast.success("Images uploaded and associated with the listing successfully!");
      setImagePreview([]); // Clear previews
      setUploadedFiles([]); // Clear selected files
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* File Input for Image Selection */}
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-full h-8 mb-4 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG, or GIF (MAX. 800x400px)
          </p>
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

      {/* Image Previews with Remove Option */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {imagePreview.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              width={150}
              height={150}
              alt={`Preview ${index}`}
              className="rounded-lg object-cover h-[100px] w-[100px]"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-sm hover:bg-red-400"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        className="mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-400 focus:ring-2 focus:ring-purple-600"
        onClick={handleUpload}
        disabled={loading || !uploadedFiles.length}
      >
        {loading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}

export default FileUpload;