//on page load
        //image gallery interaction
        var projectLength = [11,6,9,17,5,3];
        var indexTracker = [1,1,1,1,1,1];
        var projectTracker = 0;
        //get trackers from local storage
        projectTracker = localStorage.getItem("projectTrackerKey");
        refreshGallery();
        function refreshSidebar(img){
            child = img.children[0];
            $(child).animate({
                left: "-65%"
            },300);
            caption = img.children[1];
            $(caption).fadeIn('slow');
        }
        switch(projectTracker) {
            case '1':
                // code block
                img = document.getElementById('out-there-tn');
                refreshSidebar(img);
                //refreshGallery();
                break;
            case '2':
                // code block
                img = document.getElementById('a-family-affair-tn');
                refreshSidebar(img);
                //refreshGallery();
                break;
            case '3':
                // code block
                img = document.getElementById('nyc-on-film-tn');
                refreshSidebar(img);
                //refreshGallery();
                break;
            case '4':
                // code block
                img = document.getElementById('modern-orientalism-tn');
                refreshSidebar(img);
                //refreshGallery();
                break;
            case '5':
                // code block
                img = document.getElementById('colorado-tn');
                refreshSidebar(img);
                //refreshGallery();
                break;
            case '6':
                // code block
                img = document.getElementById('botanic-daydream-tn');
                refreshSidebar(img);
                //refreshGallery();
                break;
            default:
        }
        refreshGallery();
        function refreshGallery(){
            var current = window.location.href.substring(33);
            //var current = window.location.href.substring(73);
            if(current === "" || current == "about" || current == "contact"){
                click2();
            }
        }
//mobile, nav scroll interactions
        var animated = false;
        var nav = document.getElementById("nav");
        function navInteraction(){
            nav.addEventListener("scroll", navScroll);
        }
        function navScroll(){
            var navY = nav.scrollTop;
            if(navY < 60 && animated){
                //check if animated
                $(nav).animate({
                    top: "0"
                },150);
                animated = !animated;
            }
            if(navY >= 120 && !animated){
                //check if animated
                $(nav).animate({
                    top: "-48"
                },300);
                animated = !animated;
            }
        }
//responsive    
        //gallery interaction depending on viewport size
        if(window.innerWidth > 600){
            //implement cursor click navigation for desktop
            $( ".gallery" ).mousemove(function( event ) {
                var div = document.querySelector('.gallery');
                var divOffset = offset(div);
                var mouseX = event.pageX ;
                var mouseY = event.clientY ;
                var right = divOffset.right;
                var left = divOffset.left;
                var divide = (right + left)/2;
                var h = window.innerHeight*0.8;
                if (mouseX >= divide && mouseY<h){
                    document.getElementById("gallery").style.cursor = "e-resize";
                    document.getElementById("gallery").removeEventListener("click", prev);
                    document.getElementById("gallery").addEventListener("click", next, false);
                }
                else if(mouseX < divide && mouseY<h){
                    document.getElementById("gallery").style.cursor = "w-resize";
                    document.getElementById("gallery").removeEventListener("click", next);
                    document.getElementById("gallery").addEventListener("click", prev, false);
                }
                else{
                    document.getElementById("gallery").removeEventListener("click", next);
                    document.getElementById("gallery").removeEventListener("click", prev);
                    document.getElementById("gallery").style.cursor = "default";
                }
            });
        }
        else{
            //mobile interactions
            var container = document.querySelector("#gallery");
            container.addEventListener("touchstart", startTouch, false);
            container.addEventListener("touchmove", moveTouch, false);
            // Swipe Up / Down / Left / Right
            var initialX = null;
            var initialY = null;
            //nav scroll init
            navInteraction();
        }
        //mobile
        function startTouch(e) {
          initialX = e.touches[0].clientX;
          initialY = e.touches[0].clientY;
        }
      
        //mobile
        function moveTouch(e) {
          if (initialX === null) {
            return;
          }
          if (initialY === null) {
            return;
          }
          var currentX = e.touches[0].clientX;
          var currentY = e.touches[0].clientY;
          var diffX = initialX - currentX;
          var diffY = initialY - currentY;
          if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally, check if on thumbnail
            if (currentY <= (window.innerHeight * 0.70 * 0.75)){
                if (diffX > 0) {
                  next();
                } else {
                  prev();
                }
            }
          } 
      
          initialX = null;
          initialY = null;
      
          //e.preventDefault();
        }
        //deskstop
        function offset(el) {
            var rect = el.getBoundingClientRect();
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            return { right: rect.right - scrollLeft , left: rect.left };
        }
        
        
//general       
        //general next img function
        function next(){
            //update trackers
            if(indexTracker[projectTracker-1]<projectLength[projectTracker-1]){
                 indexTracker[projectTracker-1]++;
            }
            else{
                 indexTracker[projectTracker-1]=1;
            }
           updateImg();
        }
        //general prev img function
        function prev(){
            //update trackers
            if(indexTracker[projectTracker-1]>1){
                 indexTracker[projectTracker-1]--;
            }
            else{
                 indexTracker[projectTracker-1]=projectLength[projectTracker-1];
            }
            updateImg();
        }
        
        //desktop, move between images on keys
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            if (e.keyCode == '38') {
                // up arrow
            }
            else if (e.keyCode == '40') {
                // down arrow
            }
            else if (e.keyCode == '37') {
               // left arrow, go to prev image
               console.log(e);
               prev();
            }
            else if (e.keyCode == '39') {
               // right arrow, go to next image
               console.log(e);
               next();
            }
        
        }
        
        //general update img function
        function updateImg(){
             switch(projectTracker) {
                    case '1':
                        // code block
                        img = document.getElementById('out-there-image');
                        img.src="img/project_outThere/"+indexTracker[projectTracker-1]+".jpg";
                        break;
                    case '2':
                        // code block
                        img = document.getElementById('a-family-affair-image');
                        img.src="img/project_aFamilyAffair/"+indexTracker[projectTracker-1]+".jpg";
                        break;
                    case '3':
                        // code block
                        img = document.getElementById('nyc-on-film-image');
                        img.src="img/project_nycFilm/"+indexTracker[projectTracker-1]+".jpg";
                        break;
                    case '4':
                        // code block
                        img = document.getElementById('modern-orientalism-image');
                        img.src="img/project_modernOrientalism/"+indexTracker[projectTracker-1]+".jpg";
                        break;
                    case '5':
                        // code block
                        img = document.getElementById('colorado-image');
                        img.src="img/project_colorado/"+indexTracker[projectTracker-1]+".jpg";
                        break;
                    case '6':
                        // code block
                        img = document.getElementById('botanic-daydream-image');
                        img.src="img/project_botanicDaydream/"+indexTracker[projectTracker-1]+".jpg";
                        break;
                }
        }
//init      
        //on load
        window.onload = function() {
            init();
        };
        //event listeners for sidebar interactions
        function init(){
            var img =document.querySelectorAll('.sidebar-img-div');
            for(var i=0;i<img.length;i++){
                img[i].addEventListener('mouseenter',enter,false);
                img[i].addEventListener('mouseleave',leave,false);
                img[i].addEventListener("click", click, false);
            }
            
            var link =document.querySelectorAll('.closeAll');
            for(var j=0;j<link.length;j++){
                link[j].addEventListener("click", click2, false);
            }
            var thumbnail =document.querySelectorAll('.thumbnails');
            for(var k=0;k<thumbnail.length;k++){
                var children = thumbnail[k].children;
                for (var l = 0; l < children.length; l++) {
                    children[l].addEventListener("click", thumbnailClick, false);
                    children[l].setAttribute("data-index", l);
                }
            }
        }
        //on thumbnail click move to that image
        function thumbnailClick(){
            var index = parseInt(this.getAttribute("data-index"),10) + 1;
            indexTracker[projectTracker-1]=index;
            updateImg();
        }
//sidebar        
        //sidebar interaction, click on sidebar-img-div 
        function click(){
            var current = window.location.href.substring(0,31);
            //var current = window.location.href.substring(72);
            window.location.href = current+"#"+this.getAttribute('data-project');
            var img =document.querySelectorAll('.sidebar-img-div');
            projectTracker = this.getAttribute('data-index');
            for(var i=0;i<img.length;i++){
                if (img[i]!==this){
                    child = img[i].children[0];
                    $(child).animate({
                        left: "0"
                    },300);
                    caption = img[i].children[1];
                    $(caption).fadeOut('fast');
                }
            }
       }

        //sidebar interaction    
        function click2(){
            var img =document.querySelectorAll('.sidebar-img-div');
            for(var i=0;i<img.length;i++){
                child = img[i].children[0];
                $(child).animate({
                    left: "0"
                },300);
                caption = img[i].children[1];
                $(caption).fadeOut('fast');
            }
            projectTracker=0;
       }
       
        //sidebar interaction    
        function enter(){
                img = this.children[0];
                $(img).animate({
                    left: "-65%"
                },200);
                caption = this.children[1];
                $(caption).fadeIn('slow');
        }
        
        //sidebar interaction    
        function leave(){
                var current = window.location.href.substring(33);
                //var current = window.location.href.substring(73);
                if(this.getAttribute('data-project') != current){
                    img = this.children[0];
                    $(img).animate({
                        left: "0"
                    },300);
                    caption = this.children[1];
                    $(caption).fadeOut('fast');
                }
        }
        
//misc        
        //redirect on refresh, save current project
        window.onunload = function() {
            //store trackers in between sessions
            localStorage.setItem("projectTrackerKey", projectTracker);
        };
        // Listen for orientation changes      
        window.addEventListener("orientationchange", function() {
            // Announce the new orientation number
            location.reload();
        }, false);
//no right click on images
        $('#gallery').on('contextmenu', 'img', function(){ 
            return false; 
        });
        $('#home').on('contextmenu', 'img', function(){ 
            return false; 
        });
