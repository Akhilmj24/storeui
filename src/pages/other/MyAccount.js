import { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { putApi, removeApi } from "../../service/axiosCall";
import { apiAddress, apiAuth } from "../../service/api";
import { userUpdate } from "../../store/slices/login-slice";
import AddressModel from "./AddressModel";
import { useEffect } from "react";
import { fetchAddressItems } from "../../store/slices/address-slice";

const MyAccount = () => {
  const { userdata } = useSelector((state) => state.login);
  const { addressitems } = useSelector((state) => state.address);
  const [userInfo, setUserInfo] = useState(
    {
      firstname: userdata?.firstname,
      lastname: userdata?.lastname,
      email: userdata?.email,
      phone: userdata?.phone
    }
  )
  
  const [ismodel, setIsmodel] = useState(false)
  const [addressId, setAddressId] = useState(null)
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditInformation = (event) => {
    event.preventDefault()
    putApi(userInfo, `${apiAuth.update}${userdata._id}`).then((res) => dispatch(userUpdate(res.data))).catch(err => console.error(err))

  }

  const onCloseModal = () => {
    setIsmodel(!ismodel)
  }
  const handleRemoveAddress = (id) => {
    removeApi(`${apiAddress.removeaddress}${id}`).then(res => dispatch(fetchAddressItems(`${apiAddress.getaddress}${userdata._id}`))).catch(err => console.error(err))
  }
  const handleEditAddress = (id) => {
    setAddressId(id)
    setIsmodel(!ismodel)
  }
  useEffect(() => {
    dispatch(fetchAddressItems(`${apiAddress.getaddress}${userdata._id}`));
  }, []);
  const handleOpenNewAddress = () => {
    setAddressId(null)
    setIsmodel(!ismodel)
  }
  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <form className="myaccount-info-wrapper" onSubmit={handleEditInformation}>
                          <div className="account-info-wrapper">
                            <h4>My Account Information</h4>
                            <h5>Your Personal Details</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>First Name</label>
                                <input type="text" name="firstname"
                                  value={userInfo.firstname}
                                  onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Last Name</label>
                                <input type="text" name="lastname"
                                  value={userInfo.lastname}
                                  onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Email Address</label>
                                <input type="email" name="email"
                                  value={userInfo.email}
                                  onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Phone</label>
                                <input type="text" name="phone"
                                  value={userInfo.phone}
                                  onChange={handleChange} />
                              </div>
                            </div>

                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Edit Info</button>
                            </div>
                          </div>
                        </form>
                      </Accordion.Body>
                    </Accordion.Item>




                    <Accordion.Item eventKey="2" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Modify your address book entries
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Address Book Entries</h4>
                          </div>
                          {addressitems.length === 0 ?
                            <p>Address book is empty</p>
                            :
                            <div className="entries-wrapper">
                              {addressitems?.map((item, index) => (

                                <div className="row" key={index}>
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-info text-center">
                                      <p>{item.firstname}</p>
                                      <p>{item.housenumber}</p>
                                      <p>{item.streetaddress}</p>
                                      <p>{item.district}</p>
                                      <p>{item.pincode}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-edit-delete text-center">
                                      <button className="edit" onClick={() => handleEditAddress(item._id)}>Edit</button>
                                      <button onClick={() => handleRemoveAddress(item._id)}>Delete</button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          }
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button onClick={() => handleOpenNewAddress()}>Add Address</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
          <AddressModel ismodel={ismodel} onCloseModal={onCloseModal} addressId={addressId} />
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
