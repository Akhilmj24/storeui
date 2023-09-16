import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";


const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  setcolorImage
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product?.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product?.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product?.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const [selectProduct, setSelectProduct] = useState(null);
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );
  const { userdata } = useSelector((state) => state.login);

  const addcartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : product.selectedProductColor
          ? product.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : product.selectedProductSize
          ? product.selectedProductSize
          : null,
        isdata: "static",
      })
    );
  };
  const buynowhandler = () => {
    addcartHandler();
    navigate("/checkout");
  };
  useEffect(() => {
    if (userdata?._id && selectProduct) {
      addcartHandler(selectProduct);
    }
  }, [userdata, selectProduct]);

  return (
    <div className="product-details-content ml-70">
      <h2>{product.title}</h2>
      <div className="product-details-price">
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
      {product.totalcountrating && product.totalcountrating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.totalcountrating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>

      {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setcolorImage(single.image)
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-quality">
        <div className="pro-details-cart btn-hover">
          {productStock && productStock > 0 ? (
            <button
              onClick={() => addcartHandler()}
              disabled={productCartQty >= productStock}
            >
              Add To Cart
            </button>
          ) : (
            <button disabled>Out of Stock</button>
          )}
        </div>
        <div className="pro-details-cart btn-hover">
          {productStock && productStock > 0 ? (
            <button
              onClick={() => buynowhandler()}
              disabled={productCartQty >= productStock}
            >
              Buy now
            </button>
          ) : null}
        </div>
        <div className="pro-details-wishlist">
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
      </div>

      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={"/shop-products"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={"/shop-products"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
