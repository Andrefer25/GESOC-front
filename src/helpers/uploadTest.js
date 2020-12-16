import Axios from "axios";

export const upload = async(file) => {
    let formData = new FormData();
    console.log(file);
    formData.append(
        "archivoPrueba",
        file,
        file.name
    )

}