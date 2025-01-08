import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';
import Category from '../models/Category';
import { generateProductCode } from '../utils/productCode';

//Tocreate new product with POST
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, discount, image, status, category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    const productCode = generateProductCode(name);
    const product = new Product({ name, description, price, discount, image, status, productCode, category });

    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error creating product', details: error });
  }
};

//update status, description, discount
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productCode } = req.params;
    const { status, description, discount } = req.body;

    const updatedProduct = await Product.findOneAndUpdate( //get the product by productCode
      { productCode }, 
      { status, description, discount }, //update
      { new: true, runValidators: true } //return the updated data
    );

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product', details: (error as Error).message });
  }
};


//filter by category, name 
export const getFilteredProducts = async (req: Request, res: Response): Promise<void> => {
  const { category, name } = req.query;

  try {
    const nameQuery = name ? { name: { $regex: new RegExp(name as string, 'i') } } : {};

    // get all the matching products. also have category name in it
    const products = await Product.find(nameQuery)
      .populate({ path: 'category', select: 'name' })  
      .lean();  //to get a plain JavaScript object

    // Filter by category name
    const filteredProducts = category
      ? products.filter(product => {
          const productCategory = product.category; 
          // Check if that category exists
          return productCategory && 'name' in productCategory && productCategory.name.toLowerCase() === (category as string).toLowerCase();
        })
      : products;

    // Calculate original and final price
    const productsWithPricing = filteredProducts.map(product => {
      const originalPrice = product.price;
      const finalPrice = originalPrice - (originalPrice * (product.discount / 100));
      return {
        ...product,
        originalPrice,
        finalPrice: finalPrice.toFixed(2),
      };
    });

    res.status(200).json(productsWithPricing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered products', error: (error as Error).message });
  }
};
