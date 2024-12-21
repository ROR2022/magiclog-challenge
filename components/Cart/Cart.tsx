"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";

import { IProduct } from "../Product/CreateProduct";

import ProductCart from "./ProductCart";

import { LOCALSTORAGE_CART, LOCALSTORAGE_KEY } from "@/dataEnv/dataEnv";
import { createOrder } from "@/api/apiOrder";
import { DataUser, initialState } from "@/redux/userSlice";

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useLocalStorage<IProduct[]>(LOCALSTORAGE_CART, []);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [storedDataUser] = useLocalStorage<DataUser>(
    LOCALSTORAGE_KEY,
    initialState
  );

  useEffect(() => {
    //console.log("data Cart: ", cart);
    if (cart.length > 0) {
      const total = cart.reduce((acc, item) => acc + item.price * item.cont, 0);

      setTotal(Number(total.toFixed(2)));
    } else {
      setTotal(0);
    }
  }, [cart]);

  const handleCheckout = async () => {
    console.log("Checkout: ", total);
    try {
      setLoading(true);
      const data = {
        customerId: storedDataUser._id,
        products: [...cart],
        total,
      };
      const response = await createOrder(data);

      console.log("Response Checkout: ", response);
      setCart([]);
      setLoading(false);
      router.push("/orders");
    } catch (error) {
      console.log("Error Checkout: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4 justify-start">
      <Button color="danger" size="sm" onPress={() => setCart([])}>
        Empty Cart
      </Button>
      {cart.map((product) => (
        <ProductCart key={product._id} dataProduct={product} />
      ))}
      <div className="flex flex-row justify-end gap-3 mt-2">
        <h3>Total: ${total}</h3>

        <Button color="primary" size="sm" onPress={handleCheckout}>
          {loading ? (
            <CircularProgress aria-label="checkout button..." />
          ) : (
            "Checkout"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
