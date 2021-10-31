# Expense Tracker

A project built with Node.js,Express and MongoDB

Can try on [HEROKU](https://shrieking-ghost-56084.herokuapp.com)


## Features
*  **REGISTER:** sign up an account with name, email, password
*  **LOGIN:** sign in to review your own expenses
*  **LOGOUT:** sign out the account by clicking the logout button
*  **CREATE:** record your expense (with item name, date, category, amount) at the create page 
*  **READ:** review all the expenses at the home page
*  **UPDATE:** click the edit button to modify expense's data
*  **DELETE:** click the delete button to delete the expense
*  **FILTER:** filter the expenses by category

## Installation and Execution
1.  Clone the files to your computer
```
git clone https://github.com/azod2/expense-tracker
```
2. Init: install the npm packages
```
cd expense-tracker
```
```
npm install
```
3. Rename .env.example file


4. Insert seeder
```
npm run seed
```
5. Run the project
```
npm run dev
```
- While the terminal returns `Express is listening on localhost:3000`, please visit http://localhost:3000 on your browser.


## Dummy user data
#### After inserting the seeder, you may use the following dummy data to experience this web application.
| Email              | Password |
| -------------------| ---------|
| user1@example.com  | 12345678 |
| user2@example.com  | 12345678 |


## Prerequisites
*  [Visual Studio Code](https://code.visualstudio.com/) - development environment
*  [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/) - JavaScript runtime environment
*  [Express.js](https://expressjs.com/) - web application framework
*  [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - template engine
*  [MongoDB](https://www.mongodb.com/) - document-oriented database
*  [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool(OBM)
*  [body-parser](https://www.npmjs.com/package/body-parser) - middleware
*  [method-override](https://www.npmjs.com/package/method-override) - middleware
*  [express-session](https://www.npmjs.com/package/express-session) - middleware
*  [passport](http://www.passportjs.org/) - authentication middleware for Node.js
*  [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - middleware
*  [Facebook for Developer](https://developers.facebook.com/) - get APP_ID & APP_SECRET for passport-facebook
