import PropTypes from "prop-types";
import clsx from "clsx";
import featureIconData from "../../data/feature-icons/feature-icon-three.json";
import FeatureIconSingle from "../../components/feature-icon/FeatureIconSingle.js";

const FeatureIcon = ({ bgColorClass, spaceBottomClass, featureShapeClass }) => {
  return (
    <div className={clsx("support-area", bgColorClass)}>
      <div className="container forFeatureIconPhone">
        <div className="row">
          {featureIconData?.map((single, key) => (
            <div className="col-lg-4 col-md-4 col-sm-6" key={key}>
              <FeatureIconSingle
                data={single}
                spaceBottomClass="mb-30"
                featureShapeClass={featureShapeClass}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

FeatureIcon.propTypes = {
  bgColorClass: PropTypes.string,
  featureShapeClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default FeatureIcon;
