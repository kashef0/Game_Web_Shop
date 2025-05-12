
export interface OrderItemRequest {
  game: string;          // id of the game
  quantity: number;
  isRental: boolean;
  rentalDuration?: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
  paymentMethod: string;
  name: string;
  email: string;
  address: string;
  telefon: string;
}


export interface OrderHistoryItem {
  _id: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  telefon: string;
  paymentMethod: string;
  isDelivered: boolean;
  isPaid: boolean;
  totalPrice: number;
  user: string; 
  items: OrderItem[];
}

export interface OrderItem {
  _id: string;
  game: {
    _id: string;
  };
  isRental: boolean;
  priceAtPurchase: number;
  quantity: number;
}


