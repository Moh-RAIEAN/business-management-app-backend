/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
export const ProductRoutes = router;
