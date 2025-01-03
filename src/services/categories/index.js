import httpClient from "../axios";
const MODULE '/categories';

export class CategoriesService {

    static async findAll() {
        return await httpClient.get(MODULE);
    }

    static async findById(id) {
        return await httpClient.get(`${MODULE}/${id}`);
    }

    static async create(data) {
        return await httpClient.post(MODULE, data);
    }

    static async update(id, data) {
        return await httpClient.put(`${MODULE}/${id}`, data);
    }
}
