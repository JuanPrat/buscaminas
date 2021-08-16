const crearMatriz = (filas, columnas, cantidadBombas) => {
    let matriz = []
    let bombasPlantadas = 0;
    for (let i = 0; i < filas; i++) {
        matriz[i] = new Array(columnas)
    }
    while (bombasPlantadas < cantidadBombas) {
        let fila = Math.floor(Math.random() * filas);
        let columna = Math.floor(Math.random() * cantidadBombas);
        if (fila < filas && columna < columnas && matriz[fila][columna] !== "BOOM") {
            matriz[fila][columna] = "BOOM";
            bombasPlantadas = bombasPlantadas + 1;
        }
    }
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (matriz[i][j] !== "BOOM") {
                matriz[i][j] = "SAFE"
            }
        }
    }
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(matriz[i][j] !== "BOOM")
            matriz = bombasAlrededor(matriz, i, j, filas, columnas)
        }
    }
    console.log(matriz)
    return matriz;
}

const bombasAlrededor = (matriz, fila, columna, filas, columnas) => {
    let bombasAlrededor = 0;
    if(fila == 0 && columna == 0){
        for(var auxFil = fila; auxFil < fila+2; auxFil++){
            for(var auxCol = columna; auxCol < columna+2; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    else if(fila == 0 && columna == columnas-1){
        for(var auxFil = fila; auxFil < fila+2; auxFil++){
            for(var auxCol = columna - 1; auxCol < columna + 1; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    else if (fila == filas-1 && columna == columnas-1){
        for(var auxFil = fila-1; auxFil < fila+1; auxFil++){
            for(var auxCol = columna-1; auxCol < columna+1; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    else if(fila == filas-1 && columna == 0){
        for(var auxFil = fila-1; auxFil < fila+1; auxFil++){
            for(var auxCol = columna; auxCol < columna + 2; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    else if(fila == 0){
        for(var auxFil = fila; auxFil < fila+2; auxFil++){
            for(var auxCol = columna-1; auxCol < columna+2; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    else if(fila == filas-1){
        for(var auxFil = fila-1; auxFil < fila+1; auxFil++){
            for(var auxCol = columna-1; auxCol < columna+2; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }

    else if(columna == 0){
        for(var auxFil = fila-1; auxFil < fila+2; auxFil++){
            for(var auxCol = columna; auxCol < columna+2; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    else if(columna == columnas - 1){
        for(var auxFil = fila-1; auxFil < fila+2; auxFil++){
            for(var auxCol = columna-1; auxCol < columna+1; auxCol++){
                if(matriz[auxFil][auxCol] === 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    else {
        for(var auxFil = fila-1; auxFil < fila+2; auxFil++){
            for(var auxCol = columna-1; auxCol < columna+2; auxCol++){
                if(matriz[auxFil][auxCol] == 'BOOM' && matriz[auxFil][auxCol] !== undefined){
                    bombasAlrededor = bombasAlrededor + 1;
                }
            }
        }
        matriz[fila][columna] = bombasAlrededor;
        bombasAlrededor = 0;
    }
    return matriz
}

const click = (fila, columna, matriz) => {
    let terminar = false
    for (let i = fila; terminar; i++) {
        for (let j = 0; terminar; j++) {
            /*columnas de arriba*/
            matriz[fila - 1][columna - 1]/*superior izquierda*/
            matriz[fila - 1][columna]    /*superior */
            matriz[fila - 1][columna + 1]/*superior derecha*/
            /*columnas de izquierda y derecha*/
            matriz[fila][columna - 1] /*izquierda*/
            matriz[fila][columna + 1]/*derecha*/
            /*columnas de abajo*/
            matriz[fila + 1][columna - 1]/*inferior izquierda*/
            matriz[fila + 1][columna] /*inferior*/
            matriz[fila + 1][columna + 1] /*inferior derecha*/
        }
    }
}

module.exports = { crearMatriz, click }