import React, { Fragment, useEffect, useState } from "react";
import Tablero from "./Components/Tablero";
import Formulario from "./Components/Formulario";
import "./index.css"
import io from 'socket.io-client';

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Fragment>
      {socket ? (
        <div className="container">
          <h1>Buscaminas</h1>
          <Formulario socket={socket} />
          <Tablero socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </Fragment>
  );
}

export default App;