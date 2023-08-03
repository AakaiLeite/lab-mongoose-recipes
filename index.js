const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    let hollandaiseRecipe = await Recipe.create({
      title: "Blender Hollandaise Sauce",
      level: "Easy Peasy",
      ingredients: [
        "3 Egg Yolks",
        "tablespoon of Lemon Juice",
        "Dijon Mustard",
        "Hot Pepper Sauce",
        "Stick of Butter",
      ],
      cuisine: "French",
      dishType: "other",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8811651.jpg&q=60&c=sc&orient=true&poi=auto&h=512",
      duration: 5,
      creator: "Chellebelle",
    });
    console.log(hollandaiseRecipe.title);
    let recipesData = await Recipe.insertMany(data);
    recipesData.forEach((recipe) => console.log(recipe));
    Recipe.findByIdAndUpdate("64cbc43f288bd53d83466dae", { duration: 100 });
    console.log("Updated Duration of Rigatoni alla Genovese");
    Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Deleted Carrot Cake");
    const disconnect = async () => {
      await mongoose.connection.close();
    };
    disconnect()
      .then((res) => console.log("Disconnected from Database"))
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
