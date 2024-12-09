import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Preferences from './pages/Preferences';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';
import NewByCategory from './pages/NewByCategory';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/category' element={<NewByCategory />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/preferences' element={<Preferences />} />
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
