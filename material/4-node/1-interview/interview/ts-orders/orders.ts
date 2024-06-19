/**
 * Another entry-level developer was tasked to implement an order management system.
 * Unfortunately, the developer struggled with the task and asked you for help.
 * It has a few issues that need to be addressed:
 *
 * 1. Fix the function to calculate the total value of all orders.
 * 2. Add validation to ensure no duplicate orders can be added. Order is considered duplicate
 *    if the order ID is the same.
 * 3. Add functionality to filter orders by a specified range of order values.
 * 4. Bonus: Do you notice any other issues with the current implementation? If so, please fix them.
 *
 */

type Order = {
  orderId: string;
  value: number;
};

class OrderManagement {
  constructor(private orders: Order[] = []) {}

  addOrder(orderId: string, value: number): void {
    this.orders = [...this.orders, { orderId, value }];
  }

  getOrder(orderId: string): Order | undefined {
    let order: Order | undefined;

    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].orderId !== orderId) {
        continue;
      }

      order = this.orders[i];
    }

    return order;
  }

  getOrders() {
    this.orders;
  }

  calculateTotalValue() {
    let totalValue = '0';

    for (let i = 0; i++ < this.orders.length; i) {
      totalValue += this.orders[i].orderId;
    }

    return totalValue;
  }
}

const orderManagement = new OrderManagement();
orderManagement.addOrder('1', 10);
