import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Website Logo */}
        <Link href="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">UR Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-4">
          <Link href="/">
            <li className="hidden md:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link href="/about">
            <li className="hidden md:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          {/* Add Listing Button */}
          <Link href="/create-listing">
            <button className="bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-800">
              Add Listing
            </button>
          </Link>

          {/* User Authentication */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <li className="hidden md:inline text-slate-700 hover:underline">
                Sign In
              </li>
            </Link>
          </SignedOut>
        </ul>
      </div>
    </header>
  );
}