import Realm from 'realm';

import RepositorySchema from '../schemas/RepositorySchema';
import TintaSchema from "../schemas/TintaSchema";
import LucroSchema from "../schemas/LucroSchema";

export default function getRealm() {
  return Realm.open({
    schema: [RepositorySchema, TintaSchema, LucroSchema],
  });
}
