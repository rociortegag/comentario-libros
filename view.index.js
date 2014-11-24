$(function() {
  $('#right-column').hide();
  $('li.libro-name a').click(function() {
    var name = $(this).text();
    $('#right-column h2').text(name);
    $('#facts li').remove();
    /*
     * Se obtiene los datos de nuestro json.
     */
    $.getJSON('/libro/' + name, function(data) {
      for (var i = 0; i < data.length; i++) {
        $('<li>').appendTo('#facts').text(data[i]);
      }
    });
    $('#right-column').show();
    return false;
  });
  /*
   * Si se clickea en la opcion publicar opinion se llama a esta funcion.
   */
  $('#add-new-fact').click(function() {
    var name = $('#right-column h2').text();
    var fact = $('#new-fact').val();
    
    $.ajax({
      type: "POST",
      url: "/libro/add-fact",
      data: JSON.stringify({ name: name, fact: fact }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      /*
       * Cuando se realiza con exito la funcion de publicar.
       * @param {type} data
       * @returns {undefined}
       */
      success: function(data) {
        $('<li>').appendTo('#facts').text(fact);
        $('#new-fact').val('');
      },
      /*
       * Cuando se produce un error salta en la linea de comandos el siguiente
       * aviso.
       */
      error: function(err) {
        var msg = 'Estado: ' + err.status + ': ' + err.responseText;
        alert(msg);
      }
    });
    return false;
  });
});
