
import { Games } from "./Game";

export interface CartItem {
  id: string,
  game: Games;
  quantity: number;
  isRental: boolean;
  rentalDuration?: number;
}


