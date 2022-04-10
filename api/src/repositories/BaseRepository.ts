
export class BaseRepository {
    private entity;
    
    constructor(entity) {
        this.entity = entity;
    }

    async create(data) {
        await this.entity.create(data);
    }

    async update(data, id) {
        const dataSaved = await this.findById(id);

        Object.keys(data).forEach(key => {
            if (dataSaved[key]) {
                dataSaved[key] = data[key];
            }
        });

        return await dataSaved.save(data);
    }

    async findAll() {
        return await this.entity.findAll();
    }

    async findById(id: string) {
        return await this.entity.findByPk(id);
    }
}