"use client";

import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 h-full w-full pt-5 items-center">
      <Loader />
      <h2>Loading...</h2>
    </div>
  );
}
