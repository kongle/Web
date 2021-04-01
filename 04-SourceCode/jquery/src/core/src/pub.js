    /**
     * @description: 公共变量
     */

    // 'use strict'  //jQ不推荐使用严格模式
    export var rootjQuery = null;  // $(document)
    export var readyList;   // DOM加载
    export var core_strundefined = typeof undefined;   // 兼容低版本的 undefined 无法判断
    export var location = window.location;   // 方便压缩
    export var document = window.document;
    export var docElem = document.documentElement;

    export var _jQuery = window.jQuery;  // 防止冲突
    export var _$ = window.$;

    export var class2type = {};   // 类型检测

    export var core_deletedIds = [];  // 废弃

    export var core_concat = core_deletedIds.concat;
    export var core_push = core_deletedIds.push;
    export var core_slice = core_deletedIds.slice;
    export var core_indexOf = core_deletedIds.indexOf;
    export var core_toString = class2type.toString;
    export var core_hasOwn = class2type.hasOwnProperty;
    export var core_trim = String.prototype.trim;

    export var core_version = '2.0.3';  // 版本号
    export var trimExp = /(^\s+)|(\s+$)/g;
    // matching numbers
    export var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source; 
 
    export var core_rnotwhite = /\S+/g;  // 空格

    export var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; // 防止xss攻击

    export var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;  // 单标签
 
    export var rmsPrefix = /^-ms-/;  // 匹配微软css 前缀
    export var rdashAlpha = /-([\da-z])/gi; // - [字母、数字]
    export var fcameCase = function( all, letter) {
        return letter.toUpperCase();
    }
    export var completed = function() {
        document.removeEventListener( "DOMContentLoaded", completed, false );
        window.removeEventListener( "load", completed, false );
        jQuery.ready();
    };

    export var  isArrayLike = function( obj ) {
        // jQuery 源码写法
        var length = obj.length,
            type = jQuery.type( obj );

        if ( jQuery.isWindow( obj ) ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || type !== "function" &&
            ( length === 0 ||
                typeof length === "number" && length > 0 && ( length - 1 ) in obj );

        // 自定义
        // var length = obj.length,
        //         type = jQuery.type( obj ),
        //         ret = false;

        //     if ( type === 'array' ) {
        //         ret = true ;
        //     }
        //     if ( type === 'object' && length > -1 ) {
        //         for ( var i = 0; i < length; i++ ) {
        //             if ( !(i in obj) ) {
        //                 // console.error('格式不完整');
        //                 return false ;
        //             }
        //         }
        //         ret = true ;
        //     } 

        //     return ret

    }

