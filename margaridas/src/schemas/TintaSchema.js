export default class TintaSchema {
    static schema = {
        name: 'Tinta',
        primaryKey: 'id',
        properties:{
            id: 'int',
            priceTinta: {type: 'float'}
        },
    };
}
