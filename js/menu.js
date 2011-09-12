var HorizontalMenu = (function($, window, undefined) {
    return function(context) {
        var currentActive, $context, $menuBar;

        var init = function() {
            $context = $(context);
            $menuBar = $context.find('.menuBar');
            currentActive = $context.find('.currentActive');
            if (!$context.length || !$menuBar.length || !currentActive.length) {
                if (console && console.log) {
                    console.log('something is missing in your horiz. menu');
                }
                return;
            }
            move(currentActive);
            setEvents();
        };

        var move = function(elem) {
            var left, width;
            left = elem.position().left + 4;
            width = elem.width();
            $menuBar.stop(true).delay(200).animate({
                left: left,
                width: width
            }, 600);
        };

        var setEvents = function() {
            $context.find('li').hover(function(ev) {
                if (ev.type === 'mouseenter') {
                    var $this = $(this);
                    move($this);
                } else if (ev.type === 'mouseleave') {
                    move(currentActive);
                }
            });
        };

        return {
            init : init
        };
    };
}(jQuery, window));

// you want it as a jquery plugin? all right
jQuery.fn.horizontalMenu = function () {
    return jQuery(this).each(function() {
        var newMenu = new HorizontalMenu(this);
        newMenu.init();
    });
};
