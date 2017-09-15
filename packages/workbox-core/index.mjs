import assert from './utils/assert.mjs';
import WorkboxError from './models/WorkboxError.mjs';
import LOG_LEVELS from './models/LogLevels.mjs';
import * as _private from './_private.mjs';

/**
 * This module houses common code that is shared
 * across all of the the Workbox modules.
 *
 * It can be used for shared internal logic as
 * well as offer API's useful to developers
 * that is fairly generic and used throughout
 * (like cache names or log management).
 *
 * @module workbox-core
 */

 /**
  * You can use this module to set the log level
  * as well as cache names for your web app.
  * @private
  */
class WorkboxCore {
  /**
   * This constructor should never be called directly.
   */
  constructor() {
    // Only expose assert if the build is not production, allowing Rollup to
    // Remove the imports otherwise.
    if (process.env.NODE_ENV !== 'production') {
      this.assert = assert;
    }

    this._logLevel = (process.env.NODE_ENV === 'production') ?
      LOG_LEVELS.warn : LOG_LEVELS.verbose;
  }

  /**
   * The `logLevel` determines which logs are printed to the console.
   * During development on localhost this will be set to verbose by default
   * and set to warning for production use.
   * You can override this here passing in a `LOG_LEVEL` value.
   * @return {number} The current log level.
   * @memberof module:workbox-core#logLevel
   */
  get logLevel() {
    return this._logLevel;
  }

  /**
   * @private
   * @param {number} newLevel the new logLevel to use.
   */
  set logLevel(newLevel) {
    // TODO: Switch to Assertion class
    if (typeof newLevel !== 'number') {
      throw new WorkboxError('invalid-type', {
        paramName: 'logLevel',
        expectedType: 'number',
        value: newLevel,
      });
    }

    if (newLevel > LOG_LEVELS.silent ||
      newLevel < LOG_LEVELS.verbose) {
      throw new WorkboxError('invalid-value', {
        paramName: 'logLevel',
        validValueDescription: `Please use a value from LOG_LEVELS, i.e ` +
          `'logLevel = workbox.core.LOG_LEVELS.verbose'.`,
        value: newLevel,
      });
    }

    this._logLevel = newLevel;
  }
}

export {
  _private,
  LOG_LEVELS,
};
export default new WorkboxCore();
