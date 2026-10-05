import express from "express";
import {
  createPrivateNote,
  getPrivateNotes,
  authenticate,
} from "../controllers/privateController.js";

const privateRouter = express.Router();

privateRouter.get("/", getPrivateNotes);
privateRouter.post("/", createPrivateNote);
privateRouter.post("/", authenticate);

export default privateRouter;
