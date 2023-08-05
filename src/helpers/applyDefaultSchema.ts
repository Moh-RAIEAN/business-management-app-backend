import { Schema } from 'mongoose';

const applyDefaultSchema = (schema: Schema): void => {
  schema.set('toJSON', {
    transform: function (doc, ret) {
      ret.__v = undefined;
      ret.createdAt = undefined;
      ret.updatedAt = undefined;
      ret.password = undefined;
    },
  });

  schema.set('toObject', {
    transform: function (doc, ret) {
      ret.__v = undefined;
      ret.createdAt = undefined;
      ret.password = undefined;
    },
  });
};

export default applyDefaultSchema;
