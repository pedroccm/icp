'use client';

import { useState } from 'react';
import { personas } from '@/lib/personasData';
import PersonaCard from './PersonaCard';

export default function PersonasSection() {
  const [activePersona, setActivePersona] = useState(personas[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPersona = searchTerm
    ? personas.find(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cluster.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : personas.find(p => p.id === activePersona);

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          className="w-full max-w-2xl px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-md text-[var(--text-primary)] text-sm transition-all focus:outline-none focus:border-[var(--accent)] focus:ring-3 focus:ring-[var(--accent-muted)]"
          placeholder="Search personas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
        {personas.map(persona => (
          <button
            key={persona.id}
            onClick={() => {
              setActivePersona(persona.id);
              setSearchTerm('');
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activePersona === persona.id && !searchTerm
                ? 'bg-[var(--accent)] text-white border border-[var(--accent)]'
                : 'bg-transparent text-[var(--text-secondary)] border border-transparent hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
            }`}
          >
            {persona.name}
          </button>
        ))}
      </div>

      {filteredPersona && <PersonaCard persona={filteredPersona} />}
    </div>
  );
}
