import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice, getproductstock } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { apiWishlist, baseUrlImage } from "../../service/api";
import { postApi } from "../../service/axiosCall";


const ProductGridSingleHome = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
  colorClass,
  productGridStyleClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
  const discountedPrice = getDiscountPrice(
    product.orginalprice,
    product.saleprice
  );
  const finalProductPrice = +(
    product.orginalprice * currency.currencyRate
  ).toFixed(2);
  const finalDiscountedPrice = +(
    product.saleprice * currency.currencyRate
  ).toFixed(2);

  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.login);

  
  const addtowishlistHandler = () => {
    if (userdata?._id) {
      dispatch(addToWishlist(product));
      
      setSelectProduct(null);
    } else {
      setSelectProduct(product);
    }
  };
  useEffect(() => {
    if (userdata?._id && selectProduct) {
      dispatch(addToWishlist(selectProduct));
    }
  }, [userdata, selectProduct]);
  return (
    <Fragment>
      <div
        className={clsx(
          "product-wrap-10",
          spaceBottomClass,
          colorClass,
          productGridStyleClass
        )}
      >
        <div className="product-img">
          <Link to={"/product/" + product._id}>
            <img
              className="default-img"
              src={baseUrlImage + product.images[0]}
              alt=""
            />
            {product.images.length > 1 ? (
              <img
                className="hover-img"
                src={baseUrlImage + product.images[1]}
                alt=""
              />
            ) : (
              ""
            )}
          </Link>
          {product.orginalprice || product.new ? (
            <div className="product-img-badges">
              {product.orginalprice ? (
                <span>-{discountedPrice.toFixed()}%</span>
              ) : (
                ""
              )}
              {product.new ? <span>New</span> : ""}
            </div>
          ) : (
            ""
          )}

          <div className="product-action-2">
            {product?.variation && product.variation?.length >= 1 ? (
              product.totalstockcount && product.totalstockcount > 0 ? (
                <Link to={`/product/${product._id}`} title="Add To Cart">
                  <i className="fa fa-shopping-cart"></i>
                </Link>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )
            ) : product.totalstockcount && product.totalstockcount > 0 ? (
              <button
                onClick={() => dispatch(addToCart(product))}
                className={
                  cartItem !== undefined && cartItem.quantity > 0
                    ? "active"
                    : ""
                }
                disabled={cartItem !== undefined && cartItem.quantity > 0}
                title={cartItem !== undefined ? "Added to cart" : "Add to cart"}
              >
                {" "}
                <i className="fa fa-shopping-cart"></i>{" "}
              </button>
            ) : (
              <button disabled className="active" title="Out of stock">
                <i className="fa fa-shopping-cart"></i>
              </button>
            )}
            {/* {product.totalstockcount > 0 ? (
              <button
                onClick={() => dispatch(addToCart(product))}
                className={
                  cartItem !== undefined && cartItem.quantity > 0
                    ? "active"
                    : ""
                }
                disabled={cartItem !== undefined && cartItem.quantity > 0}
                title={cartItem !== undefined ? "Added to cart" : "Add to cart"}
              >
                {" "}
                <i className="fa fa-shopping-cart"></i>{" "}
              </button>
            ) : (
              <button disabled className="active" title="Out of stock">
                <i className="fa fa-shopping-cart"></i>
              </button>
            )} */}

            <button onClick={() => setModalShow(true)} title="Quick View">
              <i className="fa fa-eye"></i>
            </button>

            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => addtowishlistHandler()}
            >
              <i className="fa fa-heart-o" />
            </button>
          </div>
        </div>
        <div className="product-content-2">
          <div className="title-price-wrap-2">
            <h3>
              <Link to={"/product/" + product._id}>{product.title}</Link>
            </h3>
            <div className="price-2">
              {discountedPrice !== null ? (
                <Fragment>
                  <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                  </span>
                  <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice} </span>
              )}
            </div>
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
        productstock={product.totalstockcount}
      />
    </Fragment>
  );
};

ProductGridSingleHome.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridSingleHome;
