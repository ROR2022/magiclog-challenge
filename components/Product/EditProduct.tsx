"use client";
import React, { Suspense, useEffect, FC, useState } from "react";
import { useSearchParams } from "next/navigation";

import CreateProduct, { IProduct } from "./CreateProduct";

import { getProductById } from "@/api/apiProduct";

interface GetDataProductProps {
  setDataProduct: (dataProduct: any) => void;
}

const GetDataProduct: FC<GetDataProductProps> = ({ setDataProduct }) => {
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (id) {
      getDataProduct();
    }
  }, []);

  const getDataProduct = async () => {
    if (!id) return;
    try {
      //console.log("Get Product by id: ", id);
      const response = await getProductById(id);

      //console.log("Response Get Product: ", response);
      const { data, error } = response;

      if (data && !error) {
        setDataProduct(data);
      } else {
        console.log("Error Fetch Product: ", data);
      }
    } catch (error) {
      console.log("Error Fetch Product: ", error);
    }
  };

  return <div style={{ display: "none" }}>GetDataProduct</div>;
};

const EditProduct = () => {
  const [dataProduct, setDataProduct] = useState<IProduct | null>(null);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <GetDataProduct setDataProduct={setDataProduct} />
      </Suspense>
      {dataProduct && <CreateProduct dataProduct={dataProduct} />}
    </div>
  );
};

export default EditProduct;
