import 'semantic-ui-css/semantic.min.css'
import './App.css';
import './main.sass'
import Body from "./components/Body";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import NotFound from './pages/NotFound';
import AuthProvider from './context/AuthContext';
import GuestOnly from './components/auth/GuestOnly';
import AuthGuard from './components/auth/AuthGuard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BookSearch from './pages/BookSearch';
import BookDetails from './pages/BookDetails';
import ProfileProvider from './context/ProfileContext';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('lit-auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ProfileProvider>
          <BrowserRouter>
            <SideNav />
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/search" element={<BookSearch />} />
              <Route path="/books" element={<Outlet />}>
                <Route path=":bookId" element={<BookDetails />} />
              </Route>
              <Route path="/" element={<GuestOnly />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="/" element={<AuthGuard />}>
                <Route path="profile" element={<div>PROFILE</div>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

        </ProfileProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
