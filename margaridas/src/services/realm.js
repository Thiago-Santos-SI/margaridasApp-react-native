import Realm from 'realm';

import RepositorySchema from '../schemas/RepositorySchema';
import TintaSchema from "../schemas/TintaSchema";
import LucroSchema from "../schemas/LucroSchema";
import PercentageSchema from "../schemas/PercentageSchema";
import VendaSchema from "../schemas/VendaSchema";

export default function getRealm() {
  return Realm.open({
   schema: [
        RepositorySchema,
        TintaSchema,
        LucroSchema,
        PercentageSchema,
        VendaSchema
   ],
  });
}
