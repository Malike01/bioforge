import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BioAnimation } from "@/components/animations/BioAnimation";
import {
  ArrowRight,
  Layout,
  Activity,
  Users,
  Zap,
  Github,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { APP_CONTENT } from "@/constant/appConstants";
import { PATHS } from "@/router/paths";

export default function LandingPage() {
  const navigate = useNavigate();
  const CONTENT = APP_CONTENT.landing;

  const iconMap: any = { Layout, Activity, Users };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50/50 selection:bg-indigo-200/60 selection:text-indigo-900">
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-indigo-100/40">
        <div className="max-w-7xl h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            BioForge
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-slate-600 hover:text-indigo-600 hover:bg-transparent"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(PATHS.design)}
              className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-200 transition-all"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <BioAnimation />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200/60 text-sm text-indigo-700 mb-8 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-cyan-100 transition-all cursor-pointer group">
            <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 animate-pulse" />
            {CONTENT.hero.BADGE}
            <ArrowRight
              size={14}
              className="ml-1 group-hover:translate-x-0.5 transition-transform"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            {CONTENT.hero.TITLE_PREFIX} <br className="hidden md:block" />
            <span className="bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              {CONTENT.hero.TITLE_SUFFIX}
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {CONTENT.hero.DESCRIPTION}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              onClick={() => navigate(PATHS.design)}
              className="h-12 px-8 text-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:shadow-xl hover:shadow-indigo-300/50 text-white rounded-full transition-all hover:scale-105 font-medium"
            >
              {CONTENT.hero.BTN_PRIMARY}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-lg rounded-full border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 font-medium transition-all"
            >
              <Github className="mr-2 w-5 h-5" />
              {CONTENT.hero.BTN_SECONDARY}
            </Button>
          </div>

          <div className="mt-20 relative rounded-2xl bg-gradient-to-br from-indigo-100/30 to-cyan-100/30 p-2 ring-1 ring-inset ring-indigo-200/40 lg:-m-4 lg:rounded-3xl lg:p-4 hover:ring-indigo-300/60 transition-all">
            <div className="bg-white rounded-xl shadow-2xl border border-indigo-100/60 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-indigo-100/40 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto bg-white/80 px-3 py-1 rounded-md text-xs text-slate-500 font-mono shadow-sm border border-indigo-100/40">
                  bioforge.app/design/plasmid-alpha
                </div>
              </div>
              <div className="h-[300px] md:h-[500px] bg-gradient-to-b from-indigo-50/50 to-white relative flex items-center justify-center">
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
      <section className="border-y border-indigo-100/40 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-100/40">
            {CONTENT.stats.map((stat, idx) => (
              <div key={idx} className="pt-8 md:pt-0 group">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent tracking-tight group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {CONTENT.features.title}
            </h2>
            <p className="text-slate-600 mt-4">
              Harness the power of biotechnology with our intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CONTENT.features.list.map((feature, idx) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white to-blue-50/50 border border-indigo-100/40 hover:border-indigo-300/60 hover:shadow-lg hover:shadow-indigo-200/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-cyan-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-200/50 transition-all mx-auto">
                    {Icon && <Icon size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-20 text-center overflow-hidden shadow-2xl hover:shadow-2xl transition-shadow">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                {CONTENT.cta.title}
              </h2>
              <p className="mx-auto max-w-xl text-lg text-indigo-100 mb-10">
                {CONTENT.cta.desc}
              </p>
              <Button
                size="lg"
                onClick={() => navigate(PATHS.design)}
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 h-14 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {CONTENT.cta.btn}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-indigo-100/40 py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
          <p>{CONTENT.footer.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600 transition-colors">
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
