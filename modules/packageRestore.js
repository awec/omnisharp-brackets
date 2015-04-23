/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    'use strict';

    var CodeInspection = brackets.getModule('language/CodeInspection'),
        DocumentManager = brackets.getModule('document/DocumentManager'),
        Omnisharp = require('modules/omnisharp'),
        FileUtils = brackets.getModule('file/FileUtils');


    function scanFileAsync(text, fullPath) {
        var deferred = $.Deferred();
        var document = DocumentManager.getCurrentDocument(),
            filename = document.file._path;
        
        if (FileUtils.getBaseName(filename) === 'project.json') {
            var request = [];
            request.push({
                fileName: filename
            });

            Omnisharp.packageRestore(request);
        }
        
        return deferred.promise();
    }

    exports.init = function () {
        CodeInspection.register('json', {
            name: 'Omnisharp-Json',
            scanFileAsync: scanFileAsync
        });
    };
});
