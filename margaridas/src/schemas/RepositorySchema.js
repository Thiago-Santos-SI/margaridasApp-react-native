export default class RepositorySchema {
  static schema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: {type: 'int'},
      name: 'string',
      quantidade: {type:'string', optional: true},
      price: {type:'string', optional: true}
    },
  };
}
