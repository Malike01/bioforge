import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { SupportModal } from "../SupportModal";
import { SupportFab } from "../SupportFab";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APP_CONTENT } from "@/constant/appConstants";

// API Mock
const mockPost = vi.fn();
vi.mock("@/lib/api", () => ({
  api: { post: (...args: any[]) => mockPost(...args) },
}));

// Wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Support System Integration", () => {
  const TEXTS = APP_CONTENT.support;

  it("opens modal when FAB is clicked and submits ticket", async () => {
    render(
      <>
        <SupportFab />
        <SupportModal />
      </>,
      { wrapper: createWrapper() },
    );

    const user = userEvent.setup();
    expect(screen.queryByText(TEXTS.MODAL_TITLE)).not.toBeInTheDocument();

    const fabButton = screen.getByRole("button");
    await user.click(fabButton);

    expect(await screen.findByText(TEXTS.MODAL_TITLE)).toBeInTheDocument();

    // Fill Form
    await user.type(screen.getByLabelText(TEXTS.LABEL_SUBJECT), "Test Subject");
    await user.type(screen.getByLabelText(TEXTS.LABEL_MESSAGE), "Test Message");

    // Send
    await user.click(screen.getByRole("button", { name: TEXTS.BTN_SUBMIT }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalled();
      expect(screen.queryByText(TEXTS.MODAL_TITLE)).not.toBeInTheDocument();
    });
  });
});
