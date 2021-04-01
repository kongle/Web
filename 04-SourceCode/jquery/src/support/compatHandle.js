import { jQuery } from "../core";

jQuery( function() {
    var container, marginDiv,
        divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
        body = document.getElementsByTagName("body")[ 0 ];
    
        if ( !body ) {
            // Return for frameset docs that don't have a body
            return;
        }

        // 新div 不在视野中
        container = document.createElement("div");
        container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

        body.appendChild( container ).appendChild( div );
        div.innerHTML = "";

        // 盒子怪异模式
        div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
        
        // 检测boxSizing属性
        jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
            support.boxSizing = div.offsetWidth === 4;
        });

        if ( window.getComputedStyle ) {
            // 单位: %、px 
            support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
            // 
            support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

            marginDiv = div.appendChild( document.createElement("div") );
            marginDiv.style.cssText = div.style.cssText = divReset;
            marginDiv.style.marginRight = marginDiv.style.width = "0";
            div.style.width = "1px";

            support.reliableMarginRight =
                !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
        
            }

            body.removeChild( container );
})
