const Course = require('../models/Course.js');
const User = require('../models/User.js');

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser= await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({
            username,
            password
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const {title,description,price,imageLink}=req.body;

        const course = await Course.create({
            title,
            description,
            price,
            imageLink
        })

        res.status(201).json({ message: 'Course created successfully', courseId: course._id });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const allcourses = await Course.find({});
        res.status(200).json({ allcourses });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};