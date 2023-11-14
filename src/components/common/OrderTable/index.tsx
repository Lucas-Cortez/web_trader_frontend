"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

export const OrderTable: React.FC = () => {
  // const table = useReactTable({state: })

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Identificador do Perfil</TableHead>
            <TableHead>Nome do Perfil</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Símbolo da Moeda</TableHead>
            <TableHead>Tipo de Ordem</TableHead>
            <TableHead>Quantidade</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>aed2...</TableCell>
            <TableCell>btc-1m-(BB, RSI)</TableCell>
            <TableCell>{new Date().toLocaleString()}</TableCell>
            {/* <TableCell>{new Date().toLocaleString("pt-BR")}</TableCell> */}
            <TableCell>BTCBRL</TableCell>
            <TableCell>compra</TableCell>
            <TableCell>0.00005</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
