import AdministratorsRepository from '../models/administrators/AdministratorsRepository.js';

const administratorsRepository = new AdministratorsRepository();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import authConfig from '../config/auth.json';

const authConfig = process.env.JWT_SECRET

export const login = async (req, res) => {
    try {
      const { cpf, password } = req.body;

      const searchAdministrators = await administratorsRepository.getAdministratorByCpf(cpf);

      if (!searchAdministrators) {
        return res.status(400).send({ message: "Administrador não encontrado" });
      }

      if (!(await bcrypt.compare(password, searchAdministrators.password))) {
        return res.status(400).send({ message: "Senha inválida" })
      }

      const token = jwt.sign({ id: searchAdministrators.id }, authConfig, {
        expiresIn: 1209600
      })
      
      return res.status(200).send({ message: "login efetuado com sucesso", searchAdministrators, token });
      
    } catch (error) {
         return res.status(500).send({ message: 'Erro ao tentar efetuar o login', error: error.message });
    }
}