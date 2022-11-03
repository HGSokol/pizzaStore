import { CartItem } from "../redux/slices/cart/types"

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((e,i) => e + (i.price * i.count) ,0)
}