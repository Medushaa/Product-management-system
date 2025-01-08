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
exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const productCode_1 = require("../utils/productCode");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, discount, image, status, category } = req.body;
        const categoryExists = yield Category_1.default.findById(category);
        if (!categoryExists) {
            res.status(400).json({ error: 'Invalid category' });
            return;
        }
        const productCode = (0, productCode_1.generateProductCode)(name);
        const product = new Product_1.default({ name, description, price, discount, image, status, productCode, category });
        yield product.save();
        res.status(201).json({ product });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating product', details: error });
    }
});
exports.createProduct = createProduct;
