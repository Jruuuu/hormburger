$(function () {
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#newBurger")
                .val()
                .trim(),
            devoured: 0
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("Burger Added");
            location.reload()
        });
    });

    $(".consumeBurger").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var devouredBurger = {
            devoured: 1
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredBurger
        }).then(function () {
            console.log("Devoured Burger");
            location.reload();
        });
    });

});
