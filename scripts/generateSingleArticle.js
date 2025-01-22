import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Images professionnelles pour les articles
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f', // Bureau moderne
  'https://images.unsplash.com/photo-1553877522-43269d4ea984', // Réunion d'affaires
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', // Succès professionnel
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', // Ordinateur portable
  'https://images.unsplash.com/photo-1552581234-26160f608093', // Graphiques de croissance
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', // Réunion créative
  'https://images.unsplash.com/photo-1531973576160-7125cd663d86', // Poignée de main
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3', // Design web
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43', // E-commerce
  'https://images.unsplash.com/photo-1552664730-d307ca884978'  // Succès d'équipe
];

// Sujets orientés vente et conversion
const topics = [
  "Pourquoi votre entreprise a besoin d'un site web professionnel en 2024",
  "Comment un site web peut doubler vos ventes en 3 mois",
  "5 raisons de créer votre site web maintenant",
  "Les secrets d'un site web qui convertit",
  "Combien coûte vraiment un site web ? La vérité sur les prix",
  "Site web express vs agence traditionnelle : faites le bon choix",
  "Comment avoir un site web professionnel en 1 heure",
  "Les erreurs à éviter pour votre site web d'entreprise",
  "ROI d'un site web : rentabilisez votre investissement",
  "Témoignages : ils ont choisi notre solution express"
];

async function generateArticle() {
  try {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    console.log('Génération d\'un article sur:', topic);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: `Tu es un expert en marketing et vente de sites web. 
                   Ton objectif est de convaincre les lecteurs des avantages d'un site web professionnel 
                   et de les inciter à choisir notre service de création de site express à 499€.
                   Utilise un ton persuasif mais professionnel.
                   Inclus toujours un appel à l'action à la fin.`
        }, {
          role: "user",
          content: `Écris un article de blog persuasif sur le thème : ${topic}. 
                   L'article doit :
                   - Faire environ 500 mots
                   - Inclure des exemples concrets
                   - Mettre en avant nos avantages (rapidité, prix fixe, professionnalisme)
                   - Se terminer par un appel à l'action
                   - Utiliser un ton commercial mais pas agressif
                   Format : JSON avec "title" et "content"`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    let article;
    
    try {
      article = JSON.parse(data.choices[0].message.content.trim());
    } catch (parseError) {
      console.error('Erreur de parsing JSON, tentative de nettoyage...');
      const cleanContent = data.choices[0].message.content
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
        .replace(/\n/g, ' ')
        .trim();
      article = JSON.parse(cleanContent);
    }
    
    if (!article || !article.title || !article.content) {
      throw new Error('Format de réponse invalide de l\'API');
    }

    console.log('Article généré:', article.title);

    // Sélectionner une image pertinente
    const imageUrl = UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];

    const { data: articleData, error } = await supabase
      .from('articles')
      .insert([{
        title: article.title,
        content: article.content,
        image_url: imageUrl,
        slug: article.title.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      }])
      .select();

    if (error) throw error;

    console.log('Article créé avec succès dans Supabase!');
    console.log('Données de l\'article:', articleData);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

generateArticle();