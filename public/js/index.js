var socket = io();

socket.on('connect', function() {
  // socket.on('allTemp', function(tempList) {
  //   for(let i=0;i<tempList.length;i++){
  //     var template = jQuery('#message-template').html();
  //     var html = Mustache.render(template, {
  //       temp: tempList[i].temp
  //     });
  //     jQuery('#messages').append(html);
  // }
  // });
});

socket.on('currTemp',function(ctemp) {
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    temp: ctemp.temp
  });
  jQuery('#messages').append(html);
});
