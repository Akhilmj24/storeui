import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { putApi } from "../../service/axiosCall";
import { apiProduct } from "../../service/api";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";
export default function RatingModel({ ismodel, onCloseModal, id }) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState(null);
  const { userdata } = useSelector((state) => state.login);
  const handleSaveRating = (event) => {
    event.preventDefault();
    const data = {
      star: rating,
      comment: comments,
      postedby: userdata._id,
    };
    putApi(data, `${apiProduct.saverating}${id}`)
      .then((res) => {
        cogoToast.success("Rating saved", { position: "bottom-left" });
        onCloseModal();
      })
      .catch((err) => console.error(err));
  };
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
            <div className="ratting-form-wrapper">
              <h3>Add a Review</h3>
              <div className="ratting-form">
                <form onSubmit={handleSaveRating}>
                  <div className="star-box">
                    <span>Your rating: </span>
                    <div className="ratting-star">
                      <Rating
                        defaultValue={rating}
                        size="small"
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
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        />
                        <input type="submit" defaultValue="Save" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
