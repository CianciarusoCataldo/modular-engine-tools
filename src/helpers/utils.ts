/**
 * @file {@link https://github.com/CianciarusoCataldo/modular-engine-tools modular-engine-tools} functions
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import {
  ModularEngineActionCreator,
  ModularEngineReducer,
  ModularEnginePlugin,
  ModularEnginePluginParameters,
  ModularEngineReducerEffects,
} from "modular-engine-types";

import { createSelector } from "reselect";

/**
 * Create a standard {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} action creator
 *
 * @param type action type
 * @param prepareAction (optional) function to preare the action payload content, if not set an empty payload will be used instead
 *
 * @returns a {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} action creator with the given type set
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularEngineAction = <
  T extends Record<string, any> = Record<string, any>
>(
  type: string,
  prepareAction?: (...args: any[]) => T
): ModularEngineActionCreator<T> => {
  function actionCreator(...custom) {
    let action = { type, payload: {} as T };
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    action.payload = prepareAction ? prepareAction(...custom) : ({} as T);

    return action;
  }

  actionCreator.toString = function () {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function (action) {
    return action.type === type;
  };

  return actionCreator;
};

/**
 * Create a standard {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} reducer
 *
 * @param reducerParams optional reducer parameters:
 * - `initialState` : reducer initial state
 * - `effects` : a key-value object with all reducer action cases. Every key is the action type related to a case, and the value is a function that
 * receives the actual state and the action, and return the updated state
 * - `additionalReducer` : additional reducer to merge to the returned one
 *
 * @returns a modular-engine reducer, ready to be used inside modular-engine system
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularEngineReducer = <T = any>(reducerConfig?: {
  initialState?: T;
  effects?: ModularEngineReducerEffects<T>;
  additionalReducer?: ModularEngineReducer<T>;
}): ModularEngineReducer<T> => {
  const inputConfig = reducerConfig || {};

  const initialState = inputConfig.initialState || ({} as T);
  const effects = inputConfig.effects || {};

  const additionalReducer =
    inputConfig.additionalReducer || ((state, action) => state);

  /**
   * A standard modular-engine reducer function
   *
   * @see https://cianciarusocataldo.github.io/modular-engine/docs
   *
   *
   * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
   *
   * @copyright Cataldo Cianciaruso 2022
   */
  const reducer: ModularEngineReducer<T> = function (state, action) {
    const input = state || initialState;
    if (!action) {
      return input;
    }
    const nextState = effects[action.type]
      ? effects[action.type](input, action)
      : input;

    return additionalReducer(nextState, action);
  };

  return reducer;
};

/**
 * create a standard {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} selector
 * (use {@link https://github.com/reduxjs/reselect reselect lib} under the hood)
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 * @see https://github.com/reduxjs/reselect
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularEngineSelector = createSelector;

/**
 * create a standard {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} plugin
 *
 * @param feature (required) plugin feature name, to let other plugins know when it is enabled
 * @param pluginCallback (optional) a callback function that returns plugin parameters
 *
 * @returns a ready to use {@link https://github.com/CianciarusoCataldo/modular-engine modular-engine} plugin
 *
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularEnginePlugin = (
  feature: string,
  pluginCallback?: () => ModularEnginePluginParameters
): ModularEnginePlugin => {
  function pluginCreator() {
    const pluginOutput = pluginCallback ? pluginCallback() : {};
    return pluginOutput;
  }

  pluginCreator.toString = function () {
    return "modular-engine plugin " + feature;
  };
  pluginCreator.feature = feature;
  pluginCreator.match = function (pluginToCompare: ModularEnginePlugin) {
    return pluginToCompare.feature === feature;
  };

  return pluginCreator;
};
