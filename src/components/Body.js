import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    //local state variable - Super powerful variable
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


    console.log("Body Rendered",listOfRestaurant);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async()=>{
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.46310&lng=80.34790&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json=await data.json();

        console.log(json);
        setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) {
  return (
    <h1>
      Looks like you're offline!! Please check your internet connection;
    </h1>
  );
}

    if(listOfRestaurant.length===0){
        return <Shimmer />;
    }

    return(
        <div className="body">
            <div className="filter flex">
                <div className="search p-4">
                    <input type="text" 
                           className="border border-solid border-black" 
                           value={searchText}
                           onChange={(e)=>{
                            setSearchText(e.target.value);
                           }}
                    />
                    <button className="px-4 py-1 bg-green-100 m-4 rounded-lg"
                    onClick={()=>{
                        //filter the restaurant cards and update the UI
                        //searchText
                        console.log(searchText);

                        const filteredRestaurant = listOfRestaurant.filter((res)=>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurant(filteredRestaurant);
                    }}
                    >
                      Search
                    </button>
                </div>
                <div className="m-4 flex items-center">
                    <button 
                  className="px-4 py-1 bg bg-gray-100 rounded-lg" 
                  onClick={()=>{
                    const filteredList = listOfRestaurant.filter(
                        (res)=> res.info.avgRating > 4
                    );
                    setFilteredRestaurant(filteredList);
                }}
                >
                    Top Rated Restaurants
                </button>
                </div>
            </div>
            <div className="flex flex-wrap">
                {
                    filteredRestaurant.map((restaurant) =>(
                    <Link key={restaurant.info.id} 
                          to={"/restaurants/" + restaurant.info.id}
                    >
                        {restaurant.info.promoted ? (
                          <RestaurantCardPromoted resData={restaurant}/>
                          ) : (
                          <RestaurantCard resData={restaurant}/>
                        )}

                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;

