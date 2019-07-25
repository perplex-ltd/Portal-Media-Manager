var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.Browser = function () {
    
    var xrmClientUrl = null;

    var setup = function() {
        //xrmClientUrl = parent.Xrm.Page.getClientUrl();
        clearGrid();
        loadTreeview();
    };

    async function loadTreeview() {
        $("#loading").show();
        clearGrid();
        var items = await loadFolderStructure();
        await setupTree(items);
        $('#treeview-container').jstree(true).select_node('ajson3');
        $("#loading").hide();
    }

    function clearGrid() {
        clearDetailsPane();
        //$("#grid-container").empty();
    }

    function clearDetailsPane() {
        // TODO
    }

    async function loadFolder(pageId) {
        // TODO get 
        var webFiles = await loadWebFiles(pageId);
        webFiles.each((file) => {
            createFileCard(file);
        });
    }

    async function createFileCard(file) {

    }

    async function setupTree(items) {
        return new Promise((resolve) => {
            $('#treeview-container').jstree({
                'core' : {
                    'data' : items
                }
            })
            .on('ready.jstree', function (e, data) {
                resolve({e: e, data: data});
            })
            .on('changed.jstree', function (e, data) {
                console.log("changed.jstree: " + data.selected);
                if(data && data.selected && data.selected.length) {
                    loadFolder(data.node.id);
                }
                else {
                    clearGrid();
                }
            });
        });
    }

    async function loadFolderStructure() {
        return new Promise((resolve) => {
            // TODO: Load from D365
        /*
        url = xrmClientUrl + "/api/data/v9.1/adx_webpages?$select=adx_name,_adx_parentpageid_value,adx_partialurl,adx_webpageid&$expand=adx_parentpageid($select=adx_partialurl)&$filter=adx_isroot eq true and  statecode eq 1";
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
        */

            setTimeout(() => { resolve(
                [
                    { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
                    { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
                    { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
                    { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" }
                ]
            )}, 345);
        });
    }


    var showCopyright = function() {
        $("#modal").show();
        $("#copyright").show();
    };

    var hideCopyright = function() {
        $("#modal").hide();
        $("#copyright").hide();
    };

    var hideError = function() {
        $("#error").hide();
    }

    function showError(message) {
        $("#error").text(message);
        $("#modal").show();
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
        showCopyright: showCopyright,
        hideCopyright: hideCopyright,
        hideError: hideError
    };
}();


