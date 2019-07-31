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
            this.clearGrid();
            this.setupUploader();
            $("#select").on("click", this.selectPicture);
            await this.loadTreeview();
            this.currentFolderId = this.getParameterByName("folder");
            if (this.currentFolderId) {
                $('#treeview-container').jstree(true).select_node('2345');
            } else {
                this.hideLoading();
            }
        } catch (error) {
            this.hideLoading();
            this.showError(error);
        }
    };


    setupUploader() {
        console.log("setup uploader...");
        let dropArea = document.getElementById('uploadNewImage');
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
                this.uploadImage(file);
            }
        }, false);
    }

    async uploadImage(file) {
        this.showLoading();
        await this.intf.uploadFile(file, this.currentFolderId);
        await this.loadFolder(this.currentFolderId);
        this.hideLoading();
    }

    async fileInputChanged(input) {
        if (input.files.length == 1) {
            this.uploadImage(input.files[0]);
        }
    }

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
        $("#previewImage").attr("src", "no_picture.png");
        $("#select").attr("disabled", true);
        this.currentImage = null;

    }

    async loadFolder(pageId) {
        this.showLoading();
        var webFiles = await this.intf.getFiles(pageId);
        this.currentFolderId = pageId;
        this.clearGrid();
        webFiles.forEach((f) => {
            PLX.MediaManager.Browser.createFileCard(f);
        });
        this.hideLoading();
    }

    async createFileCard(file) {
        console.log("addding file " + file.id);
        let card = $.parseHTML('<div class="tile selectable" onclick="PLX.MediaManager.Browser.select(this)" ' +
            'data-fileId="' + file.id + '" data-filename="' + file.name + '">' +
            '<div class="content" >' +
            '  <label class="thumbnail">' + file.name + '</label>' +
            '</div>');
        $("#grid-container").append(card);
        let imgSrc = await this.intf.getImageSrc(file.id);
        console.log("url('" + imgSrc + "')");
        $(card).children(".content")
            .css("background", "url('" + imgSrc + "')")
            .css("background-size", "cover");
    }

    select(tile) {
        $("div.selected").removeClass("selected");
        $(tile).addClass("selected");
        let bg = $(tile).children(".content").css("background");
        //rgba(0, 0, 0, 0) url("https://digitalculturenetwork.microsoftcrmportals.com/knowledge/test.jpg") repeat scroll 0% 0% / cover padding-box border-box
        let matches = bg.match(/url\("(.*)"\)/)
        if (matches.length == 2) {
            let src = matches[1];
            $("#previewImage").attr("src", src);
            let img = document.createElement("img");
            img.src = src;
            img.onload = (e) => {
                $("#picWidth").val(e.currentTarget.width);
                $("#picHeight").val(e.currentTarget.height);
            };
        }
        $("#picName").val($(tile).data("filename"));
        this.currentImage = $(tile).data("fileid");
        $("#select").removeAttr("disabled");
    }

    selectPicture(e) {
        window.opener.postMessage({
            message: "imageSelected",
            id: this.currentImage
        }, window.location.origin);
        window.close();
    }

    async setupTree(items) {
        return new Promise((resolve) => {
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

    showUploader() {
        $("#modal").show();
        $("#uploadContainer").show();
        $("#uploadContainer").animate({
            opacity: 1,
            width: 280,
            height: 150
        }, 200);
        setTimeout(() => {
            $("#uploader").fadeIn(200);
        }, 100)
    };

    hideUploader() {
        $("#uploader").fadeOut(200);
        $("#uploadContainer").animate({
            opacity: 0,
            width: 0,
            height: 0
        }, 400, () => {
            $("#modal").hide();
            $("#uploadContainer").hide();
        });
    };

    showCopyright() {
        $("#modal").show();
        $("#copyright").show();
    };

    hideCopyright() {
        $("#modal").hide();
        $("#copyright").hide();
    };

    hideError() {
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

