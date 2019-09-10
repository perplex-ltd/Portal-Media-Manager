var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.initBrowser = async function (intf) {
    PLX.MediaManager.Browser = new Browser(intf);
    await PLX.MediaManager.Browser.init();
};

class Browser {

    intf;
    currentFolderId;
    currentImage;

    constructor(intf) {
        this.intf = intf;
    }
    async init() {
        try {
            this.showLoading();
            await this.intf.init();
            let param = {};
            try {
                var p = this.getParameterByName("data");
                if (p) {
                    param = JSON.parse(decodeURIComponent(p));
                }
            } catch (error) {
                //ignore...
            }
            if (param.mode == "copyUrl") {
                $("#select").hide();
                $("#copy").show();
            } else {
                $("#select").show();
                $("#copy").hide();
            }
            this.clearGrid();
            this.setupUploader();
            $("#select").on("click", this.selectPicture);
            $("#copy").on("click", this.copyPictureAddress);
            await this.loadTreeview();
            $('#treeview-container').jstree(true).select_node(this.currentFolderId);
        } catch (error) {
            this.hideLoading();
            this.showError(error);
        }
    };

    setupUploader() {
        console.log("setup uploader...");
        let dropArea = document.getElementById('middle');
        // prevent default event
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                $('#uploadNewImage').addClass('activeDropTarget');
            }, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => { $('#uploadNewImage').removeClass('activeDropTarget') }, false)
        });

        dropArea.addEventListener('drop', (e) => {
            let dt = e.dataTransfer;
            let files = dt.files;
            if (files.length == 1) {
                let file = dt.files[0];
                this.showUploader(file);
            }
        }, false);
    }

    imageToUpload = null;

    async uploadImage() {
        if (this.imageToUpload) {
            this.showLoading();
            try {
                await this.intf.uploadFile(this.imageToUpload, this.currentFolderId, {
                    fileName: $("#upFileName").val(),
                    title: $("#upTitle").val(),
                    partialUrl: $("#upPartialUrl").val()
                });
                await this.loadFolder(this.currentFolderId);
                this.closeUploader();
                this.hideLoading();
            } catch (error) {
                this.closeUploader(true);
                this.hideLoading();
                this.showError(error);
            }
        }
    }

    async fileInputChanged(input) {
        if (input.files.length == 1) {
            this.showUploader(input.files[0])
        }
    }

    showUploader(file) {
        this.imageToUpload = file;
        $("#upFileName").val(file.name);
        $("#upPartialUrl").val(this.convertToUrl(file.name));
        $("#upTitle").val(this.convertToTitle(file.name));
        $("#upSize").val(this.sizeToString(file.size));
        $("#upType").val(file.type);
        $("#modal").show();
        $("#uploadContainer").show();
        $("#uploadContainer").animate({
            opacity: 1,
            width: 400,
            height: 250
        }, 200);
        setTimeout(() => {
            $("#uploader").fadeIn(200);
        }, 100);
    };

    convertToUrl(fileName) {
        return fileName.replace(" ", "-").toLowerCase();
    }
    convertToTitle(fileName) {
        var title = fileName.replace(/\.[^.]+$/, ""); // remove file ending
        title = title.replace(/([a-z])([A-Z])/g, "$1 $2"); // camelCase => camel Case
        title = title.replace(/\W/g, " "); // replace any special characters with space
        title = title.replace(/(\b[a-z])/g, (m) => { return m.toUpperCase() }); // capitalise each word
        return title;
    }
    // Thanks https://www.codexworld.com/how-to/convert-file-size-bytes-kb-mb-gb-javascript/
    sizeToString(bytes, decimalPoint) {
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    closeUploader(noAnimate) {
        this.imageToUpload = null;
        document.getElementById("uploadForm").reset();
        if (noAnimate) {
            $("#uploader").hide();
            $("#uploadContainer")
                .css("opacity", 0)
                .css("width", 0)
                .css("height", 0);
            $("#modal").hide();
            $("#uploadContainer").hide();
        } else {
            $("#uploader").fadeOut(200);
            $("#uploadContainer").animate({
                opacity: 0,
                width: 0,
                height: 0
            }, 400, () => {
                $("#modal").hide();
                $("#uploadContainer").hide();
            });
        }
    };

    async loadTreeview() {
        this.clearGrid();
        var items = await this.intf.getFolders();
        await this.setupTree(items);
    }

    clearGrid() {
        console.log("clearing grid");
        this.clearDetailsPane();
        this.currentFolderId = null;
        $("#grid-container .selectable").remove();
    }

    clearDetailsPane() {
        $(".picInfo").val("");
        $("#previewImage").attr("src", "details.png");
        $(".actionButton").attr("disabled", true);
        this.currentImage = null;

    }

    async loadFolder(pageId) {
        this.showLoading();
        var webFiles = await this.intf.getFiles(pageId);
        this.clearGrid();
        this.currentFolderId = pageId;
        webFiles.forEach((f) => {
            PLX.MediaManager.Browser.createFileCard(f);
        });
        this.hideLoading();
    }

    async createFileCard(file) {
        console.log("addding file " + file.id);
        let card = $.parseHTML('<div class="tile selectable" onclick="PLX.MediaManager.Browser.select(this)" ' +
            'data-fileId="' + file.id + '" data-filename="' + file.name + '" data-file=\'' + JSON.stringify(file) + '\'>' +
            '<div class="content" >' +
            '  <label class="thumbnail">' + file.name + '</label>' +
            '</div>');
        $("#grid-container").append(card);
        let imgSrc = await this.intf.getImageSrc(file);
        $(card).attr("data-url", imgSrc);
        $(card).children(".content")
            .css("background", "url('" + imgSrc + "')")
            .css("background-size", "cover");
    }

    select(tile) {
        $("div.selected").removeClass("selected");
        $(tile).addClass("selected");
        let bg = $(tile).children(".content").css("background");
        //rgba(0, 0, 0, 0) url("https://digitalculturenetwork.microsoftcrmportals.com/knowledge/test.jpg") repeat scroll 0% 0% / cover padding-box border-box
        let src = $(tile).data("url");
        if (src) {
            $("#previewImage").attr("src", src);
            let img = document.createElement("img");
            img.src = src;
            img.onload = (e) => {
                $("#picWidth").val(e.currentTarget.width);
                $("#picHeight").val(e.currentTarget.height);
            };
        }
        $("#picName").val($(tile).data("filename"));
        let file = $(tile).data("file");
        $("#picTitle").val(file.title);
        $("#picType").val(file.title);
        $("#picPartialUrl").val(file.partialUrl);
        $("#picSrc").val(src);
        this.currentImage = file;
        $(".actionButton").removeAttr("disabled");
    }

    selectPicture(e) {
        window.opener.postMessage({
            message: "imageSelected",
            file: PLX.MediaManager.Browser.currentImage
        }, window.location.origin);
        window.close();
    }

    copyPictureAddress(e) {
        $("#picSrc").select();
        document.execCommand("copy");
    }

    setupTree(items) {
        return new Promise((resolve) => {

            this.currentFolderId = this.getParameterByName("folder");
            if (!this.currentFolderId) {
                this.currentFolderId = items.find((value) => { return value.parent == "#"; }).id;
            }
            $('#treeview-container').jstree({
                'core': {
                    'data': items
                }
            })
                .on('ready.jstree', function (e, data) {
                    resolve({ e: e, data: data });
                })
                .on('changed.jstree', function (e, data) {
                    console.log("changed.jstree: " + data.selected);
                    if (data && data.selected && data.selected.length) {
                        PLX.MediaManager.Browser.loadFolder(data.node.id);
                    }
                    else {
                        PLX.MediaManager.Browser.clearGrid();
                    }
                });
        });
    }

    showCopyright() {
        $("#modal").show();
        $("#copyright").show();
    };

    hideCopyright() {
        $("#modal").hide();
        $("#copyright").hide();
    };

    hideError() {
        $("#modal").hide();
        $("#error").hide();
    }

    showError(message) {
        $("#error-message").text(message);
        $("#modal").show();
        $("#error").show();
    }

    showLoading() {
        $("#loading").show();
    }
    hideLoading() {
        $("#loading").hide();
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

};

