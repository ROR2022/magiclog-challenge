"use client";
import dynamic from "next/dynamic";

import { title } from "@/components/primitives";
//import Catalog from "@/components/Catalog/Catalog";
const Catalog = dynamic(() => import("@/components/Catalog/Catalog"), {
  ssr: false,
});

export default function AboutPage() {
  return (
    <div>
      <div className="flex justify-center">
        <h2 className={title()}>Catalogo</h2>
      </div>
      <Catalog />
    </div>
  );
}
