// Mock data for 400 channels
const firstNames = ['Tech', 'Gaming', 'Cooking', 'Music', 'Travel', 'Fitness', 'Comedy', 'Education', 'Art', 'Science', 'Fashion', 'Food', 'Vlog', 'Review', 'Tutorial', 'Daily', 'Life', 'Adventure', 'Creative', 'Digital'];
const secondNames = ['Hub', 'Zone', 'Channel', 'TV', 'World', 'Central', 'Station', 'Studio', 'Network', 'Show', 'Daily', 'Pro', 'Master', 'Expert', 'Guide', 'Academy', 'Lab', 'Corner', 'Place', 'Room'];
const numbers = ['', '101', '2024', 'Official', 'Plus', 'HD', 'Pro', 'Live', 'TV', 'Now'];

const personas = ['jax', 'eli', 'lucy', 'casey', 'ava', 'zane', 'mira', 'reed', 'lex', 'noah', 'ethan', 'rio', 'luna', 'kai', 'general'];

// Distribuição baseada nos dados reais
const personaDistribution = [
  { id: 'jax', count: 65 },
  { id: 'eli', count: 55 },
  { id: 'lucy', count: 47 },
  { id: 'casey', count: 39 },
  { id: 'ava', count: 34 },
  { id: 'zane', count: 27 },
  { id: 'mira', count: 25 },
  { id: 'reed', count: 22 },
  { id: 'general', count: 19 },
  { id: 'lex', count: 19 },
  { id: 'noah', count: 15 },
  { id: 'ethan', count: 12 },
  { id: 'rio', count: 8 },
  { id: 'luna', count: 4 },
  { id: 'kai', count: 2 }
];

function generateYouTubeId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let id = '';
  for (let i = 0; i < 24; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function generateChannelName(): string {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const second = secondNames[Math.floor(Math.random() * secondNames.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  return `${first} ${second}${number ? ' ' + number : ''}`;
}

export interface MockChannel {
  id: string;
  name: string;
  youtubeUrl: string;
  personaId: string;
}

let cachedChannels: MockChannel[] | null = null;

export function generateMockChannels(): MockChannel[] {
  if (cachedChannels) {
    return cachedChannels;
  }

  const channels: MockChannel[] = [];

  // Gerar canais seguindo a distribuição das personas
  personaDistribution.forEach(({ id, count }) => {
    for (let i = 0; i < count; i++) {
      const youtubeId = generateYouTubeId();
      channels.push({
        id: youtubeId,
        name: generateChannelName(),
        youtubeUrl: `https://youtube.com/channel/${youtubeId}`,
        personaId: id
      });
    }
  });

  // Adicionar mais 7 canais para chegar a 400 (393 + 7 unclassified)
  for (let i = 0; i < 7; i++) {
    const youtubeId = generateYouTubeId();
    channels.push({
      id: youtubeId,
      name: generateChannelName(),
      youtubeUrl: `https://youtube.com/channel/${youtubeId}`,
      personaId: 'unclassified'
    });
  }

  // Embaralhar para não ficar em ordem
  for (let i = channels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [channels[i], channels[j]] = [channels[j], channels[i]];
  }

  cachedChannels = channels;
  return channels;
}
