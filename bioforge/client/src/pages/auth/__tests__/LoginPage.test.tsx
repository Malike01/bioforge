import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../LoginPage";
import { APP_CONTENT } from "@/constant/appConstants";

const mockLoginMutate = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useLogin: () => ({
    mutate: mockLoginMutate,
    isPending: false,
  }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("LoginPage UI Tests", () => {
  const CONTENT = APP_CONTENT.auth.login;

  it("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(CONTENT.TITLE)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(CONTENT.PLACEHOLDER_EMAIL),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Access Lab/i }),
    ).toBeInTheDocument();
  });

  it("submits form with user input", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    // 1. User enter email and password
    const emailInput = screen.getByPlaceholderText(CONTENT.PLACEHOLDER_EMAIL);
    fireEvent.change(emailInput, { target: { value: "test@bioforge.com" } });

    fireEvent.change(emailInput, { target: { value: "admin@bioforge.com" } });

    // for password input:
    const passInput = document.querySelector(
      'input[type="password"]',
    ) as HTMLInputElement;
    fireEvent.change(passInput, { target: { value: "123456" } });

    // 3. Click Login Button
    const submitBtn = screen.getByRole("button", { name: /Access Lab/i });
    fireEvent.click(submitBtn);

    // Correct parameters ?
    expect(mockLoginMutate).toHaveBeenCalledTimes(1);
    expect(mockLoginMutate).toHaveBeenCalledWith({
      email: "admin@bioforge.com",
      password: "123456",
    });
  });
});
