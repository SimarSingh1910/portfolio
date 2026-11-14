import { useEffect, useState } from 'react';
import { initAnalytics, track, trackSectionViews } from './analytics';
import { Chip, ContactForm, Header, Icon, ProjectRow, SectionHeading, SocialRail } from './components';
import { EXTERNAL, socials } from './links';
import type { Project, Tag } from './data';
import { activeUse, education, educationNote, experience, internshipProjects, profile, projects, skills } from './data';

type Filter = 'all' | Tag;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'swe', label: 'Software engineering' },
  { value: 'ai', label: 'AI and ML' },
];

const allProjects: Project[] = [...internshipProjects, ...projects];
const year = new Date().getFullYear();

/** Splits "A, B (x, y), C; D" into ["A", "B (x, y)", "C", "D"], capitalising each item. */
function splitSkills(items: string) {
  return items
    .split(/,(?![^(]*\))\s*|;\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1));
}

const B = ({ children }: { children: string }) => <strong className="font-bold text-ink">{children}</strong>;

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = allProjects.filter((p) => filter === 'all' || p.tags.includes(filter));

  useEffect(() => {
    initAnalytics();
    return trackSectionViews(['about', 'experience', 'projects', 'contact']);
  }, []);

  return (
    <>
      <Header />
      <SocialRail />

      <main>
        {/* Hero */}
        <section id="home" className="dot-pattern relative flex min-h-[calc(100svh-72px)] items-center justify-center px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-[42px] leading-[1.1] font-black tracking-[0.06em] text-ink uppercase sm:text-6xl lg:text-7xl">
              Hey, my name is <span className="text-brand">{profile.name}</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-body sm:text-[22px]">{profile.lede}</p>

            <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-brand/20 bg-white px-5 py-2 text-[15px] font-semibold text-ink">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              {profile.status}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#projects" className="btn-brand">
                Projects
              </a>
              <a href="#contact" className="btn-outline bg-white">
                Contact
              </a>
            </div>

            <p className="mt-12 text-[15px] text-body">
              <span className="font-bold tracking-[0.1em] text-ink uppercase">In active use:</span>{' '}
              {activeUse.map((a, i) => (
                <span key={a.id}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  <a href={`#${a.id}`} className="font-semibold text-brand underline-offset-4 hover:underline">
                    {a.title}
                  </a>
                </span>
              ))}
            </p>
          </div>

          <a href="#about" className="absolute bottom-8 left-1/2 hidden h-12 w-7 -translate-x-1/2 rounded-full border-2 border-ink/70 sm:block" aria-label="Scroll to About">
            <span className="absolute top-2 left-1/2 h-2.5 w-1 -translate-x-1/2 rounded-full bg-ink/70 animate-[wheel_1.6s_ease-in-out_infinite] motion-reduce:animate-none" />
          </a>
        </section>

        {/* About */}
        <section id="about" className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title="About me" sub="Who I am, what I build, and the tools I'm comfortable shipping with." />
            <div className="grid gap-16 md:grid-cols-2 md:gap-20">
              <div>
                <h3 className="text-[28px] font-extrabold text-ink">Get to know me!</h3>
                <div className="mt-7 flex flex-col gap-5 text-lg leading-relaxed text-body">
                  <p>
                    I'm <B>Gursimar Singh</B>, a final-year <B>B.Tech (CIOT)</B> student at <B>Netaji Subhas University of Technology, Delhi</B>. I build <B>full-stack products</B> and{' '}
                    <B>applied ML systems</B>, and I test them until the numbers hold up.
                  </p>
                  <p>
                    Most recently I was a <B>Product Intern at HCL Healthcare</B>, where I shipped a finance approval portal and a health-insurance claims model, from requirements with the
                    business teams through to deployment.
                  </p>
                  <p>
                    I work mostly in <B>TypeScript</B> (React, Next.js, Node.js, NestJS) and <B>Python</B> (FastAPI, scikit-learn). I'm looking for{' '}
                    <B>software engineering, full-stack and AI/ML internships</B>. If you're hiring, feel free to{' '}
                    <a href="#contact" className="font-bold text-brand underline underline-offset-4">
                      contact me
                    </a>
                    .
                  </p>
                </div>
                <a href="#contact" className="btn-brand mt-10">
                  Contact
                </a>
              </div>

              <div>
                <h3 className="text-[28px] font-extrabold text-ink">My skills</h3>
                <div className="mt-7 flex flex-col gap-7">
                  {skills.map((s) => (
                    <div key={s.group}>
                      <h4 className="text-sm font-bold tracking-[0.14em] text-brand uppercase">{s.group}</h4>
                      <ul className="mt-3 flex flex-wrap gap-2.5">
                        {splitSkills(s.items).map((item) => (
                          <Chip key={item}>{item}</Chip>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience and education */}
        <section id="experience" className="bg-surface px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title="Experience" sub="Where I've built things for real users, and where I study." />
            <div className="grid gap-14 md:grid-cols-2 md:gap-20">
              <div>
                <h3 className="flex items-center gap-3 text-[24px] font-extrabold text-ink">
                  <span className="grid size-11 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon name="briefcase" size={22} />
                  </span>
                  Work
                </h3>
                <ol className="mt-8 ml-5 border-l-2 border-brand/20">
                  {experience.map((e) => (
                    <li key={e.title} className="relative pb-10 pl-8 last:pb-0">
                      <span className="absolute top-2 -left-[7px] size-3 rounded-full bg-brand ring-4 ring-brand-soft" aria-hidden="true" />
                      <h4 className="text-xl font-extrabold text-ink">{e.title}</h4>
                      <p className="mt-1 text-[15px] font-semibold text-brand">{e.when}</p>
                      <p className="mt-3 text-[17px] leading-relaxed text-body">{e.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="flex items-center gap-3 text-[24px] font-extrabold text-ink">
                  <span className="grid size-11 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon name="cap" size={22} />
                  </span>
                  Education
                </h3>
                <ol className="mt-8 ml-5 border-l-2 border-brand/20">
                  {education.map((e) => (
                    <li key={e.qualification} className="relative pb-8 pl-8 last:pb-0">
                      <span className="absolute top-2 -left-[7px] size-3 rounded-full bg-brand ring-4 ring-brand-soft" aria-hidden="true" />
                      <h4 className="text-xl font-extrabold text-ink">{e.qualification}</h4>
                      <p className="mt-1 text-[17px] text-body">{e.institution}</p>
                      <p className="mt-1 text-[15px] font-semibold text-brand">{e.years}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 text-[17px] leading-relaxed text-body">{educationNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title="Projects" sub="What I've built at HCL, at hackathons and on my own. Open a case study for how each one works." />

            <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
              <div role="group" aria-label="Filter projects" className="flex flex-wrap justify-center gap-2 rounded-lg bg-chip p-1.5">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={filter === f.value}
                    onClick={() => {
                      setFilter(f.value);
                      track('project_filter', { filter: f.value });
                    }}
                    className="min-h-11 rounded-md px-4 text-sm font-bold sm:px-5 sm:text-[15px] text-body transition hover:text-ink aria-pressed:bg-white aria-pressed:text-brand aria-pressed:shadow-sm"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="w-full text-center text-[15px] text-body" aria-live="polite">
                Showing {visible.length} of {allProjects.length} projects
              </p>
            </div>

            <div className="flex flex-col gap-24 sm:gap-28">
              {visible.map((p) => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="dot-pattern px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title="Contact"
              sub="I'm looking for software engineering, full-stack and AI/ML internships. Send a message here or email me directly."
            />
            <p className="-mt-8 mb-12 text-center text-lg sm:-mt-12">
              <a href={`mailto:${profile.email}`} className="font-bold text-brand underline-offset-4 hover:underline" onClick={() => track('email_click', { from: 'contact' })}>
                {profile.email}
              </a>
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#111] px-5 pt-16 pb-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 border-b border-white/15 pb-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <h2 className="text-xl font-bold tracking-[0.12em] uppercase">{profile.name}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-white/70">{profile.lede}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-[0.12em] uppercase">Social</h2>
            <ul className="mt-4 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    title={s.label}
                    aria-label={s.external ? `${s.label} (opens in a new tab)` : s.label}
                    className="grid size-11 place-items-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white"
                    onClick={() => track('social_click', { network: s.label, from: 'footer' })}
                    {...(s.external ? EXTERNAL : {})}
                  >
                    <Icon name={s.icon} size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-center text-[15px] text-white/60">
          © {year} {profile.name}, Delhi. Every project above links to its source code.
        </p>
      </footer>
    </>
  );
}
