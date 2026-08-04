import express from "express"
import InstituteController from "../../controller/institute/institutionController"

const router = express.Router()
router.route("/").post(InstituteController.createInstitute)
export default router