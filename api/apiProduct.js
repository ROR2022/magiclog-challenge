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

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${hostURL}/api/product/${productId}`);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error getProductById:..", error);

    return error.response;
  }
};

export const updateProduct = async (productId, data) => {
  try {
    const response = await axios.patch(
      `${hostURL}/api/product/${productId}`,
      data,
    );

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error updateProduct:..", error);

    return error.response;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${hostURL}/api/product/${productId}`);

    return response;
  } catch (error) {
    //eslint-disable-next-line
    console.log("error deleteProduct:..", error);

    return error.response;
  }
};
