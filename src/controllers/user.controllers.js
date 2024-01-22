import repository from '../repositories/user.repository';

export const find = async (req, res) => {
    try {
        const filters = req.query;

        const response = await repository.select({ filters });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const findById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const response = await repository.selectById(id);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const save = async (req, res) => {
    try {
        const phone = req.body;

        const response = await repository.insert(phone);

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const phone = req.body;

        const response = await repository.update(id, phone);
        if (response === null) return res.status(404).json({ message: 'Not found' });

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const response = await repository.remove({ id });
        if (response === null) return res.status(404).json({ message: 'Not found' });

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    find,
    findById,
    save,
    update,
    remove,
};
