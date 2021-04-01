/**
 * @description: jQuery内置的工具方法
 */
import { core_version, rootJQuery, _jQuery, readyList, 
        class2type, core_toString, core_hasOwn, rsingleTag, 
        rmsPrefix, rdashAlpha,fcameCase, core_trim, trimExp, 
        core_push, core_indexOf, core_concat,isArrayLike, core_slice } from './pub'

"Boolean Number String Function Array Date RegExp Object Error".split(' ').
        forEach(function( value, key ){
                class2type[ "[object " + value + ']' ] = value.toLocaleLowerCase();
})

export default {
        // 随机字符串 内部使用
        expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),
        
        /**
         * @description: 防止冲突
         * @param {type} 
         * @return: 
         */
        noConflict: function( deep ) {
                if ( jQuery === window.$) {
                        window.$ = _$;  // 还原全局污染的$
                }
                if ( deep && window.jQuery === jQuery) {
                        window.jQuery = _jQuery;
                }

                return jQuery; 
        },
        isReady: false, // dom是否加载完成
        readyWait: 1,  // holdReady计数
        /**
         * @description: ready事件延迟开启、关闭
         * @param { boolean } 
         * @return: 
         */
        holdReady: function ( wait ) {
                if ( wait ) {
                        jQuery.readyWait++;
                } else {
                        jQuery.ready( true );
                }
        },
        ready: function ( wait ) {
                if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                        return;
                }
                jQuery.isReady = true;  

                readyList.resolveWidth( document, [jQuery] );  // 触发fn

                if ( jQuery.fn.trigger ) {
                       jQuery( document ).trigger('ready').off('ready'); 
                }
        },
        /**
         * @description: 类型检测
         * @param { boolean } 
         * @return: 
         */
        isFunction: function ( fn ) {
                return jQuery.type( fn ) === 'function';
                
                     //    不为空    不是节点对象       不是字符串类型                                               
                // return  !!fn && !fn.nodeName &&  fn.constructor != String &&
                    //      不是正则表达式               不是数组 
                // fn.constructor != RegExp && fn.constructor != Array &&
                // function/i.test( fn + "" );   // function/i.test( fn + "" );
                
                // 兼容alert 意义不大

        },
        isArray: function ( obj) {
               return jQuery.type( obj ) === 'array';
        },
        isWindow: function ( obj ) {
                return obj != null && obj === obj.window;
        },
        isNumeric: function ( obj ) {
               return !isNaN( parseFloat(obj) ) && isFinite(obj);
        },
        type: function ( obj ) {
                if ( obj == null ) {
                        return String( obj );
                }
                return typeof obj === 'object' || typeof obj === 'function' ? 
                        class2type[ core_toString.call(obj) ] || 'object' : 
                        typeof obj;
                
        },

        /**
         * @description: 判断对象字面量
         * @param {type} 
         * @return: 
         */
        isPlainObject: function ( obj ) {
                if ( jQuery.type !== "object" || obj.nodeType || jQuery.isWindow(obj) ) {
                        return false;
                }
                try{  // ie window.location.constructor bug
                        if ( obj.constructor && !core_hasOwn.call( obj.constructor.prototype, 'isPrototypeOf') ) {
                                return false;
                        }
                } catch (e) {
                        return false;
                }
                return true;
        },

        /**
         * @description: 判断空对象
         * @param {type} 
         * @return: 
         */
        isEmptyObject: function ( obj ) {
                var name;
                for ( name in obj ) {  // 属性是可遍历的
                        return false;
                }
                return true;
        },
        
        error: function ( msg ) {
                throw new Error( msg );
        },
        /**
         * @description: 解析html  
         * @param {data, context, keepScripts} 
         * @return: Array 
         */
        parseHTML: function ( str, context, keepScripts) {
                if ( !str || typeof str !== 'string' ) {
                        return null;
                } 
                if ( typeof context === 'boolean' ) {
                        keepScripts = context;
                        context = false;
                }
                context = context || document;

                var parsed = rsingleTag.exec( data ),
                    scripts = !keepScripts && [];
                // 单标签 
                if ( parsed ) {  
                        return [ context.createElement( parsed[1]) ];
                }
                // 多标签 文档碎片处理
                parsed = jQuery.buildFragment( [str], context, scripts);
                // 
                if ( scripts ) {
                        jQuery( scripts ).remove();
                }
                return jQuery.merge( [], parsed.childNodes);

        },

        /**
         * @description: IE9 及以上
         * @param {type} 
         * @return: 
         */ 
        parseJSON: JSON.parse,  

        /**
         * @description: 解析xml字符串
         * @param { data[string] } 
         * @return: xml
         */
        parseXML: function ( str ) {
                var xml,tmp;
                if ( !str || typeof str !== 'string') {
                        return null;
                }

                try {
                        temp = new DOMParser();
                        xml = tmp.parseFormString( str, 'text/xml' );
                } catch ( e ) {
                        xml = undefined;
                }

                if ( !xml || xml.getElementsByTagName('parsererror').length ) {
                        jQuery.error( "Invalid XML: " + str );
                } 
                return xml;

        },

        noop: function () {},

        /**
         * @description: 解析成全局js变量 ,在严格模式下不支持eval做的兼容处理
         * @param { } 
         * @return: 
         */
        globalEval: function ( code ) {
                var script,
                    indirect = eval;
                    code = jQuery.trim();

                if ( code ) {
                        if ( code.indexOf('use script') === 1 ) {
                                script = document.createElement('script');
                                script.text = code;
                                document.head.appendChild(script).parentNode.remove(script);
                        } else {
                                indirect( code );
                        }
                }

        },

        /**
         * @description: 转驼峰 margin-top -> marginTop
         * @param { string } 
         * @return: 
         */
        camelCase: function ( str ) {
                return str.replace( rmsPrefix, 'ms-').replace( rdashAlpha, fcameCase);
        },

        /**
         * @description: 元素的名字是否和 name 相同
         * @param { ele , name} 
         * @return: boolean
         */
        nodeName: function ( ele, name ) {
                return ele.nodeName && ele.nodeName.toLocaleLowerCase() === name.toLocaleLowerCase();
        },

        /**
         * @description: 遍历操作
         * @param {type} 
         * @return: 
         */
        each: function ( obj, callback, args ) {
                var value,
                    i = 0,
                    length = obj.length,
                    isArray = true;

                    if ( args ) {
                        if ( isArray ) {
                                for ( ; i < length; i++) {
                                        value = callback.apply( obj[i], args);
                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        } else {
                                for (i in obj ) {
                                        value = callback.apply( obj[i], args);
                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        }
                    } else {
                        if ( isArray ) {
                                for ( ; i < length; i++) {
                                        value = callback.call( obj[i], i, obj[i] );
                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        } else {
                                for (i in obj ) {
                                        value = callback.call( obj[i], i, obj[i] );
                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        }
                    }

        },

        /**
         * @description: 去掉左右空格   
         * @param {type} 
         * @return: 
         */
        trim: function ( str ) {
                if ( typeof str != 'string' ) {
                        return '';
                }

                return str && str.trim ? 
                    core_trim.call( str ) : 
                    str.replace( trimExp, '');
        },

        /**
         * @description: 类数组转数组
         * @param {type} 
         * @return: 
         */
        makeArray: function ( arr, results) {
                var ret = results || [];
                if ( arr != null ) {
                        if ( isArrayLike( Object(arr) ) ) {
                                jQuery.merge( ret, typeof arr === 'string' ? [arr] : arr);
                        } else {
                                core_push.call( ret, arr );
                        }
                } 
                return ret;
        },

        /**
         * @description: 
         * @param {type} 
         * @return: number
         */
        inArray: function ( elem, arr, i) {
                return arr == null ? -1 : core_indexOf.call( arr, elem, i );
        },

        /**
         * @description: 数组合并 
         * @param { 第一个参数必须是数组或伪数组 ,第二个参数数组或者没有length的伪数组 } 
         * @return: 
         */
        merge: function ( first, second) {
                var l = second.length, 
                    i = first.length,
                    j = 0;
                // if ( typeof l == 'number' ) {
                //         for ( ; j < l; j++ ) {
                //                 first[ i++ ] = second[j]
                //         }
                        
                // } else {
                //         while ( second[j] !== undefined) {
                //                 first[ i++ ] = second[ j++ ];
                //         }
                // }

                while ( second[j] !== undefined) {
                        first[ i++ ] = second[ j++ ];
                }

                first.length = i;
                return first;
        },

        /**
         * @description: 过滤
         * @param {type} 
         * @return: 
         */
        grep: function ( obj, callback, inv ) {
                var retVal,
                    ret = [],
                    i = 0,
                    length = obj.length,
                    inv = !!inv;
                for ( ; i < length; i++ ) {
                        retVal = !!callback( obj[i], i);
                        if ( inv !== retVal) {
                                ret.push( obj[i] );
                        }
                }
                return ret;
        },

        /**
         * @description: map遍历
         * @param {type} 
         * @return: 
         */
        map: function ( obj, callback, arg ) {
               var value,
                   i = 0,
                   length = obj.length,
                   isArray = isArrayLike( obj ),
                   ret = [];
                
                if ( isArray ) {
                        for ( ; i < length; i++ ) {
                                value = callback( obj[i], i, arg );
                                if ( value != null) {
                                        ret[ ret.length ] = value;
                                }
                        }
                } else {
                        for ( i in obj ) {
                                value = callback( obj[i], i, arg );
                                if ( value != null) {
                                        ret[ ret.length ] = value;
                                }   
                        }
                }
                // 合并数组，防止出现多维数组
                return core_concat.call( [], ret );
        },

        /**
         * @description: A global GUID counter for objects
         * @param {type} 
         * @return: 
         */
        guid: 1,

        /**
         * @description: 修改this的指向
         * @param {type} 
         * @return: 
         */
        proxy: function ( fn, context ) {
                var tmp,
                proxy,
                    args;
                // $.proxy( context, string[context中的方法名]) = $.proxy(fn, context)
                if ( typeof context === 'string' ) {
                        tmp = fn[context];  
                        context = fn;
                        fn = tmp;
                }
                if ( !jQuery.isFunction( fn ) ) {
                        return undefined;
                }
                args = core_slice.call( arguments, 2);
                proxy = function() {
                        // console.log(args.concat( core_slice.call(arguments) ));
                                                    // $.proxy(fn,context, arg1)(arg2) = $.proxy(fn,context)(arg1, arg2)
                        return fn.apply( context || this, args.concat( core_slice.call(arguments) ) )
                }

                proxy.guid = fn.guid = fn.guid || jQuery.guid++;
                return proxy;
        },

        /**
         * @description: 内部使用 css、attr等方法调用
         * @param { elems, fn, key, value, chainable, emptyGet, raw } 
         * @return: 
         */
        access: function ( elems, fn, key, value, chainable, emptyGet, raw ) {
                var i = 0,
                    length = elems.length,
                    bulk = key == null;
                // 多值处理
                if ( $.type(key) === 'object' ) {
                        chainable = true;
                        for ( i in key ) {
                                jQuery.access( elems, fn, i, key[i], true, emptyGet,raw );
                        }
                } else if ( value !== undefined ) {
                        chainable = true;
                        if ( !jQuery.isFunction(value) ) {
                                raw = true;
                        }
                        if ( bulk ) {
                                if ( raw ) {
                                        fn.call( elems, value );
                                        fn = null;

                                } else {  
                                       bulk = fn;
                                       fn = function( elem, key, value ) {
                                                return bulk.call( jQuery( elem ), value );
                                       } 
                                }
                        }

                        if ( fn ) {
                                for ( ; i < length; i++ ) {
                                        fn( elems[i], key, raw ? value : value.call( elems[i], i,fn( elems[i], key )) )
                                }
                        }

                }
                return chainable ? elems : bulk 
                                ? fn.call( elems) :length 
                                ? fn( elems[0], key ) : emptyGet;
        },

        /**
         * @description: 当前时间   == new Date().getTime
         * @param {type} 
         * @return: 
         */
        now: Date.now,

        /**
         * @description: 内部使用  交换
         * @param {type} 
         * @return: 
         */
        swap: function ( elem, options, callback, args ) {
                var ret, name,
                old = {};

                for ( name in options ) {
                        old[ name ] = elem.style[ name ];
                        elem.style[ name ] = options[ name ];
                    } 

                ret = callback.apply( elem, args || [] );

                for ( name in options ) {
                        elem.style[ name ] = old[ name ];
                    }
                
                return ret;
        }
}
