import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategorySingle = ({ data }) => {
  return (
    <div className="category-grid">
      <div className="category-grid__image">
        <Link to={"/shop-products"}>
          <img src={data.image} alt="" className="img-fluid" />
        </Link>
      </div>
      <div className="category-grid__content">
        <Link to={"/shop-products"}>{data.title}</Link>
      </div>
    </div>
  );
};

CategorySingle.propTypes = {
  data: PropTypes.shape({}),
};

export default CategorySingle;
