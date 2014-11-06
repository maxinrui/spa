/*
 * spa.js
 * Root namespace module
 */
/*jslint
    devel  : true,
    newcap : true,
    regexp : true,
    white  : true,
    browser : true,
    indent : 2,
    nomen : true,
    sloppy : true,
    continue : true,
    maxerr  : 50,
    plusplus : true,
    vars : false
*/

/*global $ spa */

var spa = (function () {
    var initModule = function ($container) {
        spa.shell.initModule($container);
    };

    return {
        initModule: initModule
    };

}());

