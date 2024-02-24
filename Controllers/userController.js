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

exports.listCourses = async (req, res) => {
    try {
        const allcourses = await Course.find({});
        res.status(200).json({ allcourses });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.purchaseCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course not found!"});
        }

        const userId = req.user._id; 
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId);
        if(!user || user.balance < course.price){
            return res.status(403).json({ message: 'Insufficient balance' });
        }

        user.purchasedCourses.push(courseId);
        await user.save();

        user.balance -= course.price;
        await user.save();

        res.status(200).json({ message: 'Course purchased successfully' });
        
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.listPurchasedCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('purchasedCourses');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const purchasedCourses = user.purchasedCourses;
        res.status(200).json({ purchasedCourses });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};