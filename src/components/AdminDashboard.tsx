import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useTranslation } from 'react-i18next';

interface Client {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  project_description: string;
  status: string;
}

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateClientStatus(clientId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ status: newStatus })
        .eq('id', clientId);

      if (error) throw error;
      fetchClients();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord Admin</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {client.project_description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${client.status === 'nouveau' ? 'bg-yellow-100 text-yellow-800' : 
                        client.status === 'en_cours' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={client.status}
                      onChange={(e) => updateClientStatus(client.id, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="nouveau">Nouveau</option>
                      <option value="en_cours">En cours</option>
                      <option value="terminé">Terminé</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;