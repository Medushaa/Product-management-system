# Product Management System (Backend assessment)

This is a product management system built with **Express** and **MongoDB**, having product creation, updates, and filtering capabilities.


## Product creation
We use **MongoDB** as the database named `productdb`. The system has two main collections:

### Product Data Model

- `Product` (in `models/Product.ts`)
  - `name`: String (unique, so productCode generated will be unique too)
  - `description`: String
  - `price`: Number
  - `discount`: Number
  - `image`: String (URL or file path. It's better to store images in a file storage service like AWS S3 rather than directly in the database)
  - `status`: String (e.g., "In Stock", "Stock Out")
  - `productCode`: String (unique). Generated in part 2
  - `category`: ObjectId (references `_id` in the Category collection)
  
### Category Data Model

- `Category` (in `models/Category.ts`)
  - `name`: String (unique)

Controllers are used for adding new products and categories, editing and filter. `./controllers`

## Generating Product Code

The product code is generated using the following format:

```
<frist 7 chars of sha256Hash(name)>-<start_index><substring><end_index>
```
The code for generating the product code is in the `utils/productCode.ts` file, and you can test it by running `testCodeGen.ts` with `npx ts-node testProductCode.ts`. 

## Running the system
Ensure that **MongoDB** is running in the background.\
**Build**: `npx tsc`\
**Run**: `npx ts-node src/server.ts`

## API Endpoints
(the examples below for `http://localhost:5000`)

### 1. Adding New Category

- **POST** `http://localhost:5000/api/categories`
- **Body** (JSON):

```json
{
  "name": "Electronics"
}
```

### 2. Adding New Product

- **POST** `http://localhost:5000/api/products`
- **Body** (JSON):

```json
{
  "name": "Skibiduii",
  "description": "A cool new product",
  "price": 20,
  "discount": 5,
  "image": "https://example.com/image.jpg",
  "status": "In Stock",
  "category": "677dee1a442c040d0186c452" // category ID from MongoDB
}
```

### 3. Check if a Product Exists with productCode

- **GET** `http://localhost:5000/api/products/exists/f31de62-0as0`


### 4. Update Product

- **PATCH** `http://localhost:5000/api/products/:productId`
- **Body** (JSON):

```json
{
  "status": "Stock Out",
  "description": "Updated product description",
  "discount": 10
}
```

### 5. Filter Products

Filter products by **category** or **name** (case-insensitive). The response will also include the final price after applying the discount.

- **GET** `http://localhost:5000/api/products/filter?category=electronics`
- **GET** `http://localhost:5000/api/products/filter?name=asif`
- **GET** `http://localhost:5000/api/products/filter?category=electRonics&name=asif`

### Example response of filtering:

```json
{
  "_id": "677e294efadf97501a5e93b9",
  "name": "Asif",
  "description": "Updated product description",
  "price": 20,
  "discount": 10,
  "image": "https://example.com/asif.jpg",
  "status": "Stock Out",
  "productCode": "f31de62-0as0",
  "category": {
    "_id": "677e0ce97d0c1f08dc57324a",
    "name": "Electronics"
  },
  "createdAt": "2025-01-08T07:29:18.574Z",
  "updatedAt": "2025-01-08T10:14:04.194Z",
  "__v": 0,
  "originalPrice": 20,
  "finalPrice": "18.00"
}
```
