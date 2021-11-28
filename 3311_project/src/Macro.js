import React,{useState} from 'react';
import "./Macro.css";
import Navbar from './Navbar';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Use yup resolver for input validation


export default function Macro()
{
    const schema = yup.object().shape({
        age: yup.number().required(),
        weight: yup.number().required(),
        feet: yup.number().required('Enter the feet'),
        inches: yup.number().required()
      });
      
    const {register, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    // create useStates for all input fields
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState('Male'); 
    const [Weight, setWeight] = useState("");
    const [HeightFT,setHeightFT] = useState("");
    const [HeightIN,setHeightIN] = useState("");
    const [Activity, setActivity] = useState('Sedentary');
    const [Goal, setGoal] = useState('Maintain');

    // create useStates for results
    const [Final_Calories, setCalories] = useState(0);
    const [Final_Protein, setProtein] = useState(0);
    const [Final_Carb, setCarb] = useState(0);
    const [Final_Fat, setFat] = useState(0);

    // create map for activity levels and their corresponding numbers
    // which will be used in the calculation
    let Activity_Levels = new Map();
    Activity_Levels.set("Sedentary",1.2);
    Activity_Levels.set("Lightly Active",1.375);
    Activity_Levels.set("Moderately Active",1.55);
    Activity_Levels.set("Active",1.725);
    Activity_Levels.set("Very Active",1.9);
    Activity_Levels.set("Athlete",2.4);

    //initialize results to 0
    var Calories = 0;
    var Carbs = 0;
    var Fats = 0;
    var Protein = 0;

    function CalculateMacros()
    {   
        // Convert all input to number type and store in corresponding variables
        var weight = Number(Weight);
        weight = (weight/2.205);
        var Height = ((Number(HeightFT)*12) + (Number(HeightIN))) * 2.54;
        var age = Number(Age);

        // Men - Formula to calculate calories
        // 66.5 + 13.75 *(weight in kg) + 5.003*(height in cm) - 6.755*(Age)
        if(Gender === "Male")
        {
            Calories = 66.5 + 13.75 *(weight) + 5.003*(Height) - 6.755*(age);
        }
        // Women - Formula to calculate calories
        // 655.1 + 9.563 *(weight in kg) + 1.85*(height in cm) - 4.676*(Age)
        if(Gender === "Female")
        {
            Calories = 655.1 + (9.563 *(weight)) + (1.85*(Height)) - (4.676*(age));
        }

        // Final calculation for calories depends on activity level
        Calories = Calories * Activity_Levels.get(Activity);

        // Calculate Calories, Protein, Fats, and Carbs based on fitness goal
        if(Goal === "Lose Weight")
        {
            // 500 deficit per day equals 1 lb weight loss per week
            Calories = Calories - 500;
            Protein = weight * 2.6;
            Fats = (Calories * 0.2) / 9;
            Carbs = (Calories - (Protein*4) - (Fats*9)) / 4;
        }
        if(Goal === "Gain Weight")
        {
            // 500 surplus per day equals 1 lb weight gain per week
            Calories = Calories + 500;
            Protein = weight * 2.4;
            Fats = (Calories * 0.3) / 9;
            Carbs = (Calories - (Protein*4) - (Fats*9)) / 4;
        }
        if(Goal === "Maintain Weight")
        {
            // No change in calories
            Protein = weight * 2.5;
            Fats = (Calories * 0.25) / 9;
            Carbs = (Calories - (Protein*4) - (Fats*9)) / 4;
        }
        
        // Update results
        setCalories(Math.round(Calories));
        setCarb(Math.round(Carbs));
        setFat(Math.round(Fats));
        setProtein(Math.round(Protein));
    }

    const searchEntered = (e) =>
    {
        e.preventDefault();
        CalculateMacros();
    }

    return (
        <div className="macro">
            <Navbar/>
            <h1>Macro Calculator</h1>
            <form className = "macroForm" onSubmit={searchEntered}>
                <div className = "input_1">
                    <label>
                        Age:
                        <input 
                            {...register("age")}
                            required
                            className = "age"
                            type="text"
                            pattern="[0-9]*"
                            placeholder = "25"
                            value = {Age} 
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <p>{errors.age?.message}</p>
                    </label>
                    <label>
                        Weight:    
                        <input 
                            {...register("weight")}
                            required
                            type="text"
                            pattern="[0-9]*"
                            className = "weight"
                            placeholder = "Pounds"
                            value = {Weight} 
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <p>{errors.weight?.message}</p>
                    </label>
                    <label>
                        Height:    
                        <input 
                            {...register("feet")}
                            required
                            type="text"
                            pattern="[0-9]*"
                            className = "height"
                            placeholder = "Feet" 
                            value = {HeightFT}
                            onChange={(e) => setHeightFT(e.target.value)}
                            
                        />
                        <span>{errors.feet?.message}</span>
                         <input 
                            {...register("inches")}
                            required
                            type="text"
                            pattern="[0-9]*"
                            className = "height"
                            placeholder = "Inches"
                            value = {HeightIN} 
                            onChange={(e) => setHeightIN(e.target.value)}
                        />
                        <span>{errors.inches?.message}</span>
                    </label>
                    
                </div>
                <br/>
                <div className = "input_2">
                    <label className = "gender_label">
                        Gender:
                        <input 
                            type="radio"
                            className = "gender"
                            value = "Male"
                            name = "gender_value"
                            onClick={()=> setGender("Male")}
                            checked = {Gender === "Male"}
                        /> Male
                        <input 
                            type="radio"
                            className = "gender"
                            name = "gender_value"
                            value = "Female"
                            onClick={()=> setGender("Female")}
                            checked = {Gender === "Female"}
                            
                        /> Female
                    </label>
                </div>
                <div className = "input_3">
                    <label className = "activity_label">
                        Daily Activity Levels:
                        <select className="activity" onChange={(e) => {setActivity(e.target.value)}}> 
                            <option value="Sedentary">
                                Sedentary
                            </option>
                            <option value="Lightly Active">
                                Lightly Active
                            </option>
                            <option value="Moderately Active">
                                Moderately Active
                            </option>
                            <option value="Active">
                                Active
                            </option>
                            <option value="Very Active">
                                Very Active
                            </option>
                            <option value="Athlete">
                                Athlete
                            </option>
                        </select>
                    </label>
                    <label className = "goal_label">
                        Fitness Goal:
                        <select className="goal" onChange={(e) => {setGoal(e.target.value)}}> 
                            <option value="Lose Weight">
                                Lose Weight
                            </option>
                            <option value="Maintain Weight">
                                Maintain Weight
                            </option>
                            <option value="Gain Weight">
                                Gain Weight
                            </option>
                        </select>
                        <button className="searchButton" type = "submit">
                            Calculate
                        </button>
                    </label>
                </div>
            </form>
            <div className = "chart_title">
                <h3>Activity Chart</h3>
                <div  className = "chart">
                    <h5>Sedentary:    Little/No Exercise + Desk Job </h5>
                    <h5>Lightly Active:    Exercise 1-2 Times per Week</h5>
                    
                    <h5>Moderately Active:    Exercise 2-3 Times per Week</h5>
                
                    <h5>Active:    Exercise 4-5 Times per Week</h5>
            
                    <h5>Very Active:    Exercise 4-5 Times per Week + Physical Job</h5>
            
                    <h5>Athlete:    Exercise 6-7 Times Per Week</h5>
                </div>
            </div>
            <div className = "disp_macros">
                <h3>{Final_Calories} Calories</h3>
                <h3> 
                <span className="carb_color"></span> {Final_Carb} g Carbs
                </h3>
                <h3>
                <span className="fat_color"></span> {Final_Fat} g Fats
                </h3>
                <h3>
                <span className="protein_color"></span> {Final_Protein} g Protein
                </h3>
            </div>
            
        </div>
    )
}