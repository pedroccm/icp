'use client';

interface ChartData {
  date: string;
  classified: number;
  label: string;
}

interface ClassificationsChartProps {
  data: ChartData[];
  title?: string;
  customStats?: {
    total?: number;
    label2?: string;
    value2?: number;
    showAverage?: boolean;
    showToday?: boolean;
  };
}

export default function ClassificationsChart({ data, title = 'Last 30 Days', customStats }: ClassificationsChartProps) {
  if (!data || data.length === 0) {
    return null;
  }

  // Find the maximum value to scale the bars
  const actualMaxValue = Math.max(...data.map(d => d.classified));
  const maxValue = actualMaxValue || 1; // Evita divisão por zero nos cálculos

  // Show only the last 30 days
  const displayData = data.slice(-30);

  const chartWidth = 1000;
  const chartHeight = 180;
  const padding = 10;

  return (
    <div className="stats-section">
      <h2>{title}</h2>

      <div style={{
        position: 'relative',
        height: '220px',
        padding: '20px 0',
        borderBottom: '1px solid var(--border)'
      }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
          style={{ width: '100%', height: '200px', overflow: 'visible' }}
          preserveAspectRatio="none"
        >
          {/* Linha do gráfico */}
          <polyline
            points={displayData.map((item, index) => {
              const x = (index / (displayData.length - 1)) * (chartWidth - 2 * padding) + padding;
              const y = chartHeight - ((item.classified / maxValue) * (chartHeight - 2 * padding)) - padding;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Pontos do gráfico */}
          {displayData.map((item, index) => {
            const x = (index / (displayData.length - 1)) * (chartWidth - 2 * padding) + padding;
            const y = chartHeight - ((item.classified / maxValue) * (chartHeight - 2 * padding)) - padding;

            return (
              <g key={item.date}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="var(--accent)"
                  stroke="var(--bg-primary)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={{ cursor: 'pointer' }}
                >
                  <title>{`${item.label}: ${item.classified} classifications`}</title>
                </circle>
                {item.classified > 0 && (
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {item.classified}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '12px',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <span>{displayData[0]?.label}</span>
        <span>{displayData[Math.floor(displayData.length / 2)]?.label}</span>
        <span>{displayData[displayData.length - 1]?.label}</span>
      </div>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '6px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '4px'
            }}>
              Total (30 days)
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              {customStats?.total !== undefined ? customStats.total.toLocaleString() : displayData.reduce((sum, d) => sum + d.classified, 0).toLocaleString()}
            </div>
          </div>
          {customStats?.label2 && (
          <div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '4px'
            }}>
              {customStats.label2}
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              {customStats.value2?.toLocaleString() || 0}
            </div>
          </div>
          )}
          {!customStats?.label2 && customStats?.showAverage !== false && (
          <div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '4px'
            }}>
              Average per day
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              {(displayData.reduce((sum, d) => sum + d.classified, 0) / displayData.length).toFixed(1)}
            </div>
          </div>
          )}
          {customStats?.showAverage && (
          <div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '4px'
            }}>
              Average per day
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              0.0
            </div>
          </div>
          )}
          {customStats?.showToday && (
          <div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '4px'
            }}>
              Today
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              0
            </div>
          </div>
          )}
          {!customStats && (
          <>
          <div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '4px'
            }}>
              Maximum
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              {actualMaxValue}
            </div>
          </div>
          <div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '4px'
            }}>
              Today
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)'
            }}>
              {displayData[displayData.length - 1]?.classified || 0}
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
