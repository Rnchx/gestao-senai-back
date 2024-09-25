import { Router } from "express";

import {
  getStudents,
  getStudentsById,
  getStudentsByName,
  getStudentsByAapmStatus,
  getStudentsByCourseType,
  getStudentsByInternshipStatus,
  getStudentsByStudentClass,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controller/students.controller.js";

const studentsRouter = Router();

studentsRouter.get("/", getStudents);
studentsRouter.get("/:id", getStudentsById);
studentsRouter.get("/name/:name", getStudentsByName);
studentsRouter.get("/aapmStatus/:aapmStatus", getStudentsByAapmStatus);
studentsRouter.get("/courseType/:courseType", getStudentsByCourseType);
studentsRouter.get("/internshipStatus/:internshipStatus", getStudentsByInternshipStatus);
studentsRouter.get("/studentClass/:studentClass", getStudentsByStudentClass);
studentsRouter.post("/", createStudent);
studentsRouter.put("/:id", updateStudent);
studentsRouter.delete("/:id", deleteStudent);

export default studentsRouter;
