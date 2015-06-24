/*!
 * onLast jQuery Plugin v1.2.7
 *
 * Date: 2015-06-18T10:57Z
 */

var LastHandlers = function () {

    var lastHandlers = new Array();

    var add = function (el, evt, lh) {
        if (!Array.isArray(lastHandlers[el])) { lastHandlers[el] = new Array(); }
        if (!Array.isArray(lastHandlers[el][evt])) { lastHandlers[el][evt] = new Array(); }
        lastHandlers[el][evt].push(lh);
    }
    
    var run = function (el, evt, lh) {
        var events = $._data($(el)[0], "events");
        if (!events) return;
        var handlers = $._data($(el)[0], "events")[evt];
        if (!handlers || !handlers.indexOf) return;

        $.each(handlers, function (i, h) {
            if (h.handler == lh) {
                lh = h;
            }
        });

        var index = handlers.indexOf(lh);
        if (index > -1) {
            handlers.splice(index, 1);
            handlers.push(lh);
        }
    }

    var runAll = function (el, evt) {
        el = $(el);
        if (!lastHandlers[el] || !lastHandlers[$(el)][evt]) {
            return;
        }
        $.each(lastHandlers[el][evt], function (i, lh) {
            run(el, evt, lh);
        });
    }
    
    return {
        'add': add,
        'run': run,
        'runAll': runAll
    }
}();

$.fn.onLast = function (events, handler) {
    var el = $(this);
    if (el.length == 0) return el;
    el.on(events, handler);
    events = events.split(' ');
    $.each(events, function (e, evt) {
        var lh = null;
        var handlers = $(el).data("events")[evt];
        $.each(handlers, function (i, h) {
            if (h.handler == handler) {
                lh = h;
            }
        });
        if (lh == null) return;
        LastHandlers.add(el, evt, lh);
        LastHandlers.run(el, evt, lh);
    });
    return el;
};

var oAdd = jQuery.event.add;
jQuery.event.add = function () {
    var ret = oAdd.apply(this, arguments);
    var el = $(arguments[0]);
    var evt = arguments[1];
    LastHandlers.runAll(el, evt);
    return ret;
};

