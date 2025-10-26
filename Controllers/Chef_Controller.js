

const Recipes = require("../Modules/Recipes");
const Factory_Functions = require("./Refactored_Functions");





const Create_Recipe = Factory_Functions.F_Create_Recipe(Recipes)

const Update_Recipe = Factory_Functions.F_Update_Recipe(Recipes)

const Delete_Recipe = Factory_Functions.F_Delete_Recipe(Recipes)

module.exports = {
    Create_Recipe: Create_Recipe,
    Update_Recipe: Update_Recipe,
    Delete_Recipe: Delete_Recipe
}
