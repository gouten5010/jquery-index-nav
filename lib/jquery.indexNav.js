(function ($) {
    $.fn.indexNav = function (config) {
        //default settings
        var options = {
            indexElement: 'h2',
            escList: '.esclist',
            listCreate: true,
            listCreateSp: true,
            listarea: '#listarea',
            listNum: false,
            scrollSpeed: 'fast',
            easing: 'swing',
            scrollTop: false,
            scrollBottom: false,
            scrollTopElement: null,
            scrollBottomElement: null,
            scrollTopText: 'Go Page Top',
            scrollBottomText: 'Go Page Bottom',
            scrollPosition: 1
        };
        var setting = $.extend(options, config);
        return this.each(function (e) {
            var $agenda = $(this).find(setting.indexElement + '[id]').not(setting.escList);
            var $ids = $agenda.map(function () {
                return $(this).attr('id')
            }).get();
            var $listArea = $(setting.listarea);

            //smooth scroll
            function indexNaviScroll() {
                $("a[href^=#]").click(function () {
                    var $hash = $(this.hash);
                    var $hashOffset = $($hash).offset().top;
                    $('body,html').stop().animate({
                        scrollTop: $hashOffset
                    }, setting.scrollSpeed, setting.easing);
                    return false
                })
            };

            //extract index and convert link list
            if (setting.listCreate == true) {
                if ($ids != "") {
                    $listArea.append('<ul></ul>');
                    var $linkList = $listArea.find('ul');
                    $agenda.clone().prependTo($linkList);
                    $listArea.find(setting.indexElement).each(function (i) {
                        var $listId = $(this).attr('id');
                        if (setting.listNum == false) {
                            $(this).replaceWith('<li><a href= "#' + $listId + '">' + $(this).text() + '</a></li>');
                            $listArea.addClass('textIndex')
                        } else if (setting.listNum == true) {
                            $(this).replaceWith('<li><a href= "#' + $listId + '">' + (i + 1) + '</a></li>');
                            $listArea.addClass('numIndex')
                        };
                        indexNaviScroll()
                    })
                }
            };

            //scroll top
            if (setting.scrollTop == true) {
                if (setting.scrollTopElement == null) {
                    var $scrollTopElement = '<a href="#"><span>' + setting.scrollTopText + '</span></a>'
                } else {
                    var $steid = $(setting.scrollTopElement).attr('id');
                    var $scrollTopElement = '<a href="#' + $steid + '"><span>' + setting.scrollTopText + '</span></a>'
                };
                if (setting.scrollPosition == 2) {
                    $listArea.append('<div id="scrollTop">' + $scrollTopElement + '</div>')
                } else {
                    $listArea.prepend('<div id="scrollTop">' + $scrollTopElement + '</div>')
                };
                if (setting.scrollTopElement == null) {
                    $listArea.find('#scrollTop > a').click(function () {
                        $('body,html').stop().animate({
                            scrollTop: 0
                        }, setting.scrollSpeed, setting.easing);
                        return false
                    })
                } else {
                    indexNaviScroll()
                }
            };

            //scroll bottom
            if (setting.scrollBottom == true) {
                if (setting.scrollBottomElement == null) {
                    var $scrollBottomElement = '<a href="#end"><span>' + setting.scrollBottomText + '</span></a>'
                } else {
                    var $sbeid = $(setting.scrollBottomElement).attr('id');
                    var $scrollBottomElement = '<a href="#' + $sbeid + '"><span>' + setting.scrollBottomText + '</span></a>'
                };
                $listArea.append('<div id="scrollBottom">' + $scrollBottomElement + '</div>');
                if (setting.scrollBottomElement == null) {
                    $('body').append('<div id="end"></div>');
                    indexNaviScroll()
                } else {
                    indexNaviScroll()
                }
            }
        })
    }
})(jQuery);