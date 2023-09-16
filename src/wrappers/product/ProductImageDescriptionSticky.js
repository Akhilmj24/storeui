import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySticky from "../../components/product/ProductImageGallerySticky";
import { useState } from "react";

const ProductImageDescriptionSticky = ({
  spaceTopClass,
  spaceBottomClass,
  product,
}) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const wishlistItem = wishlistItems.find((item) => item.id === product._id);
  const compareItem = compareItems.find((item) => item.id === product._id);
  const [colorImage, setcolorImage] = useState([]);
  console.log("colorImage", colorImage);
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

  return (
    <div className={clsx("shop-area pt-3", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            <ProductImageGallerySticky product={product} colorImage={colorImage} />
          </div>
          <div className="col-lg-6 col-md-6">
            <div style={{ position: "sticky", top: "75px" }}>
              {/* product description info */}
              <ProductDescriptionInfo
                product={product}
                discountedPrice={discountedPrice}
                currency={currency}
                finalDiscountedPrice={finalDiscountedPrice}
                finalProductPrice={finalProductPrice}
                cartItems={cartItems}
                wishlistItem={wishlistItem}
                compareItem={compareItem}
                setcolorImage={setcolorImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescriptionSticky.propTypes = {
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescriptionSticky;
