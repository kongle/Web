 /*
 * @Description: 定义 Callbacks
 */
  import { core_rnotwhite } from '../core/src/pub'

  var optionsCache = {};
 
  function createOptions( options ) {
      var object = optionsCache[ options ] = {};
      jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
            object[ flag ] = true;
      });
      return object;
  }

  /** 
   * options:
   *    once:    只触发一次
   *    memory:  先处理add		
   *    unique:  合并重复函数
   *    stopOnFalse: 处理 return false;
  */ 
 export default  function Callbacks( options ) { 
    options = typeof options === "string" ?
                ( optionsCache[ options ] || createOptions( options ) ) :
                jQuery.extend( {}, options );
    
    var memory,  // 
        fired,  // 是否调用过fire
        firing,  // 正在触发（调用）
        firingStart, 
        firingLength,
        firingIndex,
        list = [],
        stack = !options.once && [],

        fire = function ( data ) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            // console.log(list,firingIndex);
            
            for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                if ( list[ firingIndex ].apply( data[0], data[1] ) === false && options.stopOnFalse) {
                     memory = false;
                     break;    // 处理 options.stopOnFalse = true;
                }
            }

            firing = false;
            if ( list ) {
                if ( stack ) {  // 没有once
                    if ( stack.length ) {
                        fire( stack.shift() );
                    }
                } else if ( memory ) {
                    list = [];
                } else {
                    self.disable();
                }
            }

        },

        self = {
            add: function () {
                if ( list ) {
                    var start = list.length;
                    (function( args ){
                        jQuery.each( args, function( _, arg){  // add 多参数
                            var type = jQuery.type(arg);
                            if ( type === 'function' ) {
                                if ( !options.unique || !self.has(arg) ) { // unique
                                    list.push( arg );  
                                }
                            } else if ( arg && arg.length && type != 'string' ) {
                                add( arg );  // cb.add( [] )
                            }
                        });
                    })(arguments);

                    if ( firing ) {
                        firingLength = list.length;
                    } else if ( memory ) {
                        firingStart = start;
                        fire ( memory );  // memory
                    }
                }
            },

            remove: function () {
                if ( list ) {
                    jQuery.each( arguments, function( _, arg ){
                        var index;
                        while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                            list.splice( index, 1 );
                            
                            if ( firing ) {
                                if ( index <= firingLength ) {
                                    firingLength--;
                                }
                                if ( index <= firingIndex ) {
                                    firingIndex--;
                                }
                            }
                        }
                    })
                }
                return this;
            },

            has: function ( fn ) {
                return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
            },
            /**
             * @description: 仅list清空
             * @param {type} 
             * @return: 
             */
            empty: function () {
                list = [];
                firingLength = 0;
                return this;
            },
            /**
             * @description: 禁止所有功能
             * @param {type} 
             * @return: 
             */
            disable: function () {
                list = stack = memory = undefined;
                return this;
            },

            disabled: function () {
                return !list;
            },
            
            lock: function() {
                stack = undefined;
                if ( !memory ) {
                    self.disable();
                }
                return this;
            },

            locked: function() {
                return !stack;
            },

            fireWith: function ( context, args ) {
                if ( list && ( !fired || stack ) ) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];

                    if ( firing ) {  // 处理函数内部fire
                        stack.push( args );
                    } else {
                        fire( args );
                    }
                }
                return this;
                    
            },

            fire: function () {
                self.fireWith( this, arguments );
                return this;  // this -> self
            },

            fired: function() {
                return !!fired;
            }
        }

        return self;
}


