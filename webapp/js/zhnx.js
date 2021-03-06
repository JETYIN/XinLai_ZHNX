var zhnx = {
	currentArea: {
		code : "640000000000",
		name : "宁夏回族自治区"
	},
    chart: {},
    chartInit: {},
    utils: {},
    windows: {},
    windowDraggable: false,	//窗口拖动
    indexObject: undefined,
    centerObj: undefined,
    rightObj: undefined,
    indexPadObject: undefined,
    centerPadObj: undefined,
    websocket: {
    	reconnectTime: 0,
    	maxReconnectTime: 5
    },
    gc: function(callback){
    	callback = callback || $.noop;
    	// 清空d3.timer
    	zhnx.clearTimer();
    	// 关闭interval
    	zhnx.clearIntverls();
    	// 销毁中间的图表
    	if(zhnx.centerObj != undefined){
    		for(var i = 0; zhnx.centerObj.components != undefined && i < zhnx.centerObj.components.length; i++){
    			var component = zhnx.centerObj.components[i];
    			if(component != null && component != undefined){
    				component.destroy();
    			}
    		}
    		zhnx.centerObj.components = [];
    	}
    	// 销毁右侧的图表
    	if(zhnx.rightObj != undefined){
    		for(var i = 0; zhnx.rightObj.components != undefined && i < zhnx.rightObj.components.length; i++){
    			var component = zhnx.rightObj.components[i];
    			if(component != null && component != undefined){
    				component.destroy();
    			}
    		}
    		zhnx.rightObj.components = [];
    	}
    	// 加载页面
    	callback();
    },
    intervals:[],
    clearIntverls: function(){
    	for(var i = 0; i < zhnx.intervals.length; i++){
    		var interval = zhnx.intervals[i];
    		if(interval != null && interval != undefined){
    			clearInterval(interval);
    		}
    	}
    	zhnx.intervals = [];
    },
    timer:{},
    clearTimer: function(){
    	zhnx.timer = {};
    },
    resource: {
        baseUrl: window.location.pathname.split("/")[1],
        getUrl: function (A) {
            return "/" + zhnx.resource.baseUrl + "/" + A
        },
        getUrlByArea: function (A) {
            return "/" + zhnx.resource.baseUrl + "/resources/" + zhnx.currentArea.code + "/" + A
        }
    },
    layout: undefined,
    getLayout: function(callback){
    	callback = callback || $.noop;
    	$.ajax({
    		type:"POST",
    		url:"common/layout/getLayout.do",
    		success:function(d){
    			zhnx.layout = d.layout;
    			callback();
//    		    $.cookie('widgetPosition', d.layout, {expires: 365, path: "/"});
    		}
    	});
    },
    dict:{
    	dictMap: undefined
    },
	getDict: function(callback){
		callback = callback || $.noop;
		d3.json("data/dict.json", function(error, root){
			zhnx.dict.dictMap = root;
			callback();
		});
	},
    tooltip: undefined,
    createTooltip: function(){
    	if(zhnx.tooltip == undefined){
    		zhnx.tooltip = d3.select("body").append("div")
    		.attr({
    			"class": "tooltip"
    		})
    		.style({
    			"position": "absolute",
    			"text-align": "center",
    			"vertical-align": "middle",
    			"border": "solid 1px blue",
    			"border-radius": "4px",
    			"background-color": "#1E3680",
    			"opacity": "0",
    			"z-index": "999999",
    			"box-shadow": "2px 5px 3px rgba(0, 0, 0, 0.7)",
    			"color": "#FFF"
    		});
    	}
    },
    getTooltip: function(){
    	zhnx.createTooltip();
    	return zhnx.tooltip;
    },
    mask: undefined,
    createMask: function(){
    	if(zhnx.mask == undefined){
    		zhnx.mask = $("<div/>").addClass("mask").hide();
    		$("body").append(zhnx.mask);
    	}
    },
    getMask: function(){
    	zhnx.createMask();
    	return zhnx.mask;
    },
    cityLocations:{
    	"NX":{
    		"name": "全区",
    		"code": "640000000000"
    	},
    	"WZ":{
    		"name": "吴忠市",
    		"cp": [106.853, 37.3755],
    		"rp": [106.98486328124999, 37.883524980871336],
    		"code": "640300000000"
    	},
    	"ZW":{
    		"name": "中卫市",
    		"cp": [105.4028, 36.9525],
    		"rp": [103.271484375, 37.59682400108367],
    		"code": "640500000000"
    	},
    	"GY":{
    		"name": "固原市",
    		"cp": [106.1389, 35.9363],
    		"rp": [104.007568359375, 36.40359962073253],
    		"code": "640400000000"
    	},
    	"XHG":{
    		"name": "西海固",
    		"cp": [106.1389, 35.9363],
    		"rp": [104.007568359375, 36.40359962073253],
    		"code": "640600000000"
    	},
    	"YC":{
    		"name": "银川市",
    		"cp": [106.3586, 38.1775],
    		"rp": [104.315185546875, 38.89103282648846],
    		"code": "640100000000"
    	},
    	"SZS":{
    		"name": "石嘴山市",
    		"cp": [106.4795, 39.0015],
    		"rp": [106.776123046875, 39.39375459224348],
    		"code": "640200000000"
    	},
    	"XJ":{
    		"name": "西吉县",
    		"cp": [105.7489013671875, 36.0779620797358],
    		"rp": [104.83428955078125, 36.50301312197295],
    		"rp2":[103.941650390625, 36.575835338491764],
    		"code": "640422000000"
    	},
    	"YZ":{
    		"name": "原州县",
    		"cp": [106.3037109375, 36.2354121683998],
    		"rp": [106.38085400390625, 36.49621584042748],
    		"rp2":[105.35888671875, 37.112145754751516],
    		"code": "640402000000"
    	},
    	"PY":{
    		"name": "彭阳县",
    		"cp": [106.57012939453125, 35.88014896488361],
    		"rp": [106.7926025390625, 36.113471382052175],
    		"rp2":[106.754150390625, 36.24427318493909],
    		"code": "640425000000"
    	},
    	"LD":{
    		"name": "隆德县",
    		"cp": [106.083984375, 35.72644736208901],
    		"rp": [105.00732421875, 35.88459964717596],
    		"rp2":[104.13940429687499, 35.9157474194997],
    		"code": "640423000000"
    	},
    	"JY":{
    		"name": "泾源县",
    		"cp": [106.30096435546875, 35.51210746747797],
    		"rp": [105.6884765625, 35.38904996691167],
    		"rp2":[106.402587890625, 35.679609609368576],
    		"code": "640424000000"
    	},
    	"SPT":{
    		"name": "沙坡头区",
    		"cp": [105.19958496093749, 37.33522435930641],
    		"rp": [104.13940429687499, 37.666429212090605],
    		"rp2":[103.26599121093749, 37.54893261064109],
    		"code": "640502000000"
    	},
    	"ZL":{
    		"name": "中宁县",
    		"cp": [105.74066162109375, 37.507547084964116],
    		"rp": [105.86700439453125, 37.79676317682161],
    		"rp2":[105.79833984375, 37.93553306183642],
    		"code": "640521000000"
    	},
    	"HY":{
    		"name": "海源县",
    		"cp": [105.765380859375, 36.54494944148322],
    		"rp": [105.93292236328124, 36.932330061503144],
    		"rp2":[105.79833984375, 37.09900294387622],
    		"code": "640522000000"
    	},
    	"HN":{
    		"name": "惠农区",
    		"cp": [106.65664672851562, 39.22480659786851],
    		"rp": [106.70196533203125, 39.42770738465604],
    		"rp2":[105.97412109375, 39.73676229957947],
    		"code": "640205000000"
    	},
    	"DWK":{
    		"name": "大武口区",
    		"cp": [106.28860473632812, 39.086370096650704],
    		"rp": [105.1666259765625, 39.22587043822116],
    		"rp2":[104.6282958984375, 39.27478966170308],
    		"code": "640202000000"
    	},
    	"PL":{
    		"name": "平罗县",
    		"cp": [106.62506103515625, 38.86751337001198],
    		"rp": [106.59759521484375, 38.96154447940714],
    		"rp2":[106.6717529296875, 38.94659331893374],
    		"code": "640221000000"
    	},
    	"QTX":{
    		"name": "青铜峡市",
    		"cp": [105.93841552734375, 37.903032319353656],
    		"rp": [104.70794677734374, 38.21444607848999],
    		"rp2":[104.23828125, 38.25974980039479],
    		"code": "640381000000"
    	},
    	"LT":{
    		"name": "利通区",
    		"cp": [106.19384765625, 37.714244967649265],
    		"rp": [106.13067626953125, 38.1777509666256],
    		"rp2":[106.171875, 38.285624966683756],
    		"code": "640302000000"
    	},
    	"HSB":{
    		"name": "红寺堡区",
    		"cp": [106.09771728515625, 37.35487607348372],
    		"rp": [104.8974609375, 37.54239958054064],
    		"rp2":[104.293212890625, 37.579412513438385],
    		"code": "640303000000"
    	},
    	"TX":{
    		"name": "同心县",
    		"cp": [106.29547119140625, 36.89499795802219],
    		"rp": [105.0567626953125, 36.9806150652861],
    		"rp2":[106.248779296875, 37.06394430056685],
    		"code": "640324000000"
    	},
    	"YCH":{
    		"name": "盐池县",
    		"cp": [107.06451416015625, 37.63380988687157],
    		"rp": [107.0343017578125, 37.65338320128765],
    		"rp2":[107.03979492187499, 37.60117623656667],
    		"code": "640323000000"
    	},
    	"HL":{
    		"name": "贺兰县",
    		"cp": [106.28448486328125, 38.71766178810086],
    		"rp": [105.26824951171875, 39.14071226655259],
    		"rp2":[104.75463867187499, 39.37677199661635],
    		"code": "640122000000"
    	},
    	"YL":{
    		"name": "永宁县",
    		"cp": [106.029052734375, 38.27053224010455],
    		"rp": [105.05950927734374, 38.324420427006515],
    		"rp2":[105.05950927734374, 38.324420427006515],
    		"code": "640121000000"
    	},
    	"LW":{
    		"name": "灵武市",
    		"cp": [106.534423828125, 38.0091482264894],
    		"rp": [106.578369140625, 38.1237539824224],
    		"rp2":[106.70471191406249, 38.09998264736481],
    		"code": "640181000000"
    	},
    	"NKJT":{
    		"name": "农垦集团",
    		"cp": [106.5234375, 37.727280276860036],
    		"rp": [105.2874755859375, 37.740313292102634],
    		"rp2":[104.9853515625, 37.65773212628272],
    		"code": "640101000000"
    	},
    	"XX":{
    		"name": "西夏区",
    		"cp": [106.007080078125, 38.541720956040386],
    		"rp": [105.018310546875, 38.74551518488265],
    		"rp2":[104.1888427734375, 38.83542884007303],
    		"code": "640105000000"
    	},
    	"XQ":{
    		"name": "兴庆区",
    		"cp": [106.5289306640625, 38.46219172306828],
    		"rp": [106.52069091796875, 38.518086303163024],
    		"rp2":[106.600341796875, 38.57393751557591],
    		"code": "640104000000"
    	},
    	"JF":{
    		"name": "金凤区",
    		"cp": [106.20758056640625, 38.50948995925553],
    		"rp": [106.28173828125, 38.8824811975508],
    		"rp2":[106.54541015625, 39.095962936305504],
    		"code": "640106000000"
    	}
    },
    cityCodeAbbrs: {
    	"640000000000":"NX",
    	"640100000000":"YC",
    	"640200000000":"SZS",
    	"640300000000":"WZ",
    	"640400000000":"GY",
    	"640600000000":"XHG",
    	"640500000000":"ZW",
    	"640205000000":"HN",
    	"640202000000":"DWK",
    	"640221000000":"PL",
    	"640122000000":"HL",
    	"640105000000":"XX",
    	"640106000000":"JF",
    	"640104000000":"XQ",
    	"640121000000":"YL",
    	"640181000000":"LW",
    	"640101000000":"NKJT",
    	"640381000000":"QTX",
    	"640303000000":"HSB",
    	"640302000000":"LT",
    	"640324000000":"TX",
    	"640323000000":"YCH",
    	"640502000000":"SPT",
    	"640521000000":"ZL",
    	"640522000000":"HY",
    	"640402000000":"YZ",
    	"640422000000":"XJ",
    	"640423000000":"LD",
    	"640424000000":"JY",
    	"640425000000":"PY"
    },
	getWebLoginUser: function(callback){
		var that = this;
		$.ajax({
			url: "system/login/getWebLoginUser.do",
			type: "post",
			success: function(d){
				callback(d);
			}
		});
	},
};
// 获取布局信息
// zhnx.getLayout();