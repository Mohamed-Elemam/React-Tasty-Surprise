import { useEffect, useState } from "react";
import axios from "axios";

const MealDetails = () => {
  type ApiData = {
    strMealThumb: string;
    strMeal: string;
    strInstructions: string;
    strArea: string;
    strCategory: string;
    strSource: string;
    strYoutube: string;
  };
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState<unknown>();
  const [dishData, setDishData] = useState<ApiData>();
  const [randomMeal, setRandomMeal] = useState<ApiData>();
  const [loading, setLoading] = useState<boolean>(false);

  async function getKitchenMeals(kitchenStr: string) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        import.meta.env.VITE_API_LINK_GET_COUNTRY_MEALS + kitchenStr
      );
      setApiData(data.meals);
      console.log(data.meals);
    } catch (error: unknown) {
      console.log(error);
      setApiError(error);
    } finally {
      setLoading(false);
    }
  }
  async function getDish(mealStr: string) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        import.meta.env.VITE_API_LINK_GET_MEAL_DETAILS + mealStr
      );
      setDishData(data.meals[0]);
      console.log(data.meals);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getKitchenMeals("British");

    // getDishs();
  }, []);

  const kitchens: string[] = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Egyptian",
    "French",
    "Indian",
    "Italian",
  ];

  function getRandomMeal() {
    const number: number = Math.floor(Math.random() * (apiData?.length - 1));
    const dish = apiData[number]?.strMeal;
    getDish(dish);
  }

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center text-center container ">
        <h3>Feeling hungry</h3>
        <p></p>
        <details className="dropdown">
          <summary className="m-1 btn">open or close</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            {kitchens.map((kitchen, index) => (
              <li key={index}>
                <a>{kitchen}</a>
              </li>
            ))}
          </ul>
        </details>
        {loading ? (
          <button className="btn btn-warning">
            <span className="loading loading-spinner"></span>
          </button>
        ) : (
          <button
            onClick={() => {
              getRandomMeal();
            }}
            className="btn btn-warning"
          >
            Get Meal 🍖
          </button>
        )}
      </div>
      {/* <p className="text-warning">{apiError?}</p> */}
      {dishData?.strMeal}
   <div className="col-md-4">
<div className=" rounded-4">
  <div className=" meal-card">
    <img
      src={dishData?.strMealThumb}
      className="w-75 my-3 rounded-2"
    />

    <h1> {dishData?.strMeal} </h1>
  </div>
</div>
</div>
<div className="col-md-8">
<h2>Instructions</h2>
<p> {dishData?.strInstructions}</p>
<div>
  <span className="h2">Area :</span>
  <span className="h4"> {dishData?.strArea}</span>
</div>
<div>
  <span className="h2">Category :</span>
  <span className="h4"> {dishData?.strCategory}</span>
</div>
<h2>Recipes :</h2>

<a href={dishData?.strSource} className="btn btn-success me-3">
  Source
</a>
<a href={dishData?.strYoutube} className="btn btn-danger me-3">
  Youtube
</a>
</div> 
    </>
  );
};

export default MealDetails;


