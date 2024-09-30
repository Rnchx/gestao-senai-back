

import db from "../../database/index.js"

export default class StudentsRepository {
  constructor() {
    this.db = db;
  }

async getStudents() {
  try {
    const allStudents = await this.db.manyOrNone("SELECT * FROM students");
    return allStudents;
  } catch (error) {
    console.error("Falha ao tentar buscar os alunos", error);
    throw error;
  }
  }

  async getStudentsById(id) {
    try {
      const student = await this.db.oneOrNone("SELECT * FROM students WHERE id = $1", id);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar o aluno ${id}`, error);
    throw error;
    }
  }

  async getStudentsByName(name) {
    try {
      const student = await this.db.oneOrNone("SELECT * FROM students WHERE name = $1", name);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar o aluno ${name}`, error);
    throw error;
    }
  }

   async getStudentsByStudentClass(studentClass) {
    try {
      const student = await this.db.manyOrNone("SELECT * FROM students WHERE studentClass = $1", studentClass);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar os alunos da sala ${studentClass}`, error);
    throw error;
    }
  }

  async getStudentsByCourseType(courseType) {
    try {
      const student = await this.db.manyOrNone("SELECT * FROM students WHERE courseType = $1", courseType);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar os alunos do ${courseType}`, error);
    throw error;
    }
  }

  async getStudentsByAapmStatus(aapmStatus) {
    try {
      const student = await this.db.manyOrNone("SELECT * FROM students WHERE aapmStatus = $1", aapmStatus);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar os alunos que ${aapmStatus} participam na AAPM`, error);
    throw error;
    }
  }

  async getStudentsByInternshipStatus(internshipStatus) {
    try {
      const student = await this.db.manyOrNone("SELECT * FROM students WHERE internshipStatus = $1", internshipStatus);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar os alunos que ${internshipStatus} estão disponíveis para estágio`, error);
    throw error;
    }
  }

   async createStudent(student) {
    try {
      await this.db.none(
        "INSERT INTO students (name, dateOfBirth, studentClass, courseType, carometer, aapmStatus, internshipStatus) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [student.name, student.dateOfBirth, student.studentClass, student.courseType, student.carometer, student.aapmStatus, student.internshipStatus]
      );
      return student;
    } catch (error) {
      console.error("Falha ao tentar criar um estudante:", error);
      throw error;
    }
  }

  async updateStudent(id, name, dateOfBirth, studentClass, courseType, carometer, aapmStatus, internshipStatus) {
    try {
      const student = await this.getStudentsById(id);

      if (!student) {
        return null;
      }

      const updatedStudent = await this.db.one(
        "UPDATE students SET name = $1, dateOfBirth = $2, studentClass = $3, courseType = $4, carometer = $5, aapmStatus = $6, internshipStatus = $7 WHERE id = $8 RETURNING *",
        [name, dateOfBirth, studentClass, courseType, carometer, aapmStatus, internshipStatus, id]
      );

      return updatedStudent;
    } catch (error) {
      console.error(`Falha ao tentar atualizar estudante ${id}:`, error);
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      await this.db.none("DELETE FROM students WHERE id = $1", id);
    } catch (error) {
      console.error(`Falha ao tentar deletar estudante ${id}:`, error);
      throw error;
    }
  }
}