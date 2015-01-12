$(document).ready(function () {
    feedPageView.load();
});


var feedPageView = function () {

    var url = '/feed/blogti';

    function load() {
        var $div = $("div.container");
        $div.append($('<p>loading...</p>'));
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'xml',
            success: function (data) {
                console.log('got data: ' + data, $(data).find('entry'));
                $div.empty();
                var $ul = $div.append($("<ul/>"));
                $(data).find('entry').each(function () {
                    var el = $(this);
                    $ul.append(createBlogPost(el))

                });
            }
        });
    }

    function createBlogPost(el) {
        var $li = $("<li/>");

        $li.append($("<h4/>", {text: el.find('title').text()}));
        $li.append($("<small/>", {text: el.find('author').text()}));
        $li.append($("<p/>", {html: el.find('summary').text()}));


        return $li;
    }


    return {
        load: load
    }
}();