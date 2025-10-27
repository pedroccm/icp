export default function Dashboard() {
  const distributions = [
    { name: 'JAX', count: 2080, percentage: 21.7, width: '86.8%' },
    { name: 'ELI', count: 1340, percentage: 14.0, width: '56%' },
    { name: 'LUCY', count: 1190, percentage: 12.4, width: '49.6%' },
    { name: 'CASEY', count: 1040, percentage: 10.8, width: '43.2%' },
    { name: 'AVA', count: 890, percentage: 9.3, width: '37.2%' },
    { name: 'ZANE', count: 745, percentage: 7.8, width: '31.2%' },
    { name: 'MIRA', count: 615, percentage: 6.4, width: '25.6%' },
    { name: 'REED', count: 590, percentage: 6.2, width: '24.8%' },
    { name: 'LEX', count: 535, percentage: 5.6, width: '22.4%' },
    { name: 'NOAH', count: 315, percentage: 3.3, width: '13.2%' },
    { name: 'ETHAN', count: 155, percentage: 1.6, width: '6.4%' },
    { name: 'RIO', count: 48, percentage: 0.5, width: '2%' },
    { name: 'LUNA', count: 35, percentage: 0.4, width: '1.6%' },
    { name: 'KAI', count: 12, percentage: 0.1, width: '0.4%' }
  ];

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">
        Dashboard - Classification Results
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-5 text-center">
          <div className="text-4xl font-bold text-[var(--accent)] mb-2">10,000</div>
          <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">Total Processed</div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-5 text-center">
          <div className="text-4xl font-bold text-[var(--accent)] mb-2">9,590</div>
          <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">Classified</div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-5 text-center">
          <div className="text-4xl font-bold text-[var(--accent)] mb-2">95.9%</div>
          <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">Success Rate</div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-5 text-center">
          <div className="text-4xl font-bold text-[var(--accent)] mb-2">410</div>
          <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">Unclassified</div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-6 mb-6">
        <h3 className="text-base font-semibold mb-4 text-[var(--text-primary)]">
          ICP Distribution (9,590 Classified Channels)
        </h3>
        {distributions.map(dist => (
          <div key={dist.name} className="mb-4 last:mb-0">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-[var(--text-primary)] font-medium">{dist.name}</span>
              <span className="text-[var(--text-secondary)]">
                {dist.count.toLocaleString()} channels ({dist.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-300"
                style={{ width: dist.width }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-md p-5">
        <h3 className="text-base font-semibold mb-3 text-[var(--text-primary)]">
          Unclassified Channels (4.1%)
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-2">
          <strong>410 channels</strong> could not be classified with sufficient confidence.
        </p>
        <p className="text-sm text-[var(--text-secondary)] mb-2">
          <strong>Reason for non-classification:</strong>
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          • <strong>4.1%</strong> - Limited content for analysis (&lt;5 videos in 90 days) (410 channels)
        </p>
      </div>
    </div>
  );
}
