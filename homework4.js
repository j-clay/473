
var newKey;
$(document).ready(function() {
    $("#append").click(function(value) {
        var name = $("#field").val();

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/actors",
            success: function(data) {
                var obj = {
                    "name": name,
                    "id": newKey,
                    "starred": false
                };

                $(".container").append(add_actor(obj));
                console.log(obj.id);
                $("#" + obj.id).bind("click", function() {

                    if (obj.starred) {
                        obj.starred = false;
                        $(this).text("star_border");

                    } else {
                        obj.starred = true;
                        $(this).text("star");
                    }

                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:3000/actors/" + obj.id,
                        data: JSON.stringify({
                            id: obj.id,
                            name: obj.name,
                            starred: obj.starred
                        }),
                        contentType: "application/json",
                        dataType: "json"
                    });
                });

            },
            data: JSON.stringify({
                name: name,
                starred: false
            }),
            contentType: "application/json",
            dataType: "json"
        });

        newKey++;
    });


   
});
$(document).ready(function() {


    $.ajax({
        url: "http://localhost:3000/actors",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $.each(data, function(key, value) {
                newKey = value.id;
                $(".container").append(add_actor(value));

                $("#" + value.id).bind("click", function() {
                    if (value.starred) {
                        $(this).text("star_border");
                        value.starred = false;
                    } else {
                        value.starred = true;
                        $(this).text("star");
                    }

                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:3000/actors/" + value.id,
                        data: JSON.stringify({
                            name: value.name,
                            starred: value.starred
                        }),
                        contentType: "application/json",
                        dataType: "json"
                    });
                });
            });
        },
      
    });

});

function add_actor(value) {
    var data = "";
    data += "<div class=\"mdl-list__item\">";
    data += "<span class=\"mdl-list__item-primary-content\">";
    data += "<i class=\"material-icons mdl-list__item-avatar\">person</i>";
    data += "<span id=\"a\">" + value.name + "</span>";
    data += "<\span>";

    if (value.starred) {
        data += "<a class=\"mdl-list__item-secondary-action\" href=\"#\"><i  id=\"" + value.id + "\"  class=\"material-icons\">star</i></a>";
    } else {
        data += "<a class=\"mdl-list__item-secondary-action\" href=\"#\"><i  id=\"" + value.id + "\"  class=\"material-icons\">star_border</i></a>";
    }
    data += "</div>";

    return data;

}