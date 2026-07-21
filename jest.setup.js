import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

// React Router expects these Web APIs in the test runtime.
if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder;
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder;
}
