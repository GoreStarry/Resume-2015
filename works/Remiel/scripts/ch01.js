/**
* @author      Taylor Wang  <sunrise91.t3@gmail.com>
* @copyright   Copyright (c) 2015 Taylor Wang Design
*/

//開頭動畫

function opening(){
        $("#pi").addClass("addpi");
        $("#cus2").addClass("flyAct");
        $("#cus").addClass("cusAct");

        $("#title1").delay( 6000 ).fadeIn( 2000 );
        $("#title2").delay( 8000 ).fadeIn( 2000 );
         setTimeout(function(){
            $("#logoa").css("display","inline-block");
        },11000);
    }
