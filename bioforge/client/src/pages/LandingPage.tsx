import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Layout,
  Activity,
  Users,
  Zap,
  Github,
  PlayCircle,
} from "lucide-react";
import { APP_CONTENT } from "@/constant/appConstants";
import { PATHS } from "@/router/paths";

export default function LandingPage() {
  const navigate = useNavigate();
  const CONTENT = APP_CONTENT.landing;

  const iconMap: any = { Layout, Activity, Users };

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            BioForge
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-slate-600"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(PATHS.design)}
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-600 mb-8 hover:bg-slate-100 transition-colors cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            {CONTENT.hero.BADGE}
            <ArrowRight size={14} className="ml-1" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            {CONTENT.hero.TITLE_PREFIX} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              {CONTENT.hero.TITLE_SUFFIX}
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {CONTENT.hero.DESCRIPTION}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate(PATHS.design)}
              className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-full transition-transform hover:scale-105"
            >
              {CONTENT.hero.BTN_PRIMARY}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-lg rounded-full border-slate-200 hover:bg-slate-50 text-slate-700"
            >
              <Github className="mr-2 w-5 h-5" />
              {CONTENT.hero.BTN_SECONDARY}
            </Button>
          </div>

          <div className="mt-20 relative rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto bg-white px-3 py-1 rounded-md text-xs text-slate-400 font-mono shadow-sm border border-slate-100">
                  bioforge.app/design/plasmid-alpha
                </div>
              </div>
              <div className="h-[300px] md:h-[500px] bg-slate-50 relative flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#4f46e5 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="text-slate-300 flex flex-col items-center">
                  <PlayCircle size={64} className="opacity-50" />
                  <p className="mt-4 font-medium">Interactive Canvas Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {CONTENT.stats.map((stat, idx) => (
              <div key={idx} className="pt-8 md:pt-0">
                <div className="text-4xl font-bold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {CONTENT.features.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {CONTENT.features.list.map((feature, idx) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl bg-slate-900 px-6 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                {CONTENT.cta.title}
              </h2>
              <p className="mx-auto max-w-xl text-lg text-slate-300 mb-10">
                {CONTENT.cta.desc}
              </p>
              <Button
                size="lg"
                onClick={() => navigate(PATHS.design)}
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 h-14 rounded-full text-lg font-semibold"
              >
                {CONTENT.cta.btn}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>{CONTENT.footer.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600">
              {CONTENT.footer.links[0].label}
            </a>
            <a href="#" className="hover:text-indigo-600">
              {CONTENT.footer.links[1].label}
            </a>
            <a href="#" className="hover:text-indigo-600">
              {CONTENT.footer.links[2].label}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
