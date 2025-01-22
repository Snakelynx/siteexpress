import React from 'react';
import { Menu, X, Home } from 'lucide-react';
import QuoteModal from './QuoteModal';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <>
      <header className="fixed w-full bg-white shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
                className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700"
              >
                <Home className="h-6 w-6" />
                SiteExpress
              </a>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-blue-600">{t('header.home')}</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600">{t('header.services')}</a>
              <a href="#tarifs" className="text-gray-700 hover:text-blue-600">{t('header.pricing')}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">{t('header.contact')}</a>
              <LanguageSwitcher />
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                {t('header.getFreeQuote')}
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <a href="#accueil" className="block text-gray-700 hover:text-blue-600">{t('header.home')}</a>
              <a href="#services" className="block text-gray-700 hover:text-blue-600">{t('header.services')}</a>
              <a href="#tarifs" className="block text-gray-700 hover:text-blue-600">{t('header.pricing')}</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600">{t('header.contact')}</a>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                {t('header.getFreeQuote')}
              </button>
            </div>
          )}
        </nav>
      </header>

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

export default Header;