"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import {
  Button,
  Card,
  CardBody,
  CircularProgress,
  Input,
  Image,
} from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";

import { title } from "../primitives";

import { DataUser, RootState } from "@/redux/userSlice";
import { createProduct } from "@/api/apiProduct";

export  interface IProduct {
  _id?: string;
  vendorId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  imageUrl: string;
  cont: number;
}

const initFormValues = {
  vendorId: "",
  name: "",
  sku: "",
  price: 0,
  stock: 0,
};

const validationSchema = Yup.object({
  vendorId: Yup.string(),
  name: Yup.string().required("Name is required"),
  sku: Yup.string().required("SKU is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  stock: Yup.number()
    .typeError("Price must be a number")
    .integer("Stock must be an integer")
    .required("Stock is required"),
});

const CreateProduct = () => {
  const formik = useFormik({
    initialValues: initFormValues,
    validationSchema: validationSchema,
    onSubmit: async (dataValues) => {
      //console.log(values);
      onSubmitProduct(dataValues);
    },
  });
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  const isMobile = useMediaQuery("(max-width: 640px)");
  const user: DataUser = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageProduct, setImageProduct] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("Create Product", user);
    if (user._id) {
      formik.setValues({ ...values, vendorId: user._id });
    }
  }, [user]);

  const onSubmitProduct = async (dataValues: any) => {
    console.log("submiting product values: ", dataValues);
    try {
      let formData = null;

      setLoading(true);
      if (imageProduct) {
        formData = new FormData();
        formData.append("file", imageProduct);
        formData.append("imageUrl", "");
        formData.append("cont", "0");
        for (let key in values) {
          formData.append(key, dataValues[key]);
        }
      } else {
        formData = {
          ...dataValues,
          imageUrl: "",
          cont: 0,
        };
      }
      const resCreateProduct = await createProduct(formData);
      const { data, error } = resCreateProduct;

      if (data && !error) {
        console.log("Product created: ", data);
        router.push("/");
      }else{
        console.log("Error on create product: ", data);
      }
    } catch (error) {
      console.log("Error on create product: ", error);
    }
  };

  const handleChangeImage = (e: any) => {
    setImageProduct(e.target.files[0]);
  };
  const handleClearImage = () => {
    setImageProduct(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className={title()}> Create Product </h2>
      <Card className="mt-3" style={{ width: isMobile ? "100%" : "500px" }}>
        {/* <h2 className="text-3xl font-bold mb-4 text-center">Login</h2> */}
        <CardBody>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              disabled
              label="Vendor Id"
              name="vendorId"
              placeholder="Vendor Id"
              value={values.vendorId}
            />
            <Input
              label="Product Name"
              name="name"
              placeholder="Product Name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <div className="text-purple-600 text-sm opacity">
                {errors.name}
              </div>
            )}
            <Input
              label="Product SKU"
              name="sku"
              placeholder="Product SKU"
              value={values.sku}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.sku && touched.sku && (
              <div className="text-purple-600 text-sm opacity">
                {errors.sku}
              </div>
            )}
            <Input
              label="Product Price"
              name="price"
              placeholder="Product Price"
              value={String(values.price)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.price && touched.price && (
              <div className="text-purple-600 text-sm opacity">
                {errors.price}
              </div>
            )}
            <Input
              label="Product Stock"
              name="stock"
              placeholder="Product Stock"
              value={String(values.stock)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.stock && touched.stock && (
              <div className="text-purple-600 text-sm opacity">
                {errors.stock}
              </div>
            )}
            <label
              className="py-2 relative cursor-pointer rounded-md bg-slate-300 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-white hover:bg-slate-400"
              htmlFor="file-upload"
            >
              <div className="ps-3">Seleccionar Imagen</div>
              <input
                className="sr-only"
                id="file-upload"
                name="file-upload"
                type="file"
                value={""}
                onChange={handleChangeImage}
              />
            </label>
            <div className="text-sm text-gray-500">
              {imageProduct ? (
                <div className="flex items-center justify-center my-2 gap-2">
                  <Image
                    alt="user image"
                    className="rounded-full"
                    height={100}
                    src={URL.createObjectURL(imageProduct)}
                    width={100}
                  />
                  <FaRegTrashAlt
                    className="text-danger cursor-pointer"
                    onClick={handleClearImage}
                  />
                </div>
              ) : (
                <span className="text-xs ps-2">
                  No se ha seleccionado ninguna imagen
                </span>
              )}
            </div>
            <Button color="primary" type="submit">
              {loading ? (
                <div className="text-white">
                  <CircularProgress aria-label="Loading..." />
                </div>
              ) : (
                "Create Product"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateProduct;
