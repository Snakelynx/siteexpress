import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    project_description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Début de la soumission du formulaire');
      console.log('Données à envoyer:', formData);

      const { data, error } = await supabase
        .from('clients')
        .insert([{
          ...formData,
          status: 'nouveau'
        }])
        .select();

      if (error) {
        console.error('Erreur Supabase complète:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      console.log('Insertion réussie, données reçues:', data);
      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        project_description: ''
      });
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      console.error('Erreur complète:', error);
      setError(
        `Erreur: ${error.message}\nCode: ${error.code}\nDétails: ${error.details}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    console.log('Mise à jour du champ:', id, 'avec la valeur:', value);
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('quote.title')}</h2>
          
          {success ? (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 text-center">
                {t('quote.success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 text-center whitespace-pre-line">{error}</p>
                </div>
              )}
              
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('quote.form.fullName')}
                </label>
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('quote.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('quote.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="project_description" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('quote.form.project')}
                </label>
                <textarea
                  id="project_description"
                  value={formData.project_description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? t('quote.form.sending') : t('quote.form.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;