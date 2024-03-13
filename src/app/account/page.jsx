"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Account = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageData = localStorage.getItem("data");
      if (localStorageData) {
        setData(JSON.parse(localStorageData));
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  const handleLogOut = async () => {
    localStorage.clear();
    await router.push("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-3xl font-bold mb-4">User Page</h1>
      <p className="text-lg mb-2">
        Welcome, {data?.firstName} {data?.lastName}
      </p>
      <p className="text-lg mb-4">Email: {data?.email}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
