import React, { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { useLocalStorage } from "usehooks-ts";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

import { IProduct } from "./CreateProduct";

import { LOCALSTORAGE_CART, LOCALSTORAGE_KEY } from "@/dataEnv/dataEnv";
import { DataUser, initialState } from "@/redux/userSlice";

interface ProductCardProps {
  dataProduct: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({ dataProduct }) => {
  const { name, imageUrl, sku, price, stock } = dataProduct;
  const [cart, setCart] = useLocalStorage<IProduct[]>(LOCALSTORAGE_CART, []);
  const [storedDataUser] = useLocalStorage<DataUser>(
    LOCALSTORAGE_KEY,
    initialState
  );
  const [cont, setCont] = useState(
    cart.find((item) => item._id === dataProduct._id)?.cont || 0
  );

  useEffect(() => {
    const product = cart.find((item) => item._id === dataProduct._id);

    if (product) {
      setCont(product.cont);
    }
  }, [cart]);

  useEffect(() => {}, [cont]);

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
    <Card
      className="py-4"
      style={{ border: "1px solid #eaeaea", width: "300px" }}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Product: {name}</p>
        <p className="text-default-500">Price: ${price}</p>
        <small className="text-default-500">Stock: {stock}</small>
        <h4 className="font-bold text-large">{sku}</h4>
        {storedDataUser.email && (
          <div className="flex justify-between items-center w-full my-2">
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
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex justify-center items-center">
        <div className="w-full rounded-xl flex justify-center items-center">
          <Image
            alt={`Image of ${name}`}
            src={imageUrl ? imageUrl : "/logoHelp.png"}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
