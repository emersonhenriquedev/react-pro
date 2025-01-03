import httpClient from "../axios";

const MODULE = '/products';

export class ProductsService {

    static async findAll(page, perPage) {
        return await httpClient.get(MODULE, {
            params: {
                page,
                perPage
            },
        });
    }

    static async search(value) {
        return await httpClient.get(`${MODULE}/search/${value}`);
    }

    static async create(data) {
        return await httpClient.post(MODULE, data);
    }
}
