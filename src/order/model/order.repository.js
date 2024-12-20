import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  return await new OrderModel(data).save();
};

export const getSingleOrderRepo = async (orderId) => {
  return await OrderModel.findById(orderId);
};

export const myOrdersRepo = async (userId) => {
  return await OrderModel.find({ user: userId });
};

export const allPlacedOrdersRepo = async () => {
  return await OrderModel.find();
};
