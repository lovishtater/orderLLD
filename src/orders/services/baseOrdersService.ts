import { ObjectId } from "mongodb";
import { IOrderRequest } from "../../orderRequest/interfaces/OrderRequestBase";
import { IOrder } from "../interfaces/ordersBaseInterface";
import { IRepository, Repository } from "../../db/repo";

interface IOrdersService {
  repo: IRepository;
  createOrder(order: IOrder): Promise<IOrder>;
}

interface IChildOrderCreator {}

class MultiProductChildOrderCreator implements IChildOrderCreator {
  public async createChildOrder(args: any): Promise<void> {}
}

class MultiSupplierChildOrderCreator implements IChildOrderCreator {
  public async createChildOrder(args: any): Promise<void> {}
}

class MultiBuyerChildOrderCreator implements IChildOrderCreator {
  public async createChildOrder(args: any): Promise<void> {}
}

export class orderBaseService implements IOrdersService {
  private repo: IRepository;
  private order: IOrder;

  readonly archivalRepo: IRepository;
  constructor(repo?: IRepository) {
    this.repo = repo || new Repository();
  }

  private async recordHistory(order: IOrder): Promise<void> {
    return await this.archivalRepo.insert("orders_history", order);
  }

  private async insertOrder(order: IOrder): Promise<IOrder> {
    const orderObj = await this.repo.insert("orders", order);
    this.order = orderObj;
    return orderObj;
  }

  private async insertWithHistory(order: IOrder): Promise<IOrder> {
    const orderObj = await this.insertOrder(order);
    await this.recordHistory(orderObj);
    return orderObj;
  }

  public async getOrder({ id }): Promise<IOrder> {
    return await this.repo.get("orders", { _id: new ObjectId(id) });
  }

  public async createOrder(order: IOrder): Promise<IOrder> {
    const orderFinance = new OrderFinanceService();
    const orderObj = await this.insertWithHistory(order);

    await orderFinance.createPerformaInvoice(orderObj);
    await this.createChildOrderIfRequired();
  }

  public async createChildOrderIfRequired() {
    if (!this.order.options.childOrderDetails) return;
    const creators: Record<string, IChildOrderCreator> = {
      MULTI_PRODUCT: new MultiProductChildOrderCreator(),
      MULTI_SUPPLIER: new MultiSupplierChildOrderCreator(),
      MULTI_BUYER: new MultiBuyerChildOrderCreator(),
    };

    const creator = creators[childOrderDetails.type];
    if (creator) {
      for (const [idx, value] of childOrderDetails.data.entries()) {
        await creator.createChildOrder(this.repo, value, order);
      }
    }
  }

  public async createOrderObject(orderRequests: IOrderRequest[]): Promise<IOrder> {}

  public async checkAnomalies(orderData: IOrder): Promise<void> {}

  public async validateOrder(orderData: IOrder): Promise<void> {}
}

class OrderFinanceService {
  public async createPerformaInvoice(order: IOrder): Promise<void> {}
}
