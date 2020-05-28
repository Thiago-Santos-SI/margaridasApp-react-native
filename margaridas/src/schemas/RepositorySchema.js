export default class RepositorySchema {
  static schema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: {type: 'int'},
      name: 'string',
      quantidade: {type:'int', optional: true},
      price: {type:'float', optional: true},
      unidade: 'string',
    },
  };
}
