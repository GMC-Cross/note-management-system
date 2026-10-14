import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controllers/noteController.js";

const noteRouter = express.Router();

noteRouter.get("/:topic", getNote);
noteRouter.post("/:topic", createNote);
noteRouter.put("/:topic/:id", updateNote);
noteRouter.delete("/:topic/:id", deleteNote);

export default noteRouter;
