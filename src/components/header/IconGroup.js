import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { loginModel, userLogout } from "../../store/slices/login-slice";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { deleteAllFromWishlist } from "../../store/slices/wishlist-slice";

const IconGroup = ({ iconWhiteClass }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const handleLeave = (e) => {
    e.currentTarget.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { userdata } = useSelector((state) => state.login);

  const Logout = () => {
    dispatch(userLogout());
    dispatch(deleteAllFromCart());
    dispatch(deleteAllFromWishlist());
  };
  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
  
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onMouseEnter={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown" onMouseLeave={(e) => handleLeave(e)}>
          <ul>
            {userdata.isActive ? (
              <>
                <li>
                  <Link to={"/my-account"}>my account</Link>
                </li>
                <li>
                  <Link to={"/orders"}>orders</Link>
                </li>
              </>
            ) : (
              <li>
                <a onClick={() => dispatch(loginModel())} className="userBtn">
                  Login
                </a>
              </li>
            )}
            {userdata.isActive && (
              <li>
                <a onClick={() => Logout()} className="userBtn">
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* <div className="same-style header-compare">
        <Link to={ "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style header-wishlist">
        <Link to={"/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        {/* <button className="icon-cart"> */}
          <Link to={"/cart"}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartItems && cartItems.length ? cartItems.length : 0}
            </span>
          </Link>
        {/* </button> */}
        {/* menu cart */}
        {/* <MenuCart handleLeave={handleLeave}/> */}
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={"/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
