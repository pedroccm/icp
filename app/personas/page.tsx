import { getAllPersonas } from '@/lib/api/personas';
import PersonasSectionClient from '@/components/PersonasSectionClient';

// Revalidar a cada 1 hora (3600 segundos)
export const revalidate = 3600;

export default async function PersonasPage() {
  const personas = await getAllPersonas();

  return <PersonasSectionClient personas={personas} />;
}
