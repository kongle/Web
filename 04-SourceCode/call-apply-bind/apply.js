/*
 * @Description: 可以改变当前函数 this 的指向、让当前函数执行
 * 思路：函数成为contex的临时属性fn,执行完函数fn,删除contex.fn
 */

  
  Function.prototype.apply = function (context, args) {
    // 如果 context 存在，使用 context，如果 context 不存在，使用 window；如果 context 是普通类型，转成对象。
    context = context ? Object(context) : globalThis;
    context.fn = this;
  
    if(!args){
      return context.fn();
    }
  
    let r = eval('context.fn('+args+')');
    delete context.fn;
    
    return r;
  }
  