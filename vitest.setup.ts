// Excluding *.live.test.ts / __live-* / __bench-* is only a naming convention:
// a suite that calls a paid provider from an ordinary filename still bills Kev
// on every CI run, silently. This makes that impossible instead of unlikely —
// any real socket a test opens throws here rather than reaching a metered host.
// Suites that need fetch mock it (vi.stubGlobal), which replaces this stub for
// the duration of the test and restores it afterwards.
globalThis.fetch = (input: RequestInfo | URL) => {
  const url = typeof input === "object" && "url" in input ? input.url : String(input);
  throw new Error(
    `Test attempted a real network call to ${url}. Mock it (vi.stubGlobal("fetch", ...)); ` +
      `live provider calls belong in *.live.test.ts / __live-*, run by name, never in the suite.`,
  );
};
