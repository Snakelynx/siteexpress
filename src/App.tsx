import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MentionsLegales from './components/legal/MentionsLegales';
import CGV from './components/legal/CGV';
import Confidentialite from './components/legal/Confidentialite';
import RGPD from './components/legal/RGPD';
import { recordVisit } from './supabaseClient';

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const { i18n } = useTranslation();

  useEffect(() => {
    recordVisit();
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
    
    const title = i18n.language === 'fr' ? 'SiteExpress - Sites Web Professionnels en 1 Heure | Site Vitrine Express' :
                 i18n.language === 'he' ? 'SiteExpress - אתרים מקצועיים בשעה אחת' :
                 i18n.language === 'el' ? 'SiteExpress - Επαγγελματικές Ιστοσελίδες σε 1 Ώρα' :
                 i18n.language === 'it' ? 'SiteExpress - Siti Web Professionali in 1 Ora' :
                 'SiteExpress - Professional Websites in 1 Hour';
    
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', i18n.t('hero.description'));
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', i18n.t('hero.description'));
    }

    let canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (!canonicalUrl) {
      canonicalUrl = document.createElement('link');
      canonicalUrl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalUrl);
    }
    canonicalUrl.setAttribute('href', window.location.href.split('#')[0]);
  }, [i18n.language]);

  const renderPage = () => {
    switch (currentPage) {
      case 'mentions-legales':
        return <MentionsLegales />;
      case 'cgv':
        return <CGV />;
      case 'confidentialite':
        return <Confidentialite />;
      case 'rgpd':
        return <RGPD />;
      default:
        return (
          <>
            <Hero />
            <Features />
            <Blog />
            <Testimonials />
            <Pricing />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;