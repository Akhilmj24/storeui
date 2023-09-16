import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";
import { baseUrlImage } from "../../../service/api";
import {
  minDeveliryCharges,
  minDeveliryFee,
} from "../../../service/basicDetails";

const MenuCart = ({handleLeave}) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;
 
  return (
    <div className="shopping-cart-content" onMouseLeave={(e)=>handleLeave(e)}>
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item) => {
              const discountedPrice = getDiscountPrice(
                item.orginalprice,
                item.saleprice
              );
              const finalProductPrice = (
                item.orginalprice * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                item.saleprice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * item.quantity)
                : (cartTotalPrice += finalProductPrice * item.quantity);

              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={"/product/" + item?.id}>
                      <img
                        alt=""
                        src={baseUrlImage + item?.images[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={"/product/" + item.id}> {item.name} </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? currency.currencySymbol + finalDiscountedPrice
                        : currency.currencySymbol + finalProductPrice}
                    </span>
                    {item.selectedProductColor && item.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {item.selectedProductColor}</span>
                        <span>Size: {item.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button
                      onClick={() => dispatch(deleteFromCart(item.cartItemId))}
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Develiry Charges :{" "}
              {cartTotalPrice > minDeveliryCharges ? (
                <span className="shop-total free-develiry">
                  {currency.currencySymbol + minDeveliryFee.toFixed(2)}
                </span>
              ) : (
                <span className="shop-total">
                  {currency.currencySymbol + minDeveliryFee.toFixed(2)}
                </span>
              )}
            </h4>
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={"/cart"}>
              view cart
            </Link>
            <Link className="default-btn" to={"/checkout"}>
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
