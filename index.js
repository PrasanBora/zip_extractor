

let $result = document.querySelector("#result");
let container =document.querySelector('.container');
let progress = document.querySelector('.pbarbox');
let resultDisplay = document.querySelector('#result_block');


var JSZip = require("jszip");

// var FileSaver = require('file-saver');


// to use button as a  virtual input source 
document.querySelector(".choose_file_button").addEventListener('click',function()
{ document.querySelector(".choose_file").click(); 
 })

document.querySelector("#file").addEventListener("change", function(evt) 
{
    container.classList.add('hidden');
    progress.classList.remove('hidden');
    resultDisplay.classList.add('hidden');
      
            clear=1; move();

    $result.innerHTML=" ";
         // remove  previous content
         var files = evt.target.files;  //using loop for case of multiple files selected 
  for (var i = 0; i < files.length; i++) {
      handleFile(files[i]);
  }
    // handleFile(f);
    
    });


     // Closure to capture the file information.
     function handleFile(f) {

      container.classList.add('hidden');
      progress.classList.remove('hidden');
      resultDisplay.classList.add('hidden');
        
              clear=1; move();
  
      $result.innerHTML=" ";

      var $fileContent = document.createElement('ul');
  
      let $title = document.createElement('h4');

      $title.appendChild(document.createTextNode(f.name));

      console.log(f.name);
       console.log(f.filenameEncoding);
      
      $result.append($title);
      $result.append($fileContent);

          JSZip.loadAsync(f)        // unzip the file content
          .then(function(zip) {
   
            zip.forEach(function (relativePath, zipEntry) {
               
               let linode = document.createElement('li');
                linode.appendChild(document.createTextNode(zipEntry.name));
              
                $fileContent.appendChild(linode);

                //download file on click on entry

             
                var blob=new Blob ([zipEntry]);
                let objectURL = URL.createObjectURL(blob);
                //  console.log(objectURL);
                let link=document.createElement('a');
                 
                  link.href=objectURL;
                  link.download=zipEntry.name;
                  linode.appendChild(link);

                  
                  // link.href=relativePath;
                  // link.download=zipEntry.name;
                  // linode.appendChild(link);

                linode.addEventListener('click',()=>{ 
                 

                 
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
  
///progress bar 
 
var i = 0;
 let clear =1;
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
        progress.classList.add('hidden');
        if(clear===1)
         resultDisplay.classList.remove('hidden');
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
    }
  }
}

document.querySelectorAll(".cancel_event").forEach(cancel_event => cancel_event.addEventListener('click',()=>{
    clear=0;
     progress.classList.add('hidden');
     resultDisplay.classList.add('hidden');
     container.classList.remove('hidden');

}))

////////////////drag and drop 


let file;

let dragArea=document.querySelector(".drop_here");

dragArea.addEventListener('dragover',(event)=>{
console.log("file draged ");
event.preventDefault();
});

//when file leaves area 

dragArea.addEventListener('dragleave',(event)=>{});

//drop

dragArea.addEventListener('drop',(event)=>{

  event.preventDefault();

  file=event.dataTransfer.files[0];
  console.log(file);

  handleFile(file)
  // let fileType=file.type;
  // let fileReader =new Filereader();

  ////add commmand to unzip it you can try for a new api  :)
});
