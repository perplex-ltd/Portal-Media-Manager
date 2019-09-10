var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.CRM = class CRM {

    // this really shouldn't be hardcoded...
    websiteid = "2AB10DAB-D681-4911-B881-CC99413F07B6";
    publishedStateId = "ecde1bbf-e1f2-48b5-a7bf-6dd2524a1023";
    portalUrl = "https://digitalculturenetwork.microsoftcrmportals.com";

    xrm;
    constructor(xrm) {
        this.xrm = xrm;
    }

    async init() {
        // website info
        let results = await this.xrm.WebApi.online.retrieveMultipleRecords("adx_website",
            "?$select=adx_websiteid,adx_partialurl,adx_primarydomainname&$top=1");
        if (results.entities.length == 0) throw "No website defined."
        this.websiteid = results.entities[0]["adx_websiteid"];
        var adx_primarydomainname = results.entities[0]["adx_primarydomainname"];
        var adx_partialurl = results.entities[0]["adx_partialurl"];
        this.portalUrl = "https://" + adx_primarydomainname + ((adx_partialurl) ? adx_partialurl : "");
        // publishing state
        results = await this.xrm.WebApi.online.retrieveMultipleRecords("adx_publishingstate",
            "?$select=adx_publishingstateid&$filter=adx_name eq 'Published' and  _adx_websiteid_value eq " + this.websiteid + "&$top=1");
        if (results.entities.length == 0) throw "No publishing state found."
        this.publishedStateId = results.entities[0]["adx_publishingstateid"];
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
                function (error) {
                    reject("Couldn't list folders. " + error.message);
                }
            );
        });
    }

    getFiles(pageId) {
        return new Promise((resolve, reject) => {
            this.xrm.WebApi.online.retrieveMultipleRecords("adx_webfile",
                "?$select=adx_name,adx_webfileid,adx_partialurl,adx_title" +
                "&$filter=_adx_parentpageid_value eq " + pageId + " and (" +
                " endswith(adx_name,'.jpg') or " +
                " endswith(adx_name,'.jpeg') or " +
                " endswith(adx_name,'.png') or " +
                " endswith(adx_name,'.tif') or " +
                " endswith(adx_name,'.tiff') or " +
                " endswith(adx_name,'.gif') or " +
                " endswith(adx_name,'.svg')" +
                ")")
                .then(
                    function success(results) {
                        let files = [];
                        for (var i = 0; i < results.entities.length; i++) {
                            var adx_name = results.entities[i]["adx_name"];
                            var adx_webfileid = results.entities[i]["adx_webfileid"];
                            let file = {
                                id: adx_webfileid,
                                name: adx_name,
                                title: results.entities[i]["adx_title"],
                                partialUrl: results.entities[i]["adx_partialurl"],
                                type: PLX.MediaManager.CRM.getTypeFromFileName(adx_name)
                            };
                            files.push(file);
                        }
                        resolve(files);
                    },
                    function (error) {
                        reject("Couldn't list files. " + error.message);
                    }
                );
        });
    }

    getWebFile(id) {
        return new Promise((resolve, reject) => {
            this.xrm.WebApi.online.retrieveRecord("adx_webfile", id, "?$select=adx_name,adx_partialurl,adx_title").then(
                function success(result) {
                    var adx_name = result["adx_name"];
                    var adx_partialurl = result["adx_partialurl"];
                    var adx_title = result["adx_title"];
                    resolve({
                        id: id,
                        name: adx_name,
                        title: adx_title,
                        partialUrl: adx_partialurl,
                        type: PLX.MediaManager.CRM.getTypeFromFileName(adx_name)
                    });
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        });
    }


    static getTypeFromFileName(name) {
        let arrEndings = name.toLowerCase().match(/\.([a-z]+)$/);
        if (arrEndings && arrEndings.length == 2) {
            var ending = arrEndings[1];
            switch (ending) {
                case "jpeg":
                case "jpg":
                case "jfif":
                case "jpe":
                case "jpg": return "image/jpeg";
                case "png":
                case "x-png": return "image/png";
                case "tif":
                case "tiff": return "image/tiff";
                case "gif": return "image/gif";
                case "svg": return "image/svg+xml";
            }
        }
        return "application/octet-stream";
    }

    getImageSrc(file) {
        return new Promise((resolve, reject) => {
            let id = file.id.replace("{", "").replace("}", "");
            let portalUrl = this.portalUrl;
            //this.xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=documentbody&$filter=_objectid_value eq " + id).then(
            this.xrm.WebApi.online.retrieveMultipleRecords("annotation", "?$select=annotationid&$filter=_objectid_value eq " + id + "&$orderby=createdon desc&$top=1").then(
                function success(results) {
                    if (results.entities.length > 0) {
                        var annotationid = results.entities[0]["annotationid"];
                        if (annotationid) {
                            resolve(portalUrl + "/_entity/annotation/" + annotationid);
                        } else {
                            reject("No Image found.");
                        }
                    } else {
                        reject("No image found.")
                    }
                },
                function (error) {
                    reject("Couldn't get image source. " + error.message);
                }
            );
        });
    }

    async uploadFile(file, folderId, data) {
        let webFileId = await this.createWebFile(data.fileName, data.title, data.partialUrl, folderId);
        let documentBody = await this.getFileAsBase64(file);
        await this.createNote(webFileId, documentBody, file.name, file.type);
    }

    createWebFile(fileName, title, partialUrl, parentId) {
        return new Promise((resolve, reject) => {
            var entity = {};
            entity.adx_name = fileName;
            entity.adx_title = title;
            entity.adx_partialurl = partialUrl;
            entity["adx_parentpageid@odata.bind"] = "/adx_webpages(" + parentId + ")";
            entity["adx_websiteid@odata.bind"] = "/adx_websites(" + this.websiteid + ")";
            entity["adx_publishingstateid@odata.bind"] = "/adx_publishingstates(" + this.publishedStateId + ")";

            this.xrm.WebApi.online.createRecord("adx_webfile", entity).then(
                function success(result) {
                    resolve(result.id);
                },
                function (error) {
                    reject("Couldn't create web file. " + error.message);
                }
            );
        });
    }

    createNote(objectId, documentBody, fileName, filetype) {
        return new Promise((resolve, reject) => {
            var entity = {};
            entity.filename = fileName;
            entity.subject = fileName;
            entity.documentbody = documentBody;
            if (filetype) {
                entity.mimetype = filetype;
            }
            entity["objectid_adx_webfile@odata.bind"] = "/adx_webfiles(" + objectId + ")";

            this.xrm.WebApi.online.createRecord("annotation", entity).then(
                function success(result) {
                    resolve(result.id);
                },
                function (error) {
                    reject("Couldn't create note. " + error.message);
                }
            );
        });
    }

    getFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            var fileReader = new FileReader();
            fileReader.onload = (e) => {
                if (e.target.readyState == 2 /*DONE*/) {
                    let buffer = e.target.result;
                    let binary = '';
                    let bytes = new Uint8Array(buffer);
                    let len = bytes.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    let base64 = window.btoa(binary);
                    resolve(base64);
                }
            };
            fileReader.onabort = (e) => {
                reject(e.error);
            };
            fileReader.readAsArrayBuffer(file);
        });
    }

};
