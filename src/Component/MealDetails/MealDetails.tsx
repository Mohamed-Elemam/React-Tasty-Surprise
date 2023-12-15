import { ApiData } from "../GenerateSection/types";

const MealDetails = ({ mealData }: { mealData: ApiData }) => {
  const recipeIngredients: string[] = [];
  const recipeMeasurements: string[] = [];

  for (const key in mealData) {
    if (
      Object.prototype.hasOwnProperty.call(mealData, key) &&
      key.startsWith("strIngredient")
    ) {
      const ingredient = mealData[key];
      if (ingredient && typeof ingredient === "string") {
        recipeIngredients.push(ingredient);
      }
    }

    if (
      Object.prototype.hasOwnProperty.call(mealData, key) &&
      key.startsWith("strMeasure")
    ) {
      const measurement = mealData[key];
      if (measurement && typeof measurement === "string") {
        recipeMeasurements.push(measurement);
      }
    }
  }

  return (
    <>
      {mealData ? (
        <div className="container">
          <div>
            <div className=" text-center text-white text-3xl font-bold">
              <h1> {mealData?.strMeal} </h1>

              {mealData?.strMealThumb.length ? (
                <img
                  src={mealData?.strMealThumb}
                  alt={mealData?.strMeal}
                  className="md:w-1/4 w-1/2 my-3 rounded-md mx-auto"
                />
              ) : (
                <div className="skeleton md:w-1/4 w-1/2 md:h-[320px] h-[300px]  my-3 rounded-md mx-auto"></div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="md:min-w-[45%]">
              <h2 className="text-warning text-2xl font-semibold my-2">
                Recipes :
              </h2>
              <ul>
                {recipeIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="p-2 text-white font-semibold space-y-0"
                  >
                    {recipeMeasurements[index]} of {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:min-w-[45%]">
              <h2 className="text-warning text-2xl font-semibold my-2">
                Instructions
              </h2>
              <p className="p-2 text-white font-semibold">
                {mealData?.strInstructions}
              </p>
            </div>
          </div>
          <div className=" py-4 mx-auto text-center">
            <a
              href={mealData?.strSource}
              className="btn btn-outline btn-warning me-3"
              target="_blank"
            >
              Source
            </a>
            <a
              href={mealData?.strYoutube}
              className="btn btn-outline btn-error me-3"
              target="_blank"
            >
              Youtube
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MealDetails;
