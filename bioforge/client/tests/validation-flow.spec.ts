import { test, expect } from "@playwright/test";

test.describe("Bio-CAD Validation Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("*/**/api/v1/design/validate", async (route) => {
      const json = {
        is_valid: false,
        messages: [
          {
            node_id: "1",
            message: "Mock Error: Promoter logic invalid",
            severity: "error",
          },
        ],
        compiled_sequence: null,
      };
      await route.fulfill({ json });
    });

    await page.goto("http://localhost:3000");
  });

  test("visualizes validation errors correctly", async ({ page }) => {
    await expect(page.getByText("T7 Promoter")).toBeVisible();

    const validateBtn = page.getByRole("button", { name: /Validate Design/i });
    await validateBtn.click();

    await expect(
      page.getByText("Mock Error: Promoter logic invalid"),
    ).toBeVisible();
  });
});
