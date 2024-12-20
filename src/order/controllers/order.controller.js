// Please don't change the pre-written code
// Import the necessary modules here

import {
  createNewOrderRepo,
  getSingleOrderRepo,
  allPlacedOrdersRepo,
  myOrdersRepo,
} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const orderData = { ...req.body, user: req.user._id, paidAt: new Date() };

    const orderedProduct = await createNewOrderRepo(orderData);

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderedProduct,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await getSingleOrderRepo(req.params.orderId);

    if (!order) {
      return next(new ErrorHandler(400, "Order not found!"));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await myOrdersRepo(req.user._id);

    if (!orders) {
      return next(new ErrorHandler(400, "Order not found"));
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const allPlacedOrders = async (req, res, next) => {
  try {
    const orders = await allPlacedOrdersRepo();

    if (!orders) {
      return next(new ErrorHandler(400, "Order not found!"));
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateOrderDetails = async (req, res, next) => {
  try {
    const order = await getSingleOrderRepo(req.params.orderId);

    if (!order) {
      return next(new ErrorHandler(400, "Order not found!"));
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status udpated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
