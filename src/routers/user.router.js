import { Router } from 'express';
const router = Router();
import { validateFields } from '../utils/http.validation.util';
import { validators, requireValidators } from '../validations/user.validations';
import controller from '../controllers/user.controllers';

router.get('/users/', validateFields([], validators), controller.find);

router.get('/users/:id', validateFields(['id'], validators), controller.findById);

router.post('/users/', validateFields(requireValidators, validators), controller.save);

router.put('/users/:id', validateFields(['id'], validators), controller.update);

router.delete('/users/:id', validateFields(['id'], validators), controller.remove);

export default router;
