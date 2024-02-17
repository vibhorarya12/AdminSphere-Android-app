const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");
const Admin = require("../models/Admin");
const Info = require("../models/Info"); //importing the Info model schema
const UserNotice = require("../models/UserNotice");
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const AdminNotice = require("../models/AdminNotice");
var fetchadmin = require("../middleware/fetchadmin");

//get all notes//
router.get("/allnotes", fetchadmin, async (req, res) => {
  try {
    const notesWithUsers = await Note.find().populate("user", "name email");
    res.json(notesWithUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all users//
router.get("/allusers", fetchadmin, async (req, res) => {
  try {
    const users = await User.find({}, "name email Date");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get notes by user id//
router.get("/notes/:userId", fetchadmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const notesForUser = await Note.find({ user: userId });

    if (!notesForUser || notesForUser.length === 0) {
      return res.status(404).json({ error: "Notes not found for the user" });
    }

    res.json(notesForUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get only notes//
router.get("/onlynotes", fetchadmin, async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

////create new admin///
router.post(
  "/createadmin",
  upload.single('image'), // Multer middleware for handling file uploads (optional)
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "password must have at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res.status(400).json({ success, errors: "User with this email already exists" });
      }

      let image = null;
      if (req.file) {
        image = req.file.buffer; 
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        image: image, // Assign image data if provided
      });

      const data = {
        admin: {
          id: admin.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);


/// admin login ////
router.post(
  "/adminlogin",
  [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ errors: "Invalid credentials!!" });
      }
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Invalid credentials!!" });
      }
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//getadmin//
router.post("/getadmin", fetchadmin, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    
    const imageBase64 = admin.image ? admin.image.toString('base64') : null;

    
    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      image: imageBase64,
      Date : admin.date ,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


// admin delete notes//
router.delete("/notes/:noteId", fetchadmin, async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    await Note.findByIdAndDelete(noteId);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update admin's password and name
router.put(
  "/updateadmin",
  fetchadmin,
  [
    body("name").isLength({ min: 3 }),
    body("password", "password must have at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { name, password } = req.body;
    const adminId = req.admin.id;

    try {
      let admin = await Admin.findById(adminId);

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Update name if provided
      if (name) {
        admin.name = name;
      }
    
      // Update password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        admin.password = secPass;
      }

      await admin.save();
      res.json({ message: "Admin details updated successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
// Delete user by ID
router.delete("/users/:userId", fetchadmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//update image
router.put(
  "/updateimage",
  fetchadmin,
  upload.single('image'), // Multer middleware for handling file uploads (optional)
  async (req, res) => {
    const adminId = req.admin.id;

    try {
      let admin = await Admin.findById(adminId);

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Update image if provided
      if (req.file) {
        admin.image = req.file.buffer;
        await admin.save();
        return res.json({ message: "Admin image updated successfully" });
      } else {
        return res.status(400).json({ error: "No image provided" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


//alladmins //routes for master//
router.get("/alladmins",  async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");

    const adminsWithBase64Image = admins.map(admin => {
      const imageBase64 = admin.image ? admin.image.toString('base64') : null;
      return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        image: imageBase64,
        Date: admin.date,
      };
    });

    res.json(adminsWithBase64Image);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//delete admin by id//
router.delete("/deleteadmin/:adminId",  async (req, res) => {
  const adminId = req.params.adminId;

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    await Admin.findByIdAndDelete(adminId);
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create admin logs
router.post(
  "/createinfo",
  fetchadmin,
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("description").isLength({ min: 5 }).withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
     
      const adminId = req.admin.id;

     
      const { title, description } = req.body;

      
      const info = new Info({
        user: adminId,
        title,
        description,
      });

      
      await info.save();

      res.json({ message: "Info created successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
//fetch info logs for admin
router.get("/myinfo", fetchadmin, async (req, res) => {
  try {
    // Get admin ID from the authenticated request
    const adminId = req.admin.id;

    // Find the corresponding Info documents for the admin
    const info = await Info.find({ user: adminId }).select("title description Date");

    if (!info || info.length === 0) {
      return res.status(404).json({ error: "Info not found for the admin" });
    }

    // Prepare response JSON with array of info records including title, description, and date
    const response = info.map(item => ({
      title: item.title,
      description: item.description,
      date: item.Date,
    }));

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch admin info by ID without using fetchadmin middleware
router.get("/admininfo/:adminId", async (req, res) => {
  try {
    const adminId = req.params.adminId;

    // Find the corresponding Info documents for the admin
    const info = await Info.find({ user: adminId }).select("title description Date");

    if (!info || info.length === 0) {
      return res.status(404).json({ error: "Info not found for the admin" });
    }

    // Prepare response JSON with an array of info records including title, description, and date
    const response = info.map(item => ({
      title: item.title,
      description: item.description,
      date: item.Date,
    }));

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create AdminNotice
router.post(
  "/adminnotice",
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("description").isLength({ min: 5 }).withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description } = req.body;

      const adminNotice = new AdminNotice({
        title,
        description,
      });

      await adminNotice.save();

      res.json({ message: "Admin Notice created successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Get all AdminNotices //
router.get("/adminnotices", async (req, res) => {
  try {
    const adminNotices = await AdminNotice.find({});
    adminNotices.sort((a, b) => b.date - a.date);
    res.json(adminNotices);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/usernotice",
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("description").isLength({ min: 5 }).withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description } = req.body;

      const userNotice = new UserNotice({
        title,
        description,
      });

      await userNotice.save();

      res.json({ message: "User Notice created successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
//get all user notices//
router.get("/allnotices", async (req, res) => {
  try {
    const userNotices = await UserNotice.find({}).select("title description date");

    // Sort user notices by date in descending order
    userNotices.sort((a, b) => b.date - a.date);

    res.json(userNotices);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
