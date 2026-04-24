export interface Restaurant {
  id: number;
  name: string;
  mainImageUrl: string;
  description: string;
  openHour: number;
  closeHour: number;
  location: {
    id: number;
    name: string;
  };
  phoneNumber: string;
  email: string;
}

export interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant_id: number;
  imageUrl: string;
  categoryId: number;
}

export interface CartMeal {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant_id: number;
  imageUrl: string;
  quantity: number;
}

export interface Order {
  id: number;
  clientFirstname: string;
  clientLastname: string;
  date: Date;
  clientLocation: string;
  totalPrice: number;
  status: string;
}

interface MealCategory {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}
