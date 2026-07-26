import { describe, expect, it, vi } from "vitest";

import { mapKeys } from "../src/index.js";

describe("mapKeys", () => {
  it("transforms enumerable keys with callback context", () => {
    const symbol = Symbol("source");
    const output = Symbol("output");
    const object = { first: 1, [symbol]: 2 };
    const transform = vi.fn<
      (
        value: number,
        key: "first" | typeof symbol,
        input: typeof object,
      ) => PropertyKey
    >((_, key) => (key === symbol ? output : key.toUpperCase()));

    expect(mapKeys(object, transform)).toEqual({ FIRST: 1, [output]: 2 });
    expect(transform).toHaveBeenCalledWith(1, "first", object);
    expect(transform).toHaveBeenCalledWith(2, symbol, object);
  });

  it("ignores non-enumerable keys and uses the last colliding value", () => {
    const object = { first: 1, second: 2 };
    Object.defineProperty(object, "hidden", { enumerable: false, value: 3 });

    expect(mapKeys(object, () => "same")).toEqual({ same: 2 });
  });
});
