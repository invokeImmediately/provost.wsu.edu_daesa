/* NODE.JS - Build Production JavaScript File */
var concat = require('../../../../AppData/Roaming/npm/node_modules/concat-files');
concat([
	'../WSU-UE---JS/jQuery.oue-custom.js',
	'./ucore-custom.js',
	'../WSU-UE---JS/jQuery.qTip.js',
	'../WSU-UE---JS/jQuery.textResize.js',
	'../WSU-UE---JS/jQuery.cookieObjs.js',
	'../../imagesloaded/imagesloaded.pkgd.min.js',
	'../../masonry/dist/masonry.pkgd.min.js',
	'../WSU-UE---JS/jQuery.masonry-custom.js',
	], './oue-custom.js', function() {
		console.log('Concatenation complete.');
	});
