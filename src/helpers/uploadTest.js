import Axios from "axios";

export const upload = async(file) => {
    let formData = new FormData();
    formData.append(
        "archivoPrueba",
        file,
        file.name
    )


    let resp = await Axios.post("https://www.filestackapi.com/api/store/S3?key=AsQrM2aJWTg60PhVHkJESz", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "body": formData,
            "credentials": "same-origin"
        }
    });

}