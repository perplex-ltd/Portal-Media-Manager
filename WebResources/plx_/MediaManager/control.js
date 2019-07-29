var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.Control = function () {
    
    var Xrm = null;
    var formContext = null;
    var lookupAttribute = null;

    var setup = function() {

        var lookupName = getParameterByName("data");

        Xrm = parent.Xrm;
        formContext = parent.Xrm.Page;
        lookupAttribute = formContext.getAttribute(lookupName);
        if (!lookupAttribute) {
            showError("MediaManager: Didn't find attribute \"" + lookupName + "\".\n" +
                "Please make sure to put the correct  Web File lookup attribute name in the custom parameter (data) section " +  
                "of the web resource and to add the lookup field on the form.");
                return;
        }

        var lookupValue = lookupAttribute.getValue();
        if (!lookupValue) {
            $("#loading").hide();
            $("#main").show();
        } else {
            var id = lookupAttribute.getValue()[0].id;
            id = id.replace("{", "").replace("}", "");
            Xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=documentbody,filename&$filter=_objectid_value eq " + id).then(
                function success(results) {
                    // todo: multiple attachements?
                    for (var i = 0; i < results.entities.length; i++) {
                        var documentbody = results.entities[i]["documentbody"];
                        var filename = results.entities[i]["filename"];
                        $("#img-preview").attr("src", "data:image/png;base64, " + documentbody);
                        $("#loading").hide();
                        $("#main").show();
                    }
                },
                function(error) {
                    showError(error.message);
                }
            );    
        }

        window.addEventListener("message", imageSelected, false);     
    
    };

    var openMediaManager = () => {
        window.open("MediaManager.html", "PerplexMediaManager", 
            "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no");
    };

    function imageSelected(e) {
        alert("Image selected");
    }

    function showError(message) {
        $("#error").text(message);
        $("body").children().hide();
        $("#error").show();
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    return {
        setup: setup,
        openMediaManager: openMediaManager
    };
}();


