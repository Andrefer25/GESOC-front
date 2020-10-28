const categorias = [
    "Construcción",
    "Servicios",
    "Comercio",
    "Industria y Minería",
    "Agropecuario"
]

export const getCategoria = (index) => {
    return categorias[index]
}

export const getListaCategorias = () => {return categorias};

export const getIndexCategoria = (categoria) => {
    return categorias.indexOf(categoria);
}