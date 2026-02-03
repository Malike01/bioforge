import { APP_CONTENT, CORE_THEME } from "@/constant/appConstants";
import { Dna, Loader2 } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2
            className="h-24 w-24 animate-spin opacity-20"
            color={CORE_THEME.COLORS.BRAND.PRIMARY}
          />
        </div>

        <div className="relative z-10 p-4 bg-white rounded-full shadow-xl border border-slate-100 animate-pulse">
          <Dna className="h-10 w-10" color={CORE_THEME.COLORS.BRAND.PRIMARY} />
        </div>

        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-semibold text-slate-800 tracking-tight">
          {APP_CONTENT.loader.TITLE}
        </h3>
        <p className="text-sm text-slate-500 font-mono animate-pulse">
          {APP_CONTENT.loader.SUBTITLE}
        </p>
      </div>
    </div>
  );
};
