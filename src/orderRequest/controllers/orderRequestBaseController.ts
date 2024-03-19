import { repo } from "../../db/repo";
import { baseOrdersService } from "../../orders/services/baseOrdersService";
import { GroupService } from "../groups/groupService";
import { OrderRequestService } from "../orderRequests/orderRequestService";
import { Notifyer } from "../notifyer";
import { orderNotifyerService } from "./orderNotifyerService";

export const createOrderFromOrderRequest = async (id: string) => {
  const ordersService = new baseOrdersService();
  const orderRequestService = new OrderRequestService({ id });
  const notifyer = new orderNotifyerService();

  await orderRequestService.isOrderAlreadyCreated();
  await orderRequestService.checkDispatchDate();
  await orderRequestService.isOrderRequestOnHold();
  await orderRequestService.checkCreditLimit();

  const orderRequests = await orderRequestService.getOrderRequests();
  const orderData = await ordersService.createOrderObject(orderRequests);

  await ordersService.checkAnomalies(orderData);
  await ordersService.validateOrder(orderData);

  await repo.transaction(async (session) => {
    ordersService.createOrder(orderData);
    orderRequestService.setOrderAsCreated();
  });

  await notifyer.notifyOrderCreated(orderRequestService.getOrder());
};
