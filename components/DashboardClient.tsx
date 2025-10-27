'use client';

import { useState } from 'react';

interface DashboardClientProps {
  stats: {
    total: number;
    classified: number;
    unclassified: number;
    successRate: string;
  };
  personaStats: Record<string, { count: number; percentage: number }>;
  personaDefinitions?: Record<string, { definition: string; cluster: string }>;
}

export default function DashboardClient({ stats, personaStats, personaDefinitions }: DashboardClientProps) {
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const distributions = Object.entries(personaStats).map(([id, data]) => ({
    id: id,
    name: id.toUpperCase(),
    count: data.count,
    percentage: data.percentage,
    width: `${data.percentage}%`,
    definition: personaDefinitions?.[id]?.definition || '',
    cluster: personaDefinitions?.[id]?.cluster || ''
  })).sort((a, b) => b.count - a.count);

  const togglePersona = (id: string) => {
    setExpandedPersona(expandedPersona === id ? null : id);
  };

  return (
    <div className="stats-section">
      <h2>Dashboard - Classification Results</h2>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-number">{stats.total.toLocaleString()}</div>
          <div className="stat-label">Total Processed</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.classified.toLocaleString()}</div>
          <div className="stat-label">Classified</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.successRate}%</div>
          <div className="stat-label">Success Rate</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.unclassified.toLocaleString()}</div>
          <div className="stat-label">Unclassified</div>
        </div>
      </div>

      <div className="distribution-bar">
        <h3>ICP Distribution ({stats.classified.toLocaleString()} Classified Channels)</h3>
        {distributions.map(dist => (
          <div key={dist.name} className="bar-item" style={{ marginBottom: expandedPersona === dist.id ? '8px' : '0' }}>
            <div className="bar-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="bar-name">{dist.name}</span>
                {dist.definition && (
                  <button
                    onClick={() => togglePersona(dist.id)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      padding: 0,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--accent)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                    title="View persona definition"
                  >
                    ?
                  </button>
                )}
              </div>
              <span className="bar-value">
                {dist.count.toLocaleString()} channels ({dist.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: dist.width }} />
            </div>
            {expandedPersona === dist.id && dist.definition && (
              <div style={{
                marginTop: '12px',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                animation: 'fadeIn 0.2s ease'
              }}>
                {dist.cluster && (
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                      Cluster:
                    </strong>
                    <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                      {dist.cluster}
                    </span>
                  </div>
                )}
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                    Definition:
                  </strong>
                  {dist.definition}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {stats.unclassified > 0 && (
      <div className="unclassified-box">
        <h3>Unclassified Channels ({((stats.unclassified / stats.total) * 100).toFixed(1)}%)</h3>
        <p>
          <strong>{stats.unclassified.toLocaleString()} channels</strong> could not be classified with sufficient confidence.
        </p>
        <p><strong>Reason for non-classification:</strong></p>
        <p>
          • <strong>{((stats.unclassified / stats.total) * 100).toFixed(1)}%</strong> - Limited content for analysis
        </p>
      </div>
      )}
    </div>
  );
}
