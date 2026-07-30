import  express ,{Router} from "express";
import Authcontroller from "../../../controller/globals/auth/auth.contoller";
const router:Router = express.Router()

router.route("/register").post(Authcontroller.registerUser);
export default router;