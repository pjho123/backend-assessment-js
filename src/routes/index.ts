import { AutoRouter, cors } from 'itty-router';
import ProductsController from '../controllers/product';
import validateUserToken from '../middlewares/validate-token';
import dbConnect from '../middlewares/db-connect';
import { logError, logRequest, logResponse } from '../middlewares/log-middleware';

const { preflight, corsify } = cors()

const router = AutoRouter({
  before: [preflight, logRequest, validateUserToken, dbConnect],
  finally: [logResponse, corsify],
  catch: logError,
});

router.get('/api/products', ProductsController.get);
router.post('/api/products', ProductsController.create);
router.put('/api/products', ProductsController.update);
router.delete('/api/products/:product_id', ProductsController.delete);

export default router;
