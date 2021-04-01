
// 创建队列 


export default {
        /**
         * @description: 入队, 默认名字 fx
         * @param {type} 
         * @return: 
         */
        queue: function( elem, type, data ){
            var queue;

            if ( elem ) {
                type = ( type || "fx" ) + "queue";
                queue = data_priv.get( elem, type );

                if ( data ) {
                    if ( !queue || jQuery.isArray( data ) ) {  // 数组全部覆盖
                        queue = data_priv.access( elem, type, jQuery.makeArray( data ) );
                    } else {
                        queue.push( data );
                    }
                }
                return queue || [];
            }
        },
        /**
         * @description: 出队
         * @param {type} 
         * @return: 
         */
        dequeue: function(  elem, type ){
            type = type || 'fx';
            var queue = jQuery.queue( elem, type ),
            startLength = this.queue.length,
            fn = queue.shift(),
            hooks = jQuery._queueHooks( elem, type ),
            next = function() {   
                jQuery.dequeue( elem,type );
            };

            if ( fn === "inprogress" ) {
                fn = queue.shift();
                startLength--;
            }

            if ( fn ) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call( elem, next, hooks );
            }

            if ( !startLength && hooks ) {
                hooks.empty.fire();
            }


        },
        /**
         * @description: 
         * @param {type} 
         * @return: 
         */
        _queueHooks: function(){
            var key = type + "queueHooks";
            return data_priv.get( elem, key ) || data_priv.access( elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove( elem, [ type + "queue", key ] );
                })
            });
        }
}




var queueFnExtend = {
    queue: function( type, data ) {
        var setter = 2;

        if ( typeof type !== "string" ) {
            data = type;
            type = "fx";
            setter--;
        }

        if ( arguments.length < setter ) {
            return jQuery.queue( this[0], type );
        }

        return data === undefined ?
            this :
            this.each(function() {
                var queue = jQuery.queue( this, type, data );

                // ensure a hooks for this queue
                jQuery._queueHooks( this, type );

                if ( type === "fx" && queue[0] !== "inprogress" ) {
                    jQuery.dequeue( this, type );
                }
            });
    },
    dequeue: function( type ) {
        return this.each(function() {
            jQuery.dequeue( this, type );
        });
    },

   /**
     * @description: 延迟队列执行时间
     * @param {type} 
     * @return: 
     */
    delay: function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";

        return this.queue( type, function( next, hooks ) {
            var timeout = setTimeout( next, time );
            hooks.stop = function() {
                clearTimeout( timeout );
            };
        });
    },

    /**
     * @description: 清空队列
     * @param {type} 
     * @return: 
     */
    clearQueue: function( type ) {
        return this.queue( type || "fx", [] );
    },

    /**
     * @description: 队列全部执行完毕 再执行的回调
     * @param {type} 
     * @return: 
     */
    promise: function( type, obj ) {
        var tmp,
            count = 1,
            defer = jQuery.Deferred(),
            elements = this,
            i = this.length,
            resolve = function() {
                if ( !( --count ) ) {
                    defer.resolveWith( elements, [ elements ] );
                }
            };

        if ( typeof type !== "string" ) {
            obj = type;
            type = undefined;
        }
        type = type || "fx";

        while( i-- ) {
            tmp = data_priv.get( elements[ i ], type + "queueHooks" );
            if ( tmp && tmp.empty ) {
                count++;
                tmp.empty.add( resolve );
            }
        }
        resolve();
        return defer.promise( obj );
    }
}