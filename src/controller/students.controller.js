import Student from "../models/students/Student.js";
import StudentsRepository from "../models/students/StudentsRepository.js";

const studentsRepository = new StudentsRepository();

function verifyUrl(url) {
  var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

  var extension = url.split('.').pop().toLowerCase();

  return imageExtensions.includes(extension);
}

export const getStudents = async (req, res) => {
    try {
        const students = await studentsRepository.getStudents();
        if (!students || students.length === 0) {
            return res.status(404).send({ message: "Não há alunos cadastrados" });
        }
        return res.status(200).send({ totalStudents: students.length, students });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar alunos", error: error.message });
    }
};

export const getStudentsById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await studentsRepository.getStudentsById(id);
        if (!student) {
            return res.status(404).send({ message: `Aluno não encontrado` });
        }
        return res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ message: `Erro ao buscar aluno`, error: error.message });
    }
};

export const getStudentsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const student = await studentsRepository.getStudentsByName(name);

        if (!student) {
            return res.status(404).send({ message: `Aluno não encontrado` });
        }
        return res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ message: `Erro ao buscar aluno`, error: error.message });
    }
};

export const getStudentsByStudentClass = async (req, res) => {
    try {
        const { studentClass } = req.params;
        const student = await studentsRepository.getStudentsByStudentClass(studentClass);

        if (!student) {
            return res.status(404).send({ message: `Aluno não encontrado` });
        }
        return res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ message: `Erro ao buscar aluno`, error: error.message });
    }
};

export const getStudentsByCourseType = async (req, res) => {
    try {
        const { courseType } = req.params;
        const student = await studentsRepository.getStudentsByCourseType(courseType);

        if (!student) {
            return res.status(404).send({ message: `Aluno não encontrado` });
        }
        return res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ message: `Erro ao buscar aluno`, error: error.message });
    }
};

export const getStudentsByAapmStatus = async (req, res) => {
    try {
        const { aapmStatus } = req.params;
        const student = await studentsRepository.getStudentsByAapmStatus(aapmStatus);

        if (!student) {
            return res.status(404).send({ message: `Aluno não encontrado` });
        }
        return res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ message: `Erro ao buscar aluno`, error: error.message });
    }
};

export const getStudentsByInternshipStatus = async (req, res) => {
    try {
        const { internshipStatus } = req.params;
        const student = await studentsRepository.getStudentsByInternshipStatus(internshipStatus);

        if (!student) {
            return res.status(404).send({ message: `Aluno não encontrado` });
        }
        return res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ message: `Erro ao buscar aluno`, error: error.message });
    }
};

export const createStudent = async (req, res) => {
    try {

        const { name, dateOfBirth, studentClass, courseType, carometer, aapmStatus, internshipStatus } = req.body;

        if (name == "" || dateOfBirth == "" || studentClass == "" || courseType == "" || carometer == "" || aapmStatus == "" || internshipStatus == "") {
             return res.status(400).send({ message: "Preencha todos os campos" });
        }

        if (!verifyUrl(carometer)) {
            return res.status(400).send({ message: "URL da imagem inválida" });
        }

        const student = new Student(name, dateOfBirth, studentClass, courseType, carometer, aapmStatus, internshipStatus);

         await studentsRepository.createStudent(student);

        return res.status(201).send({ message: "Estudante cadastrado com sucesso"  });
    } catch (error) {
        return res.status(500).send({ message: `Erro ao criar aluno`, error: error.message });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = new Student(req.body);
        console.log(student);
        
        const updatedStudent = await studentsRepository.updateStudent(id, student);
        return res.status(200).send(updatedStudent);
    } catch (error) {
        return res.status(500).send({ message: `Erro ao atualizar aluno`, error: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await studentsRepository.deleteStudent(id);
        return res.status(204).send({ message: `Aluno ${id} deletado com sucesso`});
    } catch (error) {
        return res.status(500).send({ message: `Erro ao deletar aluno`, error: error.message });
    }
};