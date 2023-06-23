$(document).ready(() => {

    //buttons on hover effect
    $("#left").hover(()=>{
        $("#left").css("display", "none");
        $("#no-left").css("display", "flex");
    });

    $("#no-left").mouseleave(()=>{
        $("#no-left").css("display", "none");
        $("#left").css("display", "flex");
    });

    $("#right").hover(()=>{
        $("#right").css("display", "none");
        $("#no-right").css("display", "flex");
    });

    $("#no-right").mouseleave(()=>{
        $("#no-right").css("display", "none");
        $("#right").css("display", "flex");
    });

    //sliding both sliders left and disabling button for 750ms
    const slidersLeft=()=>{
        $("#no-left").prop("disabled", true);

        slideLeft($(".top-slider"));
        slideLeft($(".bottom-slider"));

        setTimeout(()=>{
            $("#no-left").prop("disabled", false);
        }, 750);
    };

    const slideLeft = (slider)=>{

        //calculating width of first element and animating slider
        let widthFirst=slider.children().first().width();
        slider.animate({
            left: "-"+widthFirst+"px"
        }, 500, ()=>{

            //first element is moved to the end and animation is reset
            slider.children().first().fadeOut(0, () => {
                slider.append(slider.children().first());
                slider.children().last().fadeIn(500);
                slider.css("left", "0%");
              });
        });
    };

    //sliding both sliders right and disabling button for 750ms
    const slidersRight=()=>{
        $("#no-right").prop("disabled", true);

        slideRight($(".top-slider"),"left");
        slideRight($(".bottom-slider"),"right");

        setTimeout(()=>{
            $("#no-right").prop("disabled", false);
        }, 750);
    };

    const slideRight = (slider, transClass)=>{

        //adding transition class to last element
        slider.children().last().addClass("transClass");

        //calculating width of last element and animating slider
        let widthLast=slider.children().last().width();
        slider.animate({
            left: widthLast+"px"
        }, 500, ()=>{

            //removing transition class, last element is moved to the beginning and animation is reset
            slider.children().last().removeClass("transClass");
            slider.children().last().insertBefore(slider.children().first());
            slider.css("left", "0%");     
        });
    };

    //sliding on click
    $("#no-left").click(slidersLeft);
    $("#no-right").click(slidersRight);

    //sliding on keydown
    $(document).on("keydown", (e)=>{
        if(e.keyCode == 37){
            slidersLeft();
        }
        if(e.keyCode == 39){
            slidersRight();
        }
    });

});