import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function deleteFirstArticles() {
  try {
    // Récupérer les IDs des deux premiers articles (par date de création)
    const { data: articlesToDelete, error: fetchError } = await supabase
      .from('articles')
      .select('id')
      .order('created_at', { ascending: true })
      .limit(2);

    if (fetchError) {
      throw fetchError;
    }

    if (!articlesToDelete || articlesToDelete.length === 0) {
      console.log('Aucun article à supprimer.');
      return;
    }

    // Supprimer les articles
    const ids = articlesToDelete.map(article => article.id);
    const { error: deleteError } = await supabase
      .from('articles')
      .delete()
      .in('id', ids);

    if (deleteError) {
      throw deleteError;
    }

    console.log('Les deux premiers articles ont été supprimés avec succès.');
  } catch (error) {
    console.error('Erreur lors de la suppression des articles:', error);
  }
}

deleteFirstArticles();