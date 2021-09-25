import React,{useState} from 'react'
import "./SampleMeal.css";
import Axios from 'axios';


export default function SampleMeal() 
{
    const [Ingredient, setIngredient] = useState("");
    const [Calories, setCalories] = useState("");
    const [Diet,setDiet] = useState("");
    const [Health, setHealth] = useState("");


    //Temporarily store App key and ID here
    const APP_ID = "863b2ac2";
    const APP_KEY = "9594b361c94b3a5bf4e8c5988992a3b8";
    var URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${Calories}`;
   
 

    async function getSampleMeals()
    {
        /*
        if(Diet === "none" && Health !== "none")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${Calories}&health=${Health}`;
        }
        if(Diet !== "none" && Health === "none")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${Calories}&diet=${Diet}`;
        }
        if(Diet !== "none" && Health !== "none")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${Calories}&diet=${Diet}&health=${Health}`;
        }
        */
        var output = await Axios.get(URL);
        console.log(output.data); 
    }

    const searchEntered = (e) =>
    {
        e.preventDefault();
        getSampleMeals();
    }

    return (
        <div className="sampleMeal">
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
                    <select className="dietFilter"> 
                        <option value="none" onClick={()=> setDiet("none")}>
                            None
                        </option>
                        <option value="high-protein" onClick={()=> setDiet("high-protein")}>
                            High-Protein
                        </option>
                        <option value="low-carb" onClick={()=> setDiet("low-carb")}>
                            Low Carb
                        </option>
                        <option value="low-fat" onClick={()=> setDiet("low-fat")}>
                            Low Fat
                        </option>
                    </select>
                </label>
                <label>
                    Health Filter:
                    <select className="healthFilter"> 
                        <option value="none" onClick={()=> setHealth("none")}>
                            None
                        </option>
                        <option value="vegan" onClick={()=> setHealth("vegan")}>
                            Vegan
                        </option>
                        <option value="keto-friendly" onClick={()=> setHealth("keto-friendly")}>
                            Keto
                        </option>
                        <option value="vegetarian" onClick={()=> setHealth("vegetarian")}>
                            Vegetarian
                        </option>
                        <option value="dairy-free" onClick={()=> setHealth("dairy-free")}>
                            Dairy-Free
                        </option>
                        <option value="gluten-free" onClick={()=> setHealth("gluten-free")}>
                            Gluten-Free
                        </option>
                        <option value="peanut-free" onClick={()=> setHealth("peanut-free")}>
                            Peanut-Free
                        </option>
                        <option value="soy-free" onClick={()=> setHealth("soy-free")}>
                            Soy-Free
                        </option>
                    </select>
                </label>
                <button className="searchButton" type = "submit">
                    Search
                </button>
            </form> 
        </div>
    )
}
