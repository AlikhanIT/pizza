import {Items} from "../redux/slices/cartSlice";

export const getCartDataFromLC = () => {
  const dataItems = localStorage.getItem('items');

  if(dataItems){
    return JSON.parse(dataItems) as Items[]
  }
  else {
    return []
  }
}

export const getCartTotalCountDataFromLC = () => {
  const tCount = localStorage.getItem('tCount');
  return tCount ? JSON.parse(tCount) as number : 0;
}

export const getCartTotalPriceDataFromLC = () => {
  const tPrice = localStorage.getItem('tPrice');
  return tPrice ? JSON.parse(tPrice) as number : 0;
}