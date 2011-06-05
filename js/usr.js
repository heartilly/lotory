var 	_SITE ={
		PMP: {
			nn:"PMP",
			url:'http://www.pmp.com.my/english/1_3d/3D_main.asp',
			charset:'iso-8859-1',
			pmpDrawDateVari:3,
			pmpResultVari:26
		},
		SG4DN: {
			nn:"SG4D",
			url:'ddf',
			charset:'iso-8859-1',
			sg4dLastestDateVari:1,
			sg4dResultTopVari:3,
			sg4dResultVari:20
		},
		SG4D: {
			nn:"",
			url:'http://www.singaporepools.com.sg/Lottery?page=four_d',
			charset:'iso-8859-1'
		},
		MAG4D: {
			nn:"MAG4D",
			url:'http://www.live4d.com/live4d/4dlive1.htm',
			charset:'UTF-16',
			xObj:'strong',			
			xpath:'//strong',
			xCheck:33
			// YQL
			// select * from html where url="http://www.live4d.com/live4d/4dlive1.htm" AND xpath="//strong" AND charset="UTF-16"
			// Verificasion condition
		},
		TOTO:{
			nn:"d",
			url:'http://www.sportstoto.com.my/g_past_results/main.asp',
			charset:'UTF-8',
		},
		TOTON: {
			nn:"TOTO",
			url:'totourl',
			charset:'UTF-8',
			// Verificasion condition
			avari:81,
			bvari:22,
			jackvari:5
		}
	},
	aj = {
	requestCrossDomain : function( yql,callback) {
	//alert("ajaxing")
       	// If no url was passed, exit.
       	if ( !yql ) {
       	   alert('No site was passed.');
      	    return false;
       	}
       	// Take thecallbackcallback provided url, and add it to a YQL query. Make sure you encode it!
       	//var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '" AND xpath="'+ xpath +'" AND charset="'+charCode+'"') +'&format=json&callback=?';
       	//console.log(yql)
       	// Request that YSQL string, and run a callback function.
       	// Pass a defined function to prevent cache-busting.
       	$.getJSON( yql, function cbFunc(data) {
		  	//console.log(data.query.results);
		  	if (data.query.results) {
				data = data.query.results;
				// If the user passed a callback, and it
				// is a function, call it, and send through the data var.
				if ( typeof callback === 'function') {
					callback(data);
				}
		  	}
			// Else, Maybe we requested a site that doesn't exist, and nothing returned.
			else throw new Error('Nothing returned from getJSON.');
			/* */
			//http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.live4d.com%2Flive4d%2F4dlive1.htm%22%20AND%20xpath%3D%22%2F%2Fstrong%22%20AND%20charset%3D%22UTF-16%22
       	}
		);
	},
	xchk : function(SITE,objLength){
		if(objLength===SITE.xCheck){
			console.log("@ "+SITE.nn +"   x-check PASSED");
			
		}
		else {alert(SITE.nn +" Verify Error");throw new Error('x-check Failured, object = '+objLength+' but given object = '+SITE.xCheck+', please contact programer.');}
	},
	success : function(results){
		ajx.prototype.results = results; 
		console.log(results)
		console.log("ax.results = " + this.results)
		console.log("ax = " + this)
	},
	load1 : function() {
		aj.requestCrossDomain(SITE_INFO.magnum.url,SITE_INFO.magnum.xpath,SITE_INFO.magnum.charset,function(results){
		console.log(results);
		var g = results
		})	
	},
	load2 : function() {
		$('#test').ajaxStart(function(){
 		  $(this).hide();
		 });
		var SITE = _SITE.MAG4D,
			ax = new ajx(SITE, function(data){
			// Virify		
			var i = data.strong.length,obj = data.strong.reverse();
			aj.xchk(SITE,i);
      			console.log(obj)
      	while(i--) {
      		if(i){}
      		}
			console.log("ax.results = " + ax.results)
			console.log("ax = " + ax.length)
			},"data.strong");
		console.log(ax.site);
		/* * /
		aj.requestCrossDomain(ax.yql,function(results){
			console.log(results);
			})
		/* */
		console.log(ax.yql);
		
	}
	},
	ajx = function(SITE,callback,xyz){
		//this.site = SITE;
       	this.yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + SITE.url + '" AND xpath="'+ SITE.xpath +'" AND charset="'+SITE.charset+'"') +'&format=json&callback=?';
       	this.ajxr = $.getJSON( this.yql, function cbFunc(data) {
				  	//console.log(data.query.results);
				  	if (data.query.results) {
						data = data.query.results;
						// If the user passed a callback, and it
							callback(data);
       					}
				  
					// Else, Maybe we requested a site that doesn't exist, and nothing returned.
					else throw new Error('Nothing returned from getJSON.');
			   		});
		
		   		},
	rslt = function(){
		
	}
	
	
aj.load2()

