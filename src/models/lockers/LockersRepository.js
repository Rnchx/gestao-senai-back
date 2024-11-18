import db from "../../database/index.js";

export default class LockersRepository {
  constructor() {
    this.db = db;
  }

  async getLockers() {
    try {
      const allLockers = await this.db.manyOrNone("SELECT * FROM lockers");
      return allLockers;
    } catch (error) {
      console.error("Falha ao tentar buscar os armários", error);
      throw error;
    }
  }

  async getLockersById(id) {
    try {
      const locker = await this.db.oneOrNone("SELECT * FROM lockers WHERE id = $1", id);
      return locker;
    } catch (error) {
      console.error(`Falha ao tentar buscar o armário ${id}`, error);
      throw error;
    }
  }

  async getLockersByOccupation(occupationStatus) {
    try {
      const locker = await this.db.manyOrNone("SELECT * FROM lockers WHERE occupationStatus = $1", occupationStatus);
      return locker;
    } catch (error) {
      console.error(`Falha ao tentar descobrir a ocupação ${occupationStatus}`, error);
      throw error;
    }
  }

  async createLocker(locker) {
    try {
      await this.db.none(
            "INSERT INTO lockers (occupationStatus, owner) VALUES ($1, $2)",
            [locker.occupationStatus, locker.owner]
      );
      return locker
    } catch (error) {
      console.error(`Falha ao tentar cadastrar um armário`, error);
        throw error;
    }
  }

    async updateLoker(id, occupationStatus, owner) {
    try {
      const Locker = await this.getLockersById(id);

      if (!Locker) {
        return null;
      }

      const updatedLocker = await this.db.one(
        "UPDATE lockers SET occupationStatus = $1, owner = $2 WHERE id = $3 RETURNING *",
        [occupationStatus, owner, id]
      );

      return updatedLocker;
    } catch (error) {
      console.error(`Falha ao tentar atualizar armário${id}:`, error);
      throw error;
    }
  }

  async deleteLoker(id) {
    try {
      await this.db.none("DELETE FROM lockers WHERE id = $1", id);
    } catch (error) {
      console.error(`Falha ao tentar deletar o armário ${id}:`, error);
      throw error;
    }
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
