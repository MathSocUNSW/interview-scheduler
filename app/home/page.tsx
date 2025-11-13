"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

function page() {
  const { data: session } = useSession();

  const handleLogoutGoogle = (e: any) => {
    e.preventDefault();

    signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <button
        className="bg-red-500 px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-red-600"
        onClick={handleLogoutGoogle}
      >
        Log Out
      </button>
      <div className="flex flex-row gap-x-2 items-center rounded-md p-2 mt-auto mb-4 hover:bg-zinc-50/10 hover:cursor-pointer transition-colors">
        {/* {session?.user?.image && (
          <Image
            src={session.user?.image}
            alt="Profile"
            width={30}
            height={30}
            className="rounded-full"
          />
        )} */}
        Logged in as: {session?.user?.name && <p>{session.user?.name}</p>}
      </div>
    </div>
  );
}

export default page;
