import db from "../../database/index.js";

export default class LockersRepository {
  constructor() {
    this.db = db;
  }

  async assignStudentToLocker(id, studentId) {
    try {
      // Atribui o aluno ao armário, usando o ID do aluno como referência
      const updatedLocker = await this.db.one(
        "UPDATE lockers SET occupationStatus = false, owner_id = $1 WHERE id = $2 RETURNING *",
        [studentId, id]
      );

      return {
        success: true,
        locker: updatedLocker,
        message: `Estudante ${studentId} foi atribuído ao armário ${id}`,
      };
    } catch (error) {
      console.error(`Erro ao atribuir estudante ao armário ${id}:`, error);
      throw error;
    }
  }

  async unassignStudentFromLocker(id) {
    try {
      // Desassocia o aluno do armário, removendo o `owner_id`
      const updatedLocker = await this.db.one(
        "UPDATE lockers SET occupationStatus = true, owner_id = NULL WHERE id = $1 RETURNING *",
        [id]
      );

      return {
        success: true,
        locker: updatedLocker,
        message: `O armário ${id} foi desocupado`
      };
    } catch (error) {
      console.error(`Erro ao desocupar o armário ${id}:`, error);
      throw error;
    }
  }
}
