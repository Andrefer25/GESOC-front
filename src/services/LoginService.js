
const Users = [
    { 
        user: 'admin',
        pass: 'admin',
        role: 'admin'
    },
    {
        user: 'andrefer',
        pass: 'andrefer',
        role: 'user'
    }
]

const ValidarLogin = (user, pass) => {
    let log = { user: "", status: false, role: "" }
    Users.forEach(u => {
        if (u.user === user && u.pass === pass) {
            log.status = true;
            log.role = u.role;
            log.user = u.user;
        }
    });
    return log;
}

class LoginService {
    
    logIn = ({user, pass}) => {
        return ValidarLogin(user,pass);
    }
}

export default LoginService;