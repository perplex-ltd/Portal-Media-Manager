var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.Control = function () {

    var Xrm = null;
    var formContext = null;
    var lookupAttribute = null;
    var crmIntf;

    var setup = async function (intf) {
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
        reloadImage();
        window.addEventListener("message", imageSelected, false);

    };

    var reloadImage = async function (id) {
        var lookupValue = lookupAttribute.getValue();
        if (!lookupValue) {
            $("#loading").hide();
            $("#main").show();
        } else {
            var id = lookupAttribute.getValue()[0].id;
            let file = await crmIntf.getWebFile(id);
            crmIntf.getImageSrc(file).then((src) => {
                $("#img-preview").attr("src", src);
                $("#loading").hide();
                $("#main").show();
            }).catch((error) => {
                showError(error);
            });
        }
    }

    var openMediaManager = () => {
        window.open("MediaManager.html", "PerplexMediaManager",
            "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no");
    };

    function imageSelected(e) {
        if (e.origin == window.location.origin) {
            if (e.data && e.data.message == "imageSelected") {
                $("#loading").show();
                let file = e.data.file;
                lookupAttribute.setValue([
                    {
                        id: file.id,
                        name: file.name,
                        entityType: "adx_webfile"
                    }
                ]);
                reloadImage();
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


