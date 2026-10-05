import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controllers/noteController.js";

const noteRouter = express.Router();

noteRouter.get("/", getNote);
noteRouter.post("/", createNote);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;
