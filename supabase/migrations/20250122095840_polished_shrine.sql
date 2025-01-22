/*
  # Mise à jour de la table articles et des politiques de sécurité

  1. Structure
    - Ajout de la table `articles` avec les champs nécessaires
    - Ajout des contraintes et index pour optimiser les performances

  2. Sécurité
    - Activation de RLS
    - Politique de lecture publique
    - Politique d'écriture pour les administrateurs uniquement
*/

-- Suppression de la table si elle existe déjà
DROP TABLE IF EXISTS articles;

-- Création de la table articles
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX articles_slug_idx ON articles(slug);
CREATE INDEX articles_created_at_idx ON articles(created_at DESC);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Activation de la sécurité niveau ligne
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
CREATE POLICY "Les articles sont publics"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Politique d'écriture pour les administrateurs
CREATE POLICY "Seuls les administrateurs peuvent modifier les articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.id = auth.uid()
    )
  );

-- Commentaires pour la documentation
COMMENT ON TABLE articles IS 'Table des articles du blog';
COMMENT ON COLUMN articles.title IS 'Titre de l''article';
COMMENT ON COLUMN articles.content IS 'Contenu de l''article en texte riche';
COMMENT ON COLUMN articles.image_url IS 'URL de l''image principale de l''article';
COMMENT ON COLUMN articles.slug IS 'Slug unique pour l''URL de l''article';
COMMENT ON COLUMN articles.created_at IS 'Date de création de l''article';
COMMENT ON COLUMN articles.updated_at IS 'Date de dernière modification de l''article';