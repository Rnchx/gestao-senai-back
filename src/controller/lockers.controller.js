import Locker from "../models/lockers/Locker.js"

import LockersRepository from "../models/lockers/LockersRepository.js";

const lockersRepository = new LockersRepository();

export const getLockers = async (req, res) => {
  try {
    const lockers = await lockersRepository.getLockers();
    if (!lockers || lockers.length === 0) {
      return res.status(404).send({ message: "Não há armários cadastrados" });
    }
    return res.status(200).send({ totalLockers: lockers.length, lockers });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao tentar buscar os armários", error: error.message });
  }
};

export const getLockersById = async (req, res) => {
  try {
    const { id } = req.params;
    const lockers = await lockersRepository.getLockersById(id);
    if (!lockers) {
      return res.status(404).send({ message: `Armário do id ${id} não encontrado` })
    }
  } catch (error) {
    return res.status(500).send({ message: "Erro ao tentar encontrar o armário" });
  }
};

export const getLockersByOcupation = async (req, res) => {
  try {
    const { ocupation } = req.params;
    const lockers = await lockersRepository.getLockersByOucupation(ocupation);

    if (!lockers) {
      return res.status(404).send({ message: "Armário não encontrado"})
    }

    return res.status(200).send({ message: "Armários encontrados", lockers });
    }
  catch (error) {
    return res.status(500).send({ message: "Erro ao tentar buscar as " });
  }
};

export const createLocker = async (req, res) => {
  try {
    const { occupationStatus } = req.body;
    const { owner } = req.body;

    if (!occupationStatus || !owner) {
      return res.status(400).send({ message: "Preencha todos os campos obrigatórios" });
    }

    const locker = new Locker(occupationStatus, owner);
    await lockersRepository.createLocker(locker);

    return res.status(200).send({ message: "Armário criado com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao tentar criar o armário", error: error.message });
  }
}

export const updateLocker = async (req, res) => {
  try {
    const { id } = req.params;
    const { occupationStatus } = req.body;
    const { owner } = req.body;
    const lockerById = await lockersRepository.getLockersById(id);

    if (!lockerById) {
      return res.status(404).send({ message: "Armário não encontrado" });
    }

    if (occupationStatus == "") {
      return res.status(400).send({ message: "Preencha o campo de ocupação do armário" });
    }

    if (owner == "") {
      return res.status(400).send({ message: "Preencha o campo de proprietário do armário" });
    }

    const updateLocker = await lockersRepository.updateLoker(id, occupationStatus, owner);

    return res.status(200).send({ message: "Armário atualizado com sucesos", updateLocker });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao tentar atualizar o armário", error: error.message });
  }
};

export const deleteLocker = async (req, res) => {
  try {
    const { id } = req.params;
    const locker = await lockersRepository.deleteLoker(id);

    if (!locker) {
      return res.status(404).send({ message: "Armário não encontrada" });
    }

    await lockersRepository.deleteLoker(id);
    return res.status(200).send({ message: "Armário deletada com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao tentar deletar o armário", error: error.message });
  }
}

