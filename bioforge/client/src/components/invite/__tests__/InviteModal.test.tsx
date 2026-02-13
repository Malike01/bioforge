import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InviteModal } from "../InviteModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APP_CONTENT } from "@/constant/appConstants";

// Mock the API request
const mockPost = vi.fn();

vi.mock("@/lib/api", () => ({
  api: {
    post: (...args: any[]) => mockPost(...args),
  },
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

// React Query Provider Wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("InviteModal Component", () => {
  const CONTENT = APP_CONTENT.invite;

  it("renders trigger button correctly", () => {
    render(<InviteModal />, { wrapper: createWrapper() });

    // Is the button visible
    expect(
      screen.getByRole("button", { name: CONTENT.TRIGGER_BTN }),
    ).toBeInTheDocument();
  });

  it("opens modal and submits invitation", async () => {
    render(<InviteModal />, { wrapper: createWrapper() });

    // 1. Open the modal by clicking the trigger button
    const triggerBtn = screen.getByRole("button", {
      name: CONTENT.TRIGGER_BTN,
    });
    fireEvent.click(triggerBtn);

    expect(await screen.findByText(CONTENT.MODAL_TITLE)).toBeInTheDocument();

    // 3. Enter an email address
    const emailInput = screen.getByLabelText(CONTENT.LABEL_EMAIL);
    fireEvent.change(emailInput, { target: { value: "newfriend@lab.com" } });

    // 4. Click Send Button
    const sendBtn = screen.getByRole("button", { name: CONTENT.BTN_SEND });
    fireEvent.click(sendBtn);

    // 5. Check if the API was called
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith("/invite/", {
        email: "newfriend@lab.com",
      });
    });
  });
});
