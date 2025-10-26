



const mongoose = require("mongoose");
const { type } = require("os");
const { ref } = require("process");
const Recipes = require("./Recipes");
const { kMaxLength } = require("buffer");


const Reviews_Data = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        max: [10, "your maximum rating is 10"],
        min: [0, "your minimum rating is 10"]
    },
    review: {
        type: String,
        default: "",
        maxLength: [200, "your review can't execed 200 character"],
        minLength: [0, "your review can't execed 200 character"],
    },
    recipe_name: {
        type: String,
        required: true
    },
    chef_name: {
        type: String,
        required: true
    },
    recipe_id: {
        type: mongoose.Types.ObjectId,
        ref: Recipes
    }

})

Reviews_Data.index({
    name: 1,
    recipe_name: 1,
    chef_name: 1
}, {
    unique: true
});


Reviews_Data.statics.calculateAverage = async function (recipeId) {

    console.log(recipeId)
    console.log(this)
    const aggregatedData = await this.aggregate([
        {
            $match: {
                recipe_id: recipeId
            }
        }, {
            $group: {
                _id: "$recipe_id",
                ratingsnumber: { $sum: 1 },
                averageRatings: { $avg: "$rating" }
            }
        }
    ])
    await Recipes.findByIdAndUpdate(
        {
            _id: recipeId
        },
        {
            ratings_average: aggregatedData[0].averageRatings,
            ratings_number: aggregatedData[0].ratingsnumber
        },
        {
            new: true,
        }
    )

}

Reviews_Data.post("save", function (doc, next) {
    console.log(doc.recipe_id)
    this.constructor.calculateAverage(doc.recipe_id)
    next()
})


Reviews_Data.pre(/^find/, function (next) {
    this.select("-__v");
    next();
})



Reviews_Data.methods.updateRecipeRating = function (recipe_id) {

    this.constructor.calculateAverage(recipe_id)


}







const Reviews = mongoose.model("Reviews", Reviews_Data);
module.exports = Reviews;