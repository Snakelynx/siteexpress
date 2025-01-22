/*
  # Création de la table clients et configuration de la sécurité

  1. Nouvelle Table
    - `clients`
      - `id` (uuid, clé primaire)
      - `created_at` (timestamp avec fuseau horaire)
      - `full_name` (texte)
      - `email` (texte, unique)
      - `phone` (texte)
      - `project_description` (texte)
      - `status` (texte) - pour suivre l'état de la demande

  2. Sécurité
    - Activation RLS sur la table `clients`
    - Politique permettant aux administrateurs de lire toutes les données
    - Politique permettant aux utilisateurs non authentifiés d'insérer des données
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  project_description text,
  status text DEFAULT 'nouveau'
);

-- Activation de la sécurité niveau ligne
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Politique pour les administrateurs
CREATE POLICY "Les administrateurs peuvent tout voir"
  ON clients
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN ('votre-email@example.com')); -- Remplacez par votre email

-- Politique pour permettre l'insertion par les utilisateurs non authentifiés
CREATE POLICY "Tout le monde peut créer une demande"
  ON clients
  FOR INSERT
  TO anon
  WITH CHECK (true);