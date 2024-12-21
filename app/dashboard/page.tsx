import { title } from "@/components/primitives";
import Catalog from "@/components/Catalog/Catalog";

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
