import Axios from 'axios';
import { usuariosUrl } from '../constants/routes';
import { encrypt } from '../helpers/encryption';


// const Users = [
//     { 
//         user: 'admin',
//         pass: 'admin',
//         role: 'admin'
//     },
//     {
//         user: 'andrefer',
//         pass: 'andrefer',
//         role: 'user'
//     }
// ]

// const ValidarLogin = ({user, pass}) => {
//     console.log("Encriptado: ", pass);
//     let log = { user: "", status: false, role: "" }
//     Users.forEach(u => {
//         if (u.user === user && u.pass === pass) {
//             log.status = true;
//             log.role = u.role;
//             log.user = u.user;
//         }
//     });
//     return log;
// }

class LoginService {
    logIn = async ({user, pass}) => {
        let passEnc = encrypt(pass);
        //console.log("passEnc:", passEnc);
        let credentials = { user: user, pass: passEnc };
        let response = await Axios.post(usuariosUrl, credentials);
        if(response.data) {
            return response.data;
        }
        return null;
    }

    test = async () => {
        let response = await Axios.get("https://cors-anywhere.herokuapp.com/https://gesoctp.herokuapp.com/gesoc/categoriaEntidad/1");
        return response;
    }

}

export default LoginService;