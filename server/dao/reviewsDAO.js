import mongodb from "mongodb";
//allow me to convert a string to mongodb ObjectId
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  //initiali connect to the db
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      //try to connect to the db
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.error(
        `Unable to establish a collection hanldle in userDAO: ${e}`
      );
    }
  }
  //add a review
  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: ObjectId(restaurantId),
      };
      // console.log(reviewDoc);
      const result = await reviews.insertOne(reviewDoc);
      // console.log(result);
      return result;
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
  //update a review
  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return delteResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }
}
