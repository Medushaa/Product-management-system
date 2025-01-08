import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from './Category'; 

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  status: 'In Stock' | 'Stock Out';
  productCode: string; //will be generated in utils/productCode.ts
  category: ICategory | mongoose.Types.ObjectId; //reff to catagory model
}

const ProductSchema: Schema = new Schema({
  //unique name so, product code will genereated be unique too
  name: { type: String, required: true, unique: true }, 
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: String },
  status: { type: String, enum: ['In Stock', 'Stock Out'], default: 'In Stock' },
  productCode: { type: String, unique: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
