export default class PercentageSchema {
    static schema = {
        name: 'Percentage',
        primaryKey: 'id',
        properties:{
            id: 'int',
            pricePercentage: {type: 'float'}
        },
    };
}
