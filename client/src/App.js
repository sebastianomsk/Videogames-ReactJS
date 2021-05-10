import React from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import VideogameRoutes from './routes';
import store from './redux/store';

function App() {
  return (
    // <div className="App">
    //   <h1>Henry Videogames</h1>

    // </div>
    <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <VideogameRoutes />
        </BrowserRouter>

    </Provider>
  </React.StrictMode>
  );
}

export default App;
