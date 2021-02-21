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
 * Add scale
 *
 * @param {Function} successCallback The function to call when the scale is connected
 * @param {Function} errorCallback The function to call when there is an error getting the scale connected or the user canceled. (OPTIONAL)
 */
SkalySDK.prototype.addScale = function (supportedScales, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'addScale', [supportedScales]);
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
 * Reads current user data
 *
 * @returns A callback with scannedHandle (the string) + an array of ScaleReply objects in JSON in the successCallback. 
 */
SkalySDK.prototype.startReading = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'startReading', []);
};

/**
 * Allows consent for a given handle
 * @param {string} to Allow to send data to this root key (most likely the same as the dashboard root key)
 * @param {string} handle Allow sending data for this user / handle
 * @param {Function} successCallback The function to call when the access is granted
 * @param {Function} errorCallback The function to call when there is an error or the user declined (OPTIONAL)
 */
SkalySDK.prototype.allowAccessToData = function (to, handle, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'SkalySDK', 'allowAccessToData', []);
};

var skalySDK = new SkalySDK();

module.exports = skalySDK;