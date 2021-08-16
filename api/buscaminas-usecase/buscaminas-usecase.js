const crearMatriz = (tamannio) => {
    let matriz = []
    for(let i=0; i<tamannio; i++){
        matriz.push(new Array(tamannio))
    }
    console.log(matriz)
}

module.exports = {crearMatriz}