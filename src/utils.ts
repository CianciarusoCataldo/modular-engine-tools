/**
 * @file modular-engine-tools functions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import {
  ModularEngineActionCreator,
  ModularEngineReducer,
  ModularEngineEffects,
} from "modular-engine-types";

import { createSelector } from "reselect";

/**
 * Create a standard modular-engine action creator
 *
 * @param type action type
 * @param prepareAction (optional) function to preare the action payload content, if not set an empty payload will be used instead
 *
 * @returns a modular-engine action creator with the given type set
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularAction = <
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
 * Create a standard modular-engine reducer
 *
 * @param reducerParams optional reducer parameters:
 * - `initialState` : reducer initial state
 * - `internalCases` : a key-value object with all reducer action cases. Every key is the action type related to a case, and the value is a function that
 * receives the actual state and the action, and return the updated state
 * - `customConfig` : reducer custom config
 * - `additionalReducer` : additional reducer to merge to the returned one
 *
 * @returns a modular-engine reducer, ready to be used inside modular-engine system
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularReducer = <T = any>(reducerConfig?: {
  initialState?: T;
  effects?: ModularEngineEffects<T>;
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
 * create a standard modular-engin selector
 *
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularSelector = createSelector;
