"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/progress";

import ProductCard from "../Product/ProductCard";
import { IProduct } from "../Product/CreateProduct";

import { getProducts } from "@/api/apiProduct";

const Catalog = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      const { data, error } = response;

      if (data && !error) {
        //console.log("Products: ", data);
        setProducts(data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {loading && <CircularProgress aria-label="spinner..." />}
      <div className="flex flex-row flex-wrap justify-center gap-3 mt-4">
        {products.map((product) => (
          <ProductCard key={product._id} dataProduct={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
