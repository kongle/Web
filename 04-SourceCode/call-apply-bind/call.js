/*
 * @Description: 
 * @Version: 1.0
 * @Autor: kongyongle
 * @Date: 2021-04-02 00:17:18
 */

Function.prototype.mycall = function (context) {
    // 如果 context 存在，使用 context，如果 context 不存在，使用 window；如果 context 是普通类型，转成对象。
    context = context ? Object(context) : globalThis;  // node环境下测试没有window
    context.fn = this;
    let args = [];
    for(let i = 1; i < arguments.length; i++) {
      args.push('arguments['+i+']');
    }
    let r = eval('context.fn('+args+')');
    delete context.fn;
    return r;
  }


  var a = 3;
  var b =4;

  let obj = {
      a,
      b,
      cb(){
        console.log( this.a, this.b );
   }
  }

  class Test{
      a = 1;
      b = 2;
  }

  obj.cb(  );
  obj.cb.mycall( new Test(), a,b )
  
