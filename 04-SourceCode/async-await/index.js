/*
 * @Description: async/await是对Generator（生成器）的封装，是一个语法糖
 * @Version: 1.0
    拓展：
      babel对async/await的转换
 */


function run(gen) {
    //把返回值包装成promise
    return new Promise((resolve, reject) => {
      var g = gen()
  
      function _next(val) {
        //错误处理
        try {
          var res = g.next(val) 
        } catch(err) {
          return reject(err); 
        }
        if(res.done) {
          return resolve(res.value);
        }
        //res.value包装为promise，以兼容yield后面跟基本类型的情况
        Promise.resolve(res.value).then(
          val => {
            _next(val);
          }, 
          err => {
            //抛出错误
            g.throw(err)
          });
      }
      _next();
    });
  }
  
  
  function* myGenerator() {
    try {
      console.log(yield Promise.resolve(1)) 
      console.log(yield 2)   //2
      console.log(yield Promise.reject('error'))
    } catch (error) {
      console.log(error)
    }
  }
  
  function* foo() {
    yield 'result1'
    yield 'result2'
    yield 'result3'
  }
    
  const gen = foo()
  console.log(gen.next().value)
  console.log(gen.next().value)
  console.log(gen.next().value)
  
  
  const result = run(myGenerator)     //result是一个Promise
  //输出 1 2 error
  
  
 
  /*
    // babel对async/await的转换:
    // 相当于我们的run()
    function _asyncToGenerator(fn) {
      // return一个function，和async保持一致。我们的run直接执行了Generator，其实是不太规范的
      return function() {
        var self = this
        var args = arguments
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
  
          //相当于我们的_next()
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
          }
          //处理异常
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
          }
          _next(undefined);
        });
      };
    }
  
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
  */
  