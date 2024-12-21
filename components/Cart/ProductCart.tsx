import React, { useEffect, useState, FC } from "react";
import { Button, User } from "@nextui-org/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

import { IProduct } from "../Product/CreateProduct";

import { LOCALSTORAGE_CART } from "@/dataEnv/dataEnv";

interface ProductCartProps {
  dataProduct: IProduct;
  isDetails?: boolean;
}

const ProductCart: FC<ProductCartProps> = ({ dataProduct, isDetails }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { stock } = dataProduct;
  const [cart, setCart] = useLocalStorage<IProduct[]>(LOCALSTORAGE_CART, []);
  const [cont, setCont] = useState(
    isDetails
      ? dataProduct.cont
      : cart.find((item) => item._id === dataProduct._id)?.cont || 0
  );

  useEffect(() => {}, [cart]);

  const handleAddToCart = () => {
    const isProductInCart = cart.find((item) => item._id === dataProduct._id);

    if (isProductInCart && isProductInCart.cont === stock) return;

    if (isProductInCart) {
      const newCart = cart.map((item) => {
        if (item._id === dataProduct._id) {
          return { ...item, cont: item.cont + 1 };
        }

        return item;
      });

      setCart(newCart);
      setCont(cont + 1);

      return;
    } else {
      const product = { ...dataProduct, cont: 1 };
      const newCart = [...cart, product];

      setCont(cont + 1);
      setCart(newCart);
    }
  };

  const handleRemoveFromCart = () => {
    if (cont === 0) return;

    const isProductInCart = cart.find((item) => item._id === dataProduct._id);

    if (!isProductInCart) return;

    if (isProductInCart) {
      const newCart = cart.map((item) => {
        if (item._id === dataProduct._id) {
          return { ...item, cont: item.cont - 1 };
        }

        return item;
      });

      setCart(newCart);
      setCont(cont - 1);

      return;
    } else {
      const product = { ...dataProduct, cont: 1 };
      const newCart = cart.filter((item) => item._id !== product._id);

      if (product.cont > 0) {
        newCart.push(product);
      }

      setCart(newCart);
      setCont(cont - 1);
    }
  };

  return (
    <div
      className={
        isMobile
          ? "border border-gray-200 p-4 rounded-lg flex flex-col items-center gap-3"
          : "border border-gray-200 p-4 rounded-lg flex justify-between items-start gap-3"
      }
      style={{ width: isMobile ? "100%" : "500px" }}
    >
      <User
        avatarProps={{
          src: dataProduct.imageUrl,
          alt: dataProduct.name,
          size: "lg",
        }}
        description={`Price: $${dataProduct.price}`}
        name={dataProduct.name}
      />
      <div className="flex flex-col gap-3">
        {!isDetails && (
          <div className="flex justify-between items-center w-full my-2 gap-3">
            <Button
              color="danger"
              disabled={cont === 0}
              size="sm"
              onPress={handleRemoveFromCart}
            >
              <FaMinus />
            </Button>
            <p>{cont}</p>
            <Button color="success" size="sm" onPress={handleAddToCart}>
              <FaPlus />
            </Button>
          </div>
        )}
        {isDetails && <p>Quantity: {cont}</p>}
        <p>Sub-total: ${dataProduct.price * cont}</p>
      </div>
    </div>
  );
};

export default ProductCart;
