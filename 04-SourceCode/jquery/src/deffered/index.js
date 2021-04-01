import { jQuery } from "../core";

export default {
    Deferred: function( func ){
        var tuples = [  // 映射数组
            [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
            [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
            [ "notify", "progress", jQuery.Callbacks("memory") ]
        ],
        state = "pending",
        deferred = {},
        promise = {
            /**
             * @description: promise状态：pending、
             * @param {type} 
             * @return: 
             */
            state: function(){
                return state;
            },
            always: function() {
                deferred.done( arguments ).fail( arguments );
                return this;
            },
            then: function () {
                var fns = arguments;
                return jQuery.Deferred( function( newDefer ) {
                    jQuery.each( tuples,function( i, tuple) {
                        var action = tuple[0],
                            fn = jQuery.isFunction( fns[ i ] ) && fns[ i ] ;

                            deferred[ tuple[1] ]( function() {
                                var returned = fn && fn.apply( this, arguments );
                                if ( returned && jQuery.isFunction( returned.promise ) ) {
                                    returned.promise()
                                        .done( newDefer.resolve )
                                        .fail( newDefer.reject )
                                        .progress( newDefer.notify )
                                } else {
                                    newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                                }
                            });
                    });
                    fns = null;
                }).promise();
            },
            promise: function( obj ) {
                return obj != null ? jQuery.extend( obj, promise ) : promise;
            }
        };


        promise.pipe = promise.then; // 向后兼容

        jQuery.each( tuples, function( i, tuple ) {
            var list = tuple[ 2 ],
                stateStaring = tuple[ 3 ];
            
            promise[ tuple[1] ] = list.add;  // promise[ done | fail | progress ] =  cb.add;

            if ( stateStaring ) {
                list.add( function() {

                }, tuples[ i, 1][ 2 ].disable(), tuples[ 2 ][ 2 ].lock );
            }
             // deferred[ resolve | reject | notify ]
             deferred[ tuple[0] ] = function() {
                deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
                return this;
            };

        }); // promise、defferd添加方法

        promise.promise( deferred ); // copy promise 给 deferred

        if ( func ) {
            func.call( deferred, deferred ); // 
        }

        return deferred;
    },

    when: function( subordinate ) {
        var i = 0, // 
        resolveValues = core_slice.call( arguments ), // 参数数组
        length = resolveValues.length,
        // 计数器
        remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
        
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        // 
        updateFunc = function( i, contexts, values ) {
            return function( value ) {
                contexts[ i ] = this;
                values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
                if( values === progressValues ) {
                    deferred.notifyWith( contexts, values );
                } else if ( !( --remaining ) ) {
                    deferred.resolveWith( contexts, values );
                }
            };
        },
        // 
        progressValues, progressContexts, resolveContexts;

        if ( length > 1 ) {
            progressValues = new Array( length );
            progressContexts = new Array( length );
            resolveContexts = new Array( length );
            for ( ; i < length; i++ ) {
                if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                    resolveValues[ i ].promise()
                        .done( updateFunc( i, resolveContexts, resolveValues ) )
                        .fail( deferred.reject )
                        .progress( updateFunc( i, progressContexts, progressValues ) );
                } else {
                    --remaining;
                }
            }
        }

        // if we're not waiting on anything, resolve the master
        if ( !remaining ) {
            deferred.resolveWith( resolveContexts, resolveValues );
        }

        return deferred.promise();

    }

}