const Recipes = require("../Modules/Recipes");
const Reviews = require("../Modules/Reviews");
const Users = require("../Modules/Users");
const Factory_Functions = require("./Refactored_Functions")





const Find_All_Recipes = Factory_Functions.F_Find_All_Recipes(Recipes)

const Find_Recipe = Factory_Functions.F_Find_Recipe(Recipes)

const FilterSort_Recipes = Factory_Functions.F_FilterSort_Recipes(Recipes)

const Create_Review = Factory_Functions.F_Create_Review(Recipes, Reviews)

const Edit_Review = Factory_Functions.F_Edit_Review(Recipes, Reviews)

const Delete_Review = Factory_Functions.F_Delete_Review(Recipes, Reviews)

const Edit_User_Data = Factory_Functions.F_Edit_User_Data(Users)


module.exports = {
    Find_All_Recipes: Find_All_Recipes,
    FilterSort_Recipes: FilterSort_Recipes,
    Create_Review: Create_Review,
    Find_Recipe: Find_Recipe,
    Edit_Review: Edit_Review,
    Delete_Review: Delete_Review,
    Edit_User_Data: Edit_User_Data
}
