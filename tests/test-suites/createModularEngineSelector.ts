import { createModularEngineSelector } from "../../src/helpers/utils";

const createModularEngineSelectorTests = () => {
  describe("\n   createModularEngineSelector", () => {
    test("create a valid moduar-engine selector", () => {
      const resultSelector = createModularEngineSelector(
        (input) => input.test,
        (test) => test
      );
      expect(resultSelector({ test: "test" })).toBe("test");
    });
  });
};

export default createModularEngineSelectorTests;
