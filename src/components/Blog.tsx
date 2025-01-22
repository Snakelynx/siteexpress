import React, { useEffect, useState } from 'react';
import { getArticles } from '../supabaseClient';
import { Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

interface Article {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  slug: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    window.history.pushState({}, '', `/blog/${article.slug}`);
  };

  // Gestion du retour arrière du navigateur
  useEffect(() => {
    const handlePopState = () => {
      const slug = window.location.pathname.split('/blog/')[1];
      const article = articles.find(a => a.slug === slug);
      setSelectedArticle(article || null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles]);

  if (selectedArticle) {
    return (
      <article className="py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => {
                setSelectedArticle(null);
                window.history.pushState({}, '', '/');
              }}
              className="mb-8 text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              ← Retour aux articles
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={selectedArticle.created_at}>
                      {new Date(selectedArticle.created_at).toLocaleDateString()}
                    </time>
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedArticle.title}
                </h1>

                <div className="prose prose-lg max-w-none">
                  {selectedArticle.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('blog.title')} - SiteExpress</title>
        <meta name="description" content={t('blog.description')} />
      </Helmet>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('blog.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative aspect-video">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={article.created_at}>
                        {new Date(article.created_at).toLocaleDateString()}
                      </time>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.content}
                  </p>

                  <span className="text-blue-600 hover:text-blue-700">
                    {t('blog.readMore')} →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;