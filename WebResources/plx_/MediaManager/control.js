var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.Control = function () {
    
    var Xrm = null;
    var formContext = null;
    var lookupAttribute = null;
    var crmIntf;

    var setup = function(intf) {
        crmIntf = intf;
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
            crmIntf.getImageSrc(id).then((src) => {
                $("#img-preview").attr("src", src);
                        $("#loading").hide();
                        $("#main").show();
            }).catch((error) => {
                showError(error);
            });
        }

        window.addEventListener("message", imageSelected, false);     
    
    };

    var openMediaManager = () => {
        window.open("MediaManager.html", "PerplexMediaManager", 
            "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no");
    };

    function imageSelected(e) {
        if (e.origin == window.localation.origin) {
            if (e.data && e.data.message == "imageSelected") {
                let id = e.data.id;
                debugger;
            }
        }
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


