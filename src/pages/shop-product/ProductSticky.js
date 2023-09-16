import PropTypes from "prop-types";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescriptionSticky from "../../wrappers/product/ProductImageDescriptionSticky";

const ProductSticky = () => {
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find((product) => product._id === id);

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* product description with image */}
        <ProductImageDescriptionSticky
          spaceTopClass="mt-100"
          spaceBottomClass="mb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />
      </LayoutOne>
    </Fragment>
  );
};

ProductSticky.propTypes = {
  location: PropTypes.shape({}),
};

export default ProductSticky;
