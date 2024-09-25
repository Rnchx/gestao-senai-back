import Administrator from '../models/administrators/Administrators.js';

import AdministratorsRepository from '../models/administrators/AdministratorsRepository.js';

const administratorsRepository = new AdministratorsRepository();

export const getAdministrators = async (req, res) => {
    try {
        const administrators = await administratorsRepository.getAdministrators();
    
        if (!administrators || administrators.length == 0) {
        return res.status(404).send({ message: 'Não há administradores cadastrados' });
        }
    
        return res.status(200).send({ totalAdministrators: administrators.length, administrators });
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao tentar buscar os administradores', error: error.message });
    }
}

export const getAdministratorById = async (req, res) => {
    try {
        const { id } = req.params;
        const administrator = await administratorsRepository.getAdministratorById(id);
        
        if (!administrator) {
        return res.status(404).send({ message: `Administrador do id ${id} não encontrado` });
        }
        
        return res.status(200).send(administrator);
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao tentar encontrar o administrador', error: error.message });
    }
}

export const getAdministratorByCpf = async (req, res) => {
    try {
        const { cpf } = req.params;
        const administrator = await administratorsRepository.getAdministratorByCpf(cpf);
    
        return res.status(200).send({ message: 'Administrador encontrado', administrator });
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao tentar encontrar o administrador', error: error.message });
    }
}

export const createAdministrator = async (req, res) => {
    try {
        const { cpf, password } = req.body;
    
        if (!cpf || !password) {
        return res.status(400).send({ message: 'Preencha todos os campos obrigatórios' });
        }

        if (password == "" || password.length < 3 || password.length > 10) {
            return res.status(400).send({ message: 'A senha deve conter entre 3 e 10 caracteres' });
        }
    
        const administrator = new Administrator(cpf, password);
        await administratorsRepository.createAdministrator(administrator);
    
        return res.status(201).send({ message: 'Administrador criado com sucesso', administrator });
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao tentar criar o administrador', error: error.message });
    }
}

export const updateAdministrator = async (req, res) => {
    try {
        const { id } = req.params;
        const { cpf, password } = req.body;

        const administratorById = await administratorsRepository.getAdministratorById(id);

        if (!administratorById) {
            return res.status(404).send({ message: `Administrador do id ${id} não encontrado` });
        }
    
        if (!password || !cpf) {
        return res.status(400).send({ message: 'Preencha todos os campos obrigatórios' });
        }
    
        await administratorsRepository.updateAdministrator(id, cpf, password);
    
        return res.status(200).send({ message: 'Administrador atualizado com sucesso' });
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao tentar atualizar o administrador', error: error.message });
    }
}

export const deleteAdministrator = async (req, res) => {
    try {
        const { id } = req.params;
        const administrator = await administratorsRepository.deleteAdministrator(id);
    
        return res.status(200).send({ message: 'Administrador deletado com sucesso', administrator });
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao tentar deletar o administrador', error: error.message });
    }
}