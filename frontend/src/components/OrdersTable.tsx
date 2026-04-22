import type { Order } from "../types";
import { OrderRow } from "./OrderRow";

interface Props {
  orders: Order[];
  filter: string;
}

export function OrdersTable({ orders, filter }: Props) {
  const filteredOrders =
    filter === "delivered"
      ? orders.filter((order) => order.status === "Livré")
      : filter === "processing"
        ? orders.filter((order) => order.status === "En cours")
        : orders;
  return (
    <div className="bg-white rounded-lg pb-5">
      <div className="grid gap-2.5 font-medium grid-cols-7 border-b border-gray-100 px-5 py-3.5">
        <span>Id</span>
        <span>Date</span>
        <span>Client</span>
        <span>Adresse</span>
        <span>Prix</span>
        <span>Statut</span>
        <span></span>
      </div>
      <div className="px-5 text-sm">
        {filteredOrders.map((order) => (
          <OrderRow order={order} />
        ))}
      </div>
    </div>
  );
}
