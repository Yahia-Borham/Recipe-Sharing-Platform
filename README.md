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
- Seeding / importing sample recipes
- Known issues & recommended fixes
- Contribution & license

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
