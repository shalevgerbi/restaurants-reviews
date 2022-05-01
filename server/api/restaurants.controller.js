import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
    static async apiGetRestaurants(req,res,next){
        const restaurantPerPage = req.query.restaurantPerPage ? parseInt(req.query.restaurantPerPage,10) : 20;
        const page = req.query.page ? parseInt(req.query.page,10) : 0;

        let filters = {}
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine
        }
        else if(req.query.zipcode){
             filters.zipcode = req.query.zipcode
        }
        else if (req.query.name){
            filters.name = req.query.name;
        }
        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantPerPage,
        });
        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response)
    }
    static async apiGetRestaurantById(req,res,next){
        try{
            //params is after the slash (/) query is after (?)
            let id = req.params.id || {}
            let restaurant = await RestaurantsDAO.getRestaurantByID(id)
            if(!restaurant){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(restaurant)
        }
        catch(e){
            console.log(`api, ${e}`);
            res.status(500).json({error: e})
        }
    }
    static async apiGetRestaurantCuisines(req,res,next){
        try{
            //params is after the slash (/) query is after (?)
            
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines)
        }
        catch(e){
            console.log(`api, ${e}`);
            res.status(500).json({error: e})
        }
    }

}