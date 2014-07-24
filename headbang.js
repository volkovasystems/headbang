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
				"responseHandler:optional": "function"
			}
		@end-meta-configuration
	*/

    if( typeof responseHandler == "function" ){
        bang( "HEAD", URL, function catcher( error ){

            if( this.readyState == 2 ||
                this.readyState == 4 )
            {
                var headerString = this.getAllResponseHeaders( );

                if( error ){
                    responseHandler( error );
                }else if( this.status == 200 ){
                    responseHandler( true, headerString );
                }else if( this.status >= 400 ){
                    responseHandler( false, headerString );
                }else{
                    responseHandler( null, headerString );
                }
            }
        } );

    }else{
        var request = bang( "HEAD", URL );
        var headerString = request.getAllResponseHeaders( );

        var requestResult = {
            "error": request.error,
            "headerString": headerString
        };

        if( request.status == 200 ){
            requestResult.status = true;
        }else if( request.status >= 400 ){
            requestResult.status = false;
        }else{
            requestResult.status = null;
        }

        return requestResult;
    }
};