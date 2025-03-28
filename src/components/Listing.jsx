import React, { useState } from "react";

// Component for individual listing items with toggled details
const ListingItem = ({ item }) => {
  // Local state to toggle the display of property details
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow mb-4">
      {/* Display the property image. If image_url is missing, show a placeholder */}
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={`Property ${item.id}`}
          className="w-full h-auto rounded mb-2"
        />
      ) : (
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded mb-2">
          <span>No Image Available</span>
        </div>
      )}

      {/* Button to toggle property details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {/* Only display the details when “Show Details” has been clicked */}
      {showDetails && (
        <div className="text-sm text-gray-700">
          <p>
            <strong>Price:</strong> Regular: {item.regularPrice} | Selling:{" "}
            {item.sellingPrice}
          </p>
          <p>
            <strong>Address:</strong> {item.address}
          </p>
          <p>
            <strong>Type:</strong> {item.type}
          </p>
          <p>
            <strong>Bathrooms:</strong> {item.bathrooms}
          </p>
          <p>
            <strong>Bedrooms:</strong> {item.bedrooms}
          </p>
          <p>
            <strong>Built-in Area:</strong> {item.builtInArea}
          </p>
          
          <p>
            <strong>Parking:</strong> {item.parking}
          </p>
        </div>
      )}
    </div>
  );
};

function Listing({ listing }) {
  return (
    <div>
      {listing && listing.length > 0 ? (
        listing.map((item) => <ListingItem key={item.id} item={item} />)
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
}

export default Listing;