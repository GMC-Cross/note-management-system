import express from "express";
import {
  createPrivateNote,
  getPrivateNotes,
  updatePrivateNote,
  deletePrivateNote,
  authenticate,
} from "../controllers/privateController.js";

const privateRouter = express.Router();

privateRouter.get("/", getPrivateNotes);
privateRouter.post("/", createPrivateNote);
privateRouter.post("/auth", authenticate);
privateRouter.put("/:id", updatePrivateNote);
privateRouter.delete("/:id", deletePrivateNote);

export default privateRouter;
