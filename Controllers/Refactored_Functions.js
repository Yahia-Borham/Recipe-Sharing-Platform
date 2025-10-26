



const Upgraded_Error = require("./../utilities/Upgraded Error Object")
const jwt = require("jsonwebtoken");
const { promisify } = require("util");



/*User_Controller.js******************************************************/

const F_Find_All_Recipes = RecipesModule => async (req, res, next) => {

    var All_Recipes;
    All_Recipes = RecipesModule.find()
    var { page, limit } = req.query || 0;
    page = page * 1;
    limit = limit * 1;
    const skipdoc = (page - 1) * limit;
    const resultpage = await All_Recipes.skip(skipdoc).limit(limit)
    const docnum = await RecipesModule.countDocuments();
    if (skipdoc >= docnum) {
        return next(new Upgraded_Error("page not found", 404));
    } else {
        res.status(200).json({
            PageNumber: `${page}`,
            Status: "Successed",
            pageData: resultpage
        })
    }

}

const F_Find_Recipe = RecipesModule => async (req, res, next) => {

    const recipe = await RecipesModule.findOne(req.params);
    if (recipe === null)
        return next(new Upgraded_Error("Recipe not found, plz provide valied chef&recipe name", 404));
    res.status(200).json({
        Status: "Successed",
        Recipe: recipe
    });

}

const F_FilterSort_Recipes = RecipesModule => async (req, res, next) => {

    var filter_Fields = req.query;
    let sortFields
    let ingredients;
    if (filter_Fields["ingredient"]) {
        ingredients = Object.assign({}, { ingredient: filter_Fields["ingredient"] });
        delete filter_Fields["ingredient"]
    }
    if (filter_Fields["quantity"]) {
        if (ingredients)
            ingredients = Object.assign(ingredients, { quantity: filter_Fields["quantity"] });
        else
            ingredients = Object.assign({}, { quantity: filter_Fields["quantity"] });

        delete filter_Fields["quantity"]
    }
    if (filter_Fields["measurement"]) {
        if (ingredients)
            ingredients = Object.assign(ingredients, { measurement: filter_Fields["measurement"] });
        else
            ingredients = Object.assign({}, { measurement: filter_Fields["measurement"] });
        delete filter_Fields["measurement"]
    }
    if (filter_Fields["sort"]) {
        sortFields = Object.assign({}, { sortFields: filter_Fields["sort"] });
        delete filter_Fields["sort"]
    }
    if (ingredients)
        filter_Fields = Object.assign(filter_Fields, { recipe_ingredients: { $elemMatch: ingredients } });

    if (Object.keys(filter_Fields).length === 0)
        filter_Fields = null


    var filteredRecipes
    if (filter_Fields === null && sortFields === undefined)
        filteredRecipes = await RecipesModule.find();
    else if (filter_Fields && sortFields === undefined)
        filteredRecipes = await RecipesModule.find(filter_Fields).select("-__v");
    else if (filter_Fields === null && sortFields)
        filteredRecipes = await RecipesModule.find().sort(sortFields.sortFields);
    else
        filteredRecipes = await RecipesModule.find(filter_Fields).sort(sortFields.sortFields).select("-__v");
    console.log(filteredRecipes)
    res.status(200).json({
        Status: "Success",
        Filtered_Data: filteredRecipes
    })


}

/*User_Controller.js******************************************************/

const F_Create_Review = (RecipesModule, ReviewModule) => async (req, res, next) => {

    try {
        let recipe = await RecipesModule.findOne(req.params);
        if (!recipe) return next(new Upgraded_Error('You enterned a wrong recipe name or chef name', 400));

        req.body.recipe_id = recipe.id;
        req.body.recipe_name = recipe.recipe_name;
        req.body.chef_name = recipe.chef_name;
        req.body.name = req.user.name

        let createdData;
        try {
            createdData = await ReviewModule.create(req.body);
        } catch (err) {
            return next(new Upgraded_Error(err.message, 500));
        }

        const review = await ReviewModule.findById(createdData.id).select('-__v -_id');
        res.status(201).json({ Status: 'Successed', Review: review });
    } catch (err) {
        return next(new Upgraded_Error(err.message, 500));
    }

};

const F_Edit_Review = (RecipesModule, ReviewModule) => async (req, res, next) => {

    let updatedReview
    const recipe = await RecipesModule.findOne(req.params);
    if (!recipe) return next(new Upgraded_Error('You enterned a wrong recipe name or chef name', 400));
    try {
        updatedReview = await ReviewModule.findOneAndUpdate({ name: req.user.name, recipe_name: req.params.recipe_name }, req.body, {
            new: true,
            runValidators: true
        }).select('-_id');
    } catch (err) {
        return next(new Upgraded_Error(err.message, 500));
    }
    if (updatedReview === null)
        return next(new Upgraded_Error("You didn't write a review yet", 400))

    if (req.body.rating && typeof updatedReview.updateRecipeRating === 'function')
        await updatedReview.updateRecipeRating(recipe._id);

    res.status(200).json({
        Status: 'Success',
        Updated_Data: updatedReview
    });

};


const F_Delete_Review = (RecipesModule, ReviewsModule) => async (req, res, next) => {

    let deletedReview
    const recipe = await RecipesModule.findOne(req.params)
    if (recipe === null)
        return next(new Upgraded_Error("You enterned a wrong recipe name or chef name", 400))
    try {
        deletedReview = await ReviewsModule.findOneAndDelete({ name: req.user.name, chef_name: req.params.chef_name, recipe_name: req.params.recipe_name },
            {
                new: true
            }
        )
    } catch (err) {
        return next(new Upgraded_Error(err.message, 500))
    }

    await ReviewsModule.calculateAverage(recipe._id)
    res.status(204).json({
        Status: "Success",
        Deleted_Data: deletedReview
    })

}


const F_Edit_User_Data = (UserModule) => async (req, res, next) => {
    try {
        let updatedData;
        let userToUpdate = await UserModule.findOne({ name: req.user.name })
        if (!userToUpdate)
            return next(new Upgraded_Error('User not found', 404));

        if (req.body.password && req.body.passconfirmation) {
            userToUpdate.password = req.body.password;
            userToUpdate.passconfirmation = req.body.passconfirmation;
            userToUpdate.passchangetime = Date.now();
            await userToUpdate.save();
            delete req.body.password;
            delete req.body.passconfirmation;
        } else if (req.body.password && !req.body.passconfirmation) {
            return next(new Upgraded_Error('Plz provide both password and passconfirmation'));
        } else if (!req.body.password && req.body.passconfirmation) {
            return next(new Upgraded_Error('Plz provide both password and passconfirmation'));
        }

        try {
            updatedData = await UserModule.findOneAndUpdate({ name: req.user.name }, req.body, {
                new: true,
                runValidators: true
            });
        } catch (err) {
            return next(new Upgraded_Error(err.message, 500));
        }

        res.status(200).json({ Status: 'Success', UpdatedData: updatedData });
    } catch (err) {
        return next(new Upgraded_Error(err.message, 500));
    }
};

/*User_Controller.js******************************************************/

/*Chef_Controller.js.js******************************************************/

const F_Create_Recipe = RecipesModule => async (req, res, next) => {

    req.body.chef_name = req.user.name
    let newRecipe
    try {
        newRecipe = await RecipesModule.create(req.body);
    } catch (err) {
        return next(new Upgraded_Error(err.message, 500));
    }

    res.status(201).json({
        Status: " data Created successfully",
        Data: newRecipe
    })

}

const F_Update_Recipe = RecipesModule => async (req, res, next) => {

    let updatedData
    let recipe_ingredients = Object.assign({}, req.body.recipe_ingredients);
    recipe_ingredients = Object.values(recipe_ingredients);
    delete req.body.recipe_ingredients;
    try {
        updatedData = await RecipesModule.findOneAndUpdate(req.params, req.body, {
            new: true,
            runValidators: true
        });
    } catch (err) {
        return next(new Upgraded_Error(err.message, 500))
    }
    if (updatedData === null)
        return next(new Upgraded_Error("You enterned a wrong recipe name or chef name", 400))

    recipe_ingredients.forEach(element => {

        updatedData.recipe_ingredients[element.index - 1].quantity = element.quantity;
        updatedData.recipe_ingredients[element.index - 1].ingredient = element.ingredient;
        updatedData.recipe_ingredients[element.index - 1].measurement = element.measurement;

    })

    updatedData.save();
    res.status(200).json({
        Status: "successed",
        Updated_Data: updatedData
    })

}


const F_Delete_Recipe = RecipesModule => async (req, res, next) => {

    let deletedRecipe
    if (req.params.recipe_name) {
        deletedRecipe
        try {
            deletedRecipe = await RecipesModule.findOneAndDelete({ chef_name: req.user.name, recipe_name: req.params.recipe_name })
            if (deletedRecipe === null)
                return next(new Upgraded_Error("Worng recipe, plz enter a recipe you created"))
        } catch (err) {
            return next(new Upgraded_Error(err.message, 500))
        }
    } else
        return next(new Upgraded_Error("Plz enter the recipe you want to delete "))
    console.log(deletedRecipe)
    res.status(204).json({
        Status: "Success",
        Deleted_Recipe: deletedRecipe
    })

}

/*Chef_Controller.js.js******************************************************/

/*Signup&Login_Controller.js******************************************************/

const F_Signup = UserModule => async (req, res, next) => {

    let signedUser;
    try {
        signedUser = await UserModule.create(req.body);
    } catch (err) {
        return next(new Upgraded_Error(err.message, 500));
    }
    const token = await jwt.sign(
        {
            name: signedUser.name
        },
        process.env.JWT_SCRET,
        {
            expiresIn: process.env.EXPIRATION_DATE
        })
    res.status(201).json({
        Status: "Signed up successfully",
        token: token
    })

}


const F_login = (UserModule) => async (req, res, next) => {

    let token;
    let logedUser
    if (req.body.name === undefined || req.body.password === undefined)
        return next(new Upgraded_Error("Plz provied both email and password", 400));
    logedUser = await UserModule.findOne({ name: req.body.name });
    if (logedUser === null)
        return next(new Upgraded_Error("You aren't signed up, plz signup frist", 404));
    if (await logedUser.verifypassword(req.body.password)) {
        token = jwt.sign({ name: req.body.name }, process.env.JWT_SCRET, {
            expiresIn: process.env.EXPIRATION_DATE
        });
        res.status(200).json({
            Status: "loged in successfully",
            token: token

        })
    }
    else
        return next(new Upgraded_Error("wrong password, plz check your password or reset it", 404));

}

const F_Authorizeatuion = (UserModule) => async (req, res, next) => {

    let payload
    if (!req.headers.authorization || undefined)
        return next(new Upgraded_Error("Plz signup or login frist to use this route", 401));
    const token = req.headers.authorization.split(" ")[1];
    try {
        payload = await promisify(jwt.verify)(token, process.env.JWT_SCRET);
    } catch (err) {
        return next(new Upgraded_Error("something went wrong with JWT, plz login again"))
    }
    if (! await UserModule.findOne({ name: payload.name }))
        return next(new Upgraded_Error("Plz login again if you changed your name", 401));
    else {
        const user = await UserModule.findOne({ name: payload.name })
        if (!await user.checkIfPassChange(payload.iat, user.passchangetime))
            return next(new Upgraded_Error("You changed your password recently, plz login again", 401));
        else {
            req.user = payload;
            next();
        }
    }

}


/*Signup&Login_Controller.js******************************************************/






module.exports = {
    /*User_Controller.js*/
    F_Find_All_Recipes: F_Find_All_Recipes,
    F_Find_Recipe: F_Find_Recipe,
    F_FilterSort_Recipes: F_FilterSort_Recipes,
    F_Create_Review: F_Create_Review,
    F_Edit_Review: F_Edit_Review,
    F_Edit_User_Data: F_Edit_User_Data,
    F_Delete_Review: F_Delete_Review,
    /*User_Controller.js*/

    /*Chef_Controller.js.js*/
    F_Create_Recipe: F_Create_Recipe,
    F_Update_Recipe: F_Update_Recipe,
    F_Delete_Recipe: F_Delete_Recipe,
    /*Chef_Controller.js.js*/

    /*Signup&Login_Controller.js*/
    F_Signup: F_Signup,
    F_login: F_login,
    F_Authorizeatuion: F_Authorizeatuion
};
