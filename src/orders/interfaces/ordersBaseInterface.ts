import { ObjectId } from "mongodb";

export interface IOrder {
  _id: ObjectId;
  orderNo: string;
  dispatchDate: Date;
  price: number;
  childOder;
}

export interface IOrdersService {
  getOrders(): Promise<IOrder[]>;
  createOrder(order: IOrder): Promise<IOrder>;
}
