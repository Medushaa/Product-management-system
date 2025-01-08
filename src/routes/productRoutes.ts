import express, { Request, Response } from 'express';
import { createProduct, updateProduct, getFilteredProducts } from '../controllers/productController'; 
import Product from '../models/Product';

const router = express.Router();


// GET route to list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the DB
    res.status(200).json(products); // Send them as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: (error as Error).message });
  }
});

// create a new product
router.post('/', createProduct); // in productController

// to update product
router.patch('/:productCode', updateProduct);

//GET http://localhost:5000/api/products/exists/f31de62-0as0 
router.get('/exists/:productCode', async (req: Request<{ productCode: string }>, res: Response) => {
  const { productCode } = req.params;
  try {
    const productExists = await Product.exists({ productCode }); 
    if (productExists) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking product existence', error: (error as Error).message });
  }
});

//filter by category, name and shows final price
//GET /api/products/filter?name=phone&category=electronics
router.get('/filter', getFilteredProducts);  


export default router;

