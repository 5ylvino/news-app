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
import NewsByCategory from './pages/NewsByCategory';
import { TransporterManager } from './utils/action.context';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <TransporterManager>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/category' element={<NewsByCategory />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path='/preferences' element={<Preferences />} />
                </Route>
              </Routes>
            </Suspense>
          </Layout>
        </TransporterManager>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
