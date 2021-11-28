import React,{useState} from 'react'
import "./SampleMeal.css";
import Axios from 'axios';
import Navbar from './Navbar';
import Modal from 'react-modal';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  ingr: yup.string().required("Please enter main ingredient"),
  mincal: yup.number().required(),
  maxcal: yup.number().required()
}).required();
 

export default function SampleMeal() 
{

    const {register, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const [Ingredient, setIngredient] = useState("");
    //const [Calories, setCalories] = useState("");
    const [minCalories, setMinCalories] = useState("");
    const [maxCalories, setMaxCalories] = useState("");
    const [Diet,setDiet] = useState("None");
    const [Health, setHealth] = useState("None");
    const [Recipes, setRecipes] = useState([]);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    Modal.setAppElement('#root');

    //Temporarily store App key and ID here
    const APP_ID = "863b2ac2";
    const APP_KEY = "9594b361c94b3a5bf4e8c5988992a3b8";
    var URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${minCalories}-${maxCalories}`;
    
    const expandModal = (recipe) => {
        setSelectedRecipe(recipe);
        setModalIsOpen(true);
    }
    
    const closeModal = () => {
        setSelectedRecipe(null);
        setModalIsOpen(false);
    }

    async function getSampleMeals()
    {
        
        if(Diet === "None" && Health !== "None")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${minCalories}-${maxCalories}&health=${Health}`;
        }
        else if(Diet !== "None" && Health === "None")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${minCalories}-${maxCalories}&diet=${Diet}`;
        }
        else if(Diet !== "None" && Health !== "None")
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${minCalories}-${maxCalories}&diet=${Diet}&health=${Health}`;
        }
        else
        {
            URL = `https://api.edamam.com/search?q=${Ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=${minCalories}-${maxCalories}`;
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

    const modalStyles ={
        overlay: {
            backgroundColor: 'black'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    return (
        <div className="sampleMeal">
            <Navbar/>
            <h1>Sample Meal</h1>
            <form className="searchForm" onSubmit={searchEntered}>
                <input 
                    {...register("ingr")}
                    required
                    pattern="[a-zA-Z]*"
                    className = "ingredientFilter"
                    type="text" 
                    placeholder="Enter Main Ingredient"
                    value = {Ingredient} 
                    onChange={(e) => setIngredient(e.target.value)}
                />
                <p>{errors.ingr?.message}</p>
                <input 
                    {...register("mincal")}
                    required
                    pattern="[0-9]*"
                    className = "calorieFilter"
                    type="text" 
                    placeholder="Minimum Calories"
                    value = {minCalories} 
                    onChange={(e) => setMinCalories(e.target.value)}
                />
                <p>{errors.mincal?.message}</p>
                <input 
                    {...register("maxcal")}
                    required
                    pattern="[0-9]*"
                    className = "calorieFilter"
                    type="text" 
                    placeholder="Maximum Calories"
                    value = {maxCalories} 
                    onChange={(e) => setMaxCalories(e.target.value)}
                />
                <p>{errors.maxcal?.message}</p>
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
                    <div className = "calories">
                        {Math.round((curr_recipe.recipe.calories)/curr_recipe.recipe.yield)}
                            <span className = "kcal"> kCal </span>
                    </div>
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
                    <div> 
                        <a className = "URL" href= {curr_recipe.recipe.url} target="_blank" rel="noopener noreferrer"> View Recipe </a>
                    </div>
                    <img className = "image" src={curr_recipe.recipe.image} alt=""/>
                    <br/>
                    <button className="searchButton" onClick={() => expandModal(curr_recipe)}>Ingredients</button>                   
                    <Modal isOpen={modalIsOpen} 
                        onRequestClose={closeModal}
                        style={modalStyles}>
                            <h2>Ingredients</h2>
                            <ul>
                                {
                                    selectedRecipe && selectedRecipe.recipe.ingredients.map(ingredient => (
                                    
                                        <li>{ingredient.text}</li>
                                        
                                    ))
                                }
                            </ul>
                            <div>
                                <button className="searchButton" onClick={closeModal}>Close</button>
                            </div>
                    </Modal>
                </div>
            ))}
        </div>
    )
}
