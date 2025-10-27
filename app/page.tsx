import { getDashboardStats, getPersonaStats, getPersonaDefinitions, getNewLeadsByDay, getExistingLeadsByDay } from '@/lib/api/personas';
import Header from '@/components/Header';
import DashboardClient from '@/components/DashboardClient';
import ClassificationsChart from '@/components/ClassificationsChart';

// Revalidar a cada 5 minutos
export const revalidate = 300;

export default async function Home() {
  const stats = await getDashboardStats();
  const personaStats = await getPersonaStats();
  const personaDefinitions = getPersonaDefinitions();
  const newLeadsData = await getNewLeadsByDay();
  const existingLeadsData = await getExistingLeadsByDay();

  return (
    <div>
      <Header />

      <DashboardClient stats={stats} personaStats={personaStats} personaDefinitions={personaDefinitions} />

      <ClassificationsChart data={newLeadsData} title="New Leads - Last 30 Days" />

      <ClassificationsChart
        data={existingLeadsData}
        title="Existing Leads - Last 30 Days"
        customStats={{
          total: 4320000,
          label2: 'Remaining',
          value2: 4320000,
          showAverage: true,
          showToday: true
        }}
      />
    </div>
  );
}
