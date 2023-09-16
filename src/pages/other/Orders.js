import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { apiOrders, baseUrlImage } from "../../service/api";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../store/slices/cart-slice";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import { orderItemStock } from "../../helpers/product";
import { getApi } from "../../service/axiosCall";
import { useEffect } from "react";
import moment from "moment";
import RatingModel from "./RatingModel";

export default function Orders() {
  const [orderItems, setorderItems] = useState(null);
  const [ismodel, setIsmodel] = useState(false);
  const [ratingId, setRatingId] = useState(null);
  let cartTotalPrice = 0;
  const currency = useSelector((state) => state.currency);
  const { userdata } = useSelector((state) => state.login);
  const onCloseModal = () => {
    setIsmodel(!ismodel);
  };
  const handleOpenRating = (id) => {
    setRatingId(id);
    setIsmodel(true);
  };

  const getOrders = () => {
    getApi(`${apiOrders.getorder}${userdata._id}`)
      .then((res) => {
        setorderItems(res);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        <div className="cart-main-area pt-3 pb-100">
          <div className="container">
            {orderItems && orderItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your Orders</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      {orderItems.map((order, key) =>
                        order.products?.map((orderItem, key) => {
                          const discountedPrice = getDiscountPrice(
                            orderItem.orginalprice,
                            orderItem.saleprice
                          );
                          const finalProductPrice = (
                            orderItem.orginalprice * currency.currencyRate
                          ).toFixed(2);
                          const finalDiscountedPrice = (
                            orderItem.saleprice * currency.currencyRate
                          ).toFixed(2);

                          discountedPrice != null
                            ? (cartTotalPrice +=
                                finalDiscountedPrice * orderItem.quantity)
                            : (cartTotalPrice +=
                                finalProductPrice * orderItem.quantity);
                          return (
                            <>
                              <div className="col-6 orderConatiner">
                                <div className="imageorderConatiner">
                                  <Link to={`/product/${orderItem._id}`}>
                                    <img
                                      className="img-fluid"
                                      src={baseUrlImage + orderItem.images[0]}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="order_deatils">
                                  <div>
                                    <Link to={`/product/${orderItem._id}`}>
                                      <h3> {orderItem.title}</h3>
                                      <p>{orderItem.description}</p>
                                      <p>
                                        Order Size:{" "}
                                        <span>
                                          {" "}
                                          {orderItem.selectedProductSize}
                                        </span>
                                      </p>
                                      <p>
                                        Order Quantity: <span></span>{" "}
                                        {orderItem.quantity}
                                      </p>

                                      <p>
                                        Sale Price:
                                        <span>
                                          {discountedPrice !== null
                                            ? currency.currencySymbol +
                                              (
                                                finalDiscountedPrice *
                                                orderItem.quantity
                                              ).toFixed(2)
                                            : currency.currencySymbol +
                                              (
                                                finalProductPrice *
                                                orderItem.quantity
                                              ).toFixed(2)}
                                        </span>
                                      </p>
                                      <p>
                                        Order Color: <span></span>{" "}
                                        {orderItem.selectedProductColor}
                                      </p>
                                      <p>
                                        Subcategory: <span></span>{" "}
                                        {orderItem.subcategory[0]}
                                      </p>
                                    </Link>
                                  </div>
                                  <div className="order_status">
                                    <h5>
                                      Order Status:{" "}
                                      {order.orderstatus === "Delivered" ? (
                                        <span className="order_delivered">
                                          Delivered
                                        </span>
                                      ) : order.orderstatus ===
                                        "Order Placed" ? (
                                        <span className="order_placed">
                                          Order Placed
                                        </span>
                                      ) : order.orderstatus ===
                                        "Payment Pending" ? (
                                        <span className="order_pending">
                                          Payment Pending
                                        </span>
                                      ) : (
                                        <span>{order.orderstatus}</span>
                                      )}
                                    </h5>
                                    <h6>
                                      {order.orderstatus !== "Payment Pending"
                                        ? moment(order.updatedAt).format(
                                            "MMM Do YYYY"
                                          )
                                        : null}
                                    </h6>
                                    {order.orderstatus === "Delivered" ? (
                                      <div className="billing-btn">
                                        <button
                                          onClick={() =>
                                            handleOpenRating(orderItem._id)
                                          }
                                        >
                                          Rating / Feedback
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in orders <br />{" "}
                      <Link to={"/shop-products/All/All"}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <RatingModel
          ismodel={ismodel}
          onCloseModal={onCloseModal}
          id={ratingId}
        />
      </LayoutOne>
    </Fragment>
  );
}
