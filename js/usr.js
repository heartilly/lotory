var 	_SITE ={
		PMP: {
			nn:"PMP",
			url:'http://www.pmp.com.my/english/1_3d/3D_main.asp',
			charset:'iso-8859-1',
			xpath:'//strong',
			xCheck:41
		},
		SG4DN: {
			nn:"SG4D",
			url:'http://www.singaporepools.com.sg',
			charset:'iso-8859-1',
			xpath:"//td[@class='resultssectiontext4Dtop3' or @class='normal10' or @class='resultssectiontext4D']/p",
			xCheck:24
		},
		SG4D: {
			nn:"",
			url:'http://www.singaporepools.com.sg/Lottery?page=four_d',
			charset:'iso-8859-1',
			xpath:'//option[position() = 2]'
		},
		MAG4D: {
			nn:"MAG4D",
			url:'http://www.live4d.com/live4d/4dlive1.htm',
			charset:'UTF-16',
			xObj:'strong',			
			xpath:'//strong',
			xCheck:33
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
	getDateRegexp : function(raw){
		var getDateRegexp=/(\d+)\/(\d+)\/(\d+)/ig,
		date = getDateRegexp.exec(raw);
		return new Date(date[3],date[2]-1,date[1]);
		
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
	doPMP : function() {
		var SITE = _SITE.PMP,
			ax = new aj.ajx(SITE, function(data){
			console.log(data)
			// Virify		
			var i = data.strong.length,obj = data.strong.reverse(),
				MAG = {
					consolation:[],
					special:[]},
				dNoRegxp = /(?:dra[^\:]*?:\s)|\s*/ig;

			aj.xchk(SITE,i);

			MAG.dDate = aj.getDateRegexp(obj[39]);
			MAG.dNo = obj[38].replace(dNoRegxp,'');
			MAG.venue = obj[37];
			MAG.first = obj[27];
			MAG.second = obj[25];
			MAG.third = obj[23];
			MAG.first3 = obj[34];
			MAG.second3 = obj[32];
			MAG.third3 = obj[30];
			
      	while(i--) {
      		console.log("obj "+i+" = "+obj[i]);
      		if(i < 22 & i > 0 & i!=11){
		  		if(i < 11){
		  			MAG.consolation.push(obj[i]);
		  		}else if(i < 22){
		  			MAG.special.push(obj[i]);
		  		}
      			}
      		}
      		console.log("dDate = " + MAG.dDate)
      		console.log("dNo = " + MAG.dNo)
      		console.log("First3 = " + MAG.first3)
      		console.log("Second3 = " + MAG.second3)
      		console.log("Third3 = " + MAG.third3)
      		console.log("First = " + MAG.first)
      		console.log("Second = " + MAG.second)
      		console.log("Third = " + MAG.third)
      		console.log("special = " + MAG.special)
      		console.log("consolation = " + MAG.consolation)
			});
		console.log(ax.site);
		console.log(ax.yql);
		
	},
	doMag4d : function() {
		var SITE = _SITE.MAG4D,
			ax = new aj.ajx(SITE, function(data){
			console.log(data)
			// Virify		
			var i = data.strong.length,obj = data.strong.reverse(),
				MAG = {
					consolation:[],
					special:[]},
				dNoRegxp = /(?:dra[^\:]*?:\s)|\s*/ig;

			aj.xchk(SITE,i);

			MAG.dDate = aj.getDateRegexp(obj[31].font.content);
			MAG.dNo = obj[32].font.content.replace(dNoRegxp,'');
			MAG.first = obj[28];
			MAG.second = obj[26];
			MAG.third = obj[24];
			
      	while(i--) {
      		console.log("obj "+i+" = "+obj[i]);
      		if(i < 24 & i > 1 & i!=12){
		  		if(i < 12){
		  			MAG.consolation.push(obj[i]);
		  		}else if(i < 23){
		  			MAG.special.push(obj[i]);
		  		}
      			}
      		}
      		console.log("dDate = " + MAG.dDate)
      		console.log("dNo = " + MAG.dNo)
      		console.log("First = " + MAG.first)
      		console.log("Second = " + MAG.second)
      		console.log("Third = " + MAG.third)
      		console.log("consolation = " + MAG.consolation)
      		console.log("special = " + MAG.special)
			});
		console.log(ax.site);
		console.log(ax.yql);
		
	},
	doSG4D : function() {
		var SITE = _SITE.SG4D;
			aj.ajx(SITE, function(data){
			
				console.log(data);
				console.log(data.option.value);
				var SITE = _SITE.SG4DN;
				SITE.url += data.option.value;
				
				SITE.data = {dDate:aj.getDateRegexp(data.option.content)};
				console.log("url = " +SITE.url);
				console.log("data = " +SITE.data.dDate);
			
				aj.ajx(SITE, function(data,SITE){
				console.log(data);
			
				// Virify		
				var i = data.p.length,obj = data.p.reverse(),
					MAG = {
						dDate:SITE.data.dDate,
						consolation:[],
						special:[]},
					dNoRegxp = /dra.*?(\d*?)\s?<br\/>(.*)/ig
				aj.xchk(SITE,i);
				console.log(obj[23].content)
				//MAG.dDate = aj.getDateRegexp(obj[31].font.content);
				MAG.dNo = dNoRegxp.exec(obj[23].content);
				MAG.first = obj[22];
				MAG.second = obj[21];
				MAG.third = obj[20];
			
		  	while(i--) {
		  		console.log("obj "+i+" = "+obj[i]);
		  		if(i < 20 & i >= 0 ){
			  		if(i < 10){
			  			MAG.consolation.push(obj[i]);
			  		}else if(i < 20){
			  			MAG.special.push(obj[i]);
			  		}
		  			}
		  		}
		  		console.log("dDate = " + MAG.dDate)
		  		console.log("dNo = " + MAG.dNo[1])
		  		console.log("First = " + MAG.first)
		  		console.log("Second = " + MAG.second)
		  		console.log("Third = " + MAG.third)
		  		console.log("consolation = " + MAG.consolation)
		  		console.log("special = " + MAG.special)
				});
			});
		//console.log(ax.site);
		//console.log(ax.yql);
		
	},	
	ajx : function(SITE,callback){
		//this.site = SITE;
       	this.yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + SITE.url + '" AND xpath="'+ SITE.xpath +'" AND charset="'+SITE.charset+'"') +'&format=json&callback=?';
       	this.ajxr = $.getJSON( this.yql, function cbFunc(data) {
				  	//console.log(data.query.results);
				  	if (data.query.results) {
						data = data.query.results;
						// If the user passed a callback, and it
							callback(data,SITE);
       					}
				  
					// Else, Maybe we requested a site that doesn't exist, and nothing returned.
					else throw new Error('Nothing returned from getJSON.');
			   		});
		
		   		},
	rslt : function(){
		
	}
	}
aj.doSG4D()

