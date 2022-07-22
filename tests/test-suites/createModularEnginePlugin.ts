import { ModularEnginePluginInteraction } from "modular-engine-types";
import { createModularEnginePlugin } from "../../src/utils";

const runTests = () => {
  describe("\n   createModularEnginePlugin", () => {
    describe("\n     create a valid modular-engine plugin", () => {
      test("with callback", () => {
        const resultPlugin = createModularEnginePlugin("test-feature", () => ({
          interactions: [] as ModularEnginePluginInteraction[],
        }));
        expect(resultPlugin.feature).toBe("test-feature");
        expect(resultPlugin.toString()).toBe(
          "modular-engine plugin test-feature"
        );
        expect(
          resultPlugin.match(createModularEnginePlugin("test-feature"))
        ).toBe(true);

        expect(resultPlugin()).toStrictEqual({
          interactions: [],
        });
      });

      test("without callback", () => {
        const resultPlugin = createModularEnginePlugin("test-feature");
        expect(resultPlugin.feature).toBe("test-feature");
        expect(resultPlugin.toString()).toBe(
          "modular-engine plugin test-feature"
        );
        expect(
          resultPlugin.match(createModularEnginePlugin("test-feature"))
        ).toBe(true);
        expect(resultPlugin()).toStrictEqual({});
      });
    });
  });
};

export default runTests;
