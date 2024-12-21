import axios from "axios";

import { hostURL } from "../dataEnv/dataEnv";

export const createProduct = async (data) => {
  try {
    const response = await axios.post(`${hostURL}/api/product`, data);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error createProduct:..", error);

    return error.response;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${hostURL}/api/product`);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error getProducts:..", error);

    return error.response;
  }
};

export const getProductsByVendorId = async (productId) => {
  try {
    const response = await axios.get(
      `${hostURL}/api/product/vendor/${productId}`,
    );

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error getProductsByVendorId:..", error);

    return error.response;
  }
};
