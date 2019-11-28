/*!*************************************************************************************************
 * gulpfile.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Gulp automation task definition file for setting up tasks that build CSS and JS
 * files for use on the WSUWP website of the WSU Office of Undergraduate Education.
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * REPOSITORY: https://github.com/invokeImmediately/nsse.wsu.edu
 *
 * LICENSE: ISC - Copyright (c) 2019 Daniel C. Rieck.
 *
 *   Permission to use, copy, modify, and/or distribute this software for any purpose with or
 *   without fee is hereby granted, provided that the above copyright notice and this permission
 *   notice appear in all copies.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 *   SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
 *   DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 *   DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 *   CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *   PERFORMANCE OF THIS SOFTWARE.
 **************************************************************************************************/

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
			'lineBefore': '/*! ====================================================================\
============================\r\n*** Media queries section\r\n*** ==================================\
==============================================================\r\n***   SUMMARY: Media queries buil\
t from precompiled CSS written in the Less language extension of\r\n***    CSS. Queries in this sec\
tion are a combination of those designed for use on websites belonging to DAESA ***\r\n    and thos\
e intended specifically for use on the DAESA website.\r\n***\r\n***   DESCRIPTION: Fully documented\
, precompiled source code from which this section of the custom\r\n***    stylesheet was built is d\
eveloped and maintained on the following two GitHub projects:\r\n***    https://github.com/invokeIm\
mediately/WSU-UE---CSS/\r\n***    https://github.com/invokeImmediately/oue.wsu.edu/\r\n***   AUTHOR\
: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)\r\n***\r\n***   LICENS\
E: ISC - Copyright (c) 2019 Daniel C. Rieck.\r\n***\r\n***     Permission to use, copy, modify, and\
/or distribute this software for any purpose with or\r\n***     without fee is hereby granted, prov\
ided that the above copyright notice and this permission\r\n***     notice appear in all copies.\r\
\n***\r\n***     THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH RE\
GARD TO\r\n***     THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. I\
N NO EVENT\r\n***     SHALL DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENT\
IAL DAMAGES OR\r\n***     ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETH\
ER IN AN ACTION OF\r\n***     CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN C\
ONNECTION WITH THE USE\r\n***     OR PERFORMANCE OF THIS SOFTWARE.\r\n*** =========================\
=======================================================================\r\n**/',
			'stopAfterFirstMatch': true
		};
	var minCssFileExtension = '.min.css';
	var minCssFileHeaderStr = '';
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
