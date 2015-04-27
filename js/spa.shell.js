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

spa.shell = (function () {
    // Begin module scope variables
    var
        configMap = {
            anchor_schema_map: {
                chat : {
                    open : true,
                    closed : true
                }
            },
            main_html: String() + '<div class="spa-shell-head">' + '<div class="spa-shell-head-logo"></div>' + '<div class="spa-shell-head-acct"></div>' + '<div class="spa-shell-head-search"></div>' + '</div>' + '<div class="spa-shell-main">' + '<div class="spa-shell-main-nav"></div>' + '<div class="spa-shell-main-content"></div>' + '</div>' + '<div class="spa-shell-foot"></div>' + '<div class="spa-shell-chat"></div>' + '<div class="spa-shell-modal"></div>',

            chat_extend_time: 1000,
            chat_retract_time: 300,
            chat_extend_height: 450,
            chat_retract_height: 15,
            chat_extended_title: 'Click to retract',
            chat_retracted_title: 'click to extend'
        },
        stateMap = {
            $container: null,
            is_chat_retracted: true,
            anchor_map = {}
        },
        jqueryMap = {},

        setJqueryMap, toggleChat, onClickChat, initModule, copyAnchorMap , changeAnchorPart, onHashchange;
    // End Module Scope variables

    // Begin DOM methods
    // Return copy of stored anchor map; minimizes overhead
    copyAnchorMap = function () {
        return $.extend(true, {}, stateMap.anchor_map);
    };
             
             
             
    // Begin DOM methos /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $chat: $container.find('.spa-shell-chat')
        };
    };
    // End DOM method /setJqueryMap/

    // Begin DOM method /toggleChat/
    // Purpose : Extends or retracts chat slider
    // Arguments:
    // 	* do_extend - if true, extends slider; if false retracts
    //  * callback - optional function to execute at end of animation
    // Settings :
    // 	* chat_extend_time, chat_retract_time
    //  * chat_extend_height, chat_retract_height
    // Returns : boolean
    //  * true - slider animation actived
    //  * false - slider animation not actived
    // State : sets stateMap.is_chat_retracted
    //  * true - slider is retracted
    // * false - slider is extended
    // 
    toggleChat = function (do_extend, callback) {
        var
            px_chat_ht = jqueryMap.$chat.height(),
        is_open = px_chat_ht === configMap.chat_extend_height,
        is_closed = px_chat_ht === configMap.chat_retract_height,
        is_sliding = !is_open && !is_closed;

        // avoid race condition
        if (is_sliding) {
            return false;
        }

        // Begin extend chat slider
        if (do_extend) {
            jqueryMap.$chat.animate({
                    height: configMap.chat_extend_height
                },
                configMap.chat_extend_time,
                function () {
                    jqueryMap.$chat.attr(
                        'title', configMap.chat_extended_title
                    );
                    stateMap.is_chat_retracted = false;
                    if (callback) {
                        callback(jqueryMap.$chat);
                    }
                }
            );
            return true;
        }
        // End extend chat slider
        // Begin retract chat slider
        jqueryMap.$chat.animate({
                height: configMap.chat_retract_height
            },
            configMap.chat_retract_time,
            function () {
                jqueryMap.$chat.attr('title', configMap.chat_retracted_title);
                stateMap.is_chat_retracted = true;
                if (callback) {
                    callback(jqueryMap.$chat);
                }
            }
        );
        return true;
        // End retract chat slider
    };
    // End DOM method /toggleChat/

    // Begin event handlers
    onClickChat = function (event) {
        if (toggleChat(stateMap.is_chat_retracted)) {
            $.uriAnchor.setAnchor({
                chat : ( stateMap.is_chat_retracted ? 'open' : 'closed')
            });
        }
        return false;
    };
    // End event handlers


    // Begin Public method /initModule/
    initModule = function ($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        // initialize chat slider and bind click handler
        stateMap.is_chat_retracted = true;
        jqueryMap.$chat.attr('title', configMap.chat_retracted_title)
            .click(onClickChat);
    };

    return {
        initModule: initModule
    };
}());