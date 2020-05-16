$(document).ready(function () {


    $('.popup-open').magnificPopup({
        type: 'inline',
        midClick: true
    });

    if ($(".benefit-range").length) {
        $(".benefit-range").ionRangeSlider({
            hide_min_max: true,
            hide_from_to: true,
            onStart: function (data) {
                $(".benefit-range-text").html(data.from);
            },
            onChange: function (data) {
                $(".benefit-range-text").html(data.from);
            }
        });
    }

    $('body').on('click', '.opportunities-list1 .opportunities-link:not(.active)', function () {
        if ($(window).width() > 960){
            let tabsOpportunities = $(this).attr('href');
            $('.opportunities-list1 .opportunities-link, .opportunities-list2, .opportunities-list2 .opportunities-link, .opportunities-article').removeClass('active');
            $(this).addClass('active');
            $(tabsOpportunities).addClass('active');
            return false;
        }
    });

    $('body').on('click', '.opportunities-list1 .opportunities-link', function () {
        if ($(window).width() <= 960){
            let tabsOpportunities = $(this).attr('href');
            $.magnificPopup.open({
                items: [
                    {
                        src: tabsOpportunities,
                    }
                ],
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
        if ($(window).width() <= 960){
            let tabsOpportunities2 = $(this).attr('href');
            $.magnificPopup.open({
                items: [
                    {
                        src: tabsOpportunities2,
                    }
                ],
                type: 'inline'
            });
        }
    });

    $('body').on('click', '.nav-mobile-button', function () {
        if ($(window).width() <= 960){
            $.magnificPopup.open({
                items: [
                    {
                        src: '#modal-menu',
                    }
                ],
                type: 'inline'
            });
        }
    });
    
    $('body').on('click', '.opportunities-link', function () {
        return false;
    });


    // mobile
    if ($(window).width() < 960) {
        $('body').on('click', '.subscribe-tabs-head', function () {
            let tabsSubscribe = $(this).data('mobile');
            $('.subscribe-tabs-mobile, .subscribe-tabs-head').removeClass('active');

            $('#' + tabsSubscribe).addClass('active');
            $(this).addClass('active');
        });
        
        
        $('body').on('click', '.comparison-tabs-head-item:not(.active)', function () {
            let tabsComparison = $(this).data('tabs');
            $('.comparison-tabs-head-item, .comparison-tabs-hide').removeClass('active');

            $('#' + tabsComparison).addClass('active');
            $(this).addClass('active');
        });
    };

});
