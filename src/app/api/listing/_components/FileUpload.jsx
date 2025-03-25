'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function FileUpload({ setImages }) {
  const [imagePreview, setImagePreview] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChoose = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Validate selected files
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...validFiles]); // Add new files to state
    setImagePreview((prevPreviews) => [...prevPreviews, ...previews]); // Add new previews to state
  };

  const handleFileRemove = (index) => {
    // Remove the file and its preview by index
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreview((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('No files selected for upload.');
      return;
    }

    try {
      setIsUploading(true);
      const uploadedPaths = [];

      for (const file of files) {
        const { data, error } = await supabase.storage
          .from('listing-image') // Replace with your bucket name
          .upload(`public/${Date.now()}_${file.name}`, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error('Error uploading file:', error.message);
          alert(`Failed to upload ${file.name}: ${error.message}`);
          continue;
        }

        uploadedPaths.push(data.path);
      }

      setImages(uploadedPaths); // Pass the paths to the parent component
      alert('Files uploaded successfully!');
      setFiles([]); // Clear the files after upload
      setImagePreview([]); // Clear the previews after upload
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred during file upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-input"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX: 10MB)</p>
          </div>
          <input
            id="file-input"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChoose}
          />
        </label>
      </div>

      {isUploading && <p>Uploading files... Please wait.</p>}

      {/* File Previews with Remove Option */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {imagePreview.map((url, index) => (
          <div key={index} className="relative group">
            <img src={url} alt={`Preview ${index}`} className="rounded-lg w-full h-auto" />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleFileRemove(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        type="button"
        className="mt-4 p-3 bg-blue-600 text-white rounded-lg uppercase hover:opacity-95"
        onClick={handleUpload}
      >
        Upload Files
      </button>
    </div>
  );
}

export default FileUpload;