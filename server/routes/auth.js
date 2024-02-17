const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv")
dotenv.config()
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
var fetchuser = require('../middleware/fetchuser');
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "password must have atleast 5 char ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, errors: "user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user:{
            id: user.id
        }
      }
     const authToken = jwt.sign(data,JWT_SECRET);
     
     
    //   res.json(user);
    success = true;
    res.json({success,authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//Authenticate user
router.post(
    '/login',
    [
      
      body("email",'enter valid email address').isEmail(),
      body("password", 'password cannot be blank').exists(),
      
    ],
    async (req, res) => {
      let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} =  req.body;
        try {
            let user =  await User.findOne({email});
            if(!user){
              success = false;
                return res.status(400).json({errors:"invalid credentials!!"});
            }
            const passwordComapre = await bcrypt.compare(password, user.password);
            if(!passwordComapre){
              success = false;
                return res.status(400).json({success,errors:"invalid credentials!!"});
            }
            const data = {
                user:{
                    id: user.id
                }
              }
             const authToken = jwt.sign(data,JWT_SECRET);
             success = true;
             res.json({success,authToken});
             

        } catch (error) {
            console.error(error.message);
      res.status(500).send("Internal server error");
        }
    })

//route 3:   ////
router.post('/getuser',fetchuser, async(req, res)=>{

try {
 const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
      res.status(500).send("Internal server error");
}

})
    

module.exports = router;
