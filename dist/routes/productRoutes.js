"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product")); // relative path from server.ts
const router = express_1.default.Router();
router.get('/products', (req, res) => {
    res.send('List of products');
});
router.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, discount, image, status, productCode, category } = req.body;
    try {
        // Create a new product instance
        const newProduct = new Product_1.default({
            name,
            description,
            price,
            discount,
            image,
            status,
            productCode,
            category
        });
        // Save to the database
        yield newProduct.save();
        // Send a response with the created product
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
}));
exports.default = router;
