const Product = require('../models/Product');
const cloudinary = require('../config/cloudinaryConfig');

//add a new product
const createProduct = async(req, res)=>{
    try {
        const {name, description, price, quantity, category} = req.body;
        let imageUrl = '';

        //upload image to cloudinary if provided
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder : 'farmify_products'
            });
            imageUrl = result.secure_url;
        }

        //creat a new product
        const product = await Product.create({
            name, 
            description, 
            price, 
            quantity,
            category,
            farmer : req.user._id,
            image : imageUrl
        })

        res.status(201).json({
            success : true,
            message : 'Product created successfully',
            data : product
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Failed to create product'
        })
    }
}

//get all products public
const getProducts = async(req, res)=>{
    try {
        const products = await Product.find().populate('farmer', 'username email');
        res.status(200).json({
            success : true,
            message : 'Products fetched successfully',
            data : products
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Failed to fetch products'
        })
    }
}

//get single product by id
const getSingleProduct = async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id).populate('farmer', 'username email');
        if(!product){
            return res.status(404).json({
                success : false,
                message : 'Product not found by this ID'
            })
        }
        res.status(200).json({
            success : true,
            message : 'Product fetched successfully',
            data : product
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Failed to fetch product'
        })
    }
}

//update a product only by farmer
const updateProduct = async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                success : false,
                message : 'Product not found'
            })
        }

        //only farmer can update this product
        if(product.farmer.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success : false,
                message : 'Not authorized to update this product'
            })
        }

        const {name , description , price , quantity, category} = req.body;

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder : 'farmify_products'
            });
            product.image = result.secure_url;
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;

        await product.save();

        res.status(200).json({
            success : false,
            message : 'Product updated successfully'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Failed to update the product'
        })
    }
}

//delete a product only by farmer
const deleteProduct = async(req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({
                    success : false,
                    message : 'Product not found'
                })
        }
        //only farmers can delete product
        if(product.farmer.toString() !== req.user._id.toString()){
            return res.status(403).json({
                    success : false,
                    message : 'Not authorized to delete this product'
                })
        }

        //await product.remove();

        res.status(200).json({
            success : true,
            message : 'Product deleted successfully'
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong, Please Try Again'
        })
    }
}

module.exports = {createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct};