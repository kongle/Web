/**
 * @description: 一个简单的Generator
 * 
 *    代码调用流程:
*        1、我们定义的function*生成器函数被转化为以上代码
*        2、转化后的代码分为三大块：
*            gen$(_context)由yield分割生成器函数代码而来
*            context对象用于储存函数执行上下文
*            invoke()方法定义next()，用于执行gen$(_context)来跳到下一步
*        3、当我们调用g.next()，就相当于调用invoke()方法，执行gen$(_context)，进入switch语句，switch根据context的标识，执行对应的case块，return对应结果
*        4、当生成器函数运行到末尾（没有下一个yield或已经return），switch匹配不到对应代码块，就会return空值，这时g.next()返回{value: undefined, done: true}
 *    总结：
 *       Generator实现的核心在于上下文的保存，函数并没有真的被挂起，每一次yield，
 *       其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个context对象储存上下文，
 *       使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样。
 * 
 * 
 *     拓展：
 *         babel对Generator的转换
 */

 
 // 生成器函数根据yield语句将代码分割为switch-case块，
 // 后续通过切换_context.prev和_context.next来分别执行各个case
 function gen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';

        case 2:
          _context.next = 4;
          return 'result2';

        case 4:
          _context.next = 6;
          return 'result3';

        case 6:
        case "end":
          return _context.stop();
      }
    }
}

// 低配版context  
var context = {
  next:0,
  prev: 0,
  done: false,
  stop: function stop () {
    this.done = true
  }
}

// 低配版invoke
let gen = function() {
  return {
    next: function() {
      value = context.done ? undefined: gen$(context)
      done = context.done
      return {
        value,
        done
      }
    }
  }
} 

// 测试使用
var g = gen() ;
console.log( g.next() )  // {value: "result1", done: false}
console.log( g.next() )  // {value: "result2", done: false}
console.log( g.next() )  // {value: "result3", done: false}
console.log( g.next() )  // {value: undefined, done: true}
