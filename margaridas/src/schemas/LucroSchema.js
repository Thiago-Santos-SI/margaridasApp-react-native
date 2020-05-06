export default class LucroSchema {
    static schema = {
        name: 'Lucro',
        primaryKey: 'id',
        properties:{
            id: 'int',
            priceLucro: {type: 'float'}
        },
    };
}
