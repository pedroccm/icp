'use client';

import { useState, useMemo } from 'react';
import { MockChannel } from '@/lib/mockChannels';

interface AllChannelsProps {
  channels: MockChannel[];
}

const ITEMS_PER_PAGE = 20;

export default function AllChannels({ channels }: AllChannelsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPersona, setFilterPersona] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar canais
  const filteredChannels = useMemo(() => {
    let filtered = channels;

    // Filtro por persona
    if (filterPersona !== 'all') {
      filtered = filtered.filter(ch => ch.personaId === filterPersona);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(ch =>
        ch.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [channels, filterPersona, searchTerm]);

  // Paginação
  const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentChannels = filteredChannels.slice(startIndex, endIndex);

  // Reset para página 1 quando filtros mudam
  const handleFilterChange = (persona: string) => {
    setFilterPersona(persona);
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Lista de personas únicas
  const personas = useMemo(() => {
    const uniquePersonas = new Set(channels.map(ch => ch.personaId));
    return Array.from(uniquePersonas).sort();
  }, [channels]);

  return (
    <div className="stats-section">
      <h2>All Channels</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Complete listing of {channels.length} analyzed channels with their assigned personas
      </p>

      {/* Filtros */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem'
            }}
          />
        </div>
        <div>
          <select
            value={filterPersona}
            onChange={(e) => handleFilterChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Personas ({channels.length})</option>
            {personas.map(persona => (
              <option key={persona} value={persona}>
                {persona.toUpperCase()} ({channels.filter(ch => ch.personaId === persona).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de canais */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                #
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Channel Name
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Persona
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                YouTube Link
              </th>
            </tr>
          </thead>
          <tbody>
            {currentChannels.map((channel, index) => (
              <tr
                key={channel.id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {startIndex + index + 1}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  {channel.name}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '0.875rem' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {channel.personaId}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '0.875rem' }}>
                  <a
                    href={channel.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    View Channel
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div style={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredChannels.length)} of {filteredChannels.length} channels
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              backgroundColor: currentPage === 1 ? 'var(--bg-secondary)' : 'var(--bg-card)',
              color: currentPage === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Previous
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: '0.875rem',
            color: 'var(--text-primary)'
          }}>
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              backgroundColor: currentPage === totalPages ? 'var(--bg-secondary)' : 'var(--bg-card)',
              color: currentPage === totalPages ? 'var(--text-secondary)' : 'var(--text-primary)',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
