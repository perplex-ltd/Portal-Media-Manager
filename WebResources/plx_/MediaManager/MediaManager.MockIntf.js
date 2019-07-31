var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};

PLX.MediaManager.MockIntf = class MockIntf {

    getFolders = function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    [  
                        {  
                           "id":"5cc7a353-f476-e211-b793-00155d036906",
                           "text":"Poll Archives",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"1f4e8a00-b0bf-e511-9435-00155d038104",
                           "text":"Knowledge Hub",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"214e8a00-b0bf-e511-9435-00155d038104",
                           "text":"Knowledge Base - Article Details",
                           "parent":"1f4e8a00-b0bf-e511-9435-00155d038104"
                        },
                        {  
                           "id":"a49e611c-8ac8-e511-9439-00155d038104",
                           "text":"Customer Service - My Portal",
                           "parent":"4ccccdc1-39e6-49a3-8ce8-45526c47bb35"
                        },
                        {  
                           "id":"0c92fe1a-f00e-e511-9461-00155d038c01",
                           "text":"Customer Service - Home",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"23bfeab3-f60e-e511-9461-00155d038c01",
                           "text":"Customer Service - Edit Case",
                           "parent":"0c92fe1a-f00e-e511-9461-00155d038c01"
                        },
                        {  
                           "id":"0e0b671f-5882-e511-94ac-00155d038c01",
                           "text":"Customer Service - Create Case",
                           "parent":"0c92fe1a-f00e-e511-9461-00155d038c01"
                        },
                        {  
                           "id":"02678a89-5882-e511-94ac-00155d038c01",
                           "text":"Customer Service - Case",
                           "parent":"0c92fe1a-f00e-e511-9461-00155d038c01"
                        },
                        {  
                           "id":"03b51daf-f46a-e611-80da-00155d09e801",
                           "text":"Poll Archives",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"09b51daf-f46a-e611-80da-00155d09e801",
                           "text":"Knowledge Base Home",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"729e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Knowledge Base - Article Details",
                           "parent":"1f4e8a00-b0bf-e511-9435-00155d038104"
                        },
                        {  
                           "id":"759e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Customer Service - My Portal",
                           "parent":"4ccccdc1-39e6-49a3-8ce8-45526c47bb35"
                        },
                        {  
                           "id":"789e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Customer Service - Home",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"7b9e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Customer Service - Edit Case",
                           "parent":"0c92fe1a-f00e-e511-9461-00155d038c01"
                        },
                        {  
                           "id":"7e9e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Customer Service - Create Case",
                           "parent":"0c92fe1a-f00e-e511-9461-00155d038c01"
                        },
                        {  
                           "id":"819e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Customer Service - Case",
                           "parent":"0c92fe1a-f00e-e511-9461-00155d038c01"
                        },
                        {  
                           "id":"849e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Contact Us",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"8a9e59b5-f46a-e611-80da-00155d09e801",
                           "text":"Forums",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"fc9b92bb-f46a-e611-80da-00155d09e801",
                           "text":"Page Not Found",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"ff9b92bb-f46a-e611-80da-00155d09e801",
                           "text":"Profile",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"059c92bb-f46a-e611-80da-00155d09e801",
                           "text":"Archive",
                           "parent":"162ebe46-7423-41e8-863d-700f877828a8"
                        },
                        {  
                           "id":"089c92bb-f46a-e611-80da-00155d09e801",
                           "text":"Blogs",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"0b9c92bb-f46a-e611-80da-00155d09e801",
                           "text":"Search",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"0e9c92bb-f46a-e611-80da-00155d09e801",
                           "text":"Category Details",
                           "parent":"1f4e8a00-b0bf-e511-9435-00155d038104"
                        },
                        {  
                           "id":"119c92bb-f46a-e611-80da-00155d09e801",
                           "text":"Home",
                           "parent":"#"
                        },
                        {  
                           "id":"149c92bb-f46a-e611-80da-00155d09e801",
                           "text":"Error",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"6fbdaec1-f46a-e611-80da-00155d09e801",
                           "text":"Public Profile",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"72bdaec1-f46a-e611-80da-00155d09e801",
                           "text":"Access Denied",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"7bbdaec1-f46a-e611-80da-00155d09e801",
                           "text":"Ideas",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"7ebdaec1-f46a-e611-80da-00155d09e801",
                           "text":"Sitemap",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"e34c2b9f-c700-e611-80d3-00155d8903d5",
                           "text":"Contact Us",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"4dd9cebc-e88d-e911-a98c-00224800c5df",
                           "text":"About",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"08e037b2-e390-e911-a98c-00224800c5df",
                           "text":"Test Page",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"123b5627-3c9e-e911-a98d-00224800c5df",
                           "text":"Test",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"213b5627-3c9e-e911-a98d-00224800c5df",
                           "text":"Test Details",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"53268af6-ec8d-e911-a98a-00224800c719",
                           "text":"Tech Champions",
                           "parent":"0ee0fdbe-e88d-e911-80e7-281878c74000"
                        },
                        {  
                           "id":"40b48bde-f590-e911-a98c-00224800c940",
                           "text":"Blah",
                           "parent":"162ebe46-7423-41e8-863d-700f877828a8"
                        },
                        {  
                           "id":"55d6ac3e-90a8-e911-a97d-002248014773",
                           "text":"Services",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"72d6ac3e-90a8-e911-a97d-002248014773",
                           "text":"Services",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"b1d39962-90a8-e911-a97d-002248014773",
                           "text":"Manage Bookmarks",
                           "parent":"55d6ac3e-90a8-e911-a97d-002248014773"
                        },
                        {  
                           "id":"ded39962-90a8-e911-a97d-002248014773",
                           "text":"Manage Bookmarks",
                           "parent":"55d6ac3e-90a8-e911-a97d-002248014773"
                        },
                        {  
                           "id":"2dff6173-b1a8-e911-a97d-002248014773",
                           "text":"Test 2",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"91c15879-b1a8-e911-a97d-002248014773",
                           "text":"Test 2",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"5d3b2ebf-2eaa-e911-a97d-002248014773",
                           "text":"Article",
                           "parent":"1f4e8a00-b0bf-e511-9435-00155d038104"
                        },
                        {  
                           "id":"753b2ebf-2eaa-e911-a97d-002248014773",
                           "text":"Article",
                           "parent":"1f4e8a00-b0bf-e511-9435-00155d038104"
                        },
                        {  
                           "id":"8057ee39-b952-41bf-8033-08b0221fd07f",
                           "text":"Forums",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"034e6c68-5ae8-4b33-8bfd-268ad71c868d",
                           "text":"Page Not Found",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"0ee0fdbe-e88d-e911-80e7-281878c74000",
                           "text":"About",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"5a2a88f6-ec8d-e911-80e7-281878c74000",
                           "text":"Tech Champions",
                           "parent":"0ee0fdbe-e88d-e911-80e7-281878c74000"
                        },
                        {  
                           "id":"92f6aaaf-e390-e911-80e7-281878c74000",
                           "text":"News",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"d1fd45de-f590-e911-80e7-281878c74000",
                           "text":"Blah",
                           "parent":"162ebe46-7423-41e8-863d-700f877828a8"
                        },
                        {  
                           "id":"4ccccdc1-39e6-49a3-8ce8-45526c47bb35",
                           "text":"Profile",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"bf2a4264-56bf-4ad9-a480-60f6cc487432",
                           "text":"Archive",
                           "parent":"162ebe46-7423-41e8-863d-700f877828a8"
                        },
                        {  
                           "id":"162ebe46-7423-41e8-863d-700f877828a8",
                           "text":"Blogs",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"cc054fda-46df-4012-a967-8a0210bd063d",
                           "text":"Search",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"76cfc828-2069-4ad7-8ec2-90391a7c5f7d",
                           "text":"Category Details",
                           "parent":"1f4e8a00-b0bf-e511-9435-00155d038104"
                        },
                        {  
                           "id":"70145b16-f5f8-4686-93b8-9a7eebe81438",
                           "text":"Home",
                           "parent":"#"
                        },
                        {  
                           "id":"653859a4-aa78-4807-b123-b50c688945c9",
                           "text":"Error",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"3e9a9e04-fb07-4bee-8081-b7c61ca91273",
                           "text":"Public Profile",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"3f46cceb-c0a4-47ec-afe3-b937fe88b927",
                           "text":"Access Denied",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"7ae8c28e-1994-4df4-a3ca-dc9438c33fc8",
                           "text":"Ideas",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        },
                        {  
                           "id":"46dce9c4-8c8c-44b1-90db-f5c708079be5",
                           "text":"Sitemap",
                           "parent":"70145b16-f5f8-4686-93b8-9a7eebe81438"
                        }
                     ]                    /*
                    [
                        { "id" : "1234", "parent" : "#", "text" : "Home" },
                        { "id" : "2345", "parent" : "1234", "text" : "Knowledge" },
                        { "id" : "3456", "parent" : "2345", "text" : "Category" },
                        { "id" : "4567", "parent" : "1234", "text" : "Events" }
                    ]
                    */
                );
            }, 2000);
        });
    };

    getFiles(folderId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (folderId == "1234") {
                    resolve([
                        { id: "1", name: "test image.png" },
                        { id: "2", name: "flowers image.png" },
                        { id: "3", name: "birds.png" },
                        { id: "4", name: "All we ever wanted.png" },
                        { id: "5", name: "nblah.png" }
                    ]);
                } else if (folderId == "2345") {
                    resolve([
                        { id: "6", name: "test image.png" },
                        { id: "7", name: "All we ever wanted.png" },
                        { id: "8", name: "nblah.png" },
                        { id: "9", name: "Serious stugg.jpg" },
                        { id: "10", name: "Bah.png" }
                    ]);
                } else if (folderId == "3456") {
                    resolve([
                        { id: "11", name: "Serious stugg.jpg" },
                        { id: "12", name: "Bah.png" },
                        { id: "13", name: "All we ever wanted.png" },
                        { id: "14", name: "nblah.png" },
                        { id: "15", name: "birds.png" },
                    ]);
                } else if (folderId == "4567") {
                    resolve([
                        { id: "16", name: "nblah.png" },
                        { id: "17", name: "Fish.png" },
                        { id: "18", name: "Serious stugg.jpg" },
                        { id: "19", name: "Bah.png" }
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


    uploadFile(file, folderId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    };

};
