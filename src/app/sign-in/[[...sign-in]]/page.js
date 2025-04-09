import Head from "next/head";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign In |Real Estate Managment</title>
      </Head>
      <div className="flex items-center justify-center p-3">
        <SignIn />
      </div>
    </>
  );
}