import Realm from 'realm';

import RepositorySchema from '../schemas/RepositorySchema';
import UnidadeSchema from "../schemas/UnidadeSchema";

export default function getRealm() {
  return Realm.open({
    schema: [RepositorySchema],
  });
}
