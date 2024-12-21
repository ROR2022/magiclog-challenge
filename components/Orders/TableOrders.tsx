import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { IOrder } from "./Orders";

interface TableOrdersProps {
  dataOrders: Array<IOrder>;
}

const columns = [
  { key: "customerId", label: "Customer ID" },
  { key: "products", label: "Products" },
  { key: "total", label: "Total" },
  { key: "details", label: "Details" },
];

const TableOrders: FC<TableOrdersProps> = ({ dataOrders }) => {
  const [rows, setRows] = useState<Array<any>>([]);
    const router = useRouter();

  useEffect(() => {
    parseDataOrders();
  }, [dataOrders]);

  const parseDataOrders = () => {
    if (dataOrders.length === 0) return;

    const rowsTemp = dataOrders.map((order) => {
      return {
        key: order._id,
        customerId: order.customerId,
        products: order.products.map((product) => product.name).join(", "),
        total: order.total,
      };
    });

    setRows([...rowsTemp]);
  };

  const handleDetails = (order: any) => {
    console.log("showDetails: ", order);
    router.push(`/details?id=${order.key}`);
  };

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              if (columnKey === "details") {
                return (
                  <TableCell>
                    <Button onPress={() => handleDetails(item)}>Details</Button>
                  </TableCell>
                );
              } else {
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableOrders;
