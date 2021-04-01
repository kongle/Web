/**
 * @description: 
 */
import { readyList } from "./pub";

export default function promise( obj ) {
    if ( !readyList ) {  // 只会有一个延迟对象
        // readyList = jQuery.Deffered();

        // 第一次调用时
        if ( document.readyState === 'complete' ) {  // DOM 已准备好
            setTimeout( jQuery.ready ); 
        } else {  // DOM绘制完成触发 且只执行一次
            document.addEventListener( "DOMContentLoaded", completed, false );
            window.addEventListener( "load", completed, false );
        }
    }
    // 再次调用
    // return readyList.promise( obj ); 
}