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

  async getLockersByOucupation(occupationStatus) {
    try {
      const locker = await this.db.manyOrNone("SELECT * FROM lockers WHERE ouccupationStatus = $1", occupationStatus);
      return locker;
    } catch (error) {
      console.error(`Falha ao tentar descobrir a ocupação ${occupationStatus}`, error);
    throw error;
    }
  }

    async updateLocker(id, occupationStatus, owner) {
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

  async deleteLocker(id) {
    try {
      await this.db.none("DELETE FROM lockers WHERE id = $1", id);
    } catch (error) {
      console.error(`Falha ao tentar deletar o armário ${id}:`, error);
      throw error;
    }
  }
  }