import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul>
          <li>
            <Link to={""}>
              {" "}
              {t("Men")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="mega-menu">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={"/shop-products/Men/All"}>{t("Topware")}</Link>
                  </li>
                  <li>
                    <Link to={"/shop-products/Men/Shirts"}>{t("Shirt")}</Link>
                  </li>
                  <li>
                    <Link to={"/shop-products/Men/T-Shirts"}>{t("T-Shirts")}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={"/shop-products/Men/All"}>{t("Bottomware")}</Link>
                  </li>
                  <li>
                    <Link to={"/shop-products/Men/Pants"}>{t("Pants")}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-img">
                    <Link to={"/shop-products/Men/All"}>
                      <img
                        src={
                          "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVufGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        }
                        alt=""
                      />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <Link to={""}>
              {" "}
              {t("Women")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="mega-menu">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={"/shop-products/Women/All"}>{t("Topware")}</Link>
                  </li>
                  <li>
                    <Link to={"/shop-products/Women/Shirts"}>{t("Shirts")}</Link>
                  </li>
                  <li>
                    <Link to={"/shop-products/Women/T-Shirts"}>{t("T-Shirts")}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={"/shop-products/Women/All"}>{t("Bottomware")}</Link>
                  </li>
                  <li>
                    <Link to={"/shop-products/Women/Pants"}>{t("Pants")}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-img">
                    <Link to={"/shop-products/Women/All"}>
                      <img
                        src={
                          "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW58ZW58MHwxfDB8fHww&auto=format&fit=crop&w=500&q=60"
                        }
                        alt=""
                      />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* <li>
            <Link to={"/blog-standard"}>
              {t("blog")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={"/blog-standard"}>{t("blog_standard")}</Link>
              </li>
              <li>
                <Link to={"/blog-no-sidebar"}>{t("blog_no_sidebar")}</Link>
              </li>
              <li>
                <Link to={"/blog-right-sidebar"}>
                  {t("blog_right_sidebar")}
                </Link>
              </li>
              <li>
                <Link to={"/blog-details-standard"}>
                  {t("blog_details_standard")}
                </Link>
              </li>
            </ul>
          </li> */}
          <li>
            <Link to={"/contact"}>{t("Contact Us")}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
