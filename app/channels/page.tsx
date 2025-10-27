import Header from '@/components/Header';
import AllChannels from '@/components/AllChannels';
import realChannels from '@/lib/realChannels.json';

export default function ChannelsPage() {
  return (
    <div>
      <Header />
      <AllChannels channels={realChannels} />
    </div>
  );
}
