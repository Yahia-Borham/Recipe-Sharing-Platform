const { default: mongoose, set } = require("mongoose");
const { type } = require("os");





const Recipes_Data = new mongoose.Schema({

    chef_name: {
        type: String,
        required: [true, "plz enter the chef name"],
        minLength: [1, "name must be at least one character"],
        maxlength: [30, "name must be lower than 31 character"]
    },
    recipe_name: {
        type: String,
        required: [true, "plz a recipe name"],
        minLength: [1, "recipe must be at least one character"],
        maxLength: [30, "recipe must be lower than 31 character"]
    }, ratings_average: {
        type: Number,
        default: 0,
        set: val => Math.round(val * 10) / 10
    }, ratings_number: {
        type: Number,
        default: 0
    },
    publication_date: {
        type: Date,
        default: Date.now
    },
    recipe_ingredients: [{
        quantity: {
            type: Number,
            required: [true, "plz provied a quantity"]
        },
        ingredient: {
            type: String,
            required: [true, "plz provied an ingredient"],
            minLength: [1, "name must be at least one character"],
            maxlength: [30, "name must be lower than 31 character"]
        },
        measurement: {
            type: String,
            required: [true, "plz provied a measurement unit"],
            lowercase: true,
            enum: {
                values: ["teaspoon", "tsp", "tablespoon", "tbsp", "cup", "c", "fluid ounce", "fl oz", "pint", "pt",
                    "quart", "qt", "gallon", "gal", "milliliter", "ml", "liter", "l", "ounce", "oz", "pound", "lb",
                    "gram", "g", "kilogram", "kg", " "],
                message: ["{VALUE} is not supported"]
            }
        }
    }],
    recipe_steps: [String],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
)

Recipes_Data.index({ chef_name: 1, recipe_name: 1 }, { unique: true })

Recipes_Data.virtual("reviews", {
    ref: "Reviews",
    foreignField: "recipe_id",
    localField: "_id"
})


Recipes_Data.pre(/^find/, function (next) {
    this.select("-__v");
    next();
})

Recipes_Data.pre("findOne", function (next) {

    this.populate({
        path: "reviews",
        select: "-recipe_name"
    })
    next()
})




const Recipes = mongoose.model("Recipes", Recipes_Data);
module.exports = Recipes;
