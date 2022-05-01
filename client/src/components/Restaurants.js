import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import RestaurantDataService from "../services/restaurants"
export default function Restaurants(props) {
  
    
    const initialRestaurantState = {
        id: null,
        name: "",
        address: {},
        cuisine: "",
        reviews: []
    };
    const [restaurant,setRestaurant] = useState(initialRestaurantState);
    let { id } = useParams();
    let location  = useLocation();
    console.log(id)
    console.log(location);
    console.log("props in Restaurants",props);
    const getRestaurant = id => {
        RestaurantDataService.get(id).then(response =>{
            setRestaurant(response.data);
            console.log(response.data);
        }).catch(e =>{
            console.log(e);
        });
    };
    useEffect(() => {
        getRestaurant(id);
    },[]);

    //get the reviewId and the index from the review array
    const deleteReview = (reviewId,index) => {
        RestaurantDataService.deleteReview(reviewId,props.user.id).then(response =>{
            setRestaurant((prevState) => {
                prevState.reviews.splice(index,1)
                return({
                    ...prevState
                })
            })
        }).catch(e => {
            console.log(e);
        });
    };
  return (
    <div>
        {restaurant ? (
            <div>
                <h5>{restaurant.name}</h5>
                <p>
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street} {restaurant.address.zipcode}<br/>
                </p>
                <Link to={"/restaurants/" + id + "/review"} className="btn btn-primary">
                     Add Review
                </Link>
                <h4>Reviews</h4>
                <div className="row">
                    {restaurant.reviews.length > 0 ? (
                        restaurant.reviews.map((review,index) =>{
                            return (
                                <div className="col-lg-4 pb-1" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {review.text}<br/>
                                                <strong>User: </strong>{review.name}<br/>
                                                <strong>Date: </strong>{review.date}<br/>
                                            </p>
                                            {props.user && props.user.id === review.user_id && 
                                            <div className="row">
                                                <a href="#" onClick={() =>deleteReview(review._id,index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                                <Link to={`/restaurants/${id}/review`} state={{currentReview: review}}
                                                     
                                              className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                )                       
                :
                (
                  <div>
                      <p>No reviews yet.</p>
                  </div>  
                )}
                </div>

            </div>
        ):
        (
                    <div>
                        <br/>
                        <p>No restaurant selected.</p>
                    </div>
        )}
        </div>
        )
    }