/*
  # Configuration de l'authentification et des droits administrateur

  1. Création de la table d'authentification admin
  2. Configuration des politiques de sécurité
  3. Ajout des fonctions d'aide
*/

-- Création de la table des administrateurs
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Activation de la sécurité niveau ligne
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Politique pour les administrateurs
CREATE POLICY "Les administrateurs peuvent tout voir"
  ON admins
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- Fonction pour vérifier si un utilisateur est administrateur
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Mise à jour de la politique des clients
DROP POLICY IF EXISTS "Les administrateurs peuvent tout voir" ON clients;
CREATE POLICY "Les administrateurs peuvent tout voir"
  ON clients
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()));

-- Insertion d'un administrateur (à exécuter manuellement avec votre email)
-- INSERT INTO admins (id, email) VALUES ('USER_ID', 'YOUR_EMAIL');