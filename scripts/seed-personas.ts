import { createClient } from '@supabase/supabase-js';
import { personas } from '../lib/personasData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedPersonas() {
  console.log('🌱 Starting personas seed...');

  // Transform persona data to match database schema
  const personasData = personas.map(persona => ({
    id: persona.id,
    name: persona.name,
    cluster: persona.cluster,
    definition: persona.definition,
    age_range: persona.ageRange,
    gender: persona.gender,
    channel_size: persona.channelSize,
    upload_cadence: persona.uploadCadence,
    top_cities: persona.topCities,
    example_channels: persona.exampleChannels,
    milo_must_haves: persona.miloMustHaves,
    zara_must_haves: persona.zaraMustHaves,
    tasks: persona.tasks,
    benefits: persona.benefits,
    revenue: persona.revenue,
    pain_points: persona.painPoints,
    tonality: persona.tonality,
    keywords: persona.keywords,
    purchase_behavior: persona.purchaseBehavior,
    success_looks: persona.successLooks,
    logic_buying: persona.logicBuying,
    primary_platform: persona.primaryPlatform,
    software: persona.software,
    psychographics: persona.psychographics,
    life_stage: persona.lifeStage,
    interests: persona.interests,
    favorite_brands: persona.favoriteBrands,
    hobbies: persona.hobbies,
  }));

  // Insert personas
  const { data, error } = await supabase
    .from('personas')
    .upsert(personasData, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error seeding personas:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${personas.length} personas!`);
  console.log('Personas:', personas.map(p => p.name).join(', '));
}

seedPersonas()
  .then(() => {
    console.log('🎉 Seed completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
