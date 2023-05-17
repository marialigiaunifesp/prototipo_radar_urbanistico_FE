import React from 'react';
import Formulario from "./componentes/Formulario";
import ResponsiveAppBar from './navigation/header/AppBar';

function App() {
  return (
    <div>
    <ResponsiveAppBar />
    <Formulario />
    </div>
  );
}

export default App;
