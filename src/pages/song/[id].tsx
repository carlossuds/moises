import React from "react";
import { useParams } from "next/navigation";

export default function SongId() {
  const params = useParams();
  console.log({ params });
  return <div />;
}
