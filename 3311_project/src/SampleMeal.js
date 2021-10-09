import React,{useState} from 'react'
import "./SampleMeal.css";
import Axios from 'axios';
import Navbar from './Navbar';



export default function SampleMeal() 
{
    const [Ingredient, setIngredient] = useState("");
    const [Calories, setCalories] = useState("");
    const [Diet,setDiet] = useState("None");
    const [Health, setHealth] = useState("None");
    const [Recipes, setRecipes] = useState([]);

    //Temporarily store App key and ID here
    const APP_ID = "863b2ac2";
    const APP_KEY = "9594b361c94b3a5bf4e8c5988992a3b8";
    var URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=0-${Calories}`;
    
     

    async function getSampleMeals()
    {
        
        if(Diet === "None" && Health !== "None")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=0-${Calories}&health=${Health}`;
        }
        else if(Diet !== "None" && Health === "None")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=0-${Calories}&diet=${Diet}`;
        }
        else if(Diet !== "None" && Health !== "None")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=0-${Calories}&diet=${Diet}&health=${Health}`;
        }
        else
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=0-${Calories}`;
        }
        
        var output = await Axios.get(URL);
        //const recipe_data = URL.json();
        //setRecipes(recipe_data.hits);
        output = JSON.parse(JSON.stringify(output));
        const data = output.data.hits;

        
        setRecipes(data);
        console.log(data);
        
    }

    const searchEntered = (e) =>
    {
        e.preventDefault();
        getSampleMeals();
    }

    return (
        <div className="sampleMeal">
            <Navbar/>
            <h1>Sample Meal</h1>
            <form className="searchForm" onSubmit={searchEntered}>
                <input 
                    className = "ingredientFilter"
                    type="text" 
                    placeholder="Enter Main Ingredient"
                    value = {Ingredient} 
                    onChange={(e) => setIngredient(e.target.value)}
                />
                <input 
                    className = "calorieFilter"
                    type="text" 
                    placeholder="Enter Calories"
                    value = {Calories} 
                    onChange={(e) => setCalories(e.target.value)}
                />
                <label>
                    Diet Filter:
                    <select className="dietFilter" onChange={(e) => {setDiet(e.target.value)}}> 
                        <option value="None">
                            None
                        </option>
                        <option value="high-protein">
                            High-Protein
                        </option>
                        <option value="low-carb">
                            Low Carb
                        </option>
                        <option value="low-fat">
                            Low Fat
                        </option>
                    </select>
                </label>
                <label>
                    Health Filter:
                    <select className="healthFilter" onChange={(e) => {setHealth(e.target.value)}}> 
                        <option value="None">
                            None
                        </option>
                        <option value="vegan">
                            Vegan
                        </option>
                        <option value="keto-friendly">
                            Keto
                        </option>
                        <option value="vegetarian">
                            Vegetarian
                        </option>
                        <option value="dairy-free">
                            Dairy-Free
                        </option>
                        <option value="gluten-free">
                            Gluten-Free
                        </option>
                        <option value="peanut-free">
                            Peanut-Free
                        </option>
                        <option value="soy-free">
                            Soy-Free
                        </option>
                    </select>
                </label>
                <button className="searchButton" type = "submit">
                    Search
                </button>
            </form>
            {Recipes.map(curr_recipe =>(
                <div className = "recipe">
                    <h2 className = "recipe_title">{curr_recipe.recipe.label}</h2>
                    <p2>Calories: {Math.round((curr_recipe.recipe.calories)/curr_recipe.recipe.yield)}</p2>
                    <div className = "disp_macros_info">
                        <p>
                            <span className="carb_color"></span> 
                            {Math.round((curr_recipe.recipe.totalNutrients.CHOCDF.quantity)/curr_recipe.recipe.yield)} g  Carbs
                        </p>
                        <p>
                            <span className="fat_color"></span> 
                            {Math.round((curr_recipe.recipe.totalNutrients.FAT.quantity)/curr_recipe.recipe.yield)} g Fats
                        </p>
                        <p>
                            <span className="protein_color"></span> 
                            {Math.round((curr_recipe.recipe.totalNutrients.PROCNT.quantity)/curr_recipe.recipe.yield)} g Protein 
                        </p>
                    </div>
                    <img className = "image" src={curr_recipe.recipe.image} alt=""/>
                    
                </div>
            ))}
        </div>
    )
}
