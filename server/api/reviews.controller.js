import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    static async apiPostReview(req,res,next) {
        try{
            //get information from the body
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date();
            //send information to ReviewsDAO
            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )
            res.json({status: "success"});
            // console.log(ReviewResponse);
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }
    static async apiUpdateReview(req,res,next) {
        try{
            //get information from the body
            const reviewId = req.body.review_id;
            const text = req.body.text;
            const date = new Date();

            //send information to ReviewsDAO
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )
            let {error} = reviewResponse;
            if(error){
                res.status(400).json({error});
            }
            if(reviewResponse.modifiedCount === 0){
                throw new Error("Unable to update review - user may not be original poster")
            }
            res.json({status: "success"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }
    static async apiDeleteReview(req,res,next) {
        try{
            //get information from the query parameter
            const reviewId = req.query.id;
            //get user_id from the body
            const user_id = req.body.user_id;
            console.log(reviewId)

            //send information to ReviewsDAO
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                user_id,
            )
            res.json({status: "success"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }
    
}