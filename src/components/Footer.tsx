import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer = ({ setCurrentPage }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">SiteExpress148770</h4>
            <p className="text-gray-400">
              {t('features.description')}
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.servicesList.websites')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.servicesList.seo')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.servicesList.support')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('mentions-legales')}
                  className="text-gray-400 hover:text-white"
                >
                  {t('footer.legalLinks.terms')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('cgv')}
                  className="text-gray-400 hover:text-white"
                >
                  {t('footer.legalLinks.conditions')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('confidentialite')}
                  className="text-gray-400 hover:text-white"
                >
                  {t('footer.legalLinks.privacy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('rgpd')}
                  className="text-gray-400 hover:text-white"
                >
                  {t('footer.legalLinks.gdpr')}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SiteExpress148770. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;