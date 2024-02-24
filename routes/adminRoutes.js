const express = require ("express");
const router = express.Router();
const adminController = require('../Controllers/adminController.js')
const authController = require('../Controllers/authContoller.js')

router.post('/signup',adminController.signup);
router.post('/signin', authController.signIn);
router.post('/createCourse',adminController.createCourse);
router.get('/Courses',adminController.getAllCourses)

module.exports=router;