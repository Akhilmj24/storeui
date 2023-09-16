import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Paginator from "react-hooks-paginator";
import { useLocation, useParams } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import ShopTopbarFilter from "../../wrappers/product/ShopTopbarFilter";
import ShopProducts from "../../wrappers/product/ShopProducts";

const ShopGridFilter = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortcategory, setSortcategory] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { products } = useSelector((state) => state.product);

  const pageLimit = 15;
  let { pathname } = useLocation();
  let { category, subcategory } = useParams();
  const getLayout = (layout) => {
    setLayout(layout);
  };
  const getSortParams = (sortType, sortValue, sortcategory) => {
    setSortType(sortType);
    setSortValue(sortValue);
    if (sortcategory) {
      setSortcategory(sortcategory);
    }
  };
  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };
  useEffect(() => {
    if (category !== "All") {
      setSortType("category");
      setSortValue(category);
    }
    if (subcategory !== "All") {
      setSortcategory(category);
      setSortType("subcategory");
      setSortValue(subcategory);
    }
  }, [category, subcategory]);

  useEffect(() => {
    let sortedProducts = getSortedProducts(
      products,
      sortType,
      sortValue,
      sortcategory
    );
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    category,
    subcategory,
  ]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        <div className="shop-area  pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* shop topbar filter */}
                <ShopTopbarFilter
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                  products={products}
                  getSortParams={getSortParams}
                  sortcategory={sortcategory}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridFilter;
