var AIS_BASE_URL = "https://jde02.uxcredrock.com";
var AIS_USER = 'jde';
var AIS_PASS = 'CNCR0cks!';

// Helper methods for application and UBE launch from custom E1 Pages hosted on the JAS server
// ==
// function to expose running an e1 application from an E1 Page for customers
// appId and formId are required

// search up through window tree (exclude the current window) to find the closet window object who has global function with given name defined
function getAPIhanddler(apiName)
{
    var currentWindow = window.parent;
    while(!currentWindow[apiName] && currentWindow!=top)
        currentWindow = currentWindow.parent;
        
    if(currentWindow[apiName])
        return currentWindow[apiName];
    else
        return null;
}

function runE1App(appId, formId, version, menuSysCode, taskName, formDSTmpl, formDSData)
{
    var APIhanddler = getAPIhanddler("runE1App");
    if (APIhanddler)
    {
        APIhanddler(appId, formId, version, menuSysCode, taskName, formDSTmpl, formDSData);
    }
}

//Helper function to set the launchAction to promptForVersion explicitly
//Use this when you don't want to send that parm into the runE1UBE function
function runE1UBEVersion(ubeId, version, promptPO)
{
    var APIhanddler = getAPIhanddler("runE1UBE");
    if (APIhanddler)
    {    
        APIhanddler(ubeId, "promptForVersion", version, promptPO);
    }
}

//Helper function to set the launchAction to promptForBlindExecution explicitly
//Use this when you don't want to send that parm into the runE1UBE function
function runE1UBEBlind(ubeId, version, promptPO)
{
    var APIhanddler = getAPIhanddler("runE1UBE");
    if (APIhanddler)
    {
        APIhanddler(ubeId, "promptForBlindExecution", version, promptPO);
    }
}

//function to expose running an e1 ube from an E1 Page for customers
//Customer must send in at least appId (which is actually the UBE name)
//Possible launch action values (promptForBlindExecution, promptForVersion, promptForValue, promptForDS)
function runE1UBE(ubeId, launchAction, version, promptPO)
{
    var APIhanddler = getAPIhanddler("runE1UBE");
    if (APIhanddler)
    {
        APIhanddler(ubeId, launchAction, version, promptPO);
    }
}

// Wrappers to support existing portal RunOWApp functions
function RunOWApp(callingFormId)
{
    var APIhanddler = getAPIhanddler("RunOWApp");
    if (APIhanddler)
    {
        APIhanddler(callingFormId);
    }
}

// Wrapper for backward compatibility of portal RunOWApp
function addRunOWAppFI(templ, values)
{
    var APIhanddler = getAPIhanddler("addRunOWAppFI");
    if (APIhanddler)
    {
        APIhanddler(templ, values);
    }
}

// Function to allow switching to another E1 Page
function goToTabByLabel(event, label)
{
    if (!label)
    {
        // The one-argument version of the function has been used.
        label = event;
        event = new Object();
    }

    var tabBar = parent.document.getElementById('tabBar');
    if (tabBar)
    {
        for (var i = 0; i < tabBar.children.length; i++)
        {
            var tab = tabBar.children[i];
            var tabName;
            tabName = (tab.textContent === undefined)?tab.innerText:tab.textContent;

            if ((tabName == label) || (tab.innerHTML == label))
            {
                parent.CHP.mouseDownTab(event, tab);
                parent.CHP.mouseUpTab(event, tab);
                return;
            }
        }
    }
}

/* Function to return icon information for a particular app/report.
 *
 * Arguments - Input:
 *   appIdArr  - array of app/report ids to lookup.  (It is ok to mix 
 *               and match between apps and reports.)
 *   formIdArr - array of formIds corresponding to the id's in appIdArr.
 *               This is a parallel array - entry appIdArr[i] should 
 *               correspond to formIdArr[i].  If there is no formId
 *               for a particular appId (e.g., when the "app" is really
 *               a report), add '' (the empty string) for that slot
 *   pCodeArr  - array of product codes for the apps/reports on which
 *               the query is being done.  
 *
 * If some fields are left blank, the service will make a best effort
 * to infer the missing fields.  E.g., if you leave product code blank
 * but supply appId and formId, the system will attempt to look up the
 * correct product code.  
 * 
 * Output Argument
 *   callback - function pointer to the user-supplied handler function.
 *              The getIcons function will terminate immediately.  Once
 *              the data has been computed, it will be passed as an 
 *              argument to the supplied callback function.
 *           
 *              The format of the argument is an array of objects in the
 *              same order as the input arrays.  Each object has two 
 *              members:  basename and ext.  The full filename is assembled 
 *              by combining:
 *                   * ROOT PATH FOR JDE_ICONS (e.g., /jde/share/images/jdeicons)
 *                   * basename
 *                   * SIZE SUFFIX (e.g., _large)
 *                   * . (the dot character)
 *                   * ext
 *   
 */
function getIcons(appIdArr, formIdArr, pCodeArr, callback, extraInfArr)
{
    var iconService = top.ICONSERVICE
    if (iconService)
    {
        iconService.getIcons(appIdArr, formIdArr, pCodeArr, callback, extraInfArr);
    }
}

function iconServiceExists()
{
    if (top.ICONSERVICE)
    {
        return true;
    }
    return false;
}

function getIconVersion()
{
    return top.ICONSERVICE.iconVersion;
}

/* This method can be used to execute an E1Task 
 *    E.g.,  runE1Task('3/G01')
 * This API will still execute tasks, even if the fastpath has been disabled.  
 * Commands such as runE1Task('G01') will not work if the fastpath is disabled.
 */
function runE1Task(str)
{
    var APIhanddler = getAPIhanddler("doFastPath");
    if (APIhanddler)
    {
        APIhanddler(str, "E1C2");
    }
}

/* This method retrives the currently logged in User Id 
 * - the current session must be valid
 * - display system information option must be enabled
 */
function getUserId()
{
    return AIS_USER;
}

/* This method retrives the currently logged in User Name
 * - if the current user does not have a full name then the user id is displayed
 * - show name in menu option must be enabled
 */
function getUserName()
{
    return top.getUserName();
}

/* This method retrives the currently logged in Environment 
 * - the current session must be valid
 * - display system information option must be enabled
 */
function getEnvironment()
{
    return top.getEnvironment();
}

/* This method retrives the currently logged in Role for the user 
 * - the current session must be valid
 * - display system information option must be enabled
 */
function getLoginRole()
{
    return top.getLoginRole();
}

/* This method retrives the currently logged in Role for the user 
 * - the current session must be valid
 * - display system information option must be enabled
 */
function getUserInfo()
{
    return top.getUserInfo();
}

// The following code is executed in the init method of Carousel, however for simplified UI mode, 
// the carousel will not be init but we have to execute the following line in order to get JDE_ICON_PREFIX
// initialized because it will be used in E1 Page to determine the scr URL of tile image
if (!top.JDE_ICON_PREFIX && parent.CARO)
{
    /* The constant should hold the WSRP-safe path to icon files, but if it is not 
       supplied, fallback to the default. */
    top.JDE_ICON_PREFIX = parent.CARO.createUrlString('/share/images/jdeicons/');
}


/* AIS Service Name constants*/
FORM_SERVICE = "/formservice.ais";
DATA_SERVICE = "/dataservice.ais";
BATCH_FORM_SERVICE = "/batchformservice.ais";
APP_STACK_SERVICE ="/appstack.ais";
PO_SERVICE ="/poservice.ais";
LOG_SERVICE ="/log.ais";
JARGON_SERVICE="/jargon.ais";
PREFERENCE_SERVICE="/preference.ais";
    
SERVICE_VERSION_2="";
    
// Set the default AIS Service Version to V2
function setAISServiceVersionV2()
{
    AIS_SERVICE_VERSION = SERVICE_VERSION_2;
}

/*  
 * Call an AIS Service
 */
 
var sessionToken;

function callAISService(input, service, callback){
    //parent.parent.AISProxy.callService(input, service, callback);
	
	var inputPadded = input;
	
	if(typeof sessionToken === 'undefined')
	{
	/***** DEBUG LINE ****/
	get_token();
	/***** DEBUG LINE ****/
	}
	
	/* Dont bother about preferences - Assume debug query+count is hardcoded */
	if (service == "/preference.ais")
	{
		var result = "";
		callback(result);
	}
	else{
		
	
	if (typeof input === 'object') {
            //convert the input object to a string
			inputPadded.token =  window.currentToken.userInfo.token;
			inputPadded.deviceName = "SoapUI";
            requestDocString = JSON.stringify(inputPadded);
        }
        else
        {
            //input is a string
            requestDocString = input;
        }
		
		
		    /**    var ServerURL = AIS_BASE_URL + "/jderest/batchformservice";
				
				$.ajax({contentType: "application/x-www-form-urlencoded", async:false, type: "POST", url: ServerURL, 
            data: requestDocString,
            success: function(result)
            {   
                console.log(result);
                //window.lastResponseTimeAvailable = result;
				callback(result);
             //   display_TimeAvailableByProductFamily();
                // do_GetPendingFarmingOperations();
            }
			
           });  **/
		   
		   AISProxy.callService(inputPadded, service, callback);
	   
	}	


}

function get_token()
{
    console.log("Requesting AIS Token");
	var ServerURL = AIS_BASE_URL + "/jderest/v2/tokenrequest";
    $.ajax({contentType: "application/json", type: "POST", async:false,
	url: ServerURL, data: '{"username":"' + AIS_USER + '","password":"' + AIS_PASS + '","deviceName":"SoapUI"}', 
           success: function(result, status, xhr)
            {
                console.log("Received AIS Token");
                sessionToken = result;
				window.currentToken= sessionToken;
               // if (makeInitialAISCalls)
		//{
		//    makeInitialAISCalls();
		//}
            }, 
			error: function(xhr){
	alert("Ooopss!! Failed to retrieve a token: " + xhr.status + " " + xhr.statusText)}});

 
}


/*  
 * Call an AIS Orchestration
 */
function callAISOrchestration(orchestration,input,callback){
    parent.parent.AISProxy.callOrchestration(orchestration,input, callback);
}

var AISProxy = new function() {
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    
    //get context root
    var context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
        
    this.FORM_SERVICE = "/formservice.ais";
    this.DATA_SERVICE = "/dataservice.ais";
    this.BATCH_FORM_SERVICE = "/batchformservice.ais";
    this.APP_STACK_SERVICE ="/appstack.ais";
    this.PO_SERVICE ="/poservice.ais";
    this.LOG_SERVICE ="/log.ais";
    this.JARGON_SERVICE="/jargon.ais";

    
    this.ORCHESTRATOR = ".orchestration";
    
    this.callOrchestration = function(orchestration,input,callback){
        //form url of an orchestration
        service = "/"+ orchestration + AISProxy.ORCHESTRATOR ;        
        this.callService(input, service, callback);
        
    }

    this.callService = function(input, service, callback) {     
 
		var inputPadded = input;
        if (typeof input === 'object') {
            //convert the input object to a string
			
			inputPadded.token =  window.currentToken.userInfo.token;
			inputPadded.deviceName = "SoapUI";
            requestDocString = JSON.stringify(inputPadded);
  
        }
        else
        {
            //input is a string
            requestDocString = input;
        }

        //form url of form service
        // url = AIS_BASE_URL + "/jderest/batchformservice";
        url = AIS_BASE_URL + "/jderest/v2" + service.split('.')[0];

        //post to the service with the input string as a parameter
        E1AJAX.sendXMLReq("POST", "E1Container", url,
            function(containerId, responseText) {
                if (typeof input === 'object') {
                    //return the response as an object
                    var arr_from_json = JSON.parse(responseText);
                    callback(arr_from_json);
                } else 
                {
                    //return the response as a string
                    callback(responseText);
                }
            //}, "json=" + requestDocString);
			 }, requestDocString);
    }
}

var E1AJAX = 
{
    isWebkit: function()
    {
        return (navigator.userAgent.toLowerCase().indexOf("webkit") > -1);
    },

    sendXMLReq: function(method, containerId, action, handler, doc)
    {
        // code for IE 7, FireFox, Safari, etc.
        if (window.XMLHttpRequest)
        {
            var xmlReqObject = new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            var xmlReqObject = new ActiveXObject("MSXML2.XMLHTTP");
        }

        if (xmlReqObject != null)
        {
            xmlReqObject.open(method, action, true);
            var handlerFunction = E1AJAX.getReadyStateHandler(xmlReqObject, handler, containerId);
            xmlReqObject.onreadystatechange = handlerFunction;
            xmlReqObject.setRequestHeader("Content-Type", "application/json");
            //Webkit browsers through Javascript error while setting connection header
            if(!E1AJAX.isWebkit())
            { 
                xmlReqObject.setRequestHeader("Connection", "close");
            }
            try
            {
                xmlReqObject.send(doc);
            }
            catch(e){} // SSO logout from web center may cause interaction of E1 failure
        }

    },

    getReadyStateHandler: function (req, responseHandler, containerId)
    {
        // Return an anonymous function that listens to the 
        // XMLHttpRequest instance
        return function ()
        {
            // If the request's status is "complete"
            if (req.readyState == 4)
            {
                // Check that a successful server response was received
                switch (req.status)
                {
                    case 200:
                        // Pass the XML payload of the response to the 
                        // handler function
                        if (responseHandler)
                            responseHandler(containerId, req.responseText);
                        break;
 
                    case 122: // SSO logout already from web center but E1 is still opened
                        E1AJAX.timeout();
                        break;

                    case 404:// possible XSS attack 
                        if (window.RIUTIL && RIUTIL.CONSTANTS && RIUTIL.CONSTANTS.RI_EXIT_FOR_XSS)
                        {
                            E1AJAX.timeout(RIUTIL.CONSTANTS.RI_EXIT_FOR_XSS);
                        }
                        else
                        {
                            E1AJAX.timeout();
                        }
                        break;

                    // Safari intermittently encounters status 0 states.
                    // Bypass the alert error in the default below with a case for this
                    // state with no specific logic for it.
                    case 0: 
                        break;
 
                    default:
                        // An HTTP problem has occurred
                        alert("HTTP error: " + req.status);
                }
            }
        }
    },

    timeout:  function (message)
    {
        if(message)
            alert(message);
        top.location.replace(top.location.href);
      },
    
    sendSyncXMLReq: function(method, action)
    {
        // code for IE 7, FireFox, Safari, etc.
        if (window.XMLHttpRequest)
        {
            var xmlReqObject = new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            var xmlReqObject = new ActiveXObject("MSXML2.XMLHTTP");
        }

        if (xmlReqObject != null)
        {
            xmlReqObject.open(method, action, false);
            xmlReqObject.send(null);
            if (xmlReqObject.status === 200) 
            {
                try
                {
                    return xmlReqObject.responseText;
                }
                catch(e){}
            }
        }
    }
};
