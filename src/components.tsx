import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Project, Stat } from './data';
import { profile, socialLinks } from './data';

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Renders text, turning `backtick` spans into <code>. */
function RichText({ text }: { text: string }) {
  const parts = text.split('`');
  return <>{parts.map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))}</>;
}

export function CopyEmailButton() {
  const [label, setLabel] = useState('Copy email');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setLabel('Copied');
    } catch {
      setLabel('Select the address to copy');
    }
    window.setTimeout(() => setLabel('Copy email'), 2000);
  };

  return (
    <button type="button" className="btn-primary" onClick={copy}>
      {label}
    </button>
  );
}

export function ContactLinks() {
  return (
    <div className="contact-links">
      <span className="email-box">
        <a href={`mailto:${profile.email}`} className="email-address">
          {profile.email}
        </a>
        <CopyEmailButton />
      </span>
      {socialLinks.map((link) => (
        <a key={link.label} href={link.href} className="btn-link" {...EXTERNAL}>
          {link.label}
          <ArrowIcon />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}

function Flow({ caption, steps, label }: { caption: string; steps: string[]; label: string }) {
  return (
    <>
      <p className="flow-caption">{caption}</p>
      <ol className="flow" aria-label={label}>
        {steps.map((step, i) => (
          <li key={step}>
            {i > 0 && <span className="flow-connector" aria-hidden="true" />}
            <span className={i === steps.length - 1 ? 'flow-node flow-node--output' : 'flow-node'}>{step}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <dl className="stats">
      {stats.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article id={project.id} className="entry">
      <div className="entry-side">
        <h3>{project.title}</h3>
        <p className="entry-kind">{project.kind}</p>
        <a href={project.repo} className="btn-repo" {...EXTERNAL}>
          View code on GitHub
          <ArrowIcon />
        </a>
        {project.video && (
          <a href={project.video.link} className="btn-repo" {...EXTERNAL}>
            Watch demo video
            <ArrowIcon />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        )}
      </div>
      <div className="entry-main">
        <p className="entry-summary">{project.summary}</p>
        {project.video && (
          <div className="entry-video">
            <iframe src={project.video.embed} title={project.video.title} loading="lazy" allow="autoplay; fullscreen" allowFullScreen />
          </div>
        )}
        <Flow caption={project.flowCaption} steps={project.flow} label={`${project.title} flow`} />
        {project.points && (
          <ul className="entry-points">
            {project.points.map((point) => (
              <li key={point}>
                <RichText text={point} />
              </li>
            ))}
          </ul>
        )}
        {project.stats && <Stats stats={project.stats} />}
        <p className="entry-stack">
          <strong>Stack:</strong> {project.stack}
        </p>
      </div>
    </article>
  );
}

export function Section({ id, title, white, children }: { id: string; title?: string; white?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={white ? 'section section--white' : 'section'}>
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
