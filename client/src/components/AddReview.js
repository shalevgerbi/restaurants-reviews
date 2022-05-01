import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurants";

export default function AddReview(props) {
  let initialReviewState = "";
  let location = useLocation();
  let { id } = useParams();
  let editing = false;
  console.log(props);
  console.log(location.state)

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text;
  }
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };

  const saveReview = () => {
    let data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id,
    };
    if (editing) {
      data.review_id = location.state.currentReview._id;
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((res) => {
          setSubmitted(true);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link
                to={"/restaurants/" + id}
                className="btn btn-success"
              >
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
}
