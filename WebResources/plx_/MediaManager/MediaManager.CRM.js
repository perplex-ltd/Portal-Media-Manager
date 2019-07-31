var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.CRM = class CRM {    

    xrm;
    constructor(xrm) {
        this.xrm = xrm;
    }

    getFolders() {
        return new Promise((resolve, reject) => {
            this.xrm.WebApi.online.retrieveMultipleRecords("adx_webpage", "?$select=adx_name,_adx_parentpageid_value,adx_webpageid&$filter=statecode eq 0 and  adx_isroot eq true").then(
                function success(results) {
                    let pages = [];
                    for (var i = 0; i < results.entities.length; i++) {
                        var adx_name = results.entities[i]["adx_name"];
                        var _adx_parentpageid_value = results.entities[i]["_adx_parentpageid_value"];
                        var _adx_parentpageid_value_formatted = results.entities[i]["_adx_parentpageid_value@OData.Community.Display.V1.FormattedValue"];
                        var _adx_parentpageid_value_lookuplogicalname = results.entities[i]["_adx_parentpageid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var adx_webpageid = results.entities[i]["adx_webpageid"];
                        var page = {
                            id: adx_webpageid,
                            text: adx_name,
                            parent: _adx_parentpageid_value
                        };
                        if (page.parent == null) page.parent = "#";
                        pages.push(page);
                    }
                    resolve(pages);
                },
                function(error) {
                    reject("Couldn't list folders. " + error.message);
                }
            );
        });
    }

    getFiles(pageId) {
        return new Promise((resolve, reject) => {
                this.xrm.WebApi.online.retrieveMultipleRecords("adx_webfile", "?$select=adx_name,adx_webfileid&$filter=_adx_parentpageid_value eq " + pageId).then(
                function success(results) {
                    let files = [];
                    for (var i = 0; i < results.entities.length; i++) {
                        var adx_name = results.entities[i]["adx_name"];
                        var adx_webfileid = results.entities[i]["adx_webfileid"];
                        let file = {
                            id: adx_webfileid,
                            name: adx_name
                        };
                        files.push(file);
                    }
                    resolve(files);
                },
                function(error) {
                    reject("Couldn't list files. " + error.message);
                }
            );
        });
    }

    getImageSrc(webFileId) {
        return new Promise((resolve, reject) => {
            let id = webFileId.replace("{", "").replace("}", "");
            this.xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=documentbody&$filter=_objectid_value eq " + id).then(
                function success(results) {
                    // todo: multiple attachements?
                    for (var i = 0; i < results.entities.length; i++) {
                        var documentbody = results.entities[i]["documentbody"];
                        resolve("data:image/png;base64, " + documentbody);
                    }
                },
                function(error) {
                    reject("Couldn't get image source. " + error.message);
                }
            );
        });
    }

    async uploadFile(file, folderId) {

    }
    
    arrayBufferToBase64(buffer) { // Convert Array Buffer to Base 64 string
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

};
