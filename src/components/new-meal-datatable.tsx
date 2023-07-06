import { NewMealFoods } from '@/types/Food';
import type { ColumnDef } from '@tanstack/react-table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { useEffect } from 'react';
import { useIMask } from 'react-imask';
import { Button } from './ui/button';
import { XCircle } from 'lucide-react';

interface NewMealDataTableProps {
  foods: NewMealFoods[];
  setFoods: React.Dispatch<React.SetStateAction<NewMealFoods[]>>;
}

type UpdateDataFunction<T> = <K extends keyof T>(
  rowIndex: number,
  columnId: K,
  value: T[K]
) => void;

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    updateData: UpdateDataFunction<any>;
    deleteRow: (rowIndex: number) => void;
  }
}

const columnHelper = createColumnHelper<NewMealFoods>();

const columns: ColumnDef<NewMealFoods, any>[] = [
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: (info) => <div className='w-80'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantidade',
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();

      const { ref, setTypedValue } = useIMask(
        { mask: '0000' },
        {
          onAccept: (value) => {
            table.options.meta?.updateData(index, id, value);
          },
        }
      );

      useEffect(() => {
        setTypedValue(String(initialValue));
      }, []);

      return <input className='w-20 p-2 bg-inherit border' ref={ref as any} />;
    },
  }),
  columnHelper.accessor('id', {
    header: 'Ações',
    cell: ({ row, table }) => {
      const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        table.options.meta?.deleteRow(row.getValue('id'));
      };
      return (
        <Button type='button' onClick={handleClick} variant='ghost' size='sm'>
          <XCircle className='text-red-500' />
        </Button>
      );
    },
  }),
];

const NewMealDataTable = ({ foods, setFoods }: NewMealDataTableProps) => {
  const updateData: UpdateDataFunction<NewMealFoods> = (
    rowIndex,
    columnId,
    value
  ) => {
    setFoods((prev) => {
      let newValue = [...prev];
      newValue[rowIndex] = { ...prev[rowIndex], [columnId]: value };
      return newValue;
    });
  };

  const deleteRow = (id: number) => {
    setFoods((prev) => prev.filter((item) => item.id !== id));
  };

  const table = useReactTable({
    data: foods,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { updateData, deleteRow },
  });

  return (
    <>
      <Table className='border'>
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
    </>
  );
};

export default NewMealDataTable;
