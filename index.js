
var JSZip = require("jszip");


var $result = document.querySelector("#result");
document.querySelector("#file").addEventListener("change", function(evt) {
    // remove content
    // $result.html("");
    // be sure to show the results
    // $("#result_block").removeClass("hidden").addClass("show");

    // Closure to capture the file information.
    function handleFile(f) {
        var $title = document.querySelector("h4", {
            text : f.name
        });
        var $fileContent = document.querySelector("ul");
        $result.append($title);
        $result.append($fileContent);

        JSZip.loadAsync(f)                                   // 1) read the Blob
        .then(function(zip) {
            

            zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                $fileContent.append(document.querySelector('li', 
                   { text : zipEntry.name }
                ));
                
            });
        }, 
        function (e) {
            $result.append(document.querySelector("div", {
               
                text : "Error reading " + f.name + ": " + e.message
            }));
         }
        );
    }

    var files = evt.target.files;
    for (var i = 0; i < files.length; i++) {
        handleFile(files[i]);
    }
});
//////////////////////////

