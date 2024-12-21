import { title } from "@/components/primitives";
import Cart from "@/components/Cart/Cart";

export default function PricingPage() {
  return (
    <div>
      <h2 className={title()}>Shopping Cart</h2>
      <Cart />
    </div>
  );
}
