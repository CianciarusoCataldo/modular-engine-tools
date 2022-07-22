import PKG from "../../package.json";

import createModularActionTests from "../test-suites/createModularAction";
import createModularEnginePluginTests from "../test-suites/createModularEnginePlugin";
import createModularReducerTests from "../test-suites/createModularReducer";
import createModularSelectorTests from "../test-suites/createModularSelector";
import engineInternalTests from "../test-suites/engine-internal";

describe(`\n        ## ${PKG.name} v${PKG.version} - unit tests ##        \n`, () => {
  createModularActionTests();
  createModularReducerTests();
  createModularSelectorTests();
  createModularEnginePluginTests();
  engineInternalTests();
});
