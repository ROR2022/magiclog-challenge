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
import { FC } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface TableProductsProps {
  rows: any[];
  columns: any[];
}

const TableProducts: FC<TableProductsProps> = ({ rows, columns }) => {
  const handleDeleteProduct = (product: any) => {
    console.log("Delete product", product);
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
              if (columnKey === "Actions") {
                return (
                  <TableCell>
                    <Button
                      color="danger"
                      size="sm"
                      variant="bordered"
                      onPress={() => handleDeleteProduct(item)}
                    >
                      <FaRegTrashAlt />
                    </Button>
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

export default TableProducts;
