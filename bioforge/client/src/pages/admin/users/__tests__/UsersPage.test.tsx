import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UsersPage from "../UsersPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APP_CONTENT } from "@/constant/appConstants";

// 1. API Mock
const mockGet = vi.fn();
const mockDelete = vi.fn();

vi.mock("@/lib/api", () => ({
  api: {
    get: (...args: any[]) => mockGet(...args),
    delete: (...args: any[]) => mockDelete(...args),
  },
}));

// Toast Mock
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
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

describe("UsersPage Integration", () => {
  const TEXTS = APP_CONTENT.admin.users;

  it("renders user list correctly", async () => {
    mockGet.mockResolvedValue({
      data: [
        {
          id: 1,
          full_name: "John Doe",
          email: "john@bio.com",
          is_active: true,
          is_superuser: false,
        },
        {
          id: 2,
          full_name: "Admin Alice",
          email: "alice@bio.com",
          is_active: true,
          is_superuser: true,
        },
      ],
    });

    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument(),
    );

    expect(screen.getByText("alice@bio.com")).toBeInTheDocument();
    expect(screen.getByText(TEXTS.PAGE_TITLE)).toBeInTheDocument();
  });

  it("handles delete action", async () => {
    vi.spyOn(window, "confirm").mockImplementation(() => true);

    mockGet.mockResolvedValue({
      data: [
        {
          id: 99,
          full_name: "To Delete",
          email: "del@bio.com",
          is_active: true,
          is_superuser: false,
        },
      ],
    });
    mockDelete.mockResolvedValue({});

    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(screen.getByText("To Delete")).toBeInTheDocument(),
    );

    // 1. Open actions menu
    const actionsBtn = screen.getByText("Open menu");
    fireEvent.click(actionsBtn);

    // 2. Delete User
    const deleteBtn = screen.getByText("Delete User");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("/users/99");
    });
  });
});
