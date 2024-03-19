import { createOrderFromOrderRequest } from "../orderRequest/controllers/orderRequestBaseController";

function routeOrdersRequests(router) {
  router.post("/api/orderRequests/:id/createOrder", async (req: any, res: any) => {
    try {
      const order = await createOrderFromOrderRequest(req.params.id);
      res.status(200).send({ message: `Order ${order.orderNo} created`, order });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });
}

export default routeOrdersRequests;
