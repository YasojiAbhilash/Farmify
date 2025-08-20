const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

//rputer
const router = express.Router();
//controllers
const {createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController');

//multer setup for file upload
const storage = multer.diskStorage({});
const upload = multer({storage});

//routes
router.get('/', getProducts);
router.get('/:id', getSingleProduct);
//protected routes
router.post('/', authMiddleware, roleMiddleware(['farmer']), upload.single('image'), createProduct);
router.put('/:id', authMiddleware, roleMiddleware(['farmer']), upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['farmer']), deleteProduct);

module.exports = router;
