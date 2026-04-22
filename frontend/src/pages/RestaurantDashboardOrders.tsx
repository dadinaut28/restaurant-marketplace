import { useSearchParams } from "react-router-dom";
import { OrdersTable } from "../components/OrdersTable";
import { RestaurantDashboardOrderNavBar } from "../components/RestaurantDashboardOrderNavBar";
import { orders } from "../data/orders";
import { useState } from "react";

export function RestaurantDashboardOrders() {
  const [searchParams] = useSearchParams();
  const searchCriteria = searchParams.get("criteria");
  const [filter, setFilter] = useState("");

  const resolvedOrders = searchCriteria
    ? orders.filter(
        (order) =>
          order.id === Number(searchCriteria) ||
          order.clientFirstname
            .toLowerCase()
            .includes(searchCriteria.toLowerCase()) ||
          order.clientLastname
            .toLowerCase()
            .includes(searchCriteria.toLowerCase()),
      )
    : orders;

  return (
    <div className="py-1">
      <RestaurantDashboardOrderNavBar />
      <div className="px-5 mt-20">
        <div className="flex justify-between">
          <h1 className=" font-semibold text-xl">MES COMMANDES</h1>
          <select
            className="cursor-pointer"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Toutes les commandes</option>
            <option value="delivered">Commandes livrées</option>
            <option value="processing">Commandes en cours</option>
          </select>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="w-full">
            <OrdersTable orders={resolvedOrders} filter={filter} />
          </div>
        </div>
      </div>
    </div>
  );
}
