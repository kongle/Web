import Data from './Data'

Data.uid = 1;  // 

Data.prototype = {
    /**
     * @description: 分配key值
     * @param {type} 
     * @return: 
     */
    key: function( owner ) {
        if ( !Data.accepts( owner ) ) {
            return 0;
        }
        var descriptor = {},
            unlock = owner[ this.expando ];
        
            if ( !unlock ) {
                unlock = Data.uid ++;  // 分配自定义属性的值（ 也是cache中的key值 ）
                try {
                    descriptor[ this.expando ] = { value: unlock };
                    Object.defineProperties( owner, descriptor );

                } catch ( e ) {
                    descriptor[ this.expando ] = unlock;
                    jQuery.extend( owner, descriptor );
                }
            }

            // 确保 cache[ unlock ] 是一个 {}
            if ( !this.cache[ unlock ] ) {
                this.cache[ unlock ] = {};
            }

            return unlock;
    },

    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    set: function( owner, data, value ) {
        var prop,
            unlock = this.key( owner ),
            cache = this.cache[ unlock ];

            if ( typeof data === 'string') {
                cache[ data ] = value; 

            } else {
                jQuery.extend( cache, data );
            }

            return cache;
    },
    
    /**
     * @description: 获取cache 存储的数据
     * @param {type} 
     * @return: 
     */
    get: function( owner, key ) {
        var cache = this.cache[ this.key( owner ) ] ;

        return key === undefined ?
                cache : cache[ key ];
    },

    /**
     * @description: 设置 获取
     * @param {type} 
     * @return: 
     */
    access: function( owner, key, value ) {
        var stored;

        if ( key === undefined ||
            ((key && typeof key === "string") && value === undefined) ) {

            stored = this.get( owner, key );

            return stored !== undefined ?
                stored : this.get( owner, jQuery.camelCase(key) );
        }

        this.set( owner, key, value );

        return value !== undefined ? value : key;

    },

    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    remove: function( owner, key ) {
        var i, name, camel,
            unlock = this.key( owner ),
            cache = this.cache[ unlock ];

            if ( key === undefined ) {
                this.cache[ unlock ] = {};
            } else {
                if ( jQuery.isArray( key ) ) {
                    // 数组内支持驼峰写法
                    name = key.concat( key.map( jQuery.camelCase ) );

                } else {
                    camel = jQuery.camelCase( key );
                    if ( key in cache ) {
                        name = [ key, camel ];
                    } else {
                        name = camel;
                        name = name in cache ?
                            [ name ] : ( name.match( core_rnotwhite ) || [] );
                    }
                }

                i = name.length;
                while ( i-- ) {
                    delete cache[ name[ i ] ];
                }
            }
    },

    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    hasData: function( owner ) {
        return !jQuery.isEmptyObject(
            this.cache[ owner[ this.expando ] || {} ]
        )
    },

    /**
     * @description: 删除元素缓存的所有数据
     * @param {type} 
     * @return: 
     */
    discard: function( owner ) {
        if ( owner[ this.expando ] ) {
            delete this.cache[ owner[ this.expando ] ];
        }
    }
}

export default Data;

