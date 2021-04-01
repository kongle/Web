/**
 * @description: jQuery init 方法, 实例对象的实际构造函数
 */
import { core_version, rsingleTag, rquickExpr } from './pub'

function init( selector, context, rootJQuery ){   // 初始化
    var match, elem;

    if ( !selector ){   // 不合法的传参 $(null), $(undefined), $(false)
        return this;
    }
    
    if ( typeof selector === 'string' ){  // 匹配选择器
        // $('<div></div>')  =  $(<div>) = $(<div>sdf)
        if ( selector.charAt(0) === '<' && selector.charAt(selector.length-1 ) === '>' && selector.length >= 3){
            match = [null,selector,null];
        } else {
            // $('#div')  [0: "#div",1: undefined,2: "div"]
            // $('<li>')  [0: null,1: "<li>",2: null]    
            // ps: $('.box') $('div); match = null
            match = rquickExpr.exec( selector );  
        }

        if ( match && (match[1] || !context) ) {

            if ( match[1] ){
                // $('<li>') 
                context = context instanceof jQuery ? context[0] : context;
                jQuery.merge( this, jQuery.parseHTML(
                    match[1],
                    context && context.nodeType ? context.ownerDocument || context : document,
                    true
                ));

                // $('<li></li>',{html:'x12',title:123})
                if ( rsingleTag.test(match[1]) && jQuery.isPlainObject( context ) ){
                     for( match in context ){
                         if ( jQuery.isFunction(this[match]) ){
                             this[match](context[match])  // this.html('test')
                         } else {
                             this.attr( match, context[match] )  // this.attr('title',123)
                         }
                     }
                }

            } else {
                // $('#div')
                elem = document.getElementById( match[1] );
                if ( elem && ele.parentNode ){
                    this.length = 1;
                    this[0] = elem;
                }
                this.context = document;
                this.selector = selector;
                return this;
            }

        } else if ( !context || context.jquery ){   // $( selector , $(document) )
            return ( context || rootJQuery).find( selector );  // sizzle 选择复杂器

        } else {
             return this.constructor( context ).find( selector );  // $( selector, document )
        }

    } else if ( selector.nodeType ){  // $(document)
        this.context = this[0] = selector;
        this.length = 1;
        return this;
    }else if(jQuery.isFunction(selector)){  // $(function(){})
        return rootjQuery.ready( selector );
    }

    if( selector.selector !== undefined ){  // $('div') ==  $($('div'))
         this.selector = selector.selector;
         this.context = selector.context;
    }
    
    return jQuery.makeArray( selector, this );
}
export { init }
