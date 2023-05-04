const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
   
    //Number1
     const newRecipe = await Recipe.create({
      title:"Bitoque",
      level:"UltraPro Chef",
      ingredients:["Beef","French fries","fried egg","rice"],
      cuisine:"Portuguese",
      dishType:"main_course",
      duration: 10,
      creator:"Bernardo",
      
     })

     console.log(`Created recipe: ${Recipe.title}`);

     //Number2
     const allRecipes = await Recipe.insertMany(data);
  
     allRecipes.forEach(recipe => {
      console.log(`Inserted recipe with title "${recipe.title}" into the database`);
    });
    
    console.log(`Inserted ${allRecipes.length} recipes into the database`);
     
     //number3

     const updateRigatoni = await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100});
     console.log("Update sucessfull!")

     //number 5

     const removeCarrot = await Recipe.findOneAndDelete({title:"Carrot Cake"})
     console.log("Delete Sucessfull")

     mongoose.connection.close(()=> console.log("closing"))
    




     } catch (error) {
    console.log(error);
  }
};

manageRecipes()
