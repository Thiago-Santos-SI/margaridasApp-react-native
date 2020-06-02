export default class RepositorySchema {
  static schema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: {type: 'int'},
      name: {type:'string', optional: false},
      quantidade: {type:'float', optional: true},
      price: {type:'float', optional: true},
      unidade: 'string',
    },
  };
}
