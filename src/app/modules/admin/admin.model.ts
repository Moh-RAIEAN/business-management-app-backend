import mongoose from 'mongoose';
import { IAdmin, IAdminModel } from './admin.interface';
import applyDefaultSchema from '../../../helpers/applyDefaultSchema';

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    adminId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

adminSchema.statics.isExist = async (): Promise<boolean> => {
  const isExist = await Admin.find({}).count();
  return isExist > 0;
};

applyDefaultSchema(adminSchema);

const Admin = mongoose.model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin;
