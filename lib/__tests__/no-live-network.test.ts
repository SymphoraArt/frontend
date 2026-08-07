import { it, expect } from "vitest";

// The *.live.test.ts / __live-* / __bench-* exclusions are naming discipline;
// vitest.setup.ts is what actually stops a paid call. Delete the setupFiles
// entry and nothing else in the suite notices — so this test notices. It is the
// difference between "CI probably does not bill Kev" and "CI cannot bill Kev".
// (That suites may still mock fetch is proven by the rest of the suite, which
// does exactly that and passes.)
it("throws on an unmocked fetch instead of opening a socket", () => {
  // Discard port: even with the guard gone, nothing leaves the machine.
  expect(() => fetch("http://127.0.0.1:9/")).toThrow(/real network call/);
});
