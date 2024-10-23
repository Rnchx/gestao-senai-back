import Locker from "../models/lockers/Locker.js"

import LockersRepository from "../models/lockers/LockersRepository.js";

const lockersRepository = new LockersRepository();

export const getLockers = async (req, res) => {
  try {
    const lockers = await lockersRepository.getLockers();
    if (!lockers || lockers.length == 0) {
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

    return res.status(200).send({ message: "Armário encontrado", lockers });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao tentar encontrar o armário" });
  }
};

export const getLockersByOccupation = async (req, res) => {
  try {
    const { occupation } = req.params;
    const lockers = await lockersRepository.getLockersByOccupation(occupation);

    if (!lockers) {
      return res.status(404).send({ message: "Armário não encontrado" })
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

    if (!occupationStatus) {
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
    const { occupationStatus, owner } = req.body;

    const lockerById = await lockersRepository.getLockersById(id);

    if (!lockerById) {
      return res.status(404).send({ message: "Armário não encontrado" });
    }

    if (occupationStatus == "") {
      return res.status(400).send({ message: "Preencha o campo de ocupação do armário" });
    }

    const updateLocker = await lockersRepository.updateLocker(id, occupationStatus, owner);

    return res.status(200).send({ message: "Armário atualizado com sucesos", updateLocker });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao tentar atualizar o armário", error: error.message });
  }
};

export const deleteLocker = async (req, res) => {
  try {
    const { id } = req.params;

    await lockersRepository.deleteLocker(id);
    return res.status(200).send({ message: "Armário deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao tentar deletar o armário", error: error.message });

  }

}
export const assignStudentToLocker = async (req, res) => {
  try {
    const result = await lockersRepository.assignStudentToLocker(req.params.id, req.body.studentName);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });

  }
};

export const unassignStudentFromLocker = async (req, res) => {
  try {
    const result = await lockersRepository.unassignStudentFromLocker(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLockerInfo = async (req, res) => {
  try {
    const result = await lockersRepository.getLockerInfo(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Armário não encontrado'});
  }
};
