$(function() {
	function right(){
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor: right,
		selector: "#rightZone",
		pagePath: "module/fupin/developmentNeed",
		init: function(){
			this.loadRight();
		},
		loadRight: function(){
			var that = this;
			zhnx.utils.loadSvg("svg/fupin_right_target.svg", function(importedNode){
				var plane = importedNode.cloneNode(true);
				$(that.selector).empty().append($(plane).attr("id","fupin_right_target_svg"));
				d3.select(plane).selectAll("text")
				.attr({
					"font-family":"Microsoft Yahei"
				});
			});
		},
		loadList: function(countrycode, cunURL){
			var that = this;
			
			$(that.selector).empty();
			
			this.drawSvgTable("widgetRight0",{
				
			},{
				bgName: "right_table",
				commandTableClick: function(commandArgs){
					var command = $.extend({
						level: 8,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			},{
				width:930,
				height:910
			});
			$.ajax({
				type: "post",
				url: cunURL,
				data: {areaCode:countrycode},
				success: function(data){
					var country = data.series.country
					var options = "";
					var areaCodeCountry = data.series.countrycode;	//请求之后得到的每个村的编码
					for(var i = 0; i < country.length; i++){
						options += '<option value=' +areaCodeCountry[i]+'>' + country[i] + '</option>';
						zhnx.rightObj.getComponent("widgetRight0").htmGroup.empty().append('<select id="selcet">'+options+'</select>');
					}
					zhnx.rightObj.getComponent("widgetRight0").drawRightTable(areaCodeCountry[0]);
					$("#selcet").on("change",function(){
						var areaCodeCountryNum = $("#selcet").children('option:selected').val();
						that.countryChange(areaCodeCountryNum);
						$(".main_with_table").find("li").removeClass("menuActive");
						
						var execString = "that.countryChange('"+ areaCodeCountryNum +"');$('#selcet').val('" + areaCodeCountryNum + "');";
						that.commandChange({
	            			type: 'change',
	            			context: "rightObj",
	            			contextType: 'rigObj',
	            			execString: execString,
	            			execMode: "evalfunc"
						});
					});
					zhnx.rightObj.getComponent("widgetRight0").tableChangeValue = function(changeVal){
						zhnx.centerObj.initTablePage0(changeVal)
					};
				}
			});	
		},
		countryChange : function(areaCodeCountryNum){
			zhnx.rightObj.getComponent("widgetRight0").drawRightTable(areaCodeCountryNum);
			zhnx.centerObj.removeComponent("widgetTable");
		},
		commandChange: function(commandArgs){
			var command = $.extend({
				level: 7,
				mutexSameLevel: true,
				mutexNextLevel: true,
				ignoreHistory: true
			}, commandArgs);
        	zhnx.websocket.send(command);
		}
	});
	zhnx.rightObj = new right();
});