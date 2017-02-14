// NAV
$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();
    $(document).scroll(function () {
        scroll_start = $(this).scrollTop();
        if (scroll_start > offset.top) {
            $('.nav-justified').addClass("after");
            $("nav").addClass("after");
        } else {
            $("nav").removeClass("after");
            $('.nav-justified').removeClass("after");
            $('.nav-justified').addClass("before");
        }
    });
});

// VALIDATION
$.fn.ownFormValidate = function (options) {
    options = $.extend({
        classError: 'invalid',
        classOk: 'valid'
    }, options);

    var testInputText = function ($input) {
        if ($input.attr('pattern') != undefined) {
            var reg = new RegExp($input.attr('pattern'), 'gi');
            if (!reg.test($input.val())) {
                $input.removeClass(options.classOk).addClass(options.classError);
                return false;
            } else {
                $input.removeClass(options.classError).addClass(options.classOk);
                return true;
            }
        } else {
            if ($input.val() == '') {
                $input.removeClass(options.classOk).addClass(options.classError);
                return false;
            } else {
                $input.removeClass(options.classError).addClass(options.classOk);
                return true;
            }
        }
    }

    var $form = $(this);
    var prepareElements = function () {
        $form.find('input[required], textarea[required]').each(function () {
            var $t = $(this);
            $t.removeAttr('required');
            $t.addClass('required');
            if ($t.is('input')) {
                var type = $t.attr('type').toLowerCase();
                $t.on('blur keyup', function () { testInputText($t) });
            }
            if ($t.is('textarea')) {
                $t.on('blur keyup', function () { testInputText($t) });
            }
        });
    }
    prepareElements();
}

$(function () {
    $('form').ownFormValidate()
});

$(function () {
    $('form').submit(function () {
        alert('It is only a demo!');
        e.preventDefault();
    });
});

// RESET BUTTOM
$("#reset").on("click", function (event) {
    $("input").removeClass("valid");
    $("input").removeClass("invalid");
    $("textarea").removeClass("valid");
    $("textarea").removeClass("invalid");
});