(function (global){
	var ajaxUtils = {};

function getRequestObject(){
	if (window.XMLHttpRequest) {
		return (new XMLHttpRequest());
	}
	else if (window.ActiveXObject) {
		return (new ActiveXObject("Microsoft.XMLHTTP"));
	}
	else {
		global.alert("ajax is not supported!");
		return(null); 
	}
}

// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, responseHandler, isJsonResponse); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {
    responseHandler(request);
  }
  // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);