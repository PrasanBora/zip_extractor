
document.querySelector(".choose_file_button").addEventListener('click',function()
{ document.querySelector(".choose_file").click();  })


var JSZip = require("jszip");

// var FileSaver = require('file-saver');


var $result = document.querySelector("#result");
document.querySelector("#file").addEventListener("change", function(evt) 
{
   
    $result.innerHTML=" ";     // remove content


    // Closure to capture the file information.
    function handleFile(f) {

        var $fileContent = document.createElement('ul');
    
        let $title = document.createElement('h4');

        $title.appendChild(document.createTextNode(f.name));

        console.log(f.name);
        
        $result.append($title);
        $result.append($fileContent);
 
            JSZip.loadAsync(f)                                   // 1) read the Blob
            .then(function(zip) {
     
              zip.forEach(function (relativePath, zipEntry) {
                 
                 let linode = document.createElement('li');
                  linode.appendChild(document.createTextNode(zipEntry.name));
                
                  linode.addEventListener('click',()=>{ });
                        let link=document.createElement('a');
                        linode.appendChild(link);
                        link.href=relativePath;
                        link.download=zipEntry.name;
                        link.click();

                  ///--------
                 $fileContent.appendChild(linode);
                
                 console.log(zipEntry.name);
                 console.log(relativePath);
                });
 
            },      function (e) 
                 {
                   let divnode=  document.createElement('div');
                   divnode.appendChild(document.createTextNode("Error reading " + f.name ));
                   $result.appendChild(divnode);
                 }
            );
    
                }
    var files = evt.target.files;
    for (var i = 0; i < files.length; i++) {
        handleFile(files[i]);
    }
    
//////////////////////////
    });
