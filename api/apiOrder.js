import axios from "axios";

import { hostURL } from "../dataEnv/dataEnv";

export const createOrder = async (data) => {
  try {
    const response = await axios.post(`${hostURL}/api/order`, data);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error createOrder:..", error);

    return error.response;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${hostURL}/api/order`);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error getOrders:..", error);

    return error.response;
  }
};

export const getOrdersByCustomerId = async (id) => {
  try {
    const response = await axios.get(`${hostURL}/api/order/customer/${id}`);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error getOrdersByCustomerId:..", error);

    return error.response;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${hostURL}/api/order/${id}`);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error getOrderById:..", error);

    return error.response;
  }
};