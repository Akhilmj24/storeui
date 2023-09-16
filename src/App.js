import { Suspense, lazy, useEffect, useState } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getApi } from "./service/axiosCall";
import { apiAddress, apiProduct, ipAddress } from "./service/api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./store/slices/product-slice";
import { setLoaderOff } from "./store/slices/loader-slice";
import LoginModel from "./pages/other/LoginModel";
import { userinfo } from "./service/UserCheck";
import { userIplogin, userLogout } from "./store/slices/login-slice";
import { fetchAddressItems } from "./store/slices/address-slice";
import { getIPData } from "./service/Service";

// home pages

const Home = lazy(() => import("./pages/home/Home"));

// shop pages

const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const Orders = lazy(() => import("./pages/other/Orders"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.loader);
  const { userdata, ismodel } = useSelector((state) => state.login);
  useEffect(() => {
    getApi(apiProduct.getproduct)
      .then((res) => dispatch(setProducts(res.data)))
      .then((res) => dispatch(setLoaderOff()))
      .catch((err) => console.error(err));

    getIPData().then((res) => {
      if (res) {
        const data = {
          _id: res,
        };
        dispatch(userIplogin(data));
      }
    });
    dispatch(fetchAddressItems(`${apiAddress.getaddress}${userdata._id}`));
    if (!userinfo) {
      dispatch(userLogout());
      localStorage.clear();
    } else {
      dispatch(fetchAddressItems(`${apiAddress.getaddress}${userdata._id}`));
    }
  }, []);
  return (
    <Router>
      <ScrollToTop>
        {loader ? (
          <div className="flone-preloader-wrapper">
            <div className="flone-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path={"/"} element={<Home />} />

              {/* Shop pages */}

              <Route
                path={"/shop-products/:category/:subcategory"}
                element={<ShopGridFilter />}
              />

              {/* Shop product pages */}
              <Route path={"/product/:id"} element={<Product />} />

              <Route path={"/product-sticky/:id"} element={<ProductSticky />} />

              {/* Other pages */}
              <Route path={"/about"} element={<About />} />
              <Route path={"/contact"} element={<Contact />} />
              <Route path={"/my-account"} element={<MyAccount />} />

              <Route path={"/cart"} element={<Cart />} />
              <Route path={"/wishlist"} element={<Wishlist />} />
              <Route path={"/compare"} element={<Compare />} />
              <Route path={"/checkout"} element={<Checkout />} />
              <Route path={"/orders"} element={<Orders />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            {ismodel ? <LoginModel /> : null}
          </Suspense>
        )}
      </ScrollToTop>
    </Router>
  );
};

export default App;
