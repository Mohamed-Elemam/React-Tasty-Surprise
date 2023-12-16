import { useEffect, useState } from "react";
import axios from "axios";
import MealDetails from "../MealDetails/MealDetails";
import { ApiData } from "./types";

const kitchens: string[] = [
  "American",
  "British",
  "Canadian",
  "Chinese",
  "French",
  "Indian",
  "Italian",
];
const GenerateSection = () => {
  const [KitchenMeals, setKitchenMeals] = useState<ApiData[]>([]);
  const [mealData, setMealData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  async function getKitchenMeals(kitchenStr: string) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        import.meta.env.VITE_API_LINK_GET_COUNTRY_MEALS+kitchenStr
      );
      setKitchenMeals(data.meals);
    } catch (error: unknown) {
      setApiError(
        "There was a problem fetching the meal data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }
  async function getDish(mealStr: string) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        import.meta.env.VITE_API_LINK_GET_MEAL_DETAILS+mealStr
      );
      setMealData(data.meals[0]);
    } catch (error: unknown) {
      setApiError(
        "There was a problem fetching the meal data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getKitchenMeals("Egyptian");
  }, []);

  function getRandomMeal() {
    const number: number = Math.floor(
      Math.random() * (KitchenMeals?.length - 1) || 0
    );
    const dish = KitchenMeals[number]?.strMeal;
    getDish(dish);
  }

  return (
    <>
      <section id="section2" className="generate-section">
        <div className="generate-layer">
          <div className="flex flex-col gap-5 justify-center items-center text-center container py-5">
            <h3 className="my-3 text-white text-4xl font-semibold">
              Start discovering delicious recipes
            </h3>
            <p className="text-white text-3xl font-semibold">
              Choose Your Favorite Food Area
            </p>
            <select
              className="select select-warning w-full max-w-xs"
              onChange={(e) => getKitchenMeals(e.target.value)}
            >
              <option selected value="Egyptian" >Egyptian</option>
              {kitchens.map((kitchen, index) => (
                <option key={index} value={kitchen}>
                  {kitchen}
                </option>
              ))}
            </select>
            {apiError && (
              <p className="text-2xl text-red-500 font-semibold  text-center">{apiError}</p>
            )}
            {loading ? (
              <button className="btn btn-warning">
                <span className="loading loading-spinner">loading</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  getRandomMeal();
                }}
                className="btn btn-warning cursor-pointer"
              >
                Get Recipe 🍖
              </button>
            )}
          </div>
          {mealData ? <MealDetails mealData={mealData} /> : null}
        </div>
      </section>
    </>
  );
};

export default GenerateSection;
