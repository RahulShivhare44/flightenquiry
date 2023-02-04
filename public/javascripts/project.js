$(document).ready(function () {

  $.getJSON('/flight/fetchallstates', function (data) {
    // alert(JSON.stringify(data))
    data.map((item) => {

      $('#sourcestate').append(
        $('<option>').text(item.statename).val(item.stateid)
      );

      $('#destinationstate').append(
        $('<option>').text(item.statename).val(item.stateid)
      );

    });
    $("#sourcestate").formSelect();
    $("#destinationstate").formSelect();
  });

  $('#sourcestate').change(function () {
    $('#sourcecity').empty()
    $('#sourcecity').append($('<option disable selected>').text('Choose your City'))

    $.getJSON("/flight/fetchallcity", { stateid: $('#sourcestate').val() }, function (data) {

      data.map((item) => {

        $('#sourcecity').append(
          $('<option>').text(item.cityname).val(item.cityid)
        );
      });
      $("#sourcecity").formSelect();

    });

  });

  $('#destinationstate').change(function () {
    $('#destinationcity').empty()
    $('#destinationcity').append($('<option disable selected>').text('Choose your City'))

    $.getJSON("/flight/fetchalldescity", { stateid: $('#destinationstate').val() }, function (data) {

      data.map((item) => {

        $('#destinationcity').append(
          $('<option>').text(item.cityname).val(item.cityid)
        );

      });
      $("#destinationcity").formSelect();

    });

  });


  $('#btn').click(function () {

    $.getJSON('/flight/searchflight', { sid: $('#sourcecity').val(), did: $('#destinationcity').val() }, function (data) {

      if (data.length == 0) { $('#error').html("Flight does not exit..") }
      else {
        var htm = ""
        data.map((item) => {
          htm += "<thead><tr><th>Flight Id</th><th>Company Name</th><th>Source</th><th>Destination</th><th>Type</th><th>Class</th><th>Days</th></tr></thead>"
          htm += "<tbody><tr><td>" + item.flightid + "</td><th>" + item.companyname + "<br><img src='/images/" + item.logo + "' width='40'></th><td>" + item.sc + "<br>" + item.sourcetiming + "</td><td>" + item.dc + "<br>" + item.destinationtiming + "</td><td>" + item.status + "</td><td>" + item.flightclass.replaceAll('#', ',') + "</td><td>" + item.days.replaceAll('#', ',') + "</td></tr></tbody>"
        })

        $('#result').html(htm)

      }


    })

  })



});

