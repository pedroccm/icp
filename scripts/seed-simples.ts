import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🌱 Populando banco...');

  // 1. Inserir personas simples
  const personas = [
    { id: 'jax', persona: 'JAX' },
    { id: 'eli', persona: 'ELI' },
    { id: 'lucy', persona: 'LUCY' },
    { id: 'mira', persona: 'MIRA' },
    { id: 'casey', persona: 'CASEY' },
    { id: 'zane', persona: 'ZANE' },
    { id: 'ava', persona: 'AVA' },
    { id: 'lex', persona: 'LEX' },
    { id: 'noah', persona: 'NOAH' },
    { id: 'ethan', persona: 'ETHAN' },
    { id: 'rio', persona: 'RIO' },
    { id: 'luna', persona: 'LUNA' },
    { id: 'kai', persona: 'KAI' }
  ];

  const { error: personasError } = await supabase
    .from('personas')
    .upsert(personas, { onConflict: 'id' });

  if (personasError) {
    console.error('❌ Erro ao inserir personas:', personasError);
  } else {
    console.log(`✅ ${personas.length} personas inseridas!`);
  }

  // 2. Exemplo de channels (você pode adicionar os 10k depois)
  const exampleChannels = [
    { channel_id: 'UC1234567890', persona: 'JAX' },
    { channel_id: 'UC0987654321', persona: 'ELI' },
    { channel_id: 'UC1122334455', persona: 'LUCY' },
  ];

  const { error: channelsError } = await supabase
    .from('channels')
    .upsert(exampleChannels, { onConflict: 'channel_id' });

  if (channelsError) {
    console.error('❌ Erro ao inserir channels:', channelsError);
  } else {
    console.log(`✅ ${exampleChannels.length} channels de exemplo inseridos!`);
  }

  console.log('🎉 Seed completo!');
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erro:', error);
    process.exit(1);
  });
