import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { deleteAllFromWishlist } from "../../store/slices/wishlist-slice";
import { baseUrlImage } from "../../service/api";
import ProductTable from "./ProductTable";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <SEO
        titleTemplate="Wishlist"
        description="Wishlist page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <div className="cart-main-area pt-3 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  {/* {wishlistItems.map((wishlistItem, key) => {
                    const discountedPrice = getDiscountPrice(
                      wishlistItem.orginalprice,
                      wishlistItem.saleprice
                    );
                    const finalProductPrice = (
                      wishlistItem.orginalprice * currency.currencyRate
                    ).toFixed(2);
                    const finalDiscountedPrice = (
                      wishlistItem.saleprice * currency.currencyRate
                    ).toFixed(2);
                    const cartItem = cartItems.find(
                      (item) => item.id === wishlistItem.id
                    );
                    return (
                      <>
                        <div className="col-6 orderConatiner">
                          <div className="imageorderConatiner">
                            <Link to={`/product/${wishlistItem._id}`}>
                              <img
                                className="img-fluid"
                                src={baseUrlImage + wishlistItem.images[0]}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="order_deatils">
                            <div className="product-name">
                              <Link to={`/product/${wishlistItem._id}`}>
                                <h3> {wishlistItem.title}</h3>
                              </Link>
                              <p>{wishlistItem.description}</p>
                              <p>
                                Unit Price:
                                <span>
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                  )}
                                </span>
                              </p>
                              <p>
                                Order Color: <span></span>{" "}
                                {wishlistItem.selectedProductColor}
                              </p>
                              <p>
                                Subcategory: <span></span>{" "}
                                {wishlistItem.subcategory[0]}
                              </p>
                              <div className="product-wishlist-cart">
                                {wishlistItem.totalstockcount > 0 ? (
                                  <button
                                    onClick={() =>
                                      navigate(`/product/${wishlistItem._id}`)
                                    }
                                    className={
                                      cartItem !== undefined &&
                                        cartItem.quantity > 0
                                        ? "active"
                                        : ""
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      cartItem.quantity > 0
                                    }
                                    title={
                                      wishlistItem !== undefined
                                        ? "Added to cart"
                                        : "Add to cart"
                                    }
                                  >
                                    {cartItem !== undefined &&
                                      cartItem.quantity > 0
                                      ? "Added"
                                      : "Add to cart"}
                                  </button>
                                ) : (
                                  <button disabled className="active">
                                    Out of stock
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })} */}
                   <ProductTable type={"wishlist"} />
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={"/shop-products/All/All"}>
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button
                          onClick={() => dispatch(deleteAllFromWishlist())}
                        >
                          Clear Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
              // <ProductTable type={"wishlist"} />
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />{" "}
                      <Link to={"/shop-products/All/All"}>Add Items</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Wishlist;
