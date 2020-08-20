import getRealm from "../services/realm";

    export const handleTest = async ()  => {
        const realm = await getRealm();
        realm.write(() => {
            const query = realm.objects('Lucro')
            realm.delete(query);
            console.log(query)
        })
    }


