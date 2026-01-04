import { Sidebar } from './Sidebar';
import { getAllClients } from '@/lib/clients';

export function SidebarWrapper() {
  const clients = getAllClients();

  return (
    <Sidebar
      clients={clients.map(c => ({
        slug: c.slug,
        name: c.name,
        status: c.status,
      }))}
    />
  );
}
