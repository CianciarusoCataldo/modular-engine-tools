import { createModularEngineReducer } from "../../src/helpers/utils";

const createModularEngineReducerTests = () => {
  describe("\n   createModularReducer", () => {
    test("with no params", () => {
      const resultReducer = createModularEngineReducer();

      /* eslint-disable */
      expect(resultReducer({}, null as any)).toStrictEqual({});

      expect(resultReducer(null, { type: "@@test/test-action" })).toStrictEqual(
        {}
      );
    });

    test("with all params", () => {
      const resultReducer = createModularEngineReducer<{
        testField: any;
      } | null>({
        initialState: { testField: { extraField: null } },
        effects: {
          "@@test/test-action": (state, action) => ({
            ...state,
            testField: action.payload,
          }),
          "@@test/test-action-external": (state, action) => ({
            ...state,
            testField: { extraField: "changed by effect" },
          }),
        },
        additionalReducer: (state, action) => state,
      });

      expect(
        resultReducer(null, {
          type: "@@test/test-action",
          payload: { extraField: "extra-field-by-action" },
        })
      ).toStrictEqual({
        testField: { extraField: "extra-field-by-action" },
      });
    });
  });
};

export default createModularEngineReducerTests;
