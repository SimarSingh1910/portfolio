import { useState } from 'react';
import { ContactLinks, ProjectEntry, Section } from './components';
import type { Tag } from './data';
import { activeUse, education, educationNote, internshipProjects, profile, projects, role, skills } from './data';

type Filter = 'all' | Tag;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'swe', label: 'Software engineering' },
  { value: 'ai', label: 'AI and ML' },
];

const navItems = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = projects.filter((p) => filter === 'all' || p.tags.includes(filter));

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="topbar-name">
            {profile.name}
          </a>
          <nav aria-label="Sections" className="topbar-nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-text">
              <h1>{profile.name}</h1>
              <p className="hero-lede">{profile.lede}</p>
              <p className="hero-about">{profile.about}</p>
              <p className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                {profile.status}
              </p>
              <ContactLinks />
            </div>

            <nav aria-label="Projects in active use" className="active-panel">
              <h2>In active use</h2>
              <ul>
                {activeUse.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>
                      <span>{item.title}</span>
                      <span className="active-note">{item.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <Section id="experience" title="Experience">
          <div className="role-card">
            <div className="role-head">
              <h3>{role.title}</h3>
              <p className="role-when">{role.when}</p>
            </div>
            <p className="role-summary">{role.summary}</p>
          </div>
          <div className="entries">
            {internshipProjects.map((p) => (
              <ProjectEntry key={p.id} project={p} />
            ))}
          </div>
        </Section>

        <Section id="projects" white>
          <div className="projects-head">
            <div>
              <h2 className="section-title section-title--tight">Projects</h2>
              <p className="muted small" aria-live="polite">
                Showing {visible.length} of {projects.length} projects
              </p>
            </div>
            <div role="group" aria-label="Filter projects" className="filter">
              {filters.map((f) => (
                <button key={f.value} type="button" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="entries entries--bordered">
            {visible.map((p) => (
              <ProjectEntry key={p.id} project={p} />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <h3>{s.group}</h3>
                <p>{s.items}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education" white>
          <div className="table-wrap">
            <table className="edu">
              <thead>
                <tr>
                  <th scope="col">Qualification</th>
                  <th scope="col">Institution</th>
                  <th scope="col">Years</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {education.map((e) => (
                  <tr key={e.qualification}>
                    <td className="strong">{e.qualification}</td>
                    <td>{e.institution}</td>
                    <td>{e.years}</td>
                    <td>{e.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="edu-note">{educationNote}</p>
        </Section>

        <section id="contact" className="section">
          <div className="container contact-panel">
            <h2>Building something? I'd like to hear about it.</h2>
            <p>I'm looking for internships in software engineering, full-stack development and AI/ML. The quickest way to reach me is email.</p>
            <ContactLinks />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="container">Gursimar Singh, Delhi. Every project above links to its source code.</p>
      </footer>
    </>
  );
}
