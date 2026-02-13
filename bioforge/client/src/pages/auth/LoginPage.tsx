import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Zap, Loader2, Lock } from "lucide-react";

import { APP_CONTENT } from "@/constant/appConstants";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const CONTENT = APP_CONTENT.auth.login;

  const { mutate: login, isPending } = useLogin();

  const [email, setEmail] = useState("admin@bioforge.com");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-xl border-slate-200 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-200">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{CONTENT.TITLE}</h1>
          <p className="text-sm text-slate-500">{CONTENT.SUBTITLE}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              {CONTENT.INPUT_EMAIL}
            </label>
            <Input
              type="email"
              placeholder={CONTENT.PLACEHOLDER_EMAIL}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-50 border-slate-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex justify-between">
              {CONTENT.INPUT_PASSWORD}
              <span className="text-xs text-indigo-600 cursor-pointer hover:underline">
                {CONTENT.FORGOT_PASS}
              </span>
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-50 border-slate-200"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                {CONTENT.BTN_LOADING}
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" /> {CONTENT.BTN_LOGIN}
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {CONTENT.FOOTER_TEXT}
          <a
            href="#"
            className="text-indigo-600 font-medium hover:underline ml-1"
          >
            {CONTENT.FOOTER_LINK}
          </a>
        </div>
      </Card>
    </div>
  );
}
