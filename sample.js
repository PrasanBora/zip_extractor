 
 // to use button as a  virtual input source 
document.querySelector(".choose_file_button").addEventListener('click',function()
{ document.querySelector(".choose_file").click(); 
 })


var JSZip = require("jszip");

// var FileSaver = require('file-saver');


var $result = document.querySelector("#result");
document.querySelector("#file").addEventListener("change", function(evt) 
{
    document.querySelector('.choose_file_button').classList.add('hidden');
    $result.innerHTML=" ";     // remove  previous content
    

    // Closure to capture the file information.
    function handleFile(f) {

        var $fileContent = document.createElement('ul');
    
        let $title = document.createElement('h4');

        $title.appendChild(document.createTextNode(f.name));

        console.log(f.name);
        
        $result.append($title);
        $result.append($fileContent);
 
            JSZip.loadAsync(f)        // unzip the file content
            .then(function(zip) {
     
              zip.forEach(function (relativePath, zipEntry) {
                 
                 let linode = document.createElement('li');
                  linode.appendChild(document.createTextNode(zipEntry.name));
                
                  $fileContent.appendChild(linode);

                  //download file on click on entry

                  let link=document.createElement('a');
                    linode.appendChild(link);
                    link.href=relativePath;
                    link.download=zipEntry.name;

                  linode.addEventListener('click',()=>{ 
                    // let link=document.createElement('a');
                    // linode.appendChild(link);
                    // link.href=relativePath;
                    // link.download=zipEntry.name;
                    link.click();
                              });
                        

                  ///--------
                //  $fileContent.appendChild(linode);
                
                 console.log(zipEntry);
                 console.log(relativePath);
                });
 
            },      function (e)   //if file format is not supported 
                 {
                   let divnode=  document.createElement('div');
                   divnode.appendChild(document.createTextNode("Error reading " + f.name ));
                   $result.appendChild(divnode);
                 }
            );
    
                }
    var files = evt.target.files;  //using loop for case of multiple files selected 
    for (var i = 0; i < files.length; i++) {
        handleFile(files[i]);
    }
    
//////////////////////////
    });
