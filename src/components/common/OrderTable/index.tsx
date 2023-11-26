"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Trade } from "@/enums/trade";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useOrderStore } from "@/stores/useOrderStore";
import { TradeBadge } from "../TradeBadge";

type Pagination = {
  skip: number;
  take: number;
};

export const OrderTable: React.FC = () => {
  const orders = useOrderStore((state) => state.orders);
  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    take: 10,
  });

  const orderToShow = useMemo(() => {
    const startIndex = pagination.skip;
    const endIndex = pagination.skip + pagination.take;

    const validStartIndex = Math.max(0, startIndex);
    const validEndIndex = Math.min(orders.length, endIndex);

    return orders.slice(validStartIndex, validEndIndex);
  }, [orders, pagination]);

  const cantGoBack = pagination.skip === 0;
  const cantGoNext = pagination.skip + pagination.take >= orders.length;

  const previous = () => {
    if (!cantGoBack) setPagination((prev) => ({ ...prev, skip: prev.skip - prev.take }));
  };

  const next = () => {
    if (!cantGoNext) setPagination((prev) => ({ ...prev, skip: prev.skip + prev.take }));
  };

  if (!orders.length)
    return <div className="bg-white shadow-lg rounded-lg p-4">Nenhuma ordem encontrada...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white shadow-lg rounded-lg ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Perfil</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Símbolo da Moeda</TableHead>
              <TableHead>Tipo de Ordem</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderToShow.map((order, i) => (
              <TableRow key={`${order.id}-${i}`}>
                <TableCell>{order.profileName}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge>{order.symbol.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>
                  <TradeBadge tradeType={order.trade as Trade} />
                </TableCell>
                <TableCell>{order.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between">
        <Button disabled={cantGoBack} onClick={previous}>
          Anterior
        </Button>
        <Button disabled={cantGoNext} onClick={next}>
          Próximo
        </Button>
      </div>
    </div>
  );
};
