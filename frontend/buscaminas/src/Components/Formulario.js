import React, { useState } from "react";
const Formulario = ({ socket }) => {

    const [variables, setVariables] = useState({ filas: 0, columnas: 0, cantidadBombas: 0 });

    const asignarValor = (e) => {
        setVariables({
            ...variables,
            [e.target.name]: e.target.value,
        });
    }

    const jugar = (e) => {
        e.preventDefault()
        socket.emit('play', { filas: variables.filas, columnas: variables.columnas, cantidadBombas: variables.cantidadBombas })
    }

    return <div className="formulario-container">
        <form className="formulario" onSubmit={jugar}>
            <label>Filas:
                <input type="text" name="filas" onChange={asignarValor}></input>
            </label>
            <label>Columnas:
                <input type="text" name="columnas" onChange={asignarValor}></input>
            </label>
            <label>Bombas:
                <input type="text" name="cantidadBombas" onChange={asignarValor}></input>
            </label>
            <button className="hide"></button>
        </form>
        <button onClick={jugar}>Jugar</button>
    </div>
};

export default Formulario;