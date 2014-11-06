/*
 * spa.js
 * Root namespace module
 */

<<<<<<< HEAD
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

/*global $ */

var spa = (function () {
    var initModule = function ($container) {
        $container.html(
            
        );
    };

    return {
        initModule: initModule
    };

}());
=======
 /*jslint
 	browser : true, continue  : true,
 	devel  : true, indent : 2,	maxerr  :  50,
 	newcap  : true, nomen  : true,  plusplus  :  true,
 	regexp  : true,	sloppy  :  true,	vars  : false,
 	white  : true
 */
 /* global $, spa */

 var spa = ( function () {
 	var initModule = function ( $container ) {
 		spa.shell.initModule( $container );
 	};

 	return { initModule: initModule };
 } )();

>>>>>>> 31861b8e69039b508a54c8209508fbba3837270d
