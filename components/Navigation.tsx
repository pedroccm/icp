'use client';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'personas', label: 'Personas' },
    // { id: 'channels', label: 'All Channels' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onSectionChange(tab.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeSection === tab.id
              ? 'bg-[var(--accent)] text-white border border-[var(--accent)]'
              : 'bg-transparent text-[var(--text-secondary)] border border-transparent hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
