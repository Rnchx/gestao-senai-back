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
}