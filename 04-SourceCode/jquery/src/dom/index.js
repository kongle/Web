/*
 * @Description: 
 * @Version: 1.0
 * @Autor: kongyongle
 * @Date: 2020-03-05 15:57:55
 * @LastEditors: kongyongle
 * @LastEditTime: 2020-03-05 18:20:49
 */
tool = {

    /**
     * @description: 创建元素
     * @param {tagName} 
     * @return: Element
     */
    createElement: function(tag){
        return document.createElement(tag);
    },
    
    /**
     * @description: 性能测试
     * @param {string || function} 
     * @return: 
     */
    test: function(fn){
        var start = new Date().getTime();
        typeof fn == 'string' ? eval(fn) : fn();
        console.log("执行了" + (new Date().getTime() - start) + 'ms');
    }
}


/* ff = `
    for(var i= 0;i< 900000;i++){}
` */
function ff(){
    for(var i= 0;i< 900000;i++){}
}
tool.test(ff);