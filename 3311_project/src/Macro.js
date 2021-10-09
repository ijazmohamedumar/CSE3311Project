import React,{useState} from 'react';
import "./Macro.css";
import Navbar from './Navbar';

export default function Macro()
{
    const [Age, setAge] = useState(0);
    const [Gender, setGender] = useState('Male'); 
    const [Weight, setWeight] = useState(0);
    const [HeightFT,setHeightFT] = useState(0);
    const [HeightIN,setHeightIN] = useState(0);
    const [Activity, setActivity] = useState('Sedentary');
    const [Goal, setGoal] = useState('Maintain');
    const [Final_Calories, setCalories] = useState(0);
    const [Final_Protein, setProtein] = useState(0);
    const [Final_Carb, setCarb] = useState(0);
    const [Final_Fat, setFat] = useState(0);

    let Activity_Levels = new Map();
    Activity_Levels.set("Sedentary",1.2);
    Activity_Levels.set("Lightly Active",1.375);
    Activity_Levels.set("Moderately Active",1.55);
    Activity_Levels.set("Active",1.725);
    Activity_Levels.set("Very Active",1.9);
    Activity_Levels.set("Athlete",2.4);

   
    var Calories = 0;
    var Carbs = 0;
    var Fats = 0;
    var Protein = 0;

    function CalculateMacros()
    {   
        var weight = Weight;
        weight = (weight/2.205);
        var Height = ((HeightFT*12) + (HeightIN)) * 2.54;
        var age = Age;

        // men
        // 66.5 + 13.75 *(weight in kg) + 5.003*(height in cm) - 6.755*(Age)
        if(Gender === "Male")
        {

            Calories = 66.5 + 13.75 *(weight) + 5.003*(Height) - 6.755*(age);
        }
        //women
        //655.1 + 9.563 *(weight in kg) + 1.85*(height in cm) - 4.676*(Age)
        if(Gender === "Female")
        {
            Calories = 655.1 + (9.563 *(weight)) + (1.85*(Height)) - (4.676*(age));
        }

        Calories = Calories * Activity_Levels.get(Activity);
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
                        Enter Age:
                        <input 
                            type="text"
                            className = "age"
                            value = {Age} 
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Enter Weight in lbs:    
                        <input 
                            type="text"
                            className = "weight"
                            value = {Weight} 
                            onChange={(e) => setWeight(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Enter Height:    
                        <input 
                            type="text"
                            className = "height"
                            placeholder = "Feet"
                            value = {HeightFT} 
                            onChange={(e) => setHeightFT(Number(e.target.value))}

                        />
                         <input 
                            type="text"
                            className = "height"
                            placeholder = "Inches"
                            value = {HeightIN} 
                            onChange={(e) => setHeightIN(Number(e.target.value))}
                        />
                    </label>
                    
                </div>
                <br/>
                <div className = "input_2">
                    <label className = "gender_label">
                        Enter Gender:
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
