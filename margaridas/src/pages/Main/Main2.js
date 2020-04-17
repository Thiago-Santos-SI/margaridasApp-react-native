import getRealm from '../../services/realm';
import Repository from '../../components/repository/index';


export default class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            watchers: '',
            stars:'',
        };
    }
};

    async function register_user(repository){
        const {repository.id} = this.state;
        const {name} = this.state;
        const {watchers} = this.state;
        const {stars} = this.state;
        if (id) {
            if (name) {
                if (user_address) {
                    const realm = await getRealm();
                    realm.write(() => {
                        var ID =
                            realm.objects('user_details').sorted('user_id', true).length > 0
                                ? realm.objects('user_details').sorted('user_id', true)[0]
                                .user_id + 1
                                : 1;
                        realm.create('user_details', {
                            user_id: ID,
                            user_name: state.user_name,
                            user_contact: state.user_contact,
                            user_address: state.user_address,
                        });
                        Alert.alert(
                            'Success',
                            'You are registered successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => that.props.navigation.navigate('HomeScreen'),
                                },
                            ],
                            {cancelable: false}
                        );
                    });
                } else {
                    alert('Please fill Address');
                }
            } else {
                alert('Please fill Contact Number');
            }
        } else {
            alert('Please fill Name');
        }
    };
}
