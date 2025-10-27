import { getDashboardStats, getPersonaStats } from '@/lib/api/personas';
import DashboardClient from '@/components/DashboardClient';

// Revalidar a cada 5 minutos
export const revalidate = 300;

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const personaStats = await getPersonaStats();

  return <DashboardClient stats={stats} personaStats={personaStats} />;
}
