import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { track } from './analytics';
import type { Project } from './data';
import { profile } from './data';
import { EXTERNAL, socials } from './links';

/* ---------- Icons ---------- */

const paths: Record<string, ReactNode> = {
  github: (
    <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  leetcode: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8.5 5.5 3.5-5.5 3.5v-7Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5" />
    </>
  ),
};

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

/** Renders text, turning `backtick` spans into <code>. */
function RichText({ text }: { text: string }) {
  const parts = text.split('`');
  return <>{parts.map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))}</>;
}

/* ---------- Header ---------- */

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_10px_100px_rgb(0_0_0_/_0.1)]">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3 text-ink" onClick={() => setOpen(false)}>
          <span className="grid size-11 place-items-center rounded-full bg-brand text-base font-extrabold tracking-wider text-white">{profile.initials}</span>
          <span className="text-lg font-bold tracking-[0.12em] uppercase">{profile.name}</span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="block px-3 py-3 text-[15px] font-bold tracking-[0.12em] text-ink uppercase transition hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-md text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-black/5 bg-white md:hidden">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block px-6 py-3.5 text-center text-base font-bold tracking-[0.12em] text-ink uppercase hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/** The fixed strip of social icons on the left edge (desktop only). */
export function SocialRail() {
  return (
    <ul className="fixed top-1/2 left-0 z-20 hidden -translate-y-1/2 flex-col rounded-r-md bg-white p-1 shadow-[0_2px_20px_rgb(0_0_0_/_0.12)] lg:flex" aria-label="Social links">
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            title={s.label}
            aria-label={s.external ? `${s.label} (opens in a new tab)` : s.label}
            className="grid size-11 place-items-center rounded text-ink transition hover:bg-brand-soft hover:text-brand"
            onClick={() => track('social_click', { network: s.label, from: 'rail' })}
            {...(s.external ? EXTERNAL : {})}
          >
            <Icon name={s.icon} size={21} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Layout bits ---------- */

export function SectionHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-14 text-center sm:mb-20">
      <h2 className="text-[34px] leading-tight font-black tracking-[0.12em] text-ink uppercase sm:text-[40px]">{title}</h2>
      <span className="mx-auto mt-4 block h-[5px] w-8 rounded-full bg-brand" aria-hidden="true" />
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">{sub}</p>
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <li className="rounded-md bg-chip px-4 py-2 text-[15px] font-semibold text-body">{children}</li>;
}

/* ---------- Projects ---------- */

/** Visual panel shown where a screenshot would be: the project's flow, drawn as steps. */
function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#2b1a5c] via-brand to-[#9b6cf5] p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-white/5" aria-hidden="true" />
      <p className="relative text-sm font-bold tracking-[0.14em] text-white/75 uppercase">{project.flowCaption}</p>
      <ol className="relative mt-5 flex flex-col gap-2" aria-label={`${project.title}: ${project.flowCaption}`}>
        {project.flow.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${i === project.flow.length - 1 ? 'bg-amber-300 text-ink' : 'bg-white/20'}`}>{i + 1}</span>
            <span className="text-[15px] font-semibold">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectVideo({ project }: { project: Project }) {
  const video = project.video!;
  return (
    <div className="overflow-hidden rounded-xl bg-ink shadow-[0_10px_40px_rgb(120_67_233_/_0.25)]">
      <div className="aspect-video">
        <iframe src={video.embed} title={video.title} loading="lazy" allow="autoplay; fullscreen" allowFullScreen className="size-full border-0" />
      </div>
    </div>
  );
}

export function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const detailsId = `${project.id}-details`;

  return (
    <article id={project.id} className="grid scroll-mt-28 items-start gap-8 md:grid-cols-2 md:gap-14">
      <div>{project.video ? <ProjectVideo project={project} /> : <ProjectCover project={project} />}</div>

      <div className="min-w-0">
        <p className="text-sm font-bold tracking-[0.14em] text-brand uppercase">{project.context ?? project.kind}</p>
        <h3 className="mt-2 text-[28px] leading-tight font-extrabold text-ink">{project.title}</h3>
        {project.context && <p className="mt-1 text-[16px] font-semibold text-body">{project.kind}</p>}
        <p className="mt-4 text-lg leading-relaxed text-body">{project.summary}</p>

        {project.stats && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dt className="max-w-[22ch] text-sm text-body">{s.label}</dt>
                <dd className="text-2xl font-extrabold text-ink tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-brand"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => {
              if (!open) track('case_study_open', { project: project.id });
              setOpen((o) => !o);
            }}
          >
            Case study
            <Icon name="chevron" size={18} className={`transition ${open ? 'rotate-180' : ''}`} />
          </button>
          <a href={project.repo} className="btn-outline" onClick={() => track('github_click', { project: project.id })} {...EXTERNAL}>
            <Icon name="github" size={18} />
            Code
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {project.video && (
            <a href={project.video.link} className="btn-outline" onClick={() => track('demo_video_click', { project: project.id })} {...EXTERNAL}>
              <Icon name="play" size={18} />
              Demo
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>

        <div id={detailsId} hidden={!open} className="mt-8 rounded-xl border border-black/5 bg-surface p-6">
          {project.points && (
            <ul className="flex list-disc flex-col gap-2.5 pl-5 text-[16.5px] leading-relaxed text-body marker:text-brand">
              {project.points.map((point) => (
                <li key={point}>
                  <RichText text={point} />
                </li>
              ))}
            </ul>
          )}
          <p className={`${project.points ? 'mt-5' : ''} text-[15px] text-body`}>
            <strong className="font-bold text-ink">Stack:</strong> {project.stack}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ---------- Contact form ---------- */

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    track('contact_submit');

    if (!WEB3FORMS_KEY) {
      // No form service configured: open the visitor's email app with the message filled in.
      const subject = encodeURIComponent(`Hello from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setState('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Portfolio message from ${form.name}`, ...form }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!data.success) throw new Error('send failed');
      setState('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setState('error');
    }
  };

  const field = 'mt-2.5 w-full rounded-md font-normal tracking-normal normal-case border border-black/10 bg-surface px-5 py-4 text-base text-ink placeholder:text-black/35 focus:border-brand focus:bg-white focus:outline-none';
  const label = 'block text-[15px] font-bold tracking-[0.1em] text-body uppercase';

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-[0_7px_29px_rgb(100_100_111_/_0.2)] sm:p-10">
      <div className="flex flex-col gap-7">
        <label className={label}>
          Name
          <input className={field} name="name" autoComplete="name" placeholder="Enter your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className={label}>
          Email
          <input className={field} type="email" name="email" autoComplete="email" placeholder="Enter your email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className={label}>
          Message
          <textarea className={`${field} min-h-40 resize-y`} name="message" placeholder="Enter your message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </label>
      </div>
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[15px] text-body" aria-live="polite">
          {state === 'sent' && "Thanks, your message is on its way. I'll get back to you soon."}
          {state === 'error' && (
            <>
              That didn't go through. Email me at{' '}
              <a className="font-semibold text-brand underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              .
            </>
          )}
          {state === 'idle' && !WEB3FORMS_KEY && 'This opens your email app with the message filled in.'}
        </p>
        <button type="submit" className="btn-brand" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
