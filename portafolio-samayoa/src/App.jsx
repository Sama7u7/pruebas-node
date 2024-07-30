import Navbar from "./Components/Navbar";

import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* Aquí van los demás componentes y contenido de tu aplicación */}
        <section>
          <h1>Welcome to My Website</h1>
          <p>This is the home page.</p>
        </section>
      </main>
    </div>
  );
};

export default App;
