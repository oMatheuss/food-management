import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigRight,
  ArrowBigRightDash,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Food } from "@/types/Food";

interface FoodDataTableProps {
  data: Food[];
}

const columnHelper = createColumnHelper<Food>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Nome",
    cell: (info) => <div className="w-80">{info.getValue()}</div>,
  }),
  columnHelper.accessor("calories", {
    header: "Calorias",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("carbs", {
    header: "Carboidrados",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("proteins", {
    header: "Proteinas",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("total_fat", {
    header: "Gorduras",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("satured_fat", {
    header: "Gorduras Saturadas",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fiber", {
    header: "Fibras",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sodium", {
    header: "Sal",
    cell: (info) => info.getValue(),
  }),
];

const FoodDataTable = ({ data }: FoodDataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1 disabled:text-gray-500"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowBigLeftDash />
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowBigLeft />
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowBigRight />
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ArrowBigRightDash />
        </button>
        <span className="flex items-center gap-1 mr-auto">
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="font-comfortaa">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  Mostrar {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default FoodDataTable;
