import React, { useState, useEffect } from 'react';
import { translations } from './data/translations';
import { LandingPage } from './components/LandingPage';
import { AppDashboard } from './components/AppDashboard';
import { VerifyView } from './components/VerifyView';

export function App() {
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('landing'); // 'landing', 'dashboard', 'verify'

  const t = translations[lang] || translations.en;

  // Check if current URL is a QR verification route
  useEffect(() => {
    if (window.location.pathname.includes('/verify') || window.location.search.includes('batch=')) {
      setView('verify');
    }
  }, []);

  if (view === 'verify') {
    return <VerifyView onBackToApp={() => {
      window.history.pushState({}, '', '/');
      setView('landing');
    }} />;
  }

  if (view === 'dashboard') {
    return (
      <AppDashboard 
        t={t} 
        lang={lang} 
        setLang={setLang} 
        onBackToLanding={() => setView('landing')} 
      />
    );
  }

  return (
    <LandingPage 
      t={t} 
      lang={lang} 
      setLang={setLang} 
      onStartApp={() => setView('dashboard')} 
    />
  );
}

export default App;
