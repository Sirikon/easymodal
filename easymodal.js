var easymodalStatics = {
	screenDarkActive: false,
	screenDark: function(status){
		if(status && !easymodalStatics.screenDarkActive){
			var dark = document.createElement('div');
			dark.className = 'easymodal_screendark';
			document.body.appendChild(dark);
			document.body.className	= 'easymodal_blockscroll';
			easymodalStatics.screenDarkActive = true;
		}else if(!status && easymodalStatics.screenDarkActive){
			document.body.className = document.body.className.replace('easymodal_blockscroll','');
			document.querySelector('.easymodal_screendark').remove();
			easymodalStatics.screenDarkActive = false;
		}
	},
	hideModal: function(){
		modal = document.querySelector('.easymodal.show');
		modal.className = modal.className.replace('show','').replace(modal.getAttribute('data-classonshow'),'');
		easymodalStatics.screenDark(false);
	}
}

document.addEventListener('click', function(e){
	// Find the first A
	var elementLink = e.target;
	for(var i = 0; i < e.path.length; i++){
		if(e.path[i].nodeName == 'A'){
			elementLink = e.path[i];
		}
	}

	// When clicked element is a link
	if(elementLink.nodeName == 'A'){
		href = elementLink.getAttribute('href')
		if(href.substr(0,1) == '#'){
			modal = document.querySelector(href);
			if(modal){
				e.preventDefault();
				if(modal.className.indexOf('show') == -1){
					easymodalStatics.screenDark(true);
					modal.className+=' show '+modal.getAttribute('data-classonshow');
				}
			}
		}
	// When clicked element is the dark background
	}else if(e.target.nodeName == 'DIV'){
		if(e.target.className == 'easymodal_screendark'){
			easymodalStatics.hideModal();
		}
	}else if(e.target.className.indexOf('easymodal-close') >= 0){
		easymodalStatics.hideModal();
	}
});