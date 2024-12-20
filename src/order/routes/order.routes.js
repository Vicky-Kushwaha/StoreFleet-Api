import express from "express";
import {
  createNewOrder,
  updateOrderDetails,
  allPlacedOrders,
  getSingleOrder,
  myOrders,
} from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/my/orders").get(auth, myOrders);
router.route("/:orderId").get(auth, getSingleOrder);
router
  .route("/orders/placed")
  .get(auth, authByUserRole("admin"), allPlacedOrders);
router
  .route("/update/:orderId")
  .put(auth, authByUserRole("admin"), updateOrderDetails);

export default router;
