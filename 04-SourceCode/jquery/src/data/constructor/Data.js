/**
 * @description: 数据缓存: 避免相互引用引发内存泄露
 * @param {type} 
 * @return: 
 */
import { jQuery } from '../../core/index'

export default function Data(){
    // cache[0] 不能获取
    Object.defineProperty( this.cache = {} , 0, {
        get: function() {
            return {};
        }
    } )
    // 元素自定义属性
    this.expando = jQuery.expando + Math.random();
}

Data.accepts = function( owner ) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType ?
        owner.nodeType === 1 || owner.nodeType === 9 : true;
};