import {Router} from "express";
import {
  loginHandler,
  confirmCreateAndLoginHandler,
} from "../controllers/AuthController";

const router = Router();

router.post("/login", loginHandler);
router.post("/login/confirm", confirmCreateAndLoginHandler);

export default router;
