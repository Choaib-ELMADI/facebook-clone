import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthContextProvider } from '../context/AuthContext';
import { Home, Login } from './index';



const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/home' element={ <Home /> } />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;