import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { minDeveliryCharges, minDeveliryFee } from "../../service/basicDetails";
import { orderPayment } from "../../components/paymentgateway/Paymentgateway";
import cogoToast from "cogo-toast";
import AddressModel from "./AddressModel";
import { fetchAddressItems } from "../../store/slices/address-slice";
import { apiAddress } from "../../service/api";
import { getData, getIPData } from "../../service/Service";
import { orderCODPayment } from "../../components/paymentgateway/PaymentOnline";
import { userinfo } from "../../service/UserCheck";

const Checkout = () => {
  const { userdata } = useSelector((state) => state.login);
  let cartTotalPrice = 0;
  const [ismodel, setIsmodel] = useState(false);
  const [IPAddress, setIPAddress] = useState(null);
  const [addressSelectedId, setaddressSelectedId] = useState(0);
  const [address, setaddress] = useState({
    country: "",
    housenumber: "",
    streetaddress: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [userInfo, setuserInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    userid: userdata._id,
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("ONLINE"); // Default to COD
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { addressitems, loading } = useSelector((state) => state.address);

  const priceDifferences = cartItems.map((product) => {
    const originalPrice = product.orginalprice;
    const salePrice = product.saleprice;
    const difference = originalPrice - salePrice;
    return difference;
  });
  const dispatch = useDispatch();
  const savedAmount =
    minDeveliryFee +
    priceDifferences?.reduce((total, value) => total + value, 0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setaddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUserInfoInputChange = (event) => {
    const { name, value } = event.target;
    setuserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onCloseModal = () => {
    setIsmodel(!ismodel);
    getAddress();
  };
  const placeOrderHandler = (totalPrice) => {
    if (addressitems.length === 0) {
      cogoToast.error("Add address to place order", {
        position: "bottom-left",
      });
    } else {
      for (const key in address) {
        if (address[key].trim() === "") {
          cogoToast.error("Address fields cannot be empty!", {
            position: "bottom-left",
          });
          return;
        }
      }
      for (const key in userInfo) {
        if (userInfo[key].trim() === "") {
          cogoToast.error("User info fields cannot be empty!", {
            position: "bottom-left",
          });
          return;
        }
      }
      if (selectedPaymentMethod === "ONLINE") {
        orderPayment(totalPrice, cartItems, userInfo, address);
      }else{
        orderCODPayment(totalPrice, cartItems, userInfo, address)
      }
    }
  };
  const getAddress = () => {
    dispatch(fetchAddressItems(`${apiAddress.getaddress}${userdata._id}`));
  };
  useEffect(() => {
    getAddress();
  }, [IPAddress]);

  useEffect(() => {
    if (IPAddress) {
      if (!loading) {
        if (addressitems.length === 0) {
          setIsmodel(true);
        }
      }
    }
  }, [addressitems, IPAddress]);

  useEffect(() => {
    if (addressitems.length !== 0) {
      setIsmodel(false);
    }
  }, [addressitems]);

  useEffect(() => {
    getIPData()
      .then((res) => setIPAddress(res))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (addressitems) {
      setaddress({
        country: addressitems[0]?.country,
        housenumber: addressitems[0]?.housenumber,
        streetaddress: addressitems[0]?.streetaddress,
        city: addressitems[0]?.city,
        state: addressitems[0]?.state,
        pincode: addressitems[0]?.pincode,
      });
      setuserInfo({
        firstname: addressitems[0]?.firstname,
        lastname: addressitems[0]?.lastname,
        phone: addressitems[0]?.phone,
        email: addressitems[0]?.email,
        userid: userdata._id || "",
      });
    }
    console.log("asdasd");
  }, [addressitems]);
  const handleSelectAddress = (address, id) => {
    setaddressSelectedId(id);
    setaddress({
      country: address?.country,
      housenumber: address?.housenumber,
      streetaddress: address?.streetaddress,
      city: address?.city,
      state: address?.state,
      pincode: address?.pincode,
    });
    setuserInfo({
      firstname: address?.firstname,
      lastname: address?.lastname,
      phone: address?.phone,
      email: address?.email,
      userid: userdata._id || "",
    });
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <div className="checkout-area pt-5 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  {/* <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstname"
                            value={userInfo.firstname}
                            onChange={handleUserInfoInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastname"
                            value={userInfo.lastname}
                            onChange={handleUserInfoInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select
                            name="country"
                            value={address.country}
                            onChange={handleInputChange}
                          >
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            name="housenumberstreetname"
                            value={address.housenumberstreetname}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input
                            type="text"
                            name="pincode"
                            value={address.pincode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleUserInfoInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input
                            type="text"
                            name="email"
                            value={userInfo.email}
                            onChange={handleUserInfoInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          value={additionalinformation}
                          onChange={(e) =>
                            setAdditionalinformation(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="addresslist_conatiner">
                    {addressitems.length > 0 ? (
                      addressitems?.map((item, index) => (
                        <div
                          className="row"
                          key={index}
                          onClick={() => handleSelectAddress(item, index)}
                        >
                          <div
                            className={`addressItems ${
                              addressSelectedId === index
                                ? "addressSelected"
                                : ""
                            }`}
                          >
                            <p>
                              {item.firstname} {item.lastname}
                            </p>
                            <p>
                              {item.housenumber}, {item.streetaddress},
                              {item.district}, {item.state}, {item.pincode}
                            </p>
                            <p>{item.phone}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h4 className="TextColor">
                          Add address to continue the purchase
                        </h4>
                      </div>
                    )}
                  </div>

                  <div className="billing-btn text-end">
                    <button onClick={() => onCloseModal()}>Add address</button>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.orginalprice,
                                cartItem.saleprice
                              );
                              const finalProductPrice = (
                                cartItem.orginalprice * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                cartItem.saleprice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);

                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.title} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          {cartTotalPrice > minDeveliryCharges ? (
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>
                                Free shipping (
                                <span className="your-saving">
                                  You saved :{" "}
                                  {currency.currencySymbol +
                                    savedAmount.toFixed(2)}{" "}
                                </span>
                                ){" "}
                              </li>
                            </ul>
                          ) : (
                            <ul>
                              <li className="your-order-shipping">
                                {" "}
                                Develiry Charges
                              </li>
                              <li>
                                {" "}
                                {currency.currencySymbol +
                                  minDeveliryFee.toFixed(2)}
                              </li>
                            </ul>
                          )}
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                        <div className="your-order-bottom payment-method">
                          <label>
                            <input
                              type="checkbox"
                              value="COD"
                              checked={selectedPaymentMethod === "COD"}
                              onChange={(e) =>
                                setSelectedPaymentMethod(e.target.value)
                              }
                            />
                            Cash on Delivery (COD)
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              value="ONLINE"
                              checked={selectedPaymentMethod === "ONLINE"}
                              onChange={(e) =>
                                setSelectedPaymentMethod(e.target.value)
                              }
                            />
                            Pay Online
                          </label>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={() => placeOrderHandler(cartTotalPrice)}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={"/shop-products/All/All"}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <AddressModel ismodel={ismodel} onCloseModal={onCloseModal} />
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
