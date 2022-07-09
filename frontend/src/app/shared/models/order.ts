import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];
  paymentDetails;
  details = {};
  amount;

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart, paymentDetails, amount) {

    this.paymentDetails = paymentDetails;
    this.datePlaced = new Date().getTime();
    this.amount = amount;
    this.details = {
      "status": "Placed",
      "updatedOn": this.datePlaced
    };

    this.items = shoppingCart.items.map(i => {
      return {
        id: i.$key,
        title: i.title,
        imageUrl: i.imageUrl,
        price: i.price,
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    });

  }
}