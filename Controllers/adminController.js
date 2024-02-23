const Course = require('../models/Course.js');

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