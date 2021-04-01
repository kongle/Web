/*
 * @Description: 
 * @Version: 1.0
 * @Autor: kongyongle
 * @Date: 2020-03-05 16:18:58
 * @LastEditors: kongyongle
 * @LastEditTime: 2020-03-05 17:08:08
 */

 tool = {
     
    // 属性操作
    /**
     * @description: 计算后样式
     * @param {type} 
     * @return: string
     */  
    getStyle: function(ele,attr){
        return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele,false)[attr];
    },
    /**
     * @description: 可设置获取属性，可设置属性
     * @param {type} 
     * @return: string || undefined
     */
    css: function(){
        
    }

 }