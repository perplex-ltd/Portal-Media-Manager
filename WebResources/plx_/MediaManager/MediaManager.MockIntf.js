var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.MockIntf = class MockIntf {

    getFolders = function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    [
                        { "id" : "1234", "parent" : "#", "text" : "Home" },
                        { "id" : "2345", "parent" : "1234", "text" : "Knowledge" },
                        { "id" : "3456", "parent" : "2345", "text" : "Category" },
                        { "id" : "4567", "parent" : "1234", "text" : "Events" }
                    ]
                );
            }, 2000);
        });
    };

    getFiles = function(folderId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (folderId == "1234") {
                    resolve([
                        { id: "1", name: "test image.png"},
                        { id: "2", name: "flowers image.png"},
                        { id: "3", name: "birds.png"},
                        { id: "4", name: "All we ever wanted.png"},
                        { id: "5", name: "nblah.png"}
                    ]);
                } else if (folderId == "2345") {
                    resolve([
                        { id: "6", name: "test image.png"},
                        { id: "7", name: "All we ever wanted.png"},
                        { id: "8", name: "nblah.png"},
                        { id: "9", name: "Serious stugg.jpg"},
                        { id: "10", name: "Bah.png"}
                    ]);
                } else if (folderId == "3456") {
                    resolve([
                        { id: "11", name: "Serious stugg.jpg"},
                        { id: "12", name: "Bah.png"},
                        { id: "13", name: "All we ever wanted.png"},
                        { id: "14", name: "nblah.png"},
                        { id: "15", name: "birds.png"},
                    ]);
                } else if (folderId == "4567") {
                    resolve([
                        { id: "16", name: "nblah.png"},
                        { id: "17", name: "Fish.png"},
                        { id: "18", name: "Serious stugg.jpg"},
                        { id: "19", name: "Bah.png"}
                    ]);
                } else {
                    resolve([
                    ]);
                }

            }, 1000);
        });
    };

    async getImageSrc(fileId) {
        if (fileId % 2 == 0) {
            return "https://digitalculturenetwork.microsoftcrmportals.com/knowledge/test.jpg";
        } else {
            return "data:image/png;base64, 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";
        }

    }
    

    uploadFile = function(file, folderId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    };

};
