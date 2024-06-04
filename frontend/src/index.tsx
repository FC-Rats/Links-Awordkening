import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { RulesPage } from './components/pages/RulesPage';
import { AdminPage } from './components/pages/AdminPage';
import { ChangeParametersPage } from './components/pages/ChangeParametersPage';
import { ChangePasswordPage } from './components/pages/ChangePasswordPage';
import { ForgotPasswordPage } from './components/pages/ForgotPasswordPage';
import { FriendsListPage } from './components/pages/FriendsListPage';
import { HomePagePage } from './components/pages/HomePagePage';
import { SignInPage } from './components/pages/SignInPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { GamePage } from './components/pages/GamePage';
import { Error404Page } from './components/pages/Error404Page';
import { LogsPage } from './components/pages/LogsPage';
import { AppContext, AppContextProvider } from './components/hooks/AppContext';
import { Nav } from './components/molecules/Nav';
import { AccountPage } from './components/pages/AccountPage';

// Titre des pages et l'icone
document.title = "Links Awordkening";
const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
(link as HTMLLinkElement).type = 'image/x-icon';
(link as HTMLLinkElement).rel = 'icon';
(link as HTMLLinkElement).href = '/img/iconeLA.png';
document.head.appendChild(link);

updateMetaTag('charSet', '', 'utf-8');
updateMetaTag('httpEquiv', 'Content-Language', 'fr');
updateMetaTag('name', 'description', '🌿💬 Vevez défier votre esprit avec des chaînes de mots et explorez un monde remplie de liens pour relever le défi ultime du langage !');
updateMetaTag('name', 'keywords', 'jeu, jeux, jeux vidéo, react, projet, université, mots, liens');
updateMetaTag('name', 'author', 'FC-Rats');
updateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1');
updateMetaTag('property', 'og:title', 'Links Awordkening')
updateMetaTag('property', 'og:description', '🌿💬 Vevez défier votre esprit avec des chaînes de mots et explorez un monde remplie de liens pour relever le défi ultime du langage !')
updateMetaTag('property', 'og:type', 'video game')
updateMetaTag('property', 'og:url', 'https://linksawordkening.fabiengilles.tf')
updateMetaTag('property', 'og:image', '/img/iconeLA.png')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useContext(AppContext);
  if (!user?.user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const RequireAuthAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useContext(AppContext);
  if (!user?.user?.admin === true) {
    return <Navigate to="/" replace />;
  }
  return children;
};

root.render(
    <AppContextProvider>
      <Router>
      <Nav/>
        <Routes>
          <Route path="/" element={<HomePagePage />} />
          <Route path="*" element={<Error404Page />} />
          <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
          <Route path="/admin" element={<RequireAuthAdmin><AdminPage /></RequireAuthAdmin>} />
          <Route path="/change-parameters" element={<RequireAuthAdmin><ChangeParametersPage /></RequireAuthAdmin>} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/friends" element={<RequireAuth><FriendsListPage /></RequireAuth>} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/game" element={<RequireAuth><GamePage /></RequireAuth>} />
          <Route path="/logs" element={<RequireAuthAdmin><LogsPage /></RequireAuthAdmin>} />
        </Routes>
      </Router>
    </AppContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function updateMetaTag(attribut: string, name: string, content: string) {
  if (attribut === 'charSet') {
    let charSetElem = document.querySelector(`meta[charSet]`);
    if (charSetElem) {
      charSetElem.setAttribute("charSet", content);
    } else {
      charSetElem = document.createElement('meta');
      charSetElem.setAttribute("charSet", content);
      document.head.appendChild(charSetElem);
    }
  } else {
    let elem = document.querySelector(`meta[${attribut}="${name}"]`);
    if (elem) {
      elem.setAttribute("content", content);
    } else {
      elem = document.createElement('meta');
      elem.setAttribute(attribut, name);
      elem.setAttribute("content", content);
      document.head.appendChild(elem);
    }
  } 
}
