import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/account" element={<AccountOverviewPage />} />
        <Route path="/account-param" element={<AccountParametersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/change-paramters" element={<ChangeParametersPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/end-game" element={<EndGamePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/friends" element={<FriendsListPage />} />
        <Route path="/" element={<HomePagePage />} />
        <Route path="/join-room" element={<JoinRoomPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/set-up-game" element={<SetUpGamePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/game" element={<SoloGamePage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
