import { title } from "@/components/primitives";
import Orders from "@/components/Orders/Orders";

export default function BlogPage() {
  return (
    <div>
      <h2 className={title()}>Orders</h2>
      <Orders />
    </div>
  );
}
