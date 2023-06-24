import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

import { AuthContextProvider } from '../context/AuthContext';
import { Login, Home, Friends, Watch, Marketplace, Games, Bookmarks, NotFound } from './index';
import { useAuth } from '../context/AuthContext';
import { Publications, UserProfile } from '../components/index';
import { UserProfileLoader } from '../components/UserProfile/UserProfile';



const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  return (
    user ? children : <Navigate to='/login' />
  )
};

const RequireLogOut = ({ children }) => {
  const { user } = useAuth();

  return (
    !user ? children : <Navigate to='/' />
  )
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index              element={ <RequireAuth><Home /></RequireAuth>        }  />
      
      <Route path='login'       element={ <RequireLogOut><Login /></RequireLogOut>   }  />

      <Route path='friends'     element={ <RequireAuth><Friends /></RequireAuth>     }  />
      <Route path='watch'       element={ <RequireAuth><Watch /></RequireAuth>       }  />
      <Route path='marketplace' element={ <RequireAuth><Marketplace /></RequireAuth> }  />
      <Route path='games'       element={ <RequireAuth><Games /></RequireAuth>       }  />
      <Route path='bookmarks'   element={ <RequireAuth><Bookmarks /></RequireAuth>   }  />

      <Route path='users'>
        <Route index            element={ <RequireAuth><NotFound /></RequireAuth>    }  />

        <Route path=':userLink' element={ <RequireAuth><UserProfile /></RequireAuth> } loader={ UserProfileLoader }>
          <Route index          element={ <Publications /> } />

          <Route path='about'   element={ <Publications /> } />
          <Route path='friends' element={ <Publications /> } />
          <Route path='photos'  element={ <Publications /> } />
          <Route path='videos'  element={ <Publications /> } />
          <Route path='reels'   element={ <Publications /> } />
        </Route>
      </Route>

      <Route path='*'           element={ <RequireAuth><NotFound /></RequireAuth>    } />
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