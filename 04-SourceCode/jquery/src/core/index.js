    /**
     * @description: 定义jQuery方法
    */
    import { core_version, _jQuery, _$,dd } from './src/pub'
    import { init } from './src/init'
    import { extend } from './src/extend'
    import extend_conf from './src/extend_conf'
    import promise from './src/ready.promise'

    var rootjQuery ;

    var jQuery = function(selector, context){
        // 可以直接省去初始化,直接使用
        return new jQuery.fn.init( selector, context, rootjQuery );  // 单体模式
    };

    // 静态对象 fn = 原型对象
    jQuery.fn = jQuery.prototype = {   
        jquery: core_version,
        version: core_version,
        constructor: jQuery,
        selector: "",
        length: 0,

        init: init,  // 构造函数
        
        toArray: function(){
            Array.prototype.slice.call( this );
        },

        // 获取原生dom
        get: function( num ){
            return num == null ?
            this.toArray():
            ( num < 0 ? this[ this.length + num ] : this[ num ] );
        },
        
        /**
         * @description: 入栈,end 可以回退
         * @param {type} 
         * @return: 
         */
        pushStack: function( elems ){
             var ret = jQuery.merge( jQuery(), elems);
             ret.prevObject = this;
             ret.context = this.context;
             return ret;
        },

        each: function( callback, args ){
            return jQuery.each( this, callback, args );
        },

        ready: function( fn ){
            jQuery.ready.promise().done( fn );
            return this;
        },

        slice: function(){
            return this.pushStack( core_slice.apply( this, arguments ) );
        },

        first: function(){
            return this.eq( 0 );
        },
            
        last: function(){
            return this.eq( -1 );
        },
            
        eq: function( num ){
            var j = num + ( num < 0 ? this.length : 0);
            return this.pushStack( [this[j]] );
        },
            
        map: function( callback ){
            return this.pushStack( jQuery.map( this, function( elem, i ){
                return callback.call( elem, i, elem );
            }) )
        },

        end: function(){
            return this.prevObject || this.constructor(null);
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice
        
    }

    // init 实例 可以访问jQuery 的共享方法
    jQuery.prototype.init.prototype = jQuery.prototype;   

    // 扩展工具方法和实例方法(通过调用时this的不同指向区分) $.extend({a: 12}) 
    // 以及深浅 copy功能 
    jQuery.extend = jQuery.fn.extend = extend;

    jQuery.extend( extend_conf );   // 扩展工具方法

    jQuery.ready.promise = promise;

    rootjQuery = jQuery(document); 

    
    export { jQuery }; 