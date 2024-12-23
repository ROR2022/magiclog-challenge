"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Input,
  Slider,
} from "@nextui-org/react";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import React, { FC, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSelector } from "react-redux";

import { getVendorsNames } from "@/api/apiUser";
import { getProductsByFilter } from "@/api/apiProduct";
import { DataUser, RootState } from "@/redux/userSlice";

export type TFilter = {
  query?: string;
  price?: number;
  vendorId?: string;
};

export type Tvendor = {
  label: string;
  key: string;
};

const initDataFilter: TFilter = {
  query: "",
  price: 0,
  vendorId: "",
};

interface IFilterProducts {
  setProducts: (products: any) => void;
  fetchProducts: () => void;
}

const FilterProducts: FC<IFilterProducts> = ({
  setProducts,
  fetchProducts,
}) => {
  //const isMobile = useMediaQuery("(max-width: 840px)");
  const user: DataUser = useSelector((state: RootState) => state.user);
  const isMobile = useMediaQuery("(max-width: 840px)");
  const [vendors, setVendors] = useState<Array<Tvendor>>([]);
  const [dataFilter, setDataFilter] = useState<TFilter>(initDataFilter);
  const [noFilter, setNoFilter] = useState<string>("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await getVendorsNames();
      const { data, error } = response;

      if (data && !error) {
        console.log("dataVendors: ", data);
        const tempData = data.map((vendor: any) => {
          return {
            label: vendor.name,
            key: vendor._id,
          };
        });

        setVendors([...tempData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field: string, data: any) => {
    setDataFilter({
      ...dataFilter,
      [field]: data,
    });
  };

  const handleSearch = async () => {
    if (
      dataFilter.query === "" &&
      dataFilter.price === 0 &&
      dataFilter.vendorId === ""
    ) {
      console.log("No filter applied");
      setNoFilter("No filter applied");
      setTimeout(() => {
        setNoFilter("");
      }, 2000);
      return;
    }
    //console.log("Searching...", dataFilter);
    try {
      const response = await getProductsByFilter(dataFilter);
      const { data, error } = response;

      if (data && !error) {
        console.log("Products: ", data);
        setProducts(data);
      }
    } catch (error) {
      console.log("error searching products: ", error);
    }
  };

  const handleReset = () => {
    setDataFilter(initDataFilter);
    fetchProducts();
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div
            className={
              isMobile
                ? "flex flex-col justify-center items-center gap-3"
                : "flex flex-row justify-between"
            }
          >
            <div>
              <Input
                aria-hidden="true"
                label="Search Products"
                placeholder="Search by Name or SKU..."
                value={dataFilter.query}
                onValueChange={(data) => handleChange("query", data)}
              />
            </div>
            <div>
              <Slider
                className="max-w-md"
                defaultValue={0.4}
                label="Price Range: $"
                maxValue={1000}
                minValue={0}
                step={0.01}
                value={dataFilter.price}
                onChange={(data) => handleChange("price", data)}
              />
            </div>
            {user?.roles?.includes("admin") && (
              <div>
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={vendors}
                  label="Select Vendor"
                  placeholder="Select Vendor"
                  selectedKey={dataFilter.vendorId}
                  onSelectionChange={(data) => handleChange("vendorId", data)}
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            )}

            <div
              className={
                noFilter
                  ? "flex flex-col gap-3"
                  : "flex flex-col items-center justify-center gap-3"
              }
            >
              <div className="flex items-center flex-row gap-2">
                <Button color="primary" size="sm" onPress={handleSearch}>
                  <IoMdSearch />
                </Button>
                <Button color="warning" size="sm" onPress={handleReset}>
                  <IoMdClose />
                </Button>
              </div>
              {noFilter && (
                <div className="text-red-500 text-sm">{noFilter}</div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FilterProducts;
