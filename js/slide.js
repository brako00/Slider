$(document).ready(function(){

    function distributeDivs(array, arrayContainer,offset) {
        var space = 5;
        var allDivsWidth=0;
        var parentDivWidth=$(window).width()-arrayContainer.width();

        array.each(function(index) {
            var currentDivWidth=$(this).width();
            
            if(index==0)
                var position=parentDivWidth+offset;
            else
                var position = (index*space) + allDivsWidth + parentDivWidth + offset;


            $(this).css('right', position+'px')
          
            allDivsWidth=currentDivWidth+allDivsWidth;
        });
      }
    
    distributeDivs($(".slide"), $(".top-slider"),0);
    distributeDivs($(".slide2"), $(".bottom-slider"),$(".buttons").width());

    function slide(array, arrayContainer,counter,offset,side){
        var allWidth=0;
        var active=array.eq(counter);
        var notActive=array.not(array.eq(counter));

        //setting up indexes for notActive array
        var MYnotActive=array.not(array.eq(counter));
        var Mycounter=counter;

        for (var i=0;i<(array.length-1);i++){
            if(Mycounter>=array.length-1)
                Mycounter=0;
            
            notActive[i]=MYnotActive.eq(Mycounter);
            Mycounter++;
        }

        //calculating width of all child divs
        array.each(function(){
            allWidth=$(this).width()+allWidth;
        });

        var myWidth=active.width();
        var trueWidth=allWidth-myWidth;

        var space = 5;
        var allDivsWidths=0;
        var parentDivWidth=$(window).width()-arrayContainer.width();

        if(side=="left"){

            //setting up position for all not active divs
            notActive.each(function(index){
                var goLeft=(index*space)+allDivsWidths+parentDivWidth+offset;
                $(this).animate({
                    right: goLeft+"px"
                }, 750);

                allDivsWidths=$(this).width()+allDivsWidths;
            });

            //setting up position for active div
            active.css("opacity", "0");
            active.css("right", trueWidth+space*notActive.length+parentDivWidth+offset+"px");

            active.animate({
                opacity: 1
            },750);
        }
        else if(side=="right"){

            //setting up position for div at the end of array
            var pseudoActive=notActive[notActive.length-1];
            pseudoActive.css("opacity", "0");
            pseudoActive.css("right", space+allDivsWidths+parentDivWidth+offset);

            //setting up position for active div
            active.animate({
                right: space+allDivsWidths+parentDivWidth+pseudoActive.width()+offset+"px"
            },750);

            //setting up position for all other not active divs
            var pseudoNotActive=notActive.not(notActive.eq(notActive.length-1));
            
            pseudoNotActive.each(function(index){
                var goRight=((index+2)*space)+allDivsWidths+parentDivWidth+pseudoActive.width()+myWidth+offset;
                $(this).animate({
                    right: goRight+"px"
                }, 750);
                allDivsWidths=$(this).width()+allDivsWidths;
            });

            notActive[notActive.length-1].animate({
                opacity:1
            },750);
        }
    }

    var counter=0;
    var counter2=0;

    function slideLeft(){
        slide($(".slide"), $(".top-slider"),counter,0,"left");
        slide($(".slide2"),$(".bottom-slider"),counter2,$(".buttons").width(),"left");

        counter++;
        if(counter>$(".slide").length-1)
            counter=0;

        counter2++;
        if(counter2>$(".slide2").length-1)
            counter2=0;

    }

    function slideRight(){
        slide($(".slide"), $(".top-slider"),counter,0,"right");
        slide($(".slide2"),$(".bottom-slider"),counter2,$(".buttons").width(),"right");
        
        counter--;
        if(counter<0)
            counter=$(".slide").length-1;
        
        counter2--;
        if(counter2<0)
            counter2=$(".slide2").length-1;
        
    }

    $("#left").click(slideLeft);
    $("#right").click(slideRight);

    $(document).on("keydown", function(e){
        if(e.keyCode == 37){
            slideLeft();
        }
        if(e.keyCode == 39){
            slideRight();
        }
    });

});