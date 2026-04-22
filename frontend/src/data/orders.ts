export interface Order {
  id: number;
  clientFirstname: string;
  clientLastname: string;
  date: Date;
  clientLocation: string;
  totalPrice: number;
  status: string;
}

export const orders = [
  {
    id: 1,
    clientFirstname: "John",
    clientLastname: "Doe",
    date: new Date(),
    clientLocation: "Cotonou",
    totalPrice: 20000,
    status: "Livré",
  },
  {
    id: 2,
    clientFirstname: "Jane",
    clientLastname: "Doe",
    date: new Date(),
    clientLocation: "Cotonou",
    totalPrice: 20000,
    status: "En cours",
  },
  {
    id: 3,
    clientFirstname: "Jane",
    clientLastname: "Doe",
    date: new Date(),
    clientLocation: "Cotonou",
    totalPrice: 20000,
    status: "En cours",
  },
  {
    id: 4,
    clientFirstname: "Jane",
    clientLastname: "Doe",
    date: new Date(),
    clientLocation: "Cotonou",
    totalPrice: 20000,
    status: "En cours",
  },
];
