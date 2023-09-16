import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginModel, userLogout } from "../../../store/slices/login-slice";
import { deleteAllFromCart } from "../../../store/slices/cart-slice";
import { deleteAllFromWishlist } from "../../../store/slices/wishlist-slice";

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const { userdata } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(userLogout());
    dispatch(deleteAllFromCart());
    dispatch(deleteAllFromWishlist());
  };
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={"/shop-products/Men/All"}>{t("Men")}</Link>
          <ul className="sub-menu">
            <li className="menu-item-has-children">
              <Link to={"/shop-products/Men/All"}>{t("Topware")}</Link>
              <ul className="sub-menu">
                <li>
                  <Link to={"/shop-products/Men/Shirts"}>{t("Shirts")}</Link>
                </li>
                <li>
                  <Link to={"/shop-products/Men/T-Shirts"}>{t("T-Shirts")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link to={"/shop-products/Men/All"}>{t("Bottomware")}</Link>
              <ul className="sub-menu">
                <li>
                  <Link to={"/shop-products/Men/Pants"}>{t("Pants")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="menu-item-has-children">
          <Link to={"/shop-products/Women/All"}>{t("Women")}</Link>
          <ul className="sub-menu">
            <li className="menu-item-has-children">
              <Link to={"/shop-products/Women/All"}>{t("Topware")}</Link>
              <ul className="sub-menu">
                <li>
                  <Link to={"/shop-products/Women/Shirts"}>{t("Shirts")}</Link>
                </li>
                <li>
                  <Link to={"/shop-products/Women/T-Shirts"}>{t("T-Shirts")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link to={"/shop-products/Women/All"}>{t("Bottomware")}</Link>
              <ul className="sub-menu">
                <li>
                  <Link to={"/shop-products/Women/Pants"}>{t("Pants")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        {Object.keys(userdata).length !== 0 ? (
          <>
            <li>
              <Link to={"/my-account"}>{t("my account")}</Link>
            </li>
            <li>
              <Link to={"/orders"}>{t(" orders")}</Link>
            </li>
          </>
        ) : (
          <li>
            <a onClick={() => dispatch(loginModel())} className="userBtn">
              Login
            </a>
          </li>
        )}

        {/* <li>
          <Link to={"/contact"}>{t("contact us")}</Link>
        </li> */}
        {Object.keys(userdata).length !== 0 && (
          <li>
            <a onClick={() => Logout()} className="userBtn">
              Logout
            </a>
          </li>
        )}


      </ul>
    </nav>
  );
};

export default MobileNavMenu;
