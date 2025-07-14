import RestaurantCard from "./RestaurantCard";
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";

const Body = () => {
    //local state variable - Super powerful variable
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

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
    }
    
    if(listOfRestaurant.length===0){
        return <Shimmer />;
    }

    return(
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" 
                           className="search-box" 
                           value={searchText}
                           onChange={(e)=>{
                            setSearchText(e.target.value);
                           }}
                    />
                    <button
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
                <button 
                  className="filter-btn" 
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
            <div className="res-container">
                {
                    filteredRestaurant.map((restaurant) =>(
                    <Link key={restaurant.info.id} 
                          to={"/restaurants/" + restaurant.info.id}
                    >
                        <RestaurantCard resData={restaurant}/>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;

