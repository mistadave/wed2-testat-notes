$(document).ready(function() {
    $('button[type="submit"]').on('click', function(e) {
        e.preventDefault();
        var data = {"title": $('input[name="title"]').val(),
                    "description": $('input[name="description"]').val(),
                    "importance": $('input[name="importance"]').val(),
                    "dueToDate": $('input[name="dueToDate"]').val()
        };
        console.log(data);
        $.ajax( {
            url: '/notes',
            type: 'POST',
            data: data,
            success: function(msg) {
                console.log('createNote success');
                console.log(msg);
                // TODO: how to work with handlebars with ajax?
        }
        });
    });
});