import type { ReactNode } from 'react';
import './ProjectsGrid.css';

export function ProjectsGrid({ children }: { children: ReactNode }) {
  return (
    <div className="projects-grid">
      <div className="projects-grid__track">{children}</div>
    </div>
  );
}
