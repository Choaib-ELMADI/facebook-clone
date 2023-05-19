import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthContextProvider } from '../context/AuthContext';
import { Login, Home, Friends, Watch, Marketplace, Games } from './index';



const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={ <Login /> } />

          <Route path='/home' element={ <Home /> } />

          <Route path='/friends' element={ <Friends /> } />
          <Route path='/watch' element={ <Watch /> } />
          <Route path='/marketplace' element={ <Marketplace /> } />
          <Route path='/games' element={ <Games /> } />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;