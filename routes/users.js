const express = require('express');
const router = express.Router();


let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(users);
});

function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-')
  return new Date(yyyy + "/" + mm + "/" + dd);
}

router.get("/sort", (req, res) => {
  
  let sorted_users = users.sort(function (a, b) {
    let d1 = getDateFromString(a.DOB);
    let d2 = getDateFromString(b.DOB);
    return d1 - d2;
  });
  
  res.send(sorted_users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  // to get the user based on specified email
  let email = req.params.email;
  let chooseUser = users.find((user) => user.email === email);
  res.send(chooseUser);
});

// GET by specific ID request: Retrieve a single user with lastName
router.get("/lastName/:lastName", (req, res) => {

  const lastName = req.params.lastName;
  const chooseUser = users.find((user) => user.lastName === lastName);
  res.send(chooseUser);
});

// POST request: Create a new user
router.post("/", (req, res) => {

  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });

  res.send("The user " + req.query.firstName + " Has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {

  const email = req.params.email;
  // get all needed param using array destructure
  const { DOB, firstName, lastName } = req.query;

  // get the old user index
  const index = users.findIndex((user) => user.email === email);

  if (index !== -1) {
    const user = users[index];
    // update the value with new value and check if ti not empty
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (DOB) user.DOB = DOB;

    // update the user in array
    users[index] = user;

    res.send(`User with the email ${email} updated.`);
  } else {
    res.send("Unable to find user!");
  }

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email !== email);

  res.send(`User with the email  ${email} deleted.`);
});

module.exports = router;
