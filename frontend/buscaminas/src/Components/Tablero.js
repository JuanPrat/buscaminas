import React, { useEffect, useState } from "react";

const Tablero = ({ socket }) => {
  const [matriz, setMatriz] = useState([]);
  const [cantidadBombas, setCantidadBombas] = useState(-1)

  useEffect(() => {
    if (cantidadBombas === 0) {
      window.alert("HAZ GANADOOOOOO!")
    }
  }, [cantidadBombas])

  socket.on("playReturn", (objeto) => {
    setCantidadBombas(-1)
    setMatriz([]);
    const { matrizJuego, cantidadBombas } = objeto
    setCantidadBombas(cantidadBombas)
    setMatriz(matrizJuego);
  });

  function generarColumna(matriz, i) {
    let array = [];
    for (let j = 0; j < matriz[0].length; j++) {
      array.push(
        <section
          className="cuadro"
          value={i + "," + j}
          id={"" + i + j}
          onClick={(e) => {
            pulsar(e);
          }}
          onContextMenu={(e) => {
            derecho(e);
          }}
        ></section>
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
    debugger
    if (e.target.className !== 'flag-icon') {
      let posicionMatriz = e.target.attributes[1].value;
      posicionMatriz = posicionMatriz.split(",");
      const fila = parseInt(posicionMatriz[0]);
      const columna = parseInt(posicionMatriz[1]);
      if (matriz[fila][columna] === "BOOM") {
        window.alert("AHI HAY UNA BOMBAAAAAAAAAAAAAAAAAAA ! D:");
      } else {
        destaparCasilla(fila, columna, matriz.length, matriz[0].length);
      }
    }
  };

  function destaparCasilla(fila, columna, filas, columnas) {
    //si la casilla esta dentro del tablero
    if (fila > -1 && fila < filas && columna > -1 && columna < columnas) {
      //si la casilla está descubierta
      let campo = document.getElementById("" + fila + columna);
      if (!campo.classList.contains('destapado')) {
        //si no es bomba
        if (matriz[fila][columna] !== "BOOM") {
          if (matriz[fila][columna] !== 0) {
            var cuadro = document.getElementById("" + fila + columna);
            cuadro.innerText = matriz[fila][columna];
            cuadro.classList.add('destapado')
          }
          // y tiene 0 minas alrededor, destapamos las casillas contiguas
          if (matriz[fila][columna] == 0) {
            var cuadro = document.getElementById("" + fila + columna);
            cuadro.innerText = "0";
            cuadro.classList.add('destapado')
            destaparCasilla(fila - 1, columna - 1, filas, columnas, matriz);
            destaparCasilla(fila - 1, columna, filas, columnas, matriz);
            destaparCasilla(fila - 1, columna + 1, filas, columnas, matriz);
            destaparCasilla(fila, columna - 1, filas, columnas, matriz);
            destaparCasilla(fila + 1, columna - 1, filas, columnas, matriz);
            destaparCasilla(fila, columna + 1, filas, columnas, matriz);
            destaparCasilla(fila + 1, columna, filas, columnas, matriz);
            destaparCasilla(fila + 1, columna + 1, filas, columnas, matriz);
          }
        }
      }
    }
  }

  const derecho = (e) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      console.log(e);

      //obtenemos el elemento que ha disparado el evento
      const casilla = e.currentTarget;
      const casillaChildren = casilla.children;
      let posicionMatriz = e.target.attributes[1].value;
      posicionMatriz = posicionMatriz.split(",");
      if (casillaChildren != [] && !casillaChildren[0]) {
        if (matriz[posicionMatriz[0]][posicionMatriz[1]] === "BOOM") {
          setCantidadBombas(cantidadBombas - 1)
        }
        let divBandera = document.createElement("div");
        divBandera.classList.add("flag-icon");
        casilla.appendChild(divBandera);
      } else {
        if (matriz[posicionMatriz[0]][posicionMatriz[1]] === "BOOM") {
          setCantidadBombas(cantidadBombas + 1)
        }
        casilla.removeChild(casilla.lastElementChild);
      }

      //detenemos el burbujeo del evento y su accion por defecto
      e.stopPropagation();
      e.preventDefault();
    }
    console.log("derecho");
  };



  return <div className="tablero-container"><div className="tablero">{generarTablero(matriz)}</div></div>;
};

export default Tablero;