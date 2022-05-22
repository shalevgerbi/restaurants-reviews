import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let restaurants;

export default class RestaurantsDAO {
  //initiali connect to the db
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      //try to connect to the db
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(
        `Unable to establish a collection hanldle in restaurantsDAO: ${e}`
      );
    }
  }
  //search by name, cuisine or zipcode
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 50,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        //if someone does a text search i  will pass to name
        query = { $text: { $search: filters["name"] } };
      }
      //if the cuisine from the db equals the cuisine from search
      else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`Unable to issue find command ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    //limit the results //to get the page number we do skip
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);
    try {
      const restaurantsList = await displayCursor.toArray();
      //get the total number of restaurants
      const totalNumRestaurants = await restaurants.countDocuments(query);
      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
  static async getRestaurantByID(id) {
    try {
      //create a pipeline that help match different collections
      //mongoDB aggregation pipeline
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                //find all the reviews that match restaurant_id
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];
      return await restaurants.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID ${e}`);
      throw e;
    }
  }
  static async getCuisines() {
    let cuisines = [];
    try {
      //get all the distinct cuisines
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
