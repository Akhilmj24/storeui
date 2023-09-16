import React, { Fragment, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import { getApi } from "../../service/axiosCall";
import { apiProduct } from "../../service/api";
import ProductImageDescriptionSticky from "../../wrappers/product/ProductImageDescriptionSticky";
import Loader from "../../components/loader/Loader";

const Product = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getApi(`${apiProduct.getproductbyid}${id}`)
      .then((res) => setProduct(res))
      .then((res) => setLoader(false))
      .catch((res) => console.error(res));
  }, [id]);

  if (loader) {
    return <Loader />;
  }
  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {product && (
          <ProductImageDescriptionSticky
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            product={product}
          />
        )}

        {/* product description tab */}
        {product && (
          <ProductDescriptionTab
            spaceBottomClass="pb-90"
            productFullDesc={product.fulldescription}
            material={product.material}
            packset={product.packset}
            occasion={product.occasion}
            otherinfo={product.otherinfo}
            product={product}
          />
        )}

        {/* related product slider */}
        {product && (
          <RelatedProductSlider
            spaceBottomClass="pb-95"
            category={product.category[0]}
          />
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
