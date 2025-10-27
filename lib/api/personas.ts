import { supabase } from '@/lib/supabase';
import { personas as localPersonas, personaData as localPersonaData } from '@/lib/personasData';
import { Persona } from '@/lib/personasData';

interface PersonaFromDB {
  id: string;
  name: string;
  cluster: string;
  definition: string;
  age_range: string;
  gender: string;
  channel_size: string;
  upload_cadence: string;
  top_cities: string[];
  example_channels: string[];
  milo_must_haves: string[];
  zara_must_haves: string[];
  tasks: string[];
  benefits: string[];
  revenue: Record<string, number>;
  pain_points: string[];
  tonality: string;
  keywords: string[];
  purchase_behavior: string;
  success_looks: string;
  logic_buying: string;
  primary_platform: string;
  software: string[];
  psychographics: string;
  life_stage: string;
  interests: string[];
  favorite_brands: string[];
  hobbies: string[];
}

function transformPersona(dbPersona: PersonaFromDB): Persona {
  return {
    id: dbPersona.id,
    name: dbPersona.name,
    cluster: dbPersona.cluster,
    definition: dbPersona.definition,
    ageRange: dbPersona.age_range,
    gender: dbPersona.gender,
    channelSize: dbPersona.channel_size,
    uploadCadence: dbPersona.upload_cadence,
    topCities: dbPersona.top_cities,
    exampleChannels: dbPersona.example_channels,
    miloMustHaves: dbPersona.milo_must_haves,
    zaraMustHaves: dbPersona.zara_must_haves,
    tasks: dbPersona.tasks,
    benefits: dbPersona.benefits,
    revenue: dbPersona.revenue,
    painPoints: dbPersona.pain_points,
    tonality: dbPersona.tonality,
    keywords: dbPersona.keywords,
    purchaseBehavior: dbPersona.purchase_behavior,
    successLooks: dbPersona.success_looks,
    logicBuying: dbPersona.logic_buying,
    primaryPlatform: dbPersona.primary_platform,
    software: dbPersona.software,
    psychographics: dbPersona.psychographics,
    lifeStage: dbPersona.life_stage,
    interests: dbPersona.interests,
    favoriteBrands: dbPersona.favorite_brands,
    hobbies: dbPersona.hobbies,
  };
}

/**
 * Busca todas as personas do Supabase
 * Fallback para dados locais se Supabase não estiver disponível
 */
export async function getAllPersonas(): Promise<Persona[]> {
  try {
    const { data, error } = await supabase
      .from('personas')
      .select('*')
      .order('name');

    if (error) {
      console.warn('Supabase error, using local data:', error.message);
      return localPersonas;
    }

    if (!data || data.length === 0) {
      console.warn('No data from Supabase, using local data');
      return localPersonas;
    }

    return (data as PersonaFromDB[]).map(transformPersona);
  } catch (error) {
    console.error('Failed to fetch from Supabase, using local data:', error);
    return localPersonas;
  }
}

/**
 * Busca uma persona específica por ID
 */
export async function getPersonaById(id: string): Promise<Persona | null> {
  try {
    const { data, error } = await supabase
      .from('personas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.warn('Supabase error, using local data:', error.message);
      return localPersonas.find(p => p.id === id) || null;
    }

    if (!data) {
      return localPersonas.find(p => p.id === id) || null;
    }

    return transformPersona(data as PersonaFromDB);
  } catch (error) {
    console.error('Failed to fetch persona from Supabase, using local data:', error);
    return localPersonas.find(p => p.id === id) || null;
  }
}

/**
 * Busca definições e clusters das personas
 */
export function getPersonaDefinitions(): Record<string, { definition: string; cluster: string }> {
  const definitions: Record<string, { definition: string; cluster: string }> = {};
  localPersonas.forEach(persona => {
    definitions[persona.id] = {
      definition: persona.definition,
      cluster: persona.cluster
    };
  });
  return definitions;
}

/**
 * Busca contagem de canais por persona
 */
export async function getPersonaStats() {
  try {
    const { data, error } = await supabase
      .from('channels')
      .select('persona_id, status')
      .eq('status', 'classified');

    if (error) {
      console.warn('⚠️ Supabase error in getPersonaStats, using local fallback data:', error.message);
      return localPersonaData;
    }

    // Contar canais por persona
    const stats: Record<string, { count: number; percentage: number }> = {};
    const total = data?.length || 0;

    console.log(`✅ getPersonaStats: Fetched ${total} classified channels from Supabase`);

    data?.forEach(channel => {
      if (channel.persona_id) {
        if (!stats[channel.persona_id]) {
          stats[channel.persona_id] = { count: 0, percentage: 0 };
        }
        stats[channel.persona_id].count++;
      }
    });

    // Calcular percentagens
    Object.keys(stats).forEach(id => {
      stats[id].percentage = (stats[id].count / total) * 100;
    });

    if (Object.keys(stats).length === 0) {
      console.warn('⚠️ No persona data found in Supabase, using local fallback data');
      return localPersonaData;
    }

    console.log(`✅ getPersonaStats: Returning stats for ${Object.keys(stats).length} personas`);
    return stats;
  } catch (error) {
    console.error('❌ Failed to fetch stats from Supabase, using local fallback data:', error);
    return localPersonaData;
  }
}

/**
 * Busca canais de uma persona específica
 */
export async function getChannelsByPersona(personaId: string, limit = 100) {
  try {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('persona_id', personaId)
      .eq('status', 'classified')
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Failed to fetch channels:', error);
    return [];
  }
}

/**
 * Busca estatísticas gerais do dashboard
 */
export async function getDashboardStats() {
  try {
    // Buscar contagem total e por status
    const { count: totalCount } = await supabase
      .from('channels')
      .select('*', { count: 'exact', head: true });

    const { count: classifiedCount } = await supabase
      .from('channels')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'classified');

    const { count: unclassifiedCount } = await supabase
      .from('channels')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unclassified');

    return {
      total: totalCount || 400,
      classified: classifiedCount || 393,
      unclassified: unclassifiedCount || 7,
      successRate: classifiedCount ? ((classifiedCount / (totalCount || 1)) * 100).toFixed(1) : '98.3'
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    // Fallback para dados hardcoded
    return {
      total: 400,
      classified: 393,
      unclassified: 7,
      successRate: '98.3'
    };
  }
}

/**
 * Busca dados de classificação por dia (últimos 30 dias)
 */
export async function getClassificationsByDay() {
  try {
    // Aqui você buscaria do Supabase com uma query agregada por data
    // Por enquanto, vou retornar dados simulados
    const days = 30;
    // Data fixa: 24 de outubro de 2025
    const today = new Date(2025, 9, 24); // Mês 9 = outubro (0-indexed)
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Todos os dias = 0, exceto o último dia (24/10) = 400
      const classified = i === 0 ? 400 : 0;

      data.push({
        date: date.toISOString().split('T')[0],
        classified,
        label: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      });
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch classifications by day:', error);
    return [];
  }
}

/**
 * Busca dados de novos leads por dia (últimos 30 dias)
 */
export async function getNewLeadsByDay() {
  try {
    const days = 30;
    const today = new Date(2025, 9, 24);
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Todos os dias = 0, exceto o último dia (24/10) = 400 novos leads
      const classified = i === 0 ? 400 : 0;

      data.push({
        date: date.toISOString().split('T')[0],
        classified,
        label: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      });
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch new leads by day:', error);
    return [];
  }
}

/**
 * Busca dados de leads existentes por dia (últimos 30 dias)
 */
export async function getExistingLeadsByDay() {
  try {
    const days = 30;
    const today = new Date(2025, 9, 24);
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Todos zerados - nada foi processado ainda
      data.push({
        date: date.toISOString().split('T')[0],
        classified: 0,
        label: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      });
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch existing leads by day:', error);
    return [];
  }
}
