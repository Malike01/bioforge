import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// DOM cleanup after each test to prevent memory leaks and ensure a clean state for the next test
afterEach(() => {
  cleanup();
});
