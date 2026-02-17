import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "../Guards";
import { useAuthStore } from "@/store/authStore";

vi.mock("@/store/authStore", () => ({
  useAuthStore: vi.fn(),
}));

describe("AuthGuard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to login if not authenticated", () => {
    (useAuthStore as any).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<AuthGuard />}>
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
  });

  it("redirects to app if authenticated but not admin", () => {
    (useAuthStore as any).mockReturnValue({
      isAuthenticated: true,
      user: { isAdmin: false },
    });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          {/* Dashboard/Design */}
          <Route path="/design" element={<div>Design App</div>} />
          <Route element={<AuthGuard />}>
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Design App")).toBeInTheDocument();
  });

  it("allows access if admin", () => {
    (useAuthStore as any).mockReturnValue({
      isAuthenticated: true,
      user: { isAdmin: true },
    });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });
});
