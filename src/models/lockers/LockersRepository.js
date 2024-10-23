
import db from "../../database/index.js"

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

  async assignStudentToLocker (lockerId, studentName) {
    try{
      const locker= await this.db.oneOrNone("SELECT * FROM lockers WHERE id = $1 AND occupationStatus = 'vago'", lockerId);

      if (!locker) {
        throw new Error("Armário não está vago");
      }

      const updatedLocker = await this.db.one(
        "UPDATE lockers SET occupationStatus = 'ocupado', owner = $1 WHERE id = $2 RETURNING *",
        [studentName, lockerId]
      );

      return {
        success: true,
        locker: updatedLocker,
        message: `${studentName} foi atribuido ao armário ${lockerId}`
      };
    }catch (error) {
      console.error(`Erro ao atribuir estudante ao armário ${lockerId}:`, error);
      throw error;
    }
  }

  async unassignStudentFromLocker (lockerId) {
    try{
      const updatedLocker = await this.db.one(
        "UPDATE lockers SET occupationsStatus = 'vago', owner = NULL WHERE id = $1 RETURNING *",
        [lockerId]
      );

      return {
        success: true,
        locker: updatedLocker,
        message: `O armário ${lockerId} foi desocupado`
      };
    } catch (error) {
      console.error(`Erro ao desocupar o armário ${lockerId}:`, error);
      throw error;
    }
  }

  async getLockerInfo(lockerId){
    try{
      const locker = await this.db.oneOrNone(" SELECT * FROM lockers WHERE id = $1", lockerId);
      return locker;
    }catch (error) {
      console.error(`Erro ao obter informações do armário ${lockerId}:`, error);
      throw error;
    }
  }

  
}

  
