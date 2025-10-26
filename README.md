# Recipe Sharing Platform

Compact Node.js + Express + Mongoose application for creating, sharing and reviewing recipes.

- Entry point: [app.js](app.js)  
- Environment config: [config.env](config.env)  
- Packages: [package.json](package.json)

Table of contents
- Project overview
- Quick start
- Environment variables
- Running the app
- API routes (summary)
- Data model (modules)
- Error handling & utilities

Project overview
- Simple recipe-sharing REST API with role-based access ("user" / "chef") and JWT auth.
- Controllers are refactored into factories in [Controllers/Refactored_Functions.js](Controllers/Refactored_Functions.js):
  - [`Refactored_Functions.F_Find_All_Recipes`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Find_Recipe`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_FilterSort_Recipes`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Create_Review`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Edit_Review`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Delete_Review`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Edit_User_Data`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Create_Recipe`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Update_Recipe`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Delete_Recipe`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Signup`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_login`](Controllers/Refactored_Functions.js)
  - [`Refactored_Functions.F_Authorizeatuion`](Controllers/Refactored_Functions.js)

Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start with nodemon (recommended during development)
npx nodemon [app.js](http://_vscodecontentref_/0)
# or
node [app.js](http://_vscodecontentref_/1)

# filepath: [config.env](http://_vscodecontentref_/2)
USERNAME=Yahia
PORT=3000
DATABASEPASS=your_db_password_here
DATABASECONNECTION=mongodb+srv://<user>:<DATABASEPASS>@cluster0.bhihlky.mongodb.net/Recipe-Sharing-Platform?retryWrites=true&w=majority&appName=Cluster0
JWT_SCRET=always_stay_horny
EXPIRATION_DATE=90d

Running the app
App entry: app.js
Connects via utilities/Cluster_connection.js
Registers routes in Routes/Signup&Login_Route.js, Routes/User_Route.js, Routes/Chef_Route.js
Global error handler: [utilities/Error Handling Function.js](utilities/Error Handling Function.js)

API routes (Postman documentation summary)
- https://documenter.getpostman.com/view/43137819/2sB3Wk14ir
- https://documenter.getpostman.com/view/43137819/2sB3WmS28t

Data model (Modules)
Recipes: Modules/Recipes.js — schema fields: chef_name, recipe_name, recipe_ingredients[], recipe_steps[], publication_date (auto), ratings_average (auto), ratings_number (auto)
Reviews: Modules/Reviews.js — includes static method calculateAverage used to update recipe ratings
Users: Modules/Users.js — password hashing in pre-save hook, passconfirmation validator, verifypassword method, checkIfPassChange method

Error handling & utilities
Error wrapper object: [utilities/Upgraded Error Object.js](utilities/Upgraded Error Object.js) — exported Upgraded_Error
Global error handler middleware: [utilities/Error Handling Function.js](utilities/Error Handling Function.js)
DB connection helper: utilities/Cluster_connection.js
- https://documenter.getpostman.com/view/43137819/2sB3WmS28u

