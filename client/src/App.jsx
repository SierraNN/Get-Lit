import 'semantic-ui-css/semantic.min.css';
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
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import ProfileProvider from './context/ProfileContext';
import Profile from './pages/Profile';
import Lists from './pages/Lists';
import ListDetails from './pages/ListDetails';
import Reviews from './pages/Reviews';
import ReviewDetails from './pages/ReviewDetails';
import CreateList from './components/forms/CreateList';
import ClubDetails from './pages/ClubDetails';
import Clubs from './pages/Clubs';
import Users from './pages/Users';
import CreateReview from './components/forms/CreateReview';
import CreateClub from './components/forms/CreateClub';
import LandingPage from './pages/LandingPage';
import UserDetails from './pages/UserDetails';

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
              <Route path="/" element={<LandingPage />} />
              <Route path="/books" element={<Outlet />}>
                <Route index element={<Books />} />
                <Route path=":bookId" element={<BookDetails />} />
              </Route>
              <Route path="/lists" element={<Outlet />}>
                <Route index element={<Lists />} />
                <Route path=":listId" element={<ListDetails />} />
              </Route>
              <Route path="/reviews" element={<Outlet />}>
                <Route index element={<Reviews />} />
                <Route path=":reviewId" element={<ReviewDetails />} />
              </Route>
              <Route path="/clubs" element={<Outlet />}>
                <Route index element={<Clubs />} />
                <Route path=":clubId" element={<ClubDetails />} />
              </Route>
              <Route path="/users" element={<Outlet />}>
                <Route index element={<Users />} />
                <Route path=":userId" element={<Profile />} />
              </Route>
              <Route path="/" element={<GuestOnly />}>
                {/** Redirected if already logged in  */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="/" element={<AuthGuard />}>
                {/** Redirected if not logged in */}
                <Route path="profile" element={<Profile />} />
                <Route path="lists/new" element={<CreateList />} />
                <Route path="books/:bookId/reviews/new" element={<CreateReview />} />
                <Route path="clubs/new" element={<CreateClub />} />
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
