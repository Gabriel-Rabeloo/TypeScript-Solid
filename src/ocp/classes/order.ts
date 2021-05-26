import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { OrderStatus } from './interfaces/order-status';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'close';
    this.messaging.sendMessage(
      `Seu com pedido com total de ${this.cart.totalWithDiscount()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
