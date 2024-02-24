const express = require ("express");
const router = express.Router();
const userController = require('../Controllers/userController.js')
const authController = require('../Controllers/authContoller.js')

router.post('/signup',userController.signup);
router.post('/signin',authController.signIn);
router.get('/courses',userController.listCourses);
router.post('/buyCourses',userController.purchaseCourse);
router.get('/yourCourses',userController.listPurchasedCourses);

module.exports=router;