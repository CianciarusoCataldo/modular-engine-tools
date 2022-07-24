import PKG from "../../package.json";

import createModularEngineActionTests from "../test-suites/createModularEngineAction";
import createModularEnginePluginTests from "../test-suites/createModularEnginePlugin";
import createModularEngineReducerTests from "../test-suites/createModularEngineReducer";
import createModularEngineSelectorTests from "../test-suites/createModularEngineSelector";
import engineInternalTests from "../test-suites/engine-internal";

describe(`\n        ## ${PKG.name} v${PKG.version} - unit tests ##        \n`, () => {
  createModularEngineActionTests();
  createModularEngineReducerTests();
  createModularEngineSelectorTests();
  createModularEnginePluginTests();
  engineInternalTests();
});
