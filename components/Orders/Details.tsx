"use client";
import React, { FC, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductCart from "../Cart/ProductCart";

import { IOrder } from "./Orders";

import { getOrderById } from "@/api/apiOrder";
//import { get } from "http";

interface DetailsProps {
  dataOrder: IOrder;
}

const SuspenseDetails = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShowDetails />
    </Suspense>
  );
};

const ShowDetails = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const [dataOrder, setDataOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    //console.log("params: ", params.get("id"));
    if (id) {
      getDataOrder();
    }
  }, []);

  const getDataOrder = async () => {
    try {
      const response = await getOrderById(id);

      console.log("Response dataOrder: ", response);
      const { data, error } = response;

      if (data && !error) {
        setDataOrder(data);
      }
    } catch (error) {
      console.log("Error Fetch Order: ", error);
    }
  };

  return <div>{dataOrder && <Details dataOrder={dataOrder} />}</div>;
};

const Details: FC<DetailsProps> = ({ dataOrder }) => {
  return (
    <div>
      Order Details
      <div className="my-4 flex flex-col gap-3">
        {dataOrder.products.map((product) => (
          <ProductCart
            key={product._id}
            dataProduct={product}
            isDetails={true}
          />
        ))}
      </div>
      <p>Total: ${dataOrder.total}</p>
    </div>
  );
};

export default SuspenseDetails;
