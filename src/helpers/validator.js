
export const validateInputText = value => {
    let regex = /^[a-zA-Z0-9]/;
    if(regex.test(value) && value !== "") {
        return true;
    } else return false;
}

export const validateInputNumber = value => {
    let regex = /^[0-9]/;
    if(regex.test(value) && value !== "" && value > 0) {
        return true;
    } else return false;
}

export const validateOptionalInputNumber = value => {
    let regex = /^[0-9]/;
    if(value === "" || (regex.test(value) && value > 0)) {
        return true;
    } else return false;
}