"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import { IProduct } from "../Product/CreateProduct";

import TableOrders from "./TableOrders";

import { LOCALSTORAGE_KEY } from "@/dataEnv/dataEnv";
import { DataUser, initialState } from "@/redux/userSlice";
import { getOrders, getOrdersByCustomerId } from "@/api/apiOrder";

export interface IOrder {
  _id?: string;
  customerId: string;
  products: Array<IProduct>;
  total: number;
}

const Orders = () => {
  const router = useRouter();
  const [dataOrders, setDataOrders] = useState<Array<IOrder>>([]);
  const [storedDataUser] = useLocalStorage<DataUser>(
    LOCALSTORAGE_KEY,
    initialState
  );

  useEffect(() => {
    if (storedDataUser.email) {
      fetchOrders();
    } else {
      router.push("/login");
    }
  }, [storedDataUser]);

  const fetchOrders = async () => {
    try {
      let response = null;

      if (storedDataUser.roles?.includes("admin")) {
        response = await getOrders();
      } else {
        response = await getOrdersByCustomerId(storedDataUser._id);
      }
      console.log("Response Orders: ", response);
      const { data, error } = response;

      if (data && !error) {
        setDataOrders(data);
      } else {
        console.log("Error Fetch Orders: ", data);
      }
    } catch (error) {
      console.log("Error Fetch Orders: ", error);
    }
  };

  return (
    <div className="mt-4">
      {dataOrders.length > 0 && <TableOrders dataOrders={dataOrders} />}
    </div>
  );
};

export default Orders;
