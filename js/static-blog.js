// NAV

$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();
    $(document).scroll(function () {
        scroll_start = $(this).scrollTop();
        if (scroll_start > offset.top) {
            $('.nav-justified').addClass("scroll-after-header");
            $("nav").addClass("scroll-after-header");
        } else {
            $("nav").removeClass("scroll-after-header");
            $('.nav-justified').removeClass("scroll-after-header");
            $('.nav-justified').addClass("scroll-before-header");
        }
    });
});

// VALIDATION

$.fn.ownFormValidate = function (options) {
    options = $.extend({
        classError: 'invalid',
        classOk: 'valid',
        showValidOnCheck: false
    }, options);

    var testInputText = function ($input, showValid) {
        if ($input.attr('pattern') != undefined) {
            var reg = new RegExp($input.attr('pattern'), 'gi');
            if (!reg.test($input.val())) {
                $input.removeClass(options.classOk).addClass(options.classError);
                return false;
            } else {
                if (showValid) {
                    $input.removeClass(options.classError).addClass(options.classOk);
                    return true;
                }
            }
        } else {
            if ($input.val() == '') {
                $input.removeClass(options.classOk).addClass(options.classError);
                return false;
            } else {
                if (showValid) {
                    $input.removeClass(options.classError).addClass(options.classOk);
                    return true;
                }
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
                $t.on('blur keyup', function () { testInputText($t, true) });
            }
            if ($t.is('textarea')) {
                $t.on('blur keyup', function () { testInputText($t, true) });
            }
        });
    }
    prepareElements();

    $form.submit(function () {
        prepareElements();
        var validated = true;
        var $inputs = $form.find('.required');
        $inputs.each(function () {
            var $t = $(this);
            if (($t.is('input')) || ($t.is('textarea'))) {
                if ((!testInputText($t, false)) && (!testInputText($t, options.showValidOnCheck))) {
                    $('#hollow').html('Please fill in all required data')
                                .addClass('alert alert-danger');
                    validated = false;
                } 
            }
        });
        return validated;
    });
}

$(function () {
    $('form').ownFormValidate({
        classError: 'invalid',
        classOk: 'valid',
        showValidOnCheck: true
    });
});

// RESET BUTTOM

$("#reset").on("click", function (event) {
    $("input").removeClass("valid");
    $("input").removeClass("invalid");
    $("textarea").removeClass("valid");
    $("textarea").removeClass("invalid");
    $('#hollow').html('');
    $('#hollow').removeClass('alert alert-danger');
});