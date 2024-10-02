import AdministratorsRepository from '../models/administrators/AdministratorsRepository.js';

const administratorsRepository = new AdministratorsRepository();

import pkg from 'bcryptjs';
const { hash, compare } = pkg;

export const login = async (req, res) => {
    try {
      const { cpf, password } = req.body;

      const searchAdministrators = await administratorsRepository.getAdministratorByCpf(cpf);

      if (!searchAdministrators) {
        return res.status(400).send({ message: "Administrador não encontrado" });
      }

      if (!await compare(password, searchAdministrators.password)) {
        return res.status(400).send({ message: "Senha inválida" })
      }

      console.log(searchAdministrators);  
      return res.status(200).send({ searchAdministrators });
      
    } catch (error) {
         return res.status(500).send({ message: 'Erro ao tentar efetuar o login', error: error.message });
    }
}