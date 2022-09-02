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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import AuthProvider from './context/AuthContext';
import GuestOnly from './components/auth/GuestOnly';
import AuthGuard from './components/auth/AuthGuard';

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
    <AuthProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <SideNav />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/" element={<GuestOnly />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/" element={<AuthGuard />}>
              <Route path="profile" element={<div>PROFILE</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApolloProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
