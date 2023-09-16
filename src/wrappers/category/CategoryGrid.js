import clsx from "clsx";
import { useEffect, useState } from "react";
import CategorySingle from "../../components/category/CategorySingle";
import categoryData from "../../data/category/category-five.json";
import { apiCategory } from "../../service/api";
import { getApi } from "../../service/axiosCall";

const CategoryGrid = ({ spaceBottomClass }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    getApi(apiCategory.getbanner)
      .then((res) => setCategory(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={clsx("category-grid-area", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {category?.map((single, key) => (
            <div className="col-lg-4 col-md-6 mb-30" key={key}>
              <CategorySingle data={single} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
