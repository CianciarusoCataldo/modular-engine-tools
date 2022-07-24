/**
 * @file {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} `config` slice selectors
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import {
  ModularEngineConfigState,
  ModularEngineGlobalState,
} from "modular-engine-types";

import { createModularEngineSelector } from "../../helpers/utils";

import defaultConfig from "./initial-state";

/**
 * Returns all  {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} shared config parameters, saved into the `config` state
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const getConfig = (
  state?: ModularEngineGlobalState
): ModularEngineConfigState => state.config || defaultConfig;

/**
 * Returns {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} config `appName` parameter
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getAppName = createModularEngineSelector(
  getConfig,
  ({ appName }) => appName
);
