import { Router } from "express";
import * as controller from "../controller/controller.js";
const router = Router()

router.route('/friends').post(controller.insertdata).get(controller.getData).put(controller.updateFriendById)
router.delete('/friends/:id',controller.deleteData)
router.get('/friends/:id',controller.getIdData)

export default router