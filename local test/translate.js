$(function() {

    function getSelectedText(target) {

        (function getValidText() {
            var text = window.getSelection ? window.getSelection().toString() : document.selection.createRange().text;
            if (text) {
                getTrans(text);
            }
        }());


        function getTrans(text) {
            var url = encodeURI("http://fanyi.youdao.com/openapi.do?keyfrom=microheart&key=1363430402&type=data&doctype=jsonp&version=1.1&q=" + text);
            $.ajax({
                url: url,
                type: "GET",
                dataType: "JSONP",
                success: showTrans
            });
        }


        function showTrans(data) {

            var transDiv = $("<div class='transDiv'></div>");
            transDiv.append($("<p style='font-weight: bold;'>" + data.query + "</p>"));

            if (data.basic) {

                for (var i = 0, n = data.basic.explains.length; i < n; i++) {

                    transDiv.append($("<p>" + data.basic.explains[i] + "</p>"));
                }

            } else {

                transDiv.append($("<p>" + data.translation + "</p>"));

            }

            $("body").append(transDiv);

            $(".transDiv").css({
                "position": "absolute",
                "width": "300px",
                "border": "2px solid #f00",
                "background": "#fff",
                "font-size": "12px",
                "top": target.pageY + 20 + "px",
                "left": target.pageX
            });
            $(".transDiv>p").css({
                "margin": "0",
                "padding": "3px 5px"
            });


        }
    }


    function rmTransDiv() {
        if ($(".transDiv")) {
            $(".transDiv").remove();
        }
    }

    $(document.documentElement).on("click", getSelectedText)
                               .on("click", rmTransDiv);
});