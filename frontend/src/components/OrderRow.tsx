import type { Order } from "../types";
import { Button } from "./ui/button";

interface Props {
  order: Order;
}

export function OrderRow({ order }: Props) {
  const date = new Date(order.date);

  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="grid grid-cols-7 gap-2.5 my-10 text-gray-800">
      <span>#{order.id}</span>
      <span>{String(formattedDate)}</span>
      <span>
        {order.clientFirstname} {order.clientLastname}
      </span>
      <span>{order.clientLocation}</span>
      <span>{order.totalPrice} FCFA</span>
      <span
        className={`flex justify-center items-center py-1 w-20 rounded-sm font-medium ${order.status === "Livré" ? "bg-green-50 text-green-500 " : order.status === "En cours" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-500"}`}
      >
        {order.status}
      </span>
      <Button className="bg-transparent">
        <img src=".././icons/three_dots_icon.svg" alt="" />
      </Button>
    </div>
  );
}
