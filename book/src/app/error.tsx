"use client"; // Error components must be Client components

import { useEffect } from "react";
import { Button } from "@mantine/core";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1 className="capitalize text-gray-800 text-xl">You Get Erroooooor</h1>
      <h2 className="capitalize mt-5 p-4 rounded bg-blue-700 text-gray-300 text-sm">
        {error.message}
      </h2>
      <Button
        className="bg-blue-600 mt-5 hover:bg-blue-600"
        onClick={() => reset()}
      >
        Try again Once!
      </Button>
    </div>
  );
}
