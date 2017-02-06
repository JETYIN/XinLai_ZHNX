$(function(){
	zhnx.dict.getAreaByCodeZn = function(codeZn){
			var dictMap = zhnx.dict.dictMap.area;
			return dictMap[codeZn];
		};
	zhnx.dict.getAreaByCodeDigit = function(codeDigit){
			var dictMap = zhnx.dict.dictMap.area;
			return dictMap[dictMap[codeDigit2codeZn]];
	};
});