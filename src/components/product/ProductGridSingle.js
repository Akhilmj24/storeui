import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./sub-components/ProductRating";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { baseUrlImage } from "../../service/api";

const ProductGridSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(
    product.orginalprice,
    product.saleprice
  );
  const finalProductPrice = +(
    product.saleprice * currency.currencyRate
  ).toFixed(2);
  const finalDiscountedPrice = +(
    product.orginalprice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={"/product/" + product._id}>
            <img className="default-img" src={baseUrlImage +product.images[0]} alt="" />
            {product.images.length > 1 ? (
              <img className="hover-img" src={baseUrlImage +product.images[1]} alt="" />
            ) : (
              ""
            )}
          </Link>
          {product.discountedPrice || product.new ? (
            <div className="product-img-badges">
              {product.discountedPrice ? (
                <span className="pink">
                  -{product.discountedPrice.toFixed()}%
                </span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
                  Select Option
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button title="Quick View" onClick={() => setModalShow(true)}>
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={"/product/" + product._id}>{product.name}</Link>
          </h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + finalProductPrice}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + finalProductPrice} </span>
            )}
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
