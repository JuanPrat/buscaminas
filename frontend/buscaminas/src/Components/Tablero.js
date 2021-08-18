import React, { useState } from "react";
const Tablero = ({ socket }) => {

  const [matriz, setMatriz] = useState([])

  function generarColumna(matriz, i) {
    let array = [];
    for (let j = 0; j < matriz[0].length; j++) {
      array.push(
        <section className="cuadro" value={i + "," + j} id={""+i+j} onClick={(e) => {
          pulsar(e);
        }} onContextMenu={(e) => {
          derecho(e);
        }}></section>
      );
    }
    return array;
  }

  function generarTablero(matriz) {
    let array = [];
    for (let i = 0; i < matriz.length; i++) {
      array.push(
        <div className="flexboxContainer">{generarColumna(matriz, i)}</div>
      );
    }
    return array;
  }

  const pulsar = (e) => {
    e.preventDefault();
    let posicionMatriz = e.target.attributes[1].value;
    posicionMatriz = posicionMatriz.split(",")
    const fila = parseInt(posicionMatriz[0])
    const columna = parseInt(posicionMatriz[1])
    debugger
    if (matriz[fila][columna] === "BOOM") {
      window.alert("AHI HAY UNA BOMBAAAAAAAAAAAAAAAAAAA ! D:")
    }
    else {
      debugger
      destaparCasilla(fila, columna, matriz.length, matriz[0].length)
    }

  };

  function destaparCasilla(fila, columna, filas, columnas) {
    console.log("destapamos la casilla con fila " + fila + " y columna " + columna);

    //si la casilla esta dentro del tablero
    if (fila > -1 && fila < filas && columna > -1 && columna < columnas) {
      //si no es bomba
      if (matriz[fila][columna] !== "BOOM") {
        if(matriz[fila][columna] !== "0" && matriz[fila][columna] !== 0  ){
          debugger
          var cuadro = document.getElementById(""+fila+columna);
          debugger
          cuadro.innerText = matriz[fila][columna]
          return;
        }
        // y tiene 0 minas alrededor, destapamos las casillas contiguas
        else if (matriz[fila][columna] == "0" && matriz[fila][columna] == 0) {
          debugger
          var cuadro = document.getElementById(""+fila+columna);
          cuadro.innerText = "0"
          setTimeout(destaparCasilla(fila - 1, columna - 1, filas, columnas, matriz), 0)
          setTimeout(destaparCasilla(fila - 1, columna,  filas, columnas, matriz), 0)
          setTimeout(destaparCasilla(fila - 1, columna + 1, filas, columnas, matriz), 0)
          setTimeout(destaparCasilla(fila, columna - 1, filas, columnas, matriz), 0)
          setTimeout(destaparCasilla(fila, columna + 1, filas, columnas, matriz), 0)
          setTimeout(destaparCasilla(fila + 1, columna - 1, filas, columnas, matriz), 0)
          setTimeout(destaparCasilla(fila + 1, columna, filas, columnas, matriz), 0)
          setTimeout(destaparCasilla(fila + 1, columna + 1, filas, columnas, matriz), 0)
          return;
        }
        return;
    }
    return;
  }
}

const derecho = (e) => {
  e.preventDefault();
  if (e.type === "contextmenu") {
    console.log(e);

    //obtenemos el elemento que ha disparado el evento
    const casilla = e.currentTarget;
    const casillaChildren = casilla.children;
    debugger
    if (casillaChildren != [] && !casillaChildren[0]) {
      debugger
      let divBandera = document.createElement("div")
      divBandera.classList.add("flag-icon")
      casilla.appendChild(divBandera)
    }
    else {
      debugger
      casilla.removeChild(casilla.lastElementChild)
    }

    //detenemos el burbujeo del evento y su accion por defecto
    e.stopPropagation();
    e.preventDefault();
  }
  console.log("derecho");
};

socket.on('playReturn', (matrizNueva) => {
  setMatriz(matrizNueva)
})

return <div>{generarTablero(matriz)}</div>;
};

export default Tablero;