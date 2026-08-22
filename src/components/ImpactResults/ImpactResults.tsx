import './ImpactResults.css';

interface Stat {
  label: string;
  value: string | string[];
}

export function ImpactResults({ heading, stats }: { heading: string; stats: Stat[] }) {
  return (
    <div className="impact-results">
      <p className="case-heading">{heading}</p>
      <div className="impact-results__row">
        {stats.map((stat) => (
          <div className="impact-results__stat" key={stat.label}>
            <span className="impact-results__label">{stat.label}</span>
            {Array.isArray(stat.value) ? (
              <ul className="impact-results__list">
                {stat.value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="impact-results__value">{stat.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
