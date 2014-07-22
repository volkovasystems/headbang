/*:
	@module-configuration:
		{
			"packageName": "headbang",
			"fileName": "headbang.js",
			"moduleName": "headbang",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/headbang.git",
			"testCase": "headbang-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation
*/
var headbang = function headbang( URL, responseHandler ){
	/*:
		@meta-configuration:
			{
				"URL:required": "string",
				"responseHandler:required": "function"
			}
		@end-meta-configuration
	*/

	bang( "HEAD", URL, function catcher( ){
		if( this.responseState == 2 ){
			var headerString = this.getAllResponseHeaders( );
			if( this.status == 200 ){
				responseHandler( true, headerString );
			}else if( this.status >= 400 ){
				responseHandler( false, headerString );
			}else{
				responseHandler( null, headerString );
			}
		}
	} );
};