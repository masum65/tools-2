$(function() {

  setInterval(function() {
    var _m = moment();
    $("#hours").text(_m.format("HH"));
    $("#minutes").text(_m.format("mm"));
    $("#seconds").text(_m.format("ss"));
  }, 999);

});
