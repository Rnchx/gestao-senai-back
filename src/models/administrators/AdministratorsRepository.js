import db from "../../database/index.js";

export default class AdministratorRepository {
    constructor() {
      this.db = db;
    }

async getAdministrators() {
    try {
        const allAdministrators = await this.db.manyOrNone("SELECT * FROM administrators");
        return allAdministrators;
    } catch (error) {
        console.error("Falha ao tentar buscar os administradores", error);
        throw error;
    }
}

async getAdministratorById(id) {
    try {
        const administrator = await this.db.oneOrNone("SELECT * FROM administrators WHERE id = $1", id);
        return administrator;
    } catch (error) {
        console.error(`Falha ao tentar buscar o administrador ${id}`, error);
        throw error;
    }
}

async getAdministratorByCpf(cpf) {
    try {
        const administrator = await this.db.oneOrNone("SELECT * FROM administrators WHERE cpf = $1", cpf);
        console.log(administrator);
        return administrator;
    } catch (error) {
        console.error(`Falha ao tentar buscar o administrador ${cpf}`, error);
        throw error;
    }
}

async createAdministrator(administrator) {
    try {
        await this.db.none(
            "INSERT INTO administrators (cpf, password) VALUES ($1, $2)",
            [administrator.cpf, administrator.password]
        );

        return administrator;
    } catch (error) {
        console.error(`Falha ao tentar criar um administrador`, error);
        throw error;
    }
}

async updateAdministrator(id, cpf, password) {
    try {
        const administrator = await this.getAdministratorById(id);

        if (!administrator) {
            return null;
        }

        const updatedAdministrator = await this.db.one(
            "UPDATE administrators SET cpf = $1, password = $2 WHERE id = $3 RETURNING *",

            [password, cpf, id]
        );

        return updatedAdministrator;
    } catch (error) {
        console.error(`Falha ao tentar atualizar o administrador ${cpf}`, error);
        throw error;
    }
}

async deleteAdministrator(id) {
    try {
        await this.db.none("DELETE FROM administrators WHERE id = $1", id);
    } catch (error) {
        console.error(`Falha ao tentar deletar o administrador ${cpf}`, error);
        throw error;
    }
}
}