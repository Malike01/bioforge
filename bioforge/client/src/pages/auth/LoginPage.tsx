import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LoginAnimation } from "@/components/animations/LoginAnimation";
import {
  Zap,
  Loader2,
  Mail,
  ArrowRight,
  EyeOffIcon,
  KeyIcon,
} from "lucide-react";

import { APP_CONTENT } from "@/constant/appConstants";
import { useLogin } from "@/hooks/useAuth";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function LoginPage() {
  const CONTENT = APP_CONTENT.auth.login;

  const { mutate: login, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 relative overflow-hidden">
      {/* Animated Background*/}
      <LoginAnimation className="fixed inset-0" />

      {/* Gradient blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob z-0 pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 z-0 pointer-events-none" />
      <div className="fixed -bottom-32 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000 z-0 pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main card */}
      <Card className="neon-border w-full max-w-md p-0 bg-white relative z-20 overflow-hidden group shadow-2xl transition-all duration-500 rounded-2xl">
        {/* Neon borders - bottom and left */}
        <div className="neon-bottom" />
        <div className="neon-left" />

        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

        <div className="relative p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-300/50 group-hover:scale-110 transition-transform duration-500">
              <Zap size={28} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              {CONTENT.TITLE}
            </h1>
            <p className="text-slate-600 mt-2 text-center">
              {CONTENT.SUBTITLE}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2 group/input">
              <label className="text-sm font-semibold text-slate-700 flex justify-between items-center">
                {CONTENT.INPUT_EMAIL}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 transition-colors group-focus-within/input:text-indigo-600" />
                <Input
                  type="email"
                  placeholder={CONTENT.PLACEHOLDER_EMAIL}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gradient-to-r from-slate-50 to-indigo-50/50 border-indigo-200/50 pl-10 focus:bg-white focus:border-indigo-400 focus:ring-indigo-400/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 group/input">
              <label className="text-sm font-semibold text-slate-700 flex justify-between items-center">
                {CONTENT.INPUT_PASSWORD}
                <a
                  href="#"
                  className="text-xs text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors"
                >
                  {CONTENT.FORGOT_PASS}
                </a>
              </label>
              <div className="relative">
                <InputGroup className="bg-slate-50 border-slate-200">
                  <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 transition-colors group-focus-within/input:text-indigo-600" />
                  <InputGroupInput
                    id="inline-end-input"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="bg-gradient-to-r from-slate-50 to-indigo-50/50 border-indigo-200/50 pl-10 focus:bg-white focus:border-indigo-400 focus:ring-indigo-400/20 transition-all"
                  />
                  <InputGroupAddon align="inline-end">
                    <EyeOffIcon />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 mt-6 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:shadow-lg hover:shadow-indigo-300/50 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {CONTENT.BTN_LOADING}
                </>
              ) : (
                <>
                  {CONTENT.BTN_LOGIN}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-200/20 to-transparent" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="flex-1 h-px bg-gradient-to-l from-indigo-200/20 to-transparent" />
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-600">
            {CONTENT.FOOTER_TEXT}
            <a
              href="#"
              className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline ml-1 transition-colors"
            >
              {CONTENT.FOOTER_LINK}
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
