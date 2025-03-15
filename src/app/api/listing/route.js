import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Listing Schema
const listingSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  type: String,
  bedrooms: Number,
  bathrooms: Number,
  builtInArea: String,
  squareFeet: Number,
  regularPrice: Number,
  sellingPrice: Number,
  parking: Boolean,
  imageUrls: [String],
});

const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

// API Route for Creating a Listing
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const newListing = new Listing(data);
    await newListing.save();

    return NextResponse.json({ message: 'Listing created successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}