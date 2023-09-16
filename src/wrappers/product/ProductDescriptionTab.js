import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Rating from '@mui/material/Rating';
import { useState } from "react";
const ProductDescriptionTab = (props) => {
  const [rating, setRating] = useState(5)
  return (
    <div className={clsx("description-review-area", props.spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews(2)</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Material</span> {props.material}
                    </li>
                    <li>
                      <span>Packset</span>10 x 10 x 15 cm{props.packset}
                    </li>
                    <li>
                      {/* <span>Occasion</span> {props.occasion.map((data) => data)} */}
                      <span>Occasion</span> {props.occasion.map((data) => data)}
                    </li>
                    {props.otherinfo && (
                      <li>
                        <span>Other Info</span> {props.otherinfo}
                      </li>
                    )}
                    {/* <li>
                      <span>Other Info</span> {props.otherinfo}
                    </li> */}
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {props.productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    {props.product.ratings.map((product) => (
                      <div className="review-wrapper">
                        <div className="single-review">
                          <div className="review-img">
                            <img src={"/assets/img/testimonial/1.jpg"} alt="" />
                          </div>
                          <div className="review-content">
                            <div className="review-top-wrap">
                              <div className="review-left">
                                <div className="review-name">
                                  <h4>{product.postedby}</h4>
                                </div>
                                <div className="review-rating">

                                  <Rating name="size-small" defaultValue={product.star} size="small" readOnly
                                  />

                                </div>
                              </div>
                              <div className="review-left">
                                <button>Reply</button>
                              </div>
                            </div>
                            <div className="review-bottom">
                              <p>
                                {product.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form action="#">
                          <div className="star-box">
                            <span>Your rating: </span>
                            <div className="ratting-star">
                              <Rating
                                defaultValue={rating} size="small"
                                onChange={(event, newValue) => {
                                  setRating(newValue);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">

                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  name="Your Review"
                                  placeholder="Comments"
                                  defaultValue={""}
                                />
                                <input type="submit" defaultValue="Save" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div> */}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
