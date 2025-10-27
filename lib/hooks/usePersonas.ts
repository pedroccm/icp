import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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

export function usePersonas() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const { data, error } = await supabase
          .from('personas')
          .select('*')
          .order('name');

        if (error) throw error;

        const transformedPersonas = (data as PersonaFromDB[]).map(transformPersona);
        setPersonas(transformedPersonas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch personas');
        console.error('Error fetching personas:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPersonas();
  }, []);

  return { personas, loading, error };
}

export function usePersona(id: string) {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPersona() {
      try {
        const { data, error } = await supabase
          .from('personas')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setPersona(transformPersona(data as PersonaFromDB));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch persona');
        console.error('Error fetching persona:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPersona();
  }, [id]);

  return { persona, loading, error };
}
