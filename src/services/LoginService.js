import Axios from 'axios';
import { usuariosUrl } from '../constants/routes';
import { encrypt } from '../helpers/encryption';

class LoginService {
    logIn = async ({user, pass}) => {
        let passEnc = encrypt(pass);
        let credentials = { user: user, pass: passEnc };
        let response = await Axios.post(usuariosUrl, credentials);
        if(response.data) {
            return response.data;
        }
        return null;
    }

}

export default LoginService;