'use client';

import { useState } from 'react';
import { Persona } from '@/lib/personasData';
import PersonaCard from './PersonaCard';

interface PersonasSectionClientProps {
  personas: Persona[];
}

export default function PersonasSectionClient({ personas }: PersonasSectionClientProps) {
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
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search personas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-tabs">
        {personas.map(persona => (
          <button
            key={persona.id}
            onClick={() => {
              setActivePersona(persona.id);
              setSearchTerm('');
            }}
            className={`nav-tab ${activePersona === persona.id && !searchTerm ? 'active' : ''}`}
          >
            {persona.name}
          </button>
        ))}
      </div>

      {filteredPersona && <PersonaCard persona={filteredPersona} />}
    </div>
  );
}
