'use client';

import { useState } from 'react';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    builtInArea: '',
    squareFeet: '',
    regularPrice: 50,
    parking: false,
    imageUrls: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (id === 'sell' || id === 'rent') {
        setFormData({ ...formData, type: id });
      } else {
        setFormData({ ...formData, [id]: checked });
      }
    } else if (id === 'images') {
      setSelectedFiles(e.target.files);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    // Simulate upload process (replace with actual upload logic)
    const uploadedUrls = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));

    setFormData({ ...formData, imageUrls: uploadedUrls });
    alert('Images uploaded successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
          <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' required onChange={handleChange} value={formData.name} />
          <textarea placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description} />
          <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required onChange={handleChange} value={formData.address} />

          <div className='flex gap-6 flex-wrap'>
            <label className='flex gap-2'>
              <input type='checkbox' id='sell' onChange={handleChange} checked={formData.type === 'sell'} />
              Sell
            </label>
            <label className='flex gap-2'>
              <input type='checkbox' id='rent' onChange={handleChange} checked={formData.type === 'rent'} />
              Rent
            </label>
            <label className='flex gap-2'>
              <input type='checkbox' id='parking' onChange={handleChange} checked={formData.parking} />
              Parking
            </label>
          </div>

          <div className='flex flex-wrap gap-6'>
            <label className='flex items-center gap-2'>
              <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border rounded-lg' onChange={handleChange} value={formData.bedrooms} />
              Beds
            </label>
            <label className='flex items-center gap-2'>
              <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border rounded-lg' onChange={handleChange} value={formData.bathrooms} />
              Baths
            </label>
            <label className='flex items-center gap-2'>
              <input type='text' id='builtInArea' required className='p-3 border rounded-lg' onChange={handleChange} value={formData.builtInArea} />
              Built-in Area
            </label>
            <label className='flex items-center gap-2'>
              <input type='number' id='squareFeet' min='1' required className='p-3 border rounded-lg' onChange={handleChange} value={formData.squareFeet} />
              Square Feet
            </label>
            <label className='flex items-center gap-2'>
              <input type='number' id='regularPrice' min='50' max='10000000' required className='p-3 border rounded-lg' onChange={handleChange} value={formData.regularPrice} />
              Regular Price ($ / month)
            </label>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:</p>
          <div className='flex gap-4'>
            <input className='p-3 border rounded w-full' type='file' id='images' accept='image/*' multiple onChange={handleChange} />
            <button type='button' onClick={handleUpload} className='p-3 bg-green-600 text-white rounded-lg uppercase hover:opacity-95'>
              Upload
            </button>
          </div>

          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95' type='submit'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}