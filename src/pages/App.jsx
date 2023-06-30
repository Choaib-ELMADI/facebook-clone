import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

import { AuthContextProvider } from '../context/AuthContext';
import { Login, Home, Friends, Watch, Marketplace, Games, Bookmarks, NotFound } from './index';
import { useAuth } from '../context/AuthContext';
import { Publications, About, Photos, Videos, Reels, UserFriends, UserProfile, MessageUsers, CreateProduct, NewProduct } from '../components/index';
import { UserProfileLoader } from '../components/UserProfile/UserProfile';
import MessengerChat, { ReceiverProfileLoader } from '../components/MessengerChat/MessengerChat';



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
    <Route       path='/'>
      <Route     index                element={ <RequireAuth><Home /></RequireAuth>         }  />
      
      <Route     path='login'         element={ <RequireLogOut><Login /></RequireLogOut>    }  />

      <Route     path='friends'       element={ <RequireAuth><Friends /></RequireAuth>      }  />
      <Route     path='watch'         element={ <RequireAuth><Watch /></RequireAuth>        }  />

      <Route     path='marketplace'>
        <Route   index                element={ <RequireAuth><Marketplace /></RequireAuth>  } />
        <Route   path='create'>
          <Route index                element={ <RequireAuth><CreateProduct /></RequireAuth>} />
          <Route path='new'           element={ <RequireAuth><NewProduct /></RequireAuth> }/>
        </Route>
      </Route>

      <Route     path='games'         element={ <RequireAuth><Games /></RequireAuth>        }  />
      <Route     path='bookmarks'     element={ <RequireAuth><Bookmarks /></RequireAuth>    }  />

      <Route     path='users'>
        <Route   index                element={ <RequireAuth><NotFound /></RequireAuth>     }  />

        <Route   path=':userLink'     element={ <RequireAuth><UserProfile /></RequireAuth>  } loader={ UserProfileLoader }>
          <Route index                element={ <Publications /> } />

          <Route path='about'         element={ <About        /> } />
          <Route path='friends'       element={ <UserFriends  /> } />
          <Route path='photos'        element={ <Photos       /> } />
          <Route path='videos'        element={ <Videos       /> } />
          <Route path='reels'         element={ <Reels        /> } />
        </Route>
      </Route>

      <Route     path='messages'>
        <Route   index                element={ <RequireAuth><NotFound /></RequireAuth>      } />
        <Route   path=':senderLink'>
          <Route index                element={ <RequireAuth><MessageUsers /></RequireAuth>  } />
          <Route path=':receiverLink' element={ <RequireAuth><MessengerChat /></RequireAuth> } loader={ ReceiverProfileLoader } />
        </Route>
      </Route>

      <Route     path='*'             element={ <RequireAuth><NotFound /></RequireAuth>      } />
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