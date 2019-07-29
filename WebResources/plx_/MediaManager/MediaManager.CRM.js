var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.CRM = class CRM {    

    Xrm;
    constructor() {
        this.xrm = parent.Xrm;
    }

    getFolders = () => {
        url = this.xrm.getClientUrl() + "/api/data/v9.1/adx_webpages?$select=adx_name,_adx_parentpageid_value,adx_partialurl,adx_webpageid&$expand=adx_parentpageid($select=adx_partialurl)&$filter=adx_isroot eq true and  statecode eq 1";
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: url,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
                XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
                XMLHttpRequest.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            },
            async: true,
            success: function(data, textStatus, xhr) {
                var results = data;
                debugger;
                for (var i = 0; i < results.value.length; i++) {
                    var adx_name = results.value[i]["adx_name"];
                    var _adx_parentpageid_value = results.value[i]["_adx_parentpageid_value"];
                    var _adx_parentpageid_value_formatted = results.value[i]["_adx_parentpageid_value@OData.Community.Display.V1.FormattedValue"];
                    var _adx_parentpageid_value_lookuplogicalname = results.value[i]["_adx_parentpageid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    var adx_partialurl = results.value[i]["adx_partialurl"];
                    var adx_webpageid = results.value[i]["adx_webpageid"];
                    //Use @odata.nextLink to query resulting related records
                    var adx_parentpageid_NextLink = results.value[i]["adx_parentpageid@odata.nextLink"];
                    var page = {
                        id: adx_webpageid,
                        name: adx_name,
                        partialUrl: adx_partialurl
                    };
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $("#loading").hide();
                showError(textStatus + " " + errorThrown +
                    "<br>(" + url + ")");
            }
        });
    };

    function arrayBufferToBase64(buffer) { // Convert Array Buffer to Base 64 string
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

};
