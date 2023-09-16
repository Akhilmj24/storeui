import PropTypes from "prop-types";
import { getDiscountPrice } from "../../helpers/product";
import { baseUrlImage } from "../../service/api";

const productImageGallerySticky = ({ product, colorImage }) => {
  const discountedPrice = getDiscountPrice(
    product.orginalprice,
    product.saleprice
  );
  return (
    <div className="product-large-image-wrapper product-large-image-wrapper--sticky">
      {discountedPrice || product.new ? (
        <div className="product-img-badges">
          {discountedPrice ? (
            <span className="pink">-{discountedPrice.toFixed()}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )}
      <div className="product-sticky-image mb--10">
        {colorImage.length !== 0
          ? colorImage?.map((single, key) => (
              <div className="product-sticky-image__single mb-10" key={key}>
                <img src={baseUrlImage + single} alt="" className="img-fluid" />
              </div>
            ))
          : product?.images?.map((single, key) => (
              <div className="product-sticky-image__single mb-10" key={key}>
                <img src={baseUrlImage + single} alt="" className="img-fluid" />
              </div>
            ))}
      </div>
    </div>
  );
};

productImageGallerySticky.propTypes = {
  product: PropTypes.shape({}),
};

export default productImageGallerySticky;
