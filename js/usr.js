var 	_SITE ={
		PMP: {
			nn:"PMP",
			url:'http://www.pmp.com.my/english/1_3d/3D_main.asp',
			charset:'iso-8859-1',
			query:'',
			xpath:'//strong',
			xCheck:41
		},
		SG4DN: {
			nn:"SG4D",
			url:'http://www.singaporepools.com.sg',
			charset:'iso-8859-1',
			query:'',
			xpath:"//td[@class='resultssectiontext4Dtop3' or @class='normal10' or @class='resultssectiontext4D']/p",
			xCheck:24
		},
		SG4D: {
			nn:"",
			url:'http://www.singaporepools.com.sg/Lottery?page=four_d',
			charset:'iso-8859-1',
			query:'',
			xpath:'//option[position() = 2]'
		},
		MAG4D: {
			nn:"MAG4D",
			url:'http://www.live4d.com/live4d/4dlive1.htm',
			charset:'UTF-16',
			xObj:'strong',			
			xpath:'//strong',
			query:'',
			result:[],
			xCheck:33
		},
		TOTO:{
			nn:"d",
			url:'http://www.sportstoto.com.my/g_past_results/main.asp',
			charset:'UTF-8',
			xpath:"//a[@class='DataLink']",
			query:" | truncate(count=2)"
		},
		TOTON: {
			nn:"TOTO",
			url:'http://www.sportstoto.com.my/g_past_results/',
			charset:'UTF-8',
			query:'',
			xpath:"//span[@class='dataResultA' or @class='dataResultB' or @class='dataJackPrize']",
			xCheck:122
		}
	},
	cons = {
		_DRAWNO : "Draw",
		_DRAWDATE : "Date",
		dateDay : ["Sun","Mon","Tes","Wed","Thu","Fri","Sat"],
		buildDate : function(data){
		var date = data.dDate,day = cons.dateDay[date.getDay()],
			drawNo = data.dNo,
			drawDate = date.getDate()+"/"+(date.getMonth()+1),
			dataTxt = $("<dt style='width:130px'><strong>" + cons._DRAWNO + "&nbsp;</strong><big>" +drawNo +"</big></dt><dt style='width:115px'><strong>" + cons._DRAWDATE + "&nbsp;</strong><big>" + drawDate + "</big></dt><dt><strong></strong><big>"+ day + "</big></dt>");
		return 	dataTxt;
			},
		buildPmpDate : function(data){
		var date = data.dDate,day = cons.dateDay[date.getDay()],
			drawNo = data.dNo,
			drawDate = date.getDate()+"/"+(date.getMonth()+1),
			dataTxt = $("<dl><dt style='width:130px'><strong>"+cons._DRAWNO+"&nbsp;</strong><big>"+drawNo+"</big></dt><dt style='width:130px'><strong>"+cons._DRAWDATE+"&nbsp;</strong><big>"+drawDate+"</big></dt></dl><dl style=' width: 45px; white-space: pre; overflow: hidden;'><dt ><strong>&nbsp;&nbsp;</strong><big>"+data.dVenue+"</big></dt><dt><strong>&nbsp;&nbsp;</strong><big>"+day+"</big></dt></dl>");
		return 	dataTxt;
		},
		buildJackDate : function(data){
		var date = data.dDate,day = cons.dateDay[date.getDay()],
			drawNo = data.dNo,
			drawDate = date.getDate()+"/"+(date.getMonth()+1),
			dataTxt = $("<dt style='width:110px'><strong>" +cons._DRAWNO + "&nbsp;</strong><big>" + drawNo +"</big></dt><dt style='width:110px'><strong>" + cons._DRAWDATE + "&nbsp;</strong><big>" + drawDate + "</big></dt><dt><strong></strong><big>"+ day + "</big></dt>");
		return 	dataTxt;
		},
		buildTop3 : function(first,second,third){
			var topTxt = $("<dt>"+first+"</dt><dt class='top3middle'>"+second+"</dt><dt>"+third+"</dt>");
			return topTxt;
			},
		buildSubPrice : function(data){
		    var	docFragment = document.createDocumentFragment(),
                obj = data,i = obj.length;
              
           while(i--) {	
           		var h4 = document.createElement("h4");
           			h4.innerHTML=obj[i];
                    docFragment.appendChild(h4);
                      }
            return docFragment;
			},
		buildJackNo : function(data){
		    var	docFragment = document.createDocumentFragment(),
                obj = data,i = obj.length;
              
           while(i--) {	
           		var td = document.createElement("td");
           			td.innerHTML=obj[i];
                    docFragment.appendChild(td);
                      }
            return docFragment;
			},
		
		buildMag : function(data){
			var idx = $("#magnum").clone();
			$('.btnAct',idx).hide();
			$('#magnumTop3',idx).append(cons.buildTop3(data.first,data.second,data.third));
			$('#magnumDate',idx).append(cons.buildDate(data));
			$('#magnumCon',idx).append(cons.buildSubPrice(data.consolation));
			$('#magnumSpe',idx).append(cons.buildSubPrice(data.special));
			idx.replaceAll("#magnum");
		},	
		buildPmp : function(data){
			var idx = $("#pmp").clone();
			$('.btnAct',idx).hide();
			$('#pmp3dTop3',idx).append(cons.buildTop3(data.first3,data.second3,data.third3));
			$('#pmp4dTop3',idx).append(cons.buildTop3(data.first,data.second,data.third));
			$('#datePmp',idx).append(cons.buildPmpDate(data));
			$('#pmp4dCon',idx).append(cons.buildSubPrice(data.consolation));
			$('#pmp4dSpe',idx).append(cons.buildSubPrice(data.special));
			idx.replaceAll("#pmp");
		},
		buildSg4d : function(data){
			var idx = $("#sg4d").clone();
			$('.btnAct',idx).hide();
			$('#sg4dTop3',idx).append(cons.buildTop3(data.first,data.second,data.third));
			$('#sg4dDate',idx).append(cons.buildDate(data));
			$('#sg4dCon',idx).append(cons.buildSubPrice(data.consolation));
			$('#sg4dSpe',idx).append(cons.buildSubPrice(data.special));
			idx.replaceAll("#sg4d");
		},
		buildToto : function(data){
			var mum = $("#totoAll").clone(),idx = $("#toto4d",mum),idx2 = $("#totoJackpot",mum);
			$('.btnAct2',mum).hide();
			$('#toto4dTop3',idx).append(cons.buildTop3(data.first,data.second,data.third));
			$('#toto4dDate',idx).append(cons.buildDate(data));
			$('#totoJackpotDate',idx2).append(cons.buildJackDate(data));
			$('#totoMegaResult',idx2).append(cons.buildJackNo(data.superemeJ));
			$('#amount0',idx2).html(data.superemeJp);
			$('#totoSuperResult',idx2).append(cons.buildJackNo(data.powerJ));
			$('#amount1',idx2).html(data.powerJp);
			$('#totoJackpotResult',idx2).append(cons.buildJackNo(data.megaJ));
			$('#amount2',idx2).html(data.megaJp);
			$('#toto4dCon',idx).append(cons.buildSubPrice(data.consolation));
			$('#toto4dSpe',idx).append(cons.buildSubPrice(data.special));
			$('.result5d2ndContainer',idx2).children().buildDDNo(data.d5Second);
			$('.result5d3rdContainer',idx2).children().buildDDNo(data.d5Third);
			$('.result5dContainer',idx2).each(function(idx,ele){
				var obj = $("td",ele);
					obj.buildDDNo(data.d5First);
				})
			$('.result6dContainer',idx2).each(function(idx,ele){
				var obj = $("td",ele);
					obj.buildDDNo(data.d6);
				})
			mum.replaceAll("#totoAll");
		}
	},
	aj = {
	getContent : function(array,newArray){
		var i = array.length, obj = array.reverse();
		while(i--){newArray.push(obj[i].content)}	
	},
	getDateRegexp : function(raw){
		var getDateRegexp=/(\d+)\/(\d+)\/(\d+)/ig,
		date = getDateRegexp.exec(raw);
		console.log(date)
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
			MAG.dVenue = obj[37];
			MAG.venue = obj[37];
			MAG.first = obj[27];
			MAG.second = obj[25];
			MAG.third = obj[23];
			MAG.first3 = obj[34];
			MAG.second3 = obj[32];
			MAG.third3 = obj[30];
			
      	while(i--) {
      		//console.log("obj "+i+" = "+obj[i]);
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
      		console.log("dVenue = " + MAG.dVenue)
      		console.log("Second3 = " + MAG.second3)
      		console.log("Third3 = " + MAG.third3)
      		console.log("First = " + MAG.first)
      		console.log("Second = " + MAG.second)
      		console.log("Third = " + MAG.third)
      		console.log("special = " + MAG.special)
      		console.log("consolation = " + MAG.consolation)
				SITE.result = MAG;
			});
			//ax.ajxr.resolve(MAG);
			ax.ajxr.then(function(){
			cons.buildPmp(SITE.result);
						
			console.log(SITE.result)}
			)
	},
	doMAG4D : function() {
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
      		//console.log("obj "+i+" = "+obj[i]);
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
      			SITE.result = MAG;
			});
			//ax.ajxr.resolve(MAG);
			ax.ajxr.then(function(){
			cons.buildMag(SITE.result);
						
					console.log(SITE.result)}
			)
	},
	doSG4D : function() {
		var SITE = _SITE.SG4D;
			aj.ajx(SITE, function(data){
			
				//console.log(data);
				var SITE = _SITE.SG4DN;
				SITE.url += data.option.value;
				
				SITE.data = {dDate:aj.getDateRegexp(data.option.content)};
				console.log("url = " +SITE.url);
				console.log("data = " +SITE.data.dDate);
			
				var ax = new aj.ajx(SITE, function(data,SITE){
				console.log(data);
			
				// Virify		
				var i = data.p.length,obj = data.p.reverse(),
					MAG = {
						dDate:SITE.data.dDate,
						consolation:[],
						special:[]},
					dNoRegxp = /\d{4}\s?/ig
				aj.xchk(SITE,i);
				console.log(obj[23].content)
				//MAG.dDate = aj.getDateRegexp(obj[31].font.content);
				//MAG.dNo = dNoRegxp.exec(obj[23].content);
				MAG.dNo = obj[23].content.match(dNoRegxp);
				MAG.first = obj[22];
				MAG.second = obj[21];
				MAG.third = obj[20];
			
		  	while(i--) {
		  		//console.log("obj "+i+" = "+obj[i]);
		  		if(i < 20 & i >= 0 ){
			  		if(i < 10){
			  			MAG.consolation.push(obj[i]);
			  		}else if(i < 20){
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
				SITE.result = MAG;
			});
			//ax.ajxr.resolve(MAG);
			ax.ajxr.then(function(){
			cons.buildSg4d(SITE.result);
						
					console.log(SITE.result)}
			)
			});
			
		
	},
	doTOTO : function() {
		var SITE = _SITE.TOTO;
			aj.ajx(SITE, function(data){
			
				console.log(data);
				console.log(data.a[0].href);
				var SITE = _SITE.TOTON;
				SITE.url += data.a[0].href;
				
				SITE.data = {dDate:aj.getDateRegexp(data.a[1].content),
							dNo:data.a[0].content};
				console.log("url = " +SITE.url);
				console.log("data = " +SITE.data.dDate);
				console.log("data = " +SITE.data.dNo);
			
				var ax = new aj.ajx(SITE, function(data,SITE){
				console.log(data);
			
				// Virify		
				var i = data.span.length;
					aj.xchk(SITE,i);
				// Virify End
				
				var obj = data.span.reverse(),
					MAG = {
						dDate:SITE.data.dDate,
						dNo:SITE.data.dNo,
						d4J:[], 
						consolation:[],
						special:[],
						superemeJ:[],
						superemeJp:obj[72].content,
						powerJ:[],
						powerJp:obj[65].content,
						megaJ:[],
						megaJp:obj[58].content,
						d5First:[],
						d5Second:[],
						d5Third:[],
						d6:[]
						},
					dNoRegxp = /\d{4}\s?/ig,
					obj4d = [obj[79]].concat(obj.slice(98,122)),
					j = obj4d.length;
				//while(i--){console.log("obj "+i+" = "+obj[i].content);}
				// 4D	
				MAG.first = obj4d[24].content;
				MAG.second = obj4d[23].content;
				MAG.third = obj4d[22].content;
				aj.getContent(obj4d.slice(0,2),MAG.d4J);
				while(j--){
					//console.log("obj4d "+j+" = "+obj4d[j].content);
						if(j < 22 & j >= 2 ){
					  		if(j < 12){
					  			MAG.consolation.push(obj4d[j].content);
					  		}else if(j < 22){
					  			MAG.special.push(obj4d[j].content);
					  		}
			  			}
					}
				// Jackpot	
				aj.getContent(obj.slice(73,79),MAG.superemeJ);
				aj.getContent(obj.slice(66,72),MAG.powerJ);
				aj.getContent(obj.slice(59,65),MAG.megaJ);
				// 5D
				aj.getContent(obj.slice(9,14).reverse(),MAG.d5First);
				aj.getContent(obj.slice(0,5).reverse(),MAG.d5Second);
				aj.getContent(obj.slice(48,53).reverse(),MAG.d5Third);
				// 6D
				aj.getContent(obj.slice(18,24).reverse(),MAG.d6);

		  		//console.log("obj4d = " + obj4d)
		  		console.log("dDate = " + MAG.dDate)
		  		console.log("dNo = " + MAG.dNo)
		  		console.log("First = " + MAG.first)
		  		console.log("Second = " + MAG.second)
		  		console.log("Third = " + MAG.third)
		  		console.log("consolation = " + MAG.consolation)
		  		console.log("special = " + MAG.special)
		  		console.log("4d Prize = " + MAG.d4J)
		  		console.log("superemeJ = " + MAG.superemeJ)
		  		console.log("superemeJp = " + MAG.superemeJp)
		  		console.log("powerJ = " + MAG.powerJ)
		  		console.log("powerJp = " + MAG.powerJp)
		  		console.log("megaJ = " + MAG.megaJ)
		  		console.log("megaJp = " + MAG.megaJp)
		  		console.log("d5First = " + MAG.d5First)
		  		console.log("d5Second = " + MAG.d5Second)
		  		console.log("d5Third = " + MAG.d5Third)
		  		console.log("d6 = " + MAG.d6)
				SITE.result = MAG;
			});
			//ax.ajxr.resolve(MAG);
			ax.ajxr.then(function(){
			cons.buildToto(SITE.result);
						
					console.log(SITE.result)}
			)
			});
	},		
	ajx : function(SITE,callback){
		//this.site = SITE;
       	this.yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + SITE.url + '" AND xpath="'+ SITE.xpath +'" AND charset="'+SITE.charset+'"'+SITE.query) +'&format=json&callback=?';
       	this.ajxr = $.getJSON( this.yql, function cbFunc(data) {
				  	//console.log(data.query.results);
				  	if (data.query.results) {
						data = data.query.results;
						// If the user passed a callback, and it
							callback(data,SITE);
       					}
				  
					// Else, Maybe we requested a site that doesn't exist, and nothing returned.
					else throw new Error(SITE.nn+' Nothing returned from YQL.'); 
			   		})
		   		},
	rslt : function(){
		
	},
	init : function(){
		$("#totoAct").click(aj.doTOTO);
		$("#sg4dAct").click(aj.doSG4D);
		$("#magnumAct").click(aj.doMAG4D);
		$("#pmpAct").click(aj.doPMP);
		
		
		//aj.doTOTO()
		//aj.doSG4D()
		//aj.doPMP()
		//aj.doMAG4D()	
	}
	}

$.fn.buildDDNo= function(data){
		    var	obj = data,i = obj.length, con=this;
           while(i--) {	
           			con[i].innerHTML=obj[i];
                      }
			}
			
$(function(){aj.init()})
//aj.doSG4D()
//aj.doPMP()
//aj.doMAG4D()

