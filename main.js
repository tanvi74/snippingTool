// angular.module('app', ['ngImgCrop'])
//   .controller('Ctrl', function($scope) {
//     $scope.myImage='';
//     $scope.myCroppedImage='';

//     var handleFileSelect=function(evt) {
//       var file=evt.currentTarget.files[0];
//       var reader = new FileReader();
//       reader.onload = function (evt) {
//         $scope.$apply(function($scope){
//           $scope.myImage=evt.target.result;
//         });
//       };
//       reader.readAsDataURL(file);
//     };
//     angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
//   });





















/*Make resizable div by Hung Nguyen*/
// function makeResizableDiv(div) {
//     const element = document.querySelector(div);
//     const resizers = document.querySelectorAll(div + ' .resizer')
//     const minimum_size = 20;
//     let original_width = 0;
//     let original_height = 0;
//     let original_x = 0;
//     let original_y = 0;
//     let original_mouse_x = 0;
//     let original_mouse_y = 0;
//     for (let i = 0;i < resizers.length; i++) {
//       const currentResizer = resizers[i];
//       currentResizer.addEventListener('mousedown', function(e) {
//         e.preventDefault()
//         original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
//         original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
//         original_x = element.getBoundingClientRect().left;
//         original_y = element.getBoundingClientRect().top;
//         original_mouse_x = e.pageX;
//         original_mouse_y = e.pageY;
//         window.addEventListener('mousemove', resize)
//         window.addEventListener('mouseup', stopResize)
//       })
      
//       function resize(e) {
//         if (currentResizer.classList.contains('bottom-right')) {
//           const width = original_width + (e.pageX - original_mouse_x);
//           const height = original_height + (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//           }
//         }
//         else if (currentResizer.classList.contains('bottom-left')) {
//           const height = original_height + (e.pageY - original_mouse_y)
//           const width = original_width - (e.pageX - original_mouse_x)
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//           }
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//             element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
//           }
//         }
//         else if (currentResizer.classList.contains('top-right')) {
//           const width = original_width + (e.pageX - original_mouse_x)
//           const height = original_height - (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//             element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
//           }
//         }
//         else {
//           const width = original_width - (e.pageX - original_mouse_x)
//           const height = original_height - (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//             element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//             element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
//           }
//         }
//       }
      
//       function stopResize() {
//         window.removeEventListener('mousemove', resize)
//       }
//     }
//   }
  
//   makeResizableDiv('.resizable')




// $( function() {
//   $( ".resizable" ).draggable();
// } );



// function makeResizableDiv(div) {
//     const element = document.querySelector(div);
//     const resizers = document.querySelectorAll(div + ' .resizer')
//     for (let i = 0;i < resizers.length; i++) {
//       const currentResizer = resizers[i];
//       currentResizer.addEventListener('mousedown', function(e) {
//         currentResizer.addEventListener('mousemove', resize)
//       })
      
//       function resize(e) {
//         if (currentResizer.classList.contains('bottom-right')) {
//           element.style.width = e.pageX - element.getBoundingClientRect().left + 'px';
//         }
//       }
//     }
//   }
  
//   makeResizableDiv('.resizable')

// var cropObject;
// function initCrop() {
//   cropObject = new DG.ImageCrop('cropImage', {	
//     lazyShadows : true,		
//     resizeConfig: {
//       preserveAspectRatio : false,
//       minWidth : 40,
//       minHeight: 40
//     },
//     moveConfig : {
//       keyNavEnabled : true	
//     },
//     initialCoordinates : {
//       left : 250,
//       top : 250,
//       width: 1200,
//       height:900
//     },			
//     originalCoordinates : {
//       width: 	2272,
//       height : 1704				
//     },
//     previewCoordinates : {
//       width: 	600,
//       height : 450
//     },
//     listeners : {
//       render : function() {
//         updateForm(this.getCoordinates());	
//       },
//       crop : function() {
//         updateForm(this.getCoordinates());	
//       }									
//     }			
//   });	

// }



const el = document.querySelector(".item");

let isResizing = false;

el.addEventListener("mousedown", mousedown);

function mousedown(e) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    if (!isResizing) {
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rect = el.getBoundingClientRect();

      el.style.left = rect.left - newX + "px";
      el.style.top = rect.top - newY + "px";

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}

const resizers = document.querySelectorAll(".resizer");
let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    isResizing = true;

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = el.getBoundingClientRect();

      if (currentResizer.classList.contains("se")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
      } else if (currentResizer.classList.contains("sw")) {
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
      } else if (currentResizer.classList.contains("ne")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
      } else {
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
      }
      console.log(el.style.width);
      console.log(el.style.height);
      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      isResizing = false;
    }
  }
}