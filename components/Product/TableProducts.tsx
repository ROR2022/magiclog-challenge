import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

import { deleteProduct } from "@/api/apiProduct";

export type DataModalType = {
  title: string;
  message: string;
  action: string;
  payload?: any;
};

interface TableProductsProps {
  rows: any[];
  columns: any[];
  fetchDataProducts: () => void;
}

const TableProducts: FC<TableProductsProps> = ({
  rows,
  columns,
  fetchDataProducts,
}) => {
  const [dataModal, setDataModal] = useState<DataModalType | null>(null);
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    //console.log("dataModal: ", dataModal);

    if (dataModal?.action === "Confirmed") {
      onDeleteProduct();
    }
  }, [dataModal]);

  const onDeleteProduct = async () => {
    try {
      console.log("Deleting product");
      const response = await deleteProduct(dataModal?.payload);
      //console.log("Response Delete Product: ", response);
      const { data, error } = response;

      if (data && !error) {
        console.log("Product Deleted Successfully: ");
        fetchDataProducts();
      } else {
        console.log("Error Delete Product: ", data);
      }
      setDataModal(null);
    } catch (error) {
      console.log("Error Delete Product: ", error);
    }
  };

  const handleDeleteProduct = (product: any) => {
    //console.log("Delete product", product);
    setDataModal({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      action: "Delete",
      payload: product._id,
    }); // Open modal
  };

  const handleEditProduct = (product: any) => {
    //console.log("Edit product", product);
    router.push(`/editProduct?id=${product._id}`);
  };

  return (
    <>
      {dataModal && dataModal.title !== "" && (
        <ConfirmModal dataModal={dataModal} setDataModal={setDataModal} />
      )}
      <div
        style={{
          overflow: "auto",
          width: isMobile ? "90vw" : "800px",
        }}
      >
        <Table aria-label="Table with dynamic products content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => {
                  if (columnKey === "Actions") {
                    return (
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            color="danger"
                            size="sm"
                            variant="bordered"
                            onPress={() => handleDeleteProduct(item)}
                          >
                            <FaRegTrashAlt />
                          </Button>
                          <Button
                            color="warning"
                            size="sm"
                            variant="bordered"
                            onPress={() => handleEditProduct(item)}
                          >
                            <FaRegEdit />
                          </Button>
                        </div>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    );
                  }
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableProducts;
