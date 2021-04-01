import { jQuery } from './core/index.js'
import Callbacks from './callbacks/index.js'
import  Deferred from './deffered/index'
import support from './support/index.js'
import Data from './data/index'
import queue from './queue/index'

;(function(window,undefined){
   
    jQuery.Callbacks = Callbacks;  // 统一管理回调函数

    jQuery.extend(  Deferred );    // 对异步的统一管理 defferred、when

    jQuery.support = support( {} );  // 功能检测 

    jQuery.extend( queue );   // 队列方法

    window.$ =window.jQuery = jQuery;

    // console.dir(Data);
    

})(window)