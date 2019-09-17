var PLX = PLX || {};
PLX.MediaManager = PLX.MediaManager || {};
PLX.MediaManager.KnowledgeArticleForm = (function() {

    class KnowledgeArticleForm {
        
        openMediaBrowser() {
            var data  = { mode: "copyUrl" };
            window.open("/WebResources/plx_/MediaManager/MediaManager.html?data=" + encodeURI(JSON.stringify(data)), 
                "PerplexMediaManager", "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no");
        }
    }

    return new KnowledgeArticleForm();
})();

