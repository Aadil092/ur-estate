"use client"
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Website Logo */}
        <Link href="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500 font-stretch-ultra-expanded">Real Estate</span>
            <span className="text-slate-700 font-stretch-ultra-expanded">Managment</span>
          </h1>
        </Link>

        

        <ul className="flex gap-5">

           {/* Add Listing Button */}
           <Link href="/create-listing">
            <button className="bg-slate-700 text-white py-2 px-6 rounded-lg hover:bg-slate-800 from-neutral-200 font-semibold">
              Add Listing
            </button>
          </Link>

          <Link href="/admin-panel">
            <button className="bg-slate-200 text-slate-700 py-2 px-6 hover:bg-white from-neutral-900 font-semibold">Admin Panel</button>
          </Link>
          

         
          {/* Show UserButton only if signed in */}
          {isSignedIn && (
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          )}

          {/* Show Sign In option if signed out */}
          <SignedOut>
            <Link href="/sign-in">
              <button className="bg-slate-200 text-slate-700 py-2 px-6 hover:bg-white from-neutral-900 font-semibold">Sign In</button>
            </Link>
          </SignedOut>
        </ul>
      </div>
    </header>
  );
}