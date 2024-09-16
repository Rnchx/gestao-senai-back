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

   async getStudentsByRoom(room) {
    try {
      const student = await this.db.ManyOrNone("SELECT * FROM students WHERE room = $1", room);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar os alunos da sala ${room}`, error);
    throw error;
    }
  }

  async getStudentsByCourseType(courseType) {
    try {
      const student = await this.db.ManyOrNone("SELECT * FROM students WHERE courseType = $1", courseType);
      return student;
    } catch (error) {
      console.error(`Falha ao tentar buscar os alunos do ${courseType}`, error);
    throw error;
    }
  }
}