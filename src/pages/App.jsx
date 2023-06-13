import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

import { AuthContextProvider } from '../context/AuthContext';
import { Login, Home, Friends, Watch, Marketplace, Games, Bookmarks } from './index';
import { useAuth } from '../context/AuthContext';



const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  return (
    user ? children : <Navigate to='/' />
  )
};
const RequireLogOut = ({ children }) => {
  const { user } = useAuth();

  return (
    !user ? children : <Navigate to='/home' />
  )
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={ <RequireLogOut><Login /></RequireLogOut>} />

      <Route path='home'>
        <Route index element={ <RequireAuth><Home /></RequireAuth> } />
      </Route>

      <Route path='friends'>
        <Route index element={ <RequireAuth><Friends /></RequireAuth> } />
      </Route>

      <Route path='watch'>
        <Route index element={ <RequireAuth><Watch /></RequireAuth> } />
      </Route>

      <Route path='marketplace'>
        <Route index element={ <RequireAuth><Marketplace /></RequireAuth> } />
      </Route>

      <Route path='games'>
        <Route index element={ <RequireAuth><Games /></RequireAuth> } />
      </Route>

      <Route path='bookmarks'>
        <Route index element={ <RequireAuth><Bookmarks /></RequireAuth> } />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={ router } />
    </AuthContextProvider>
  );
};

export default App;