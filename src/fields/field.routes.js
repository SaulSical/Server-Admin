import { Router} from 'express';
import { createField, getFields } from "./field.controller.js";
import { uploadFileImage } from '../../middlewares/file-uploder.js';
import { cleanUploaderFileOnFinish } from '../../middlewares/delete-file-on-error.js';
import { validate } from 'uuid';
import { validateCreateField } from '../../middlewares/validateCreateField.js';
 
const router = Router();
 
router.post(
    '/create',
    uploadFileImage.single('image'),
    cleanUploaderFileOnFinish,
    validateCreateField,
    createField
)
 
router.get(
    "/get",
    getFields
)
 
export default router;