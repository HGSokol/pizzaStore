import { CartItem } from "../redux/slices/cart/types"
import { calcTotalPrice } from "./calcTotalPrice"

export const getItemFromLs = () => {
  const items: CartItem[] = JSON.parse(String(localStorage.getItem('items'))) || []
  const totalPrice = calcTotalPrice(items)
  
  return {
    items,
    totalPrice
  }
}