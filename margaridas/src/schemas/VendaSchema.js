export default class VendaSchema {
    static schema = {
        name: 'Sale',
        primaryKey: 'id',
        properties:{
            id: 'int',
            Sale: {type: 'float'}
        },
    };
}
