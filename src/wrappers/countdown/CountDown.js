import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import CountdownTimer from "../../components/countdown";
import cover from "../../assets/images/longBanner2.jpg";
const CountDown= ({
  spaceTopClass,
  spaceBottomClass,
  dateTime,
  countDownImage,
}) => {
  return (
    <div className={clsx("funfact-area", spaceBottomClass)}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 col-lg-6">
            <div className="funfact-content funfact-res text-center">
              <h2>Deal of the day</h2>
              <div className="timer">
                <CountdownTimer date={dateTime} />
              </div>
              <div className="funfact-btn funfact-btn--round-shape funfact-btn-violet btn-hover">
                <Link to={ "/shop-products/All/All"}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-6">
            <div className="funfact-image">
              <Link to={"/shop-products"}>
                <img src={cover} alt="" className="img-fluid" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CountDown.propTypes = {
  countDownImage: PropTypes.string,
  dateTime: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default CountDown;
