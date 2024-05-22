import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { RulesPage } from './components/pages/RulesPage';
import { AccountOverviewPage } from './components/pages/AccountOverviewPage';
import { AccountParametersPage } from './components/pages/AccountParametersPage';
import { AdminPage } from './components/pages/AdminPage';
import { ChangeParametersPage } from './components/pages/ChangeParametersPage';
import { ChangePasswordPage } from './components/pages/ChangePasswordPage';
import { EndGamePage } from './components/pages/EndGamePage';
import { ForgotPasswordPage } from './components/pages/ForgotPasswordPage';
import { FriendsListPage } from './components/pages/FriendsListPage';
import { HomePagePage } from './components/pages/HomePagePage';
import { JoinRoomPage } from './components/pages/JoinRoomPage';
import { SetUpGamePage } from './components/pages/SetUpGamePage';
import { SignInPage } from './components/pages/SignInPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { SoloGamePage } from './components/pages/SoloGamePage';
import { Error404Page } from './components/pages/Error404Page';
import { LogsPage } from './components/pages/LogsPage';
import { AppContext, AppContextProvider } from './components/hooks/AppContext';
import { UserInfo } from './components/types/UserInfo';
import { Nav } from './components/molecules/Nav';

// Titre des pages et l'icone
document.title = "Links Awordkening";
const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
(link as HTMLLinkElement).type = 'image/x-icon';
(link as HTMLLinkElement).rel = 'icon';
(link as HTMLLinkElement).href = '/img/iconeLA.png';

document.head.appendChild(link);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useContext(AppContext);
  console.log(user?.user);
  if (!user?.user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const RequireAuthAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useContext(AppContext);
  console.log(user?.user?.admin);
  if (!user?.user?.admin == true) {
    return <Navigate to="/" replace />;
  }
  return children;
};

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
      <Nav/>
        <Routes>
          <Route path="/" element={<HomePagePage />} />
          <Route path="*" element={<Error404Page />} />
          <Route path="/account" element={<RequireAuth><AccountOverviewPage /></RequireAuth>} />
          <Route path="/account-param" element={<RequireAuth><AccountParametersPage /></RequireAuth>} />
          <Route path="/admin" element={<RequireAuthAdmin><AdminPage /></RequireAuthAdmin>} />
          <Route path="/change-paramters" element={<RequireAuthAdmin><ChangeParametersPage /></RequireAuthAdmin>} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/end-game" element={<RequireAuth><EndGamePage /></RequireAuth>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/friends" element={<RequireAuth><FriendsListPage /></RequireAuth>} />
          <Route path="/join-room" element={<RequireAuth><JoinRoomPage /></RequireAuth>} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/set-up-game" element={<RequireAuth><SetUpGamePage /></RequireAuth>} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/game" element={<RequireAuth><SoloGamePage /></RequireAuth>} />
          <Route path="/logs" element={<RequireAuthAdmin><LogsPage /></RequireAuthAdmin>} />
        </Routes>
      </Router>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
