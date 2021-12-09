import { Router } from 'express';
import { productsController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/', productsController.getProducts);

router.get(
  '/listar/:id?',
  productsController.checkProductExists,
  productsController.getProducts
);

router.post(
  '/agregar',
  [checkAdmin, productsController.checkAddProducts],
  productsController.addProducts
);

router.put(
  '/actualizar/:id',
  [checkAdmin, productsController.checkProductExists],
  productsController.updateProducts
);

router.delete(
  '/borrar/:id',
  [checkAdmin, productsController.checkProductExists],
  productsController.deleteProducts
);

export default router;
