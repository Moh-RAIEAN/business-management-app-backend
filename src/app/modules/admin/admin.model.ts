import mongoose from 'mongoose';
import { IAdmin, IAdminModel } from './admin.interface';
import applyDefaultSchema from '../../../helpers/applyDefaultSchema';

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      _id: false,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.statics.isExist = async (): Promise<boolean> => {
  const isExist = await Admin.find({}).count();
  return isExist > 0;
};

applyDefaultSchema(adminSchema);

const Admin = mongoose.model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin;
