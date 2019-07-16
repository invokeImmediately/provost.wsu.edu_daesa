/*!
 * gulpfile.js: Gulp automation task definition file for setting up tasks that build CSS and JS
 * files for use on the WSUWP website of the WSU Office of Undergraduate Education.
 *
 * @author - Daniel Rieck ( danielcrieck@gmail.com ) [https://github.com/invokeImmediately]
 */

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gulp task dependencies..................................................................23
// §2: Specificiation of build settings .......................................................28
//   §2.1: getCssBuildSettings()...............................................................31
//   §2.2: getJsBuildSettings()................................................................64
// §3: Entry point: Set up of build taks.......................................................96
////////////////////////////////////////////////////////////////////////////////////////////////////

( function() {

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gulp task dependencies

var gulpBuilder = require( './WSU-UE---JS/gulpBuilder.js' );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Specificiation of build settings 

////////
// §2.1: getCssBuildSettings()

/**
 * Get the settings for a gulp-mediated custom CSS build from Less source files.
 *
 * @return {object} - Instance of gulpBuilder.CssBuildSettings.
 */
function getCssBuildSettings() {
	var commentRemovalNeedle = /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm;
	var dependenciesPath = './WSU-UE---CSS/';
	var destFolder = './CSS/';
	var fontImportStr = '@import url(\'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|\
Roboto+Condensed:400,700|Roboto+Slab|PT+Serif\');\r\n';
	var insertingMediaQuerySectionHeader = {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════\
════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ######################\
################################################################################# ║\r\n*   ╚═══════\
═══════════════════════════════════════════════════════════════════════════════════════════════════\
═════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		};
	var minCssFileExtension = '.min.css';
	var minCssFileHeaderStr = '/*! Built with the Less CSS preprocessor [http://lesscss.org/]. Plea\
se see [https://github.com/invokeImmediately/oue.wsu.edu] for a repository of source code. */\r\n';
 	var sourceFile = './CSS/oue-custom.less';

	return new gulpBuilder.CssBuildSettings(commentRemovalNeedle, dependenciesPath,
 		destFolder, fontImportStr, insertingMediaQuerySectionHeader, minCssFileExtension,
 		minCssFileHeaderStr, sourceFile);
}

////////
// §2.2: getJsBuildSettings()

/**
 * Get the settings for a gulp-mediated custom JS build.
 *
 * @return {object} - Simple collection of settings for JS builds.
 */
function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.oue-animate.js',
			'./WSU-UE---JS/jQuery.cookieObjs.js',
			'./WSU-UE---JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./WSU-UE---JS/jQuery.css-data.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./WSU-UE---JS/jQuery.masonry-custom.js',
			'./JS/oue-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'oue-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: gulpBuilder.fixFileHeaderComments
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Entry point: Set up of build taks

gulpBuilder.setUpCssBuildTask( getCssBuildSettings() );
gulpBuilder.setUpJsBuildTask( getJsBuildSettings() );

} )();
