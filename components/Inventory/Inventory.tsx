"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import TableProducts from "../Product/TableProducts";

import { DataUser, RootState } from "@/redux/userSlice";
import { getProducts, getProductsByVendorId } from "@/api/apiProduct";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "sku",
    label: "SKU",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "stock",
    label: "STOCK",
  },
  {
    key: "Actions",
    label: "ACTIONS",
  },
];

const Inventory = () => {
  const router = useRouter();
  const user: DataUser = useSelector((state: RootState) => state.user);
  const [dataProducts, setDataProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user._id) {
      router.push("/login");
    }

    if (!user.roles?.includes("seller") && !user.roles?.includes("admin")) {
      router.push("/");
    }

    fetchDataProducts();
  }, [user]);

  const fetchDataProducts = async () => {
    if (!user._id) return;
    try {
      let response = null;

      if (user.roles?.includes("admin")) {
        response = await getProducts();
      } else {
        response = await getProductsByVendorId(user._id);
      }

      const { data, error } = response;

      if (data && !error) {
        //console.log("dataProducts:", data);
        const tempData = data.map((product: any) => {
          return {
            ...product,
            key: product._id,
          };
        });

        setDataProducts([...tempData]);
      } else {
        console.error("Error fetching products", data);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Button color="primary" onClick={() => router.push("/createProduct")}>
          Create Product
        </Button>
      </div>
      <div className="mt-4 flex justify-center">
        {dataProducts.length > 0 && (
          <TableProducts
            columns={columns}
            fetchDataProducts={fetchDataProducts}
            rows={dataProducts}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
