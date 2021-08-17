import React, {useState} from "react";
const Tablero = ({socket}) => {

    const [matriz, setMatriz] = useState([])

    function generarColumna(matriz, i) {
        let array = [];
        for (let j = 0; j < matriz[0].length; j++) {
          array.push(
            <section className="cuadro" value={matriz[i][j]}>{matriz[i][j]}</section>
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

    socket.on('playReturn', (matrizNueva) => {
        setMatriz(matrizNueva)
    })

  return <div>{generarTablero(matriz)}</div>;
};

export default Tablero;