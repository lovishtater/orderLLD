import { IOrder } from "../../orders/interfaces/ordersBaseInterface";
import { IOrderRequest } from "../interfaces/OrderRequestBase";

interface IOrderRequestService {
  isOrderAlreadyCreated(): Promise<boolean>;
  checkDispatchDate(): Promise<boolean>;
  isOrderRequestOnHold(): Promise<boolean>;
  checkCreditLimit(): Promise<boolean>;
  getOrderRequests(): Promise<IOrderRequest[]>;
  setOrderAsCreated(): Promise<void>;
  getOrder(): Promise<IOrder>;
}

export class OrderRequestService implements IOrderRequestService {
  private orderRequest: IOrderRequest;
  private order: IOrder;
  private id: string;

  constructor({ id }: { id: string }) {
    this.id = id;
  }

  public async isOrderAlreadyCreated() {
    // ...
  }

  public async checkDispatchDate() {
    // ...
  }

  public async isOrderRequestOnHold() {
    // ...
  }

  public async checkCreditLimit() {
    // ...
  }

  public async getOrderRequests() {
    // ...
  }

  public async setOrderAsCreated() {
    // ...
  }

  public async getOrder() {
    // ...
  }
}
