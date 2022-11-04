const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const db = require("../db/db").mongoURI;
const users = require("../routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");
require("../db/passport")(passport);

const initialApp = () => {
  app.listen(port, () => console.log("server is running on port 🔥", port));
};

const initializeDatabase = () => {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("connected to db 😎"))
    .catch(() => console.log("error building the pipe to db 🥹"));
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api/users", users);

initialApp();
initializeDatabase();

// nodejs is a runtime
// express is just a web framework for building apis
// -> routing system
// -> middlwares
// -> host our react app in express

// backend:
//  -> routes ( -> '/' )
//  -> controllers ( -> is a way to render like a function in that route )
//  -> views (return json)
//  -> database (postgresql, mysql, )

// Databases :

// -> SQL database
// -> using sql for running the queries
// -> using table relationnal database
// -> indexes ( so we use index to retrive data more quiclky)
// when the data is sorted, we can access an entry in 10000 row, in millionseconds

// const binary_search = (target, nums, low, high) => {
//   nums = [1, 2, 3, 5, 6, 7, 8];
//   if (low > high) {
//     // checking
//     return;
//   } else {
//     3 = (nums.length - 1) / 2; // calculate middle number  7 / 2 = 4
//     if (mid == nums[target]) {
//       return nums[target];
//     }
//     if (mid > target) {
//       return binary_search(target, nums, low + 1, high);
//     } else {
//       // is for search the right half
//       return binary_search(target, nums, low, high - 1);
//     }
//   }
// };

// -> NO-SQL database
// -> a document based database (collections ...)
// -> faster than sql database because it's using document based model for storing the data

// Discord Example

// models

// controllers

// views ( this is not in the backend, but the json is the view layer)

// routes
