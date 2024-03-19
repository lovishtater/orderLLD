import { ObjectId } from "mongodb";

interface Order {
  _id: ObjectId;
  orderNo: string;
  dispatchDate: Date;
  price: number;
}

interface IOrdersService {
  getOrders(): Promise<Order[]>;
  createOrder(order: Order): Promise<Order>;
}

class baseOrdersService implements IOrdersService {
  constructor() {}
  public async getOrders(): Promise<Order[]> {
    // Get orders
  }
  public async createOrder(order: Order): Promise<Order> {
    // Create order
  }
}
