
"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Heart,
  HeartHandshake,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  X,
  HandHeart,
  Search,
  ChevronDown,
} from "lucide-react";

const opportunities = [
  {
    title: "Community Food Drive",
    category: "Community",
    description:
      "Help distribute essential supplies to local families.",
    location: "Local community",
    date: "This weekend",
    icon: HandHeart,
  },
  {
    title: "Green Earth Cleanup",
    category: "Environment",
    description:
      "Join volunteers to make your neighborhood greener.",
    location: "Local park",
    date: "Upcoming",
    icon: Sparkles,
  },
  {
    title: "Teach for Tomorrow",
    category: "Education",
    description:
      "Share your knowledge and support young learners.",
    location: "Community center",
    date: "Flexible",
    icon: Users,
  },
];

const features = [
  {
    icon: Users,
    title: "Find your people",
    description:
      "Discover volunteering opportunities that match your interests, skills, and availability.",
    details:
      "Explore causes, connect with organizers, and find opportunities that fit your interests.",
  },
  {
    icon: Sparkles,
    title: "Smarter assignments",
    description:
      "Match volunteers to suitable roles based on skills and availability.",
    details:
      "The planned matching system can consider skills, schedules, role requirements, and workload fairness.",
  },
  {
    icon: CalendarDays,
    title: "Effortless coordination",
    description:
      "Keep events, applications, and schedules organized in one place.",
    details:
      "Organizers can manage event information, coordinate volunteers, and track applications.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover opportunities",
    description:
      "Find causes and community events that matter to you.",
  },
  {
    number: "02",
    title: "Find your match",
    description:
      "Connect your skills and availability with suitable roles.",
  },
  {
    number: "03",
    title: "Make an impact",
    description:
      "Work together and help your community thrive.",
  },
];

const categories = [
  "All",
  "Community",
  "Environment",
  "Education",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedFeature, setExpandedFeature] = useState<number | null>(
    null
  );
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(
    []
  );
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const elements =
      document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => {
        const key = element.dataset.reveal;

        if (key) {
          setVisibleSections((current) =>
            current.includes(key) ? current : [...current, key]
          );
        }
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const key = (entry.target as HTMLElement).dataset.reveal;

          if (key) {
            setVisibleSections((current) =>
              current.includes(key) ? current : [...current, key]
            );
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesCategory =
      category === "All" || item.category === category;

    const query = search.trim().toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  function toggleSaved(title: string) {
    setSavedOpportunities((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  }

  function revealClass(key: string) {
    return `reveal-section ${
      visibleSections.includes(key) ? "is-visible" : ""
    }`;
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F8FAF6] text-[#172B25]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#172B25]/10 bg-[#F8FAF6]/90 backdrop-blur-xl">
        <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#" className="brand-link flex items-center gap-2.5">
            <span className="brand-icon flex h-10 w-10 items-center justify-center rounded-2xl bg-[#147D55] text-white shadow-lg shadow-[#147D55]/20">
              <HeartHandshake size={23} />
            </span>

            <span className="text-2xl font-extrabold tracking-tight">
              volynest<span className="text-[#147D55]">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#64736A] md:flex">
            <a href="#about" className="nav-link">About</a>
            <a href="#opportunities" className="nav-link">
              Opportunities
            </a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">
              How it works
            </a>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="/login"
              className="rounded-full px-4 py-2.5 text-sm font-semibold transition hover:bg-[#147D55]/10"
            >
              Log in
            </a>

            <a
              href="/register"
              className="interactive-button inline-flex items-center gap-2 rounded-full bg-[#147D55] px-5 py-3 text-sm font-semibold text-white"
            >
              Get started <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#172B25]/10 bg-white sm:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        <div
          className={`mobile-menu border-t border-[#172B25]/10 bg-[#F8FAF6] px-4 shadow-lg sm:hidden ${
            menuOpen ? "mobile-menu-open" : ""
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 py-3">
            {[
              ["About", "#about"],
              ["Opportunities", "#opportunities"],
              ["Features", "#features"],
              ["How it works", "#how-it-works"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="mobile-nav-link rounded-xl px-4 py-3 font-medium"
              >
                {label}
              </a>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 pb-3">
              <a
                href="/login"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[#172B25]/15 px-4 py-3 text-center text-sm font-semibold"
              >
                Log in
              </a>

              <a
                href="/register"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[#147D55] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Join now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="hero-orb hero-orb-one pointer-events-none absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#BFE8D0]/50 blur-3xl sm:h-96 sm:w-96" />
        <div className="hero-orb hero-orb-two pointer-events-none absolute -left-24 top-72 -z-10 h-64 w-64 rounded-full bg-[#E5EFD8]/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-24">
          <div className="hero-content min-w-0">
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-[#147D55]/15 bg-white px-4 py-2 text-xs font-semibold text-[#147D55] shadow-sm sm:text-sm">
              <Sparkles size={16} />
              A smarter way to volunteer
            </div>

            <h1 className="hero-heading max-w-2xl text-[clamp(2.8rem,8vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.055em]">
              Your time can
              <br />
              change <span className="text-[#147D55]">lives.</span>
            </h1>

            <p className="hero-description mt-6 max-w-xl text-base leading-7 text-[#64736A] sm:text-lg sm:leading-8">
              Find meaningful ways to help, connect with people who care,
              and make every act of kindness count. VolyNest brings people
              and purpose together.
            </p>

            <div className="hero-actions mt-8 flex flex-col gap-3 min-[430px]:flex-row">
              <a
                href="/register"
                className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#147D55] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#147D55]/20"
              >
                Start volunteering <ArrowRight size={18} />
              </a>

              <a
                href="#opportunities"
                className="interactive-button inline-flex min-h-12 items-center justify-center rounded-full border border-[#172B25]/15 bg-white px-6 py-3.5 font-semibold"
              >
                Explore opportunities
              </a>
            </div>

            <div className="hero-trust mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#64736A] sm:text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="shrink-0 text-[#147D55]" />
                Built for communities
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="shrink-0 text-[#147D55]" />
                Smarter task matching
              </span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="hero-dashboard mx-auto w-full min-w-0 max-w-[500px] lg:ml-auto lg:mr-0">
            <div className="dashboard-card rounded-[1.75rem] border border-white bg-white p-4 shadow-2xl shadow-[#172B25]/10 sm:p-6 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-[#7A897F] sm:text-sm">
                    YOUR COMMUNITY
                  </p>
                  <h2 className="mt-1 text-lg font-bold sm:text-xl">
                    Make a difference
                  </h2>
                </div>

                <span className="floating-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E5F4E9] text-[#147D55]">
                  <HeartHandshake size={24} />
                </span>
              </div>

              <div className="featured-card mt-5 rounded-2xl bg-gradient-to-br from-[#147D55] to-[#0E6545] p-4 text-white sm:p-5">
                <div className="flex items-center gap-2 text-xs font-medium text-white/80 sm:text-sm">
                  <Sparkles size={16} />
                  Featured opportunity
                </div>

                <h3 className="mt-3 text-lg font-bold sm:text-xl">
                  Community Food Drive
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Help organize and distribute essential supplies to local
                  families.
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/90 sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} /> Weekend
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} /> Local community
                  </span>
                </div>

                <a
                  href="#opportunities"
                  className="featured-link mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#147D55]"
                >
                  Explore events <ArrowRight size={15} />
                </a>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="interactive-card rounded-2xl bg-[#F5F7F3] p-4">
                  <Users size={21} className="text-[#147D55]" />
                  <p className="mt-3 text-xl font-bold sm:text-2xl">
                    Together
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#7A897F]">
                    Stronger communities
                  </p>
                </div>

                <div className="interactive-card rounded-2xl bg-[#F5F7F3] p-4">
                  <Zap size={21} className="text-[#147D55]" />
                  <p className="mt-3 text-xl font-bold sm:text-2xl">
                    Smarter
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#7A897F]">
                    Better coordination
                  </p>
                </div>
              </div>

              <div className="interactive-card mt-4 flex items-center gap-3 rounded-2xl border border-[#E8EDE7] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5F4E9] text-[#147D55]">
                  <ShieldCheck size={21} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    Purpose-driven action
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#7A897F]">
                    Skills matched to community needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        data-reveal="about"
        className={`scroll-mt-24 border-y border-[#172B25]/[0.06] bg-white ${revealClass("about")}`}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <div className="section-icon mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F4E9] text-[#147D55]">
            <HandHeart size={25} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#147D55] sm:text-sm">
            Why VolyNest?
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Good intentions deserve better coordination.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#64736A] sm:text-lg sm:leading-8">
            Finding the right opportunity and organizing the right people
            shouldn&apos;t be difficult. We&apos;re building tools that make
            volunteering easier for everyone.
          </p>
        </div>
      </section>

      {/* Opportunities */}
      <section
        id="opportunities"
        data-reveal="opportunities"
        className={`scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${revealClass("opportunities")}`}
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#147D55] sm:text-sm">
              Find your next cause
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Opportunities to do good.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#64736A] sm:text-base">
              Explore opportunities and find the kind of impact you want to
              make.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:mt-9 md:flex-row">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-[#172B25]/10 bg-white px-4 transition focus-within:border-[#147D55] focus-within:ring-2 focus-within:ring-[#147D55]/10">
            <Search size={19} className="shrink-0 text-[#7A897F]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search opportunities..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#98A39B]"
              aria-label="Search opportunities"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`filter-button rounded-full px-4 py-3 text-sm font-semibold ${
                  category === item
                    ? "filter-active bg-[#147D55] text-white shadow-md shadow-[#147D55]/15"
                    : "border border-[#172B25]/10 bg-white text-[#64736A] hover:border-[#147D55]/30 hover:text-[#147D55]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map((item) => {
            const Icon = item.icon;
            const saved = savedOpportunities.includes(item.title);

            return (
              <article
                key={item.title}
                className="interactive-card group flex flex-col rounded-3xl border border-[#172B25]/10 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="card-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F4E9] text-[#147D55]">
                    <Icon size={24} />
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleSaved(item.title)}
                    aria-label={
                      saved ? `Unsave ${item.title}` : `Save ${item.title}`
                    }
                    aria-pressed={saved}
                    className={`save-button flex h-10 w-10 items-center justify-center rounded-full ${
                      saved
                        ? "bg-rose-50 text-rose-600"
                        : "bg-[#F5F7F3] text-[#7A897F] hover:bg-rose-50 hover:text-rose-600"
                    }`}
                  >
                    <Heart
                      size={19}
                      fill={saved ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <span className="mt-5 w-fit rounded-full bg-[#E5F4E9] px-3 py-1 text-xs font-semibold text-[#147D55]">
                  {item.category}
                </span>

                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>

                <p className="mt-2 flex-1 text-sm leading-7 text-[#64736A]">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#7A897F]">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} /> {item.date}
                  </span>
                </div>

                <a
                  href="/register"
                  className="opportunity-link mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#147D55]/20 px-4 py-3 text-sm font-semibold text-[#147D55]"
                >
                  View opportunity <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-[#172B25]/20 bg-white p-8 text-center">
            <Search className="mx-auto text-[#7A897F]" size={28} />
            <h3 className="mt-3 font-bold">
              No matching opportunities
            </h3>
            <p className="mt-2 text-sm text-[#64736A]">
              Try another search or choose a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="text-link mt-4 font-semibold text-[#147D55]"
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="mt-5 text-xs leading-5 text-[#7A897F]">
          Demo content: these are example opportunities, not live listings
          from your database. Saved items currently remain in page state only.
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        data-reveal="features"
        className={`scroll-mt-24 bg-white ${revealClass("features")}`}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#147D55] sm:text-sm">
              What makes us different
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              More than a volunteering platform.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64736A] sm:text-base">
              Select a feature card to discover more.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const expanded = expandedFeature === index;

              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() =>
                    setExpandedFeature(expanded ? null : index)
                  }
                  aria-expanded={expanded}
                  className="interactive-card group relative flex h-full flex-col rounded-3xl border border-[#172B25]/10 bg-[#F8FAF6] p-6 text-left sm:p-7"
                >
                  <span className="absolute right-6 top-5 text-sm font-bold text-[#147D55]/30">
                    0{index + 1}
                  </span>

                  <span className="card-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F4E9] text-[#147D55]">
                    <Icon size={24} />
                  </span>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-[#64736A]">
                    {feature.description}
                  </p>

                  <div
                    className={`feature-details ${
                      expanded ? "feature-details-open" : ""
                    }`}
                    aria-hidden={!expanded}
                  >
                    <p className="rounded-xl bg-white p-4 text-sm leading-6 text-[#52635A]">
                      {feature.details}
                    </p>
                  </div>

                  <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#147D55]">
                    {expanded ? "Show less" : "Learn more"}
                    {expanded ? (
                      <ChevronDown size={16} className="rotate-180" />
                    ) : (
                      <ArrowRight
                        size={16}
                        className="feature-arrow"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        data-reveal="how-it-works"
        className={`scroll-mt-24 bg-[#172B25] text-white ${revealClass("how-it-works")}`}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8BD5AD] sm:text-sm">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Three steps. Real impact.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
              Turn your willingness to help into meaningful community action.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="interactive-card rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-7"
              >
                <p className="text-4xl font-extrabold text-[#8BD5AD]/70 sm:text-5xl">
                  {step.number}
                </p>

                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>

                <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="cta-panel relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#E3F2E6] px-5 py-12 text-center sm:px-10 sm:py-16 md:px-14">
          <div className="cta-orb pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/60 blur-3xl" />

          <div className="relative">
            <span className="floating-icon mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#147D55] text-white">
              <HeartHandshake size={28} />
            </span>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#147D55] sm:text-sm">
              Be part of the change
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Your community needs people like you.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#52635A] sm:text-base">
              Discover opportunities, share your skills, and become part
              of something meaningful.
            </p>

            <a
              href="/register"
              className="interactive-button mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#147D55] px-7 py-3.5 font-semibold text-white"
            >
              Join VolyNest <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#172B25]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-7 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <a
            href="#"
            className="brand-link flex items-center gap-2 font-extrabold"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5F4E9] text-[#147D55]">
              <HeartHandshake size={19} />
            </span>

            <span className="text-lg">
              volynest<span className="text-[#147D55]">.</span>
            </span>
          </a>

          <p className="text-sm text-[#64736A]">
            Bring good together.
          </p>

          <p className="text-xs text-[#7A897F]">
            © 2026 VolyNest. Made for meaningful impact.
          </p>
        </div>
      </footer>
    </main>
  );
}
