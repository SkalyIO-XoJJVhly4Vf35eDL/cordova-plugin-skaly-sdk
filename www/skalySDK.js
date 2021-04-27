var exec = require('cordova/exec');

var SkalySDK = function () {};

/**
 * Start the SDK
 *
 * @param {string} rootKey The root key to talk to the dashboard (or an app using the dashboard SDK)
 * @param {Function} successCallback The function to call when the SDK is started.
 * @param {Function} errorCallback The function to call when there is an error. (OPTIONAL)
 */
SkalySDK.prototype.start = function (rootKey, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'start', [rootKey]);
};

/**
 * Check if user has a scale connected
 *
 * @returns A json object containing a boolean value at the key "hasScale". Example: {"hasScale": true}
 */
SkalySDK.prototype.hasScale = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'hasScale', []);
};

/**
 * Check if user has a watch connected
 *
 * @returns A json object containing a boolean value at the key "hasWatch". Example: {"hasWatch": true}
 */
SkalySDK.prototype.hasWatch = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'hasWatch', []);
};

/**
 * Add scale
 *
 * @param {string} supportedScales Comma-separated string of what scales to support (empty string = all scales) (Example: "withings,virtual_scale")
 * @param {Function} successCallback The function to call when the scale is connected
 * @param {Function} errorCallback The function to call when there is an error getting the scale connected or the user canceled. (OPTIONAL)
 */
SkalySDK.prototype.addScale = function (supportedScales, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'addScale', [supportedScales]);
};

/**
 * Add watch
 *
 * @param {string} supportedWatches Comma-separated string of what watches to support (empty string = all watches) (Example: "withings")
 * @param {Function} successCallback The function to call when the watch is connected
 * @param {Function} errorCallback The function to call when there is an error getting the watch connected or the user canceled. (OPTIONAL)
 */
SkalySDK.prototype.addWatch = function (supportedWatches, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'addWatch', [supportedWatches]);
};

/**
 * Add user profile
 *
 * @param {string} handle the handle as to which the user is known
 * @param {number} sex biological gender of the user (0: male, 1: female)
 * @param {Date} birthday birthday of the user (javascript date object, required)
 * @param {number} length length of the user (in CM)
 * @param {Function} successCallback The function to call when the user is added
 * @param {Function} errorCallback The function to call when there is an error adding the user (OPTIONAL)
 */
SkalySDK.prototype.addIdentity = function (handle, sex, birthday, length, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'addIdentity', [handle, sex, Math.round(birthday.getTime() / 1000), length]);
};

/**
 * Reads current user scale data
 *
 * @returns A callback with scannedHandle (the string) + an array of ScaleReply objects in JSON in the successCallback.
 */
SkalySDK.prototype.startReading = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'startReading', []);
};

/**
 * Gets scale data for handle
 *
 * @param {string} handle the handle of which data to retrieve
 * @param {number} uid retrieve all data after this uid (useful for retrieving large amounts of data)
 * @returns A callback with an array of ScaleReply objects in JSON + the last UID index in the successCallback.
 */
SkalySDK.prototype.getScaleData = function (handle, uid, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'getScaleData', [handle, uid]);
};

/**
 * Reads current user watch data
 *
 * @returns A callback with an array of WatchReply objects in JSON in the successCallback. 
 */
SkalySDK.prototype.getWatchData = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'getWatchData', []);
};

/**
 * Allows consent for a given handle
 * @param {string} to Allow to send data to this root key (most likely the same as the dashboard root key)
 * @param {string} handle Allow sending data for this user / handle
 * @param {Function} successCallback The function to call when the access is granted
 * @param {Function} errorCallback The function to call when there is an error or the user declined (OPTIONAL)
 */
SkalySDK.prototype.allowAccessToData = function (to, handle, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'allowAccessToData', [to, handle]);
};

var skalySDK = new SkalySDK();

module.exports = skalySDK;