import { title } from "@/components/primitives";
import Cart from "@/components/Cart/Cart";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className={title()}>Shopping Cart</h2>
      <Cart />
    </div>
  );
}
