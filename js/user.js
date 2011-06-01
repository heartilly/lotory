// var url = 'http://www.live4d.com/live4d/4dlive1.htm';
var url = 'http://www.google.com';
// var url = '/proxy?ul=' + encodeURIComponent('http://www.google.com/search?q=Prototype');

// notice the use of a proxy to circumvent the Same Origin Policy.

// new Ajax.Request(url, {
  // method: 'get',
  // sanitizeJSON:'true',
  // onSuccess: function(transport) {
    // var notice = $('myBody');
    // if (transport.responseText.match(/play the game/))
      // notice.update('Yeah! You are in the Top 10!').setStyle({ background: '#dfd' });
    // else
      // notice.update('Damn! You are beyond #10...').setStyle({ background: '#fdd' });
  // }
// });

var _xsajax$transport_status = 00;
new Ajax.Request(url, {
sanitizeJSON: true,
encoding:'UTF-16',
method: 'GET',
// evalJSON:false,
// requestHeaders:'X-Requested-With',
// crossSite: true,
// parameters: Form.serialize(obj),
onLoading: function() {
var notice = $('myBody');
notice.update('Yeah! You are in the Top 10!').setStyle({ background: '#dfd' });
},
onComplete: function(transport) {
var notice = $('myBody');
var xmlDoc=transport.responseXML
alert(transport.responseXML)
notice.innerHTML(xmlDoc).setStyle({ background: '#fdd' });
},
onFailure: function(transport) {
notice.update('oh fuck').setStyle({ background: '#fdd' });
}
});