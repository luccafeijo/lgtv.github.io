$(document).ready(function(){ 
    $.get("/top-menu.html", function(data) {
        $("#menu").html(data);
    });
}); 