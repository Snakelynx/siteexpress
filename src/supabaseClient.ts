import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement Supabase manquantes!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Fonction pour enregistrer une visite
export const recordVisit = async () => {
  try {
    const { error } = await supabase
      .from('visits')
      .insert([
        {
          page: window.location.pathname,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
        }
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Fonction pour récupérer les articles
export const getArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
};

// Fonction pour créer un nouvel article
export const createArticle = async (title: string, content: string, image_url: string) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          content,
          image_url,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    return null;
  }
};