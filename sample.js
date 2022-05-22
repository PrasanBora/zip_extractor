// to use button as a  virtual input source 
document.querySelector(".choose_file_button").addEventListener('click',function()
{ document.querySelector(".choose_file").click(); 
 })


var JSZip = require("jszip");

var FileSaver = require('file-saver');
const { console } = require("browserify/lib/builtins");

// const blob = require("blob");


var $result = document.querySelector("#result");
document.querySelector("#file").addEventListener("change", function(evt) 
{
    document.querySelector('.container').classList.add('hidden');
    document.querySelector('.pbarbox').classList.remove('hidden');
    // document.querySelector('#result_block').classList.remove('hidden');  
             move();

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
                   
                    link.href=relativePath;
                    link.download=zipEntry.name;
                    linode.appendChild(link);

                  linode.addEventListener('click',()=>{ 
                   

                    // var file = new File([zipEntry], zipEntry.name);
                    //     saveAs(file);

                    // var blob=new Blob ([zipEntry]);saveAs(blob,zipEntry.name);
                    link.click();
                              });
                        

                  ///--------
               
                
                //  console.log(zipEntry);
                //  console.log(relativePath);
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
    
    });
///progress bar 
 
var i = 0;
// let clear =1;
function move() {
  if (i == 0) {
    i = 1; 
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 80);
    function frame() {
      if (width >= 99) {
        clearInterval(id);
        i = 0;
        document.querySelector('.pbarbox').classList.add('hidden');
        // if(clear===1)
         document.querySelector('#result_block').classList.remove('hidden');
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
    }
  }
}
