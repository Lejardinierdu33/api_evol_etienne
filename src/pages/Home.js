import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import logo from "./Kitchen_Meal2-removebg-preview.png";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [rangeValue, setRangeValue] = useState(5);
  const [sortMethod, setSortMethod] = useState(true);
  const [mealTab, setMealTab] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const tabMeal = async () => {
    const options = {
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/search.php",
      params: { s: searchValue },
    };

    const response = await axios.request(options);
    console.log(response.data.meals);
    setMealTab(response.data.meals);
  };

  useEffect(() => {
    tabMeal();
  }, []);

  return (
    <div>
      <nav>
        <img src={logo} alt="logo_site" />
        <div className="searchBar">
          <input
            type="text"
            placeholder="Rechercher..."
            defaultValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={() => tabMeal()}>
            <FaSearch />
          </button>
        </div>
      </nav>
      <header>
        <h1>Apprends à cuisiner avec Kitchen Meal</h1>
        <div className="container_option">
          <div className="container_range">
            <input
              type="range"
              min="1"
              max="20"
              id="range"
              defaultValue={rangeValue}
              onClick={(e) => setRangeValue(e.target.value)}
            />
            <span>{rangeValue}</span>
          </div>
          <div className="container_alpha">
            <button onClick={() => setSortMethod(!sortMethod)}>
              {sortMethod ? "A - Z" : "Z - A"}
            </button>
          </div>
        </div>
      </header>
      <section className="card_container">
        {mealTab &&
          mealTab
            .filter(
              (meal) =>
                meal.strInstructions.includes(searchValue) ||
                meal.strMeal.includes(searchValue) ||
                meal.strIngredient1.includes(searchValue)
            )
            .sort((a, b) => {
              if (sortMethod) {
                if (a.strMeal < b.strMeal) {
                  return -1;
                }
                return 1;
              } else {
                if (b.strMeal < a.strMeal) {
                  return -1;
                }
                return 1;
              }
            })
            .slice(0, rangeValue)
            .map((meal, key) => <Card meal={meal} key={key} />)}
      </section>
    </div>
  );
}

export default Home;
