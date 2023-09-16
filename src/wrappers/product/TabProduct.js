import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGrid from "./ProductGrid";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  productTabClass,
  productGridStyleClass,
}) => {
  return (
    <div className={clsx("product-area", spaceBottomClass)}>
      <div className="container">
        {/* section title */}
        <SectionTitleSeven
          titleText="Product Collections"
          positionClass="text-center"
          borderClass="bottom-border"
          spaceClass="mb-30"
        />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className={clsx(
              "product-tab-list-6 justify-content-center mb-60",
              productTabClass
            )}
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Offers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="new"
                  limit={6}
                  spaceBottomClass="mb-25"
                  productGridStyleClass={productGridStyleClass}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="bestSeller"
                  limit={6}
                  spaceBottomClass="mb-25"
                  productGridStyleClass={productGridStyleClass}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="saleItems"
                  limit={6}
                  spaceBottomClass="mb-25"
                  productGridStyleClass={productGridStyleClass}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={ "/shop-products/All/All"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProduct.propTypes = {
  category: PropTypes.string,
  productTabClass: PropTypes.string,
  productGridStyleClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProduct;
