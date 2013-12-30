window.onload = function(){
	var ckeditorAdd = { name: 'orangocontent', items : [ 'orangoContentImageUpload', 'orangoContentTube'] };

	ckeditorConfig.toolbar_Post.push(ckeditorAdd);
	ckeditorConfig.toolbar_Page.push(ckeditorAdd);
	
	if(ckeditorConfig.extraPlugins){
		ckeditorConfig.extraPlugins += ',orangocontent';
	}else{
		ckeditorConfig.extraPlugins = 'orangocontent';
	}

	ckeditorConfig.forceEnterMode = true;
};