import getRealm from "../services/realm";

export const handleTest = async () => {
    const realm = await getRealm();
    realm.write(() => {
        const query = realm.objects('Lucro')
        realm.delete(query);
        console.log(query)
    })
}

export const handleTests = async () => {
    const realm = await getRealm();
    const tint = realm.objects('Tinta');
    for (let p of tint) {
        console.log(`  ${p.priceTinta}`);
    }
    const dado = realm.objects('Tinta')[0];
    console.log(dado)
}


