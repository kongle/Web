import Data from './constructor/proto'

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,  // json字符串
    rmultiDash = /([A-Z])/g,   // 匹配大写字母
    data_user = new Data(),  
    data_priv = new Data();


export  var extend = {
    acceptData: Data.accepts,

    hasData: function( elem ) {
        return data_user.hasData( elem ) || data_priv.hasData( elem );
    },

    data: function( elem, name, data ) {
        return data_user.access( elem, name, data );
    },

    removeData: function( elem, name ) {
        data_user.remove( elem, name );
    },

    _data: function( elem, name, data ) {
        return data_priv.access( elem, name, data );
    },

    _removeData: function( elem, name ) {
        data_priv.remove( elem, name );
    }
}


export var fnExtend = {
    /**
     * @description: 实例添加、获取数据
     * @param {type} 
     * @return: 
     */
    data: function ( key, value ) {
        var attrs, name,
            elem = this[ 0 ], // 只获取第一个元素
            i = 0,
            data = null;

            // 获取data
            if ( key === undefined ) {
                if ( this.length ) {
                    data = data_user.get( elem ); // 所有数据

                    if ( elem.nodeType === 1 && !data_priv.get( elem, 'hasDataAttrs')) {
                        attrs = elem.attributes;  // 所有属性集合
                        for ( ; i < attrs.length; i++ ) {
                            name = attrs[ i ].name;  // 属性节点的名字
                            if ( name.indexOf( 'data-' ) === 0 ) { // 查找data-属性
                                name = jQuery.camelCase( name.slice( 5 ) ); // 截取name 后转驼峰
                                dataAttr( elem, name, data[ name ] );  // cache添加数据
                            }
                        }
                        data_priv.set( elem, "hasDataAttrs", true );  // 只执行一次
                    }
                }

                return data;
            }
            // 设置是每个元素都设置data
            if ( typeof key === "object" ) {
                return this.each(function() {
                    data_user.set( this, key );
                });
            }

            return jQuery.access( this, function( value ) {
                var data,
                    camelKey = jQuery.camelCase( key );

                if ( elem && value === undefined ) {
            
                    data = data_user.get( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }

                    data = data_user.get( elem, camelKey );
                    if ( data !== undefined ) {
                        return data;
                    }

                    data = dataAttr( elem, camelKey, undefined );
                    if ( data !== undefined ) {
                        return data;
                    }

                    return;
                }

                this.each(function() {
            
                    var data = data_user.get( this, camelKey );
                    data_user.set( this, camelKey, value );
                    if ( key.indexOf("-") !== -1 && data !== undefined ) {
                        data_user.set( this, key, value );
                    }
                });
            }, null, value, arguments.length > 1, null, true );
    },

    /**
     * @description: 删除指定数据
     * @param {type} 
     * @return: 
     */
    removeData: function( key ) {
        return this.each(function() {
            data_user.remove( this, key );
        });
    }
}


function dataAttr( elem, key, data ) {
    var name;

    if ( data === undefined && elem.nodeType === 1 ) {
        // 转原属性名
        name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
        data = elem.getAttribute( name );

        if ( typeof data === "string" ) {
            try {
                data = data === "true" ? true :
                    data === "false" ? false :
                        data === "null" ? null :
                            // 字符串数字
                            +data + "" === data ? +data :
                                rbrace.test( data ) ? JSON.parse( data ) : // 转json对象
                                    data;
            } catch( e ) {}

            // 添加
            data_user.set( elem, key, data );
        } else {
            data = undefined;
        }
    }
    return data;
}


