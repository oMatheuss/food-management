import { NewMealFoods } from "@/types/Food";
import type { ColumnDef } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";

interface NewMealDataTableProps {
  foodsRef: React.MutableRefObject<NewMealFoods[]>;
}

type UpdateDataFunction<T> = <K extends keyof T>(rowIndex: number, columnId: K, value: T[K]) => void;

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    updateData: UpdateDataFunction<any>
  }
}

const defaultColumn: Partial<ColumnDef<NewMealFoods>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  },
}

const columnHelper = createColumnHelper<NewMealFoods>();

const columns: ColumnDef<NewMealFoods, any>[] = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Nome",
    cell: (info) => <div className="w-80">{info.getValue()}</div>,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantidade",
    cell: (info) => info.getValue(),
  }),
];

const NewMealDataTable = ({ foodsRef }: NewMealDataTableProps) => {

  const [foods, setFoods] = useState(foodsRef.current);

  const updateData: UpdateDataFunction<NewMealFoods> = (rowIndex, columnId, value) => {
    setFoods(prev => {
      let newValue = [...prev];
      newValue[rowIndex] = { ...prev[rowIndex], [columnId]: value };
      return newValue;
    });
  }

  const table = useReactTable({
    data: foods,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { updateData }
  });

  return (
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
  );
};

export default NewMealDataTable;
