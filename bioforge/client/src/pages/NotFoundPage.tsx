import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ban, Microscope } from "lucide-react";
import { APP_CONTENT } from "@/constant/appConstants";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const CONTENT = APP_CONTENT.errors.notFound;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-slate-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-md w-full px-6 text-center">
        <div className="flex justify-center mb-6 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50" />
            <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-slate-100 rotate-3 transition-transform hover:rotate-6">
              <Microscope className="h-16 w-16 text-slate-300" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full border-4 border-white">
                <Ban className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-7xl font-bold text-slate-900 mb-2 tracking-tighter">
          {CONTENT.TITLE}
        </h1>
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          {CONTENT.SUBTITLE}
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          {CONTENT.DESCRIPTION}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("")} // Navigate to PATHS.root
            className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
          >
            {CONTENT.BTN_HOME}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="bg-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {CONTENT.BTN_BACK}
          </Button>
        </div>

        <div className="mt-12 font-mono text-xs text-slate-300 select-none">
          ERR_CODE: {CONTENT.HINT_CODE}
        </div>
      </div>
    </div>
  );
}
