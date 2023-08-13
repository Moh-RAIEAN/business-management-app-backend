/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ProductCategoryController } from './productCategory.controller';

const router = Router();

router.get('/', ProductCategoryController.getProductCategories);
router.get('/:id', ProductCategoryController.getProductCategory);

export const ProductCategoryRoutes = router;
