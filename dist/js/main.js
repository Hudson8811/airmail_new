$(document).ready(function () {
    $('.popup-open').magnificPopup({
        type: 'inline',
        midClick: true,
       /* callbacks: {
        open: function() {
            console.log($('.mfp-container').length);
          }
        }*/
    });

    var benefitItems = $('.benefit-item-price');
    if ($(".benefit-range").length) {
        $(".benefit-range").ionRangeSlider({
            hide_min_max: true,
            hide_from_to: true,
            onStart: function (data) {
                $(".benefit-range-text").html(data.from);
            },
            onChange: function (data) {
                $(".benefit-range-text").html(data.from);
                benefitItems.each(function () {
                    $(this).html('≈ ' + (Number($(this).attr('data-ben-price-per-one')) * data.from).toFixed(3) + ' ₽');

                });

            }
        });
    }

    $('body').on('click', '.opportunities-list1 .opportunities-link:not(.active)', function () {
        if ($(window).width() > 960) {
            let tabsOpportunities = $(this).attr('href');
            $('.opportunities-list1 .opportunities-link, .opportunities-list2, .opportunities-list2 .opportunities-link, .opportunities-article').removeClass('active');
            $(this).addClass('active');
            $(tabsOpportunities).addClass('active');
            var tabs = $(tabsOpportunities).find('.opportunities-link');
            if (tabs.length){
                tabs[0].click();
            }
            return false;
        }
    });

    $('body').on('click', '.opportunities-list1 .opportunities-link', function () {
        if ($(window).width() <= 960) {
            let tabsOpportunities = $(this).attr('href');
            $.magnificPopup.open({
                items: [{
                    src: tabsOpportunities,
                }],
                type: 'inline'
            });
        }
    });


    $('body').on('click', '.opportunities-list2 .opportunities-link:not(.active)', function () {
        if ($(window).width() > 960) {
            let tabsOpportunities2 = $(this).attr('href');
            $('.opportunities-article, .opportunities-list2 .opportunities-link').removeClass('active');
            $(this).addClass('active');

            $(tabsOpportunities2).addClass('active');

            return false;
        }
    });

    $('body').on('click', '.opportunities-list2 .opportunities-link', function () {
        if ($(window).width() <= 960) {
            let tabsOpportunities2 = $(this).attr('href');
            $.magnificPopup.open({
                items: [{
                    src: tabsOpportunities2,
                }],
                type: 'inline'
            });
        }
    });

    $('body').on('click', '.nav-mobile-button', function () {
        if ($(window).width() <= 960) {
            $.magnificPopup.open({
                items: [{
                    src: '#modal-menu',
                }],
                type: 'inline'
            });
        }
    });

    $('body').on('click', '.opportunities-link', function () {
        return false;
    });

    $('.subscribe-tabs-head').click(function () {
        if ($(window).width() < 960) {
            let tabsSubscribe = $(this).data('mobile');
            $('.subscribe-tabs-mobile, .subscribe-tabs-head').removeClass('active');

            $('#' + tabsSubscribe).addClass('active');
            $(this).addClass('active');
        }
    });

    $('.comparison-tabs-head-item').click(function () {
        if ($(window).width() < 960 && (!$(this).hasClass('active'))) {
            let tabsComparison = $(this).data('tabs');
            $('.comparison-tabs-head-item, .comparison-tabs-hide').removeClass('active');

            $('#' + tabsComparison).addClass('active');
            $(this).addClass('active');

        }
    });
    // mobile



    tippy('[data-tippy-content]', {
        arrow: false,
        maxWidth: 152,
        delay: [0, 100],
        placement: 'left'
    });


    $(".modal-create-rangeslider").ionRangeSlider({

        hide_min_max: false,
        extra_classes: 'modal-create-range-slider'
    });



    //////////////////


    $(".inside-page__hamburger").click(function () {
        !$(this).hasClass("is-active") ? $("body").css("overflow","hidden") : $("body").css("overflow","auto");
        $(this).toggleClass("is-active");
        $(".fixed-menu").toggleClass('active');
    });




    $('body').on('click', '.subscribe-type-item', function () {
        if (!$(this).hasClass('current')){
            $(this).addClass('current').siblings().removeClass('current');
            var percent = parseInt($(this).data('percent')),
                subBlocks = $('.subscribe-tabs-price[data-price]');
            subBlocks.each(function() {
                var basePrice = parseInt($(this).data("price"));
                if (basePrice > 0){
                    if (percent > 0){
                        var newPrice = Math.ceil(basePrice - (basePrice * percent/100));
                        $(this).find('strong').html(newPrice);
                        $(this).find('.subscribe-tabs-price-old').html(basePrice+'₽');
                    } else {
                        $(this).find('strong').html(basePrice);
                        $(this).find('.subscribe-tabs-price-old').html('');
                    }
                }
            });
            calculateModal();
        }
    });

    $('body').on('change', '.create-item .create-checkbox input', function () {
        var parent = $(this).closest('.create-item');
        if(this.checked) {
            parent.find('.create-item-price').removeClass('create-item-price--inactive');
            parent.find('.create-item-input-y-n').addClass('create-item-input-y-n--active').html('Выбрано');
        } else {
            parent.find('.create-item-price').addClass('create-item-price--inactive');
            parent.find('.create-item-input-y-n').removeClass('create-item-input-y-n--active').html('Не выбрано');
        }
        calculateModal();
    });

    $('body').on('change paste keyup', '.create-item .create-item-input input', function () {
        var parent = $(this).closest('.create-item');
        if (!parent.find('.create-checkbox input')[0].checked){
            parent.find('.create-checkbox input').prop('checked',true).trigger('change')
        }
        this.value = this.value.replace(/[^\d]/g,'');
        calculateModal();
    });

	$('.video-img--slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
    arrows: false,
    dots: true
	});
});

function calculateModal(){
    var fields = $('.create-item'),
        percent = $('.subscribe-type-item.current').data('percent'),
        label = $('.subscribe-type-item.current').data('label'),
        months = $('.subscribe-type-item.current').data('multi'),
        resultOld = 0
        result = 0;
    fields.each(function() {
        if ($(this).find('.create-checkbox input')[0].checked){
            var multi = $(this).data('multi'),
                fixed = $(this).data('fixed');
            if (typeof fixed !== "undefined"){
                var newPrice = Math.ceil(fixed - (fixed * percent/100));
                $(this).find('.create-item-price-current').html(newPrice+'₽');
                if (percent > 0){
                    $(this).find('.create-item-price-old').html(fixed+'₽');
                    resultOld += fixed;
                } else {
                    $(this).find('.create-item-price-old').html('');
                }
                result += newPrice;
            } else if (typeof multi !== "undefined"){
                var count = $(this).find('.create-item-input input').val(),
                    oldPrice = Math.ceil(count*multi),
                    newPrice = Math.ceil(count*multi - (count*multi * percent/100));
                $(this).find('.create-item-price-current').html(newPrice+'₽');
                if (percent > 0){
                    $(this).find('.create-item-price-old').html(oldPrice+'₽');
                    resultOld += oldPrice;
                } else {
                    $(this).find('.create-item-price-old').html('');
                }
                result += newPrice;
            }
        } else {
            $(this).find('.create-item-price-current').html('0₽');
            $(this).find('.create-item-price-old').html('');
        }
    });
    if (percent > 0) {
        $('.create-bottom-total .oldprice').html((resultOld*months)+'₽');
    } else {
        $('.create-bottom-total .oldprice').html('');
    }
    $('.create-bottom-total .summ').html(result*months);
    $('.create-bottom-total .label').html(label);
}


jQuery(document).ready(function ($) {
    var contentSections = $('.cd-section'),
        navigationItems = $('#cd-vertical-nav a');

    updateNavigation();
    $(window).on('scroll', function () {
        updateNavigation();
    });

    //smooth scroll to the section
    navigationItems.on('click', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function () {
        $('.touch #cd-vertical-nav').toggleClass('open');

    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function () {
        $('.touch #cd-vertical-nav').removeClass('open');
    });

    function updateNavigation() {
        contentSections.each(function () {
            $this = $(this);
            var activeSection = $('#cd-vertical-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
            if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationItems.eq(activeSection).addClass('is-selected');
            } else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
    }

    function smoothScroll(target) {
        $('body,html').animate({
                'scrollTop': target.offset().top
            },
            600
        );
    }
    /////////////////////////



    var buffer = $('.rs-inp-buffer');

    $(".modal-create-rangesliderv2").each(function () {
        let $this = $(this);
        let min = parseInt($this.data('min'));
        let max = parseInt($this.data('max'));

        $this.slider({
            animate: true,
            range: "min",
            value: 5,
            min: min,
            max: max,
            step: 5,
            slide: function (event, ui) {
                buffer.text(ui.value);
                $(this).find('.modal-create-rangesliderv2_input').val(ui.value).width(buffer.width()).trigger('change');

            }
        });
    });

    $(".modal-create-rangesliderv2_input").blur(function () {
        $(this).val($(this).closest('.modal-create-rangesliderv2').slider("value"));
    });

    $(".modal-create-rangesliderv2_input").keyup(function () {
        var parent = $(this).closest('.modal-create-rangesliderv2');

        let sum = $(this).val();

        if (sum < parseInt(parent.attr('data-min'))) {
            sum = parseInt(parent.attr('data-min'));
        }

        console.log(sum + '=' + parent.attr('data-max'));
        if (sum > parseInt(parent.attr('data-max'))) {
            sum = parseInt(parent.attr('data-max'));
        }

        parent.slider("value", sum);
        //$(this).val(sum);
    });

    $(".modal-create-rangesliderv2_input").on('input change blur keyup', function () {
        var buffer = $('.rs-inp-buffer');
        buffer.text($(this).val());
        $(this).css('width', buffer.width());
    });
});


$(window).on('resize', function (event) {
    windowSize = $(window).width();
});
windowSize = $(window).width();


$('.fixed-menu__list-item a').click(function () {
    var windowSize = $(window).width();
    if (windowSize < 1025) {

        $(".fixed-menu ").removeClass("active");
        $(".hamburger ").removeClass("is-active");
    }

});

$(window).on("load", function () {
    $(".js-mCSB-table-modal, .js-create-list-wrap").mCustomScrollbar();
});


