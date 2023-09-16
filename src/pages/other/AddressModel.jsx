import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postApi, putApi } from "../../service/axiosCall";
import { apiAddress } from "../../service/api";
import cogoToast from "cogo-toast";
import {
  emptyAddress,
  fetchAddressItems,
  fetchAddressItemsById,
} from "../../store/slices/address-slice";
import { useEffect } from "react";
import { getData, getIPData } from "../../service/Service";


export default function AddressModel({ ismodel, onCloseModal, addressId }) {
  const { userdata } = useSelector((state) => state.login);
  const { addressitem } = useSelector((state) => state.address);
  const [IPAddress, setIPAddress] = useState(null);
  const [address, setaddress] = useState({
    firstname: "",
    lastname: "",
    country: "India",
    housenumber: "",
    streetaddress: "",
    city: "",
    pincode: "",
    state: "",
    district: "",
    phone: "",
    email: "",
    ownedby: userdata._id,

  });
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setaddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleSaveAddress = (event) => {
    event.preventDefault();
    if (addressId) {
      putApi(address, `${apiAddress.updateaddress}${addressId}`)
        .then((res) => {
          cogoToast.success("Address updated", { position: "bottom-left" });
          onCloseModal();
          dispatch(fetchAddressItems(`${apiAddress.getaddress}${userdata._id ? userdata._id : IPAddress}`));
        })
        .catch((err) => console.error(err));
    } else {
      if (address.city.trim() === "") {
        cogoToast.error("Enter the city", { position: "bottom-left" });
      }
      else if (address.firstname.trim() === "") { cogoToast.error("Enter the firstname", { position: "bottom-left" }); }
      else if (address.lastname.trim() === "") { cogoToast.error("Enter the lastname", { position: "bottom-left" }); }
      else if (address.housenumber.trim() === "") { cogoToast.error("Enter the housenumber", { position: "bottom-left" }); }
      else if (address.streetaddress.trim() === "") { cogoToast.error("Enter the streetaddress", { position: "bottom-left" }); }
      else if (address.pincode.trim() === "") { cogoToast.error("Enter the pincode", { position: "bottom-left" }); }
      else if (address.state.trim() === "") { cogoToast.error("Enter the state", { position: "bottom-left" }); }
      else if (address.district.trim() === "") { cogoToast.error("Enter the district", { position: "bottom-left" }); }
      else if (address.email.trim() === "") { cogoToast.error("Enter the email", { position: "bottom-left" }); }
      else if (address.phone.trim() === "") { cogoToast.error("Enter the phone", { position: "bottom-left" }); }
      else {
        postApi(address, apiAddress.saveaddress)
          .then((res) => {
            cogoToast.success("Address saved", { position: "bottom-left" });
            onCloseModal();
            dispatch(fetchAddressItems(`${apiAddress.getaddress}${userdata._id ? userdata._id : IPAddress}`));
          })
          .catch((err) => console.error(err));
      }

    }
  };

  useEffect(() => {
    if (addressId) {
      dispatch(fetchAddressItemsById(addressId));
    } else {
      dispatch(emptyAddress());
      setaddress({
        firstname: "",
        lastname: "",
        country: "India",
        housenumber: "",
        streetaddress: "",
        city: "",
        pincode: "",
        state: "",
        district: "",
        phone: "",
        email: userdata?.email,
        ownedby: userdata._id,
      });
    }
  }, [ismodel, addressId, IPAddress]);
  useEffect(() => {
    if (addressId) {
      setaddress({
        firstname: addressitem?.firstname,
        lastname: addressitem?.lastname,
        country: addressitem?.country,
        housenumber: addressitem?.housenumber,
        streetaddress: addressitem?.streetaddress,
        city: addressitem?.city,
        pincode: addressitem?.pincode,
        state: addressitem?.state,
        district: addressitem?.district,
        phone: addressitem?.phone,
        email: addressitem?.email,
        ownedby: userdata._id,
      });
    }
  }, [addressitem]);

  useEffect(() => {
    getIPData()
      .then((res) => setIPAddress(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal
      show={ismodel}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body">
        <div className="row">
          <div className="col-lg-12">
            <form className="billing-info-wrap" onSubmit={handleSaveAddress}>
              <h3>Fill your billing details</h3>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info mb-20">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={address.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info mb-20">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={address.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info mb-20">
                    <label>Email</label>
                    <input
                      className="billing-address"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={address.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="billing-info mb-20">
                    <label>House Number</label>
                    <input
                      className="billing-address"
                      placeholder="House number and street name"
                      type="text"
                      name="housenumber"
                      value={address.housenumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="billing-info mb-20">
                    <label>Street Address</label>
                    <input
                      className="billing-address"
                      placeholder="House number and street name"
                      type="text"
                      name="streetaddress"
                      value={address.streetaddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="billing-info mb-20">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="billing-select mb-20">
                    <label>State</label>

                    <select
                      name="state"
                      value={address.state}
                      onChange={handleInputChange}
                    >
                      <option>Select a state</option>
                      <option>Kerala</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="billing-select mb-20">
                    <label>District</label>
                    <select
                      name="district"
                      value={address.district}
                      onChange={handleInputChange}
                    >
                      <option>Select a district</option>
                      <option>Thiruvananthapuram</option>
                      <option>Kollam</option>
                    </select>
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
                      value={address.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="billing-back-btn text-end">
                <div className="billing-btn">
                  <button type="submit">
                    {addressId ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
