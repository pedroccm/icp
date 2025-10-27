import { Persona } from '@/lib/personasData';

interface PersonaCardProps {
  persona: Persona;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  const isGeneral = persona.id === 'general';

  return (
    <div className="persona-card active">
      <div className="persona-header">
        <h2>{persona.name}</h2>
        <p className="cluster">{persona.cluster}</p>
      </div>

      <div className="definition-box">
        <p>{persona.definition}</p>
      </div>

      {!isGeneral && (
      <>
      <div className="section">
        <h3>Demographics</h3>
        <div className="info-grid">
          <div className="info-box">
            <h4>Age Range</h4>
            <p>{persona.ageRange}</p>
          </div>
          <div className="info-box">
            <h4>Gender Distribution</h4>
            <p>{persona.gender}</p>
          </div>
          <div className="info-box">
            <h4>Channel Size</h4>
            <p>{persona.channelSize}</p>
          </div>
          <div className="info-box">
            <h4>Upload Cadence</h4>
            <p>{persona.uploadCadence}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Geographic Distribution</h3>
        <div className="tag-list">
          {persona.topCities.map(city => (
            <span key={city} className="tag">{city}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>MADE Must-Have Benefits</h3>
        <div className="info-grid">
          <div className="info-box">
            <h4>Milo (Content Creation AI)</h4>
            <ul>
              {persona.miloMustHaves.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="info-box">
            <h4>Zara (Community Management AI)</h4>
            <ul>
              {persona.zaraMustHaves.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Example Channel Types</h3>
        <div className="tag-list">
          {persona.exampleChannels.map(channel => (
            <span key={channel} className="tag">{channel}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Typical Tasks & Workflows</h3>
        <ul className="list-simple">
          {persona.tasks.map(task => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Expected Benefits from MADE</h3>
        <ul className="list-simple">
          {persona.benefits.map(benefit => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Revenue Mix</h3>
        <div className="revenue-mix">
          {Object.entries(persona.revenue).map(([source, percentage]) => (
            <div key={source} className="revenue-item">
              <span>{source}</span>
              <span>{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Pain Points</h3>
        <ul className="list-simple">
          {persona.painPoints.map(pain => (
            <li key={pain}>{pain}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Communications & Marketing</h3>
        <div className="info-grid">
          <div className="info-box">
            <h4>Tonality Guide</h4>
            <p>{persona.tonality}</p>
          </div>
          <div className="info-box">
            <h4>Primary Platform</h4>
            <p>{persona.primaryPlatform}</p>
          </div>
        </div>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>Target Keywords</h4>
          <div className="tag-list">
            {persona.keywords.map(kw => (
              <span key={kw} className="tag">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Purchase Behavior & Decision Making</h3>
        <div className="info-box" style={{ marginBottom: '16px' }}>
          <h4>Purchase Behavior</h4>
          <p>{persona.purchaseBehavior}</p>
        </div>
        <div className="info-box" style={{ marginBottom: '16px' }}>
          <h4>Logic When Buying MADE</h4>
          <p>{persona.logicBuying}</p>
        </div>
        <div className="info-box">
          <h4>What Success Looks Like</h4>
          <p>{persona.successLooks}</p>
        </div>
      </div>

      <div className="section">
        <h3>Psychographic Profile</h3>
        <div className="info-grid" style={{ marginBottom: '20px' }}>
          <div className="info-box">
            <h4>Life Stage</h4>
            <p>{persona.lifeStage}</p>
          </div>
          <div className="info-box">
            <h4>Psychographics & Triggers</h4>
            <p>{persona.psychographics}</p>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>Core Interests & Values</h4>
          <div className="tag-list">
            {persona.interests.map(interest => (
              <span key={interest} className="tag">{interest}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>Favorite Brands</h4>
          <div className="tag-list">
            {persona.favoriteBrands.map(brand => (
              <span key={brand} className="tag">{brand}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>Hobbies</h4>
          <div className="tag-list">
            {persona.hobbies.map(hobby => (
              <span key={hobby} className="tag">{hobby}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Software & Tools Stack</h3>
        <div className="tag-list">
          {persona.software.map(sw => (
            <span key={sw} className="tag">{sw}</span>
          ))}
        </div>
      </div>
      </>
      )}
    </div>
  );
}
