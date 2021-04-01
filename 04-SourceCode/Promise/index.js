/**
 * @description: 手写Promise
 * Promises/A+规范文档：
 *          https://promisesaplus.com/
 *          promises-aplus-tests index.js
 * 思考：
 *     ● 异步的4种解决方案
 *     ● 怎么理解promise
 *     ● Promise 的业界实现都有哪些
 *     ● 回调地狱的原因：嵌套调用、处理多个异步请求并发
 *     ● promise怎么解决回调地狱
 *     ● then的特性：链式调用&值穿透特性
 *     ● Promise 在事件循环中的执行过程是怎样的
 *     ● 怎么中断promise链
 *     ● Promise 有什么缺陷，可以如何解决？
 *     ● 优点及不足
 *          可阅读性、维护性有所增强
 * 
 * 应用场景：
 *      
 * todo:
 *      aplus 规范测试
 */

class promise{
    #PENDING = "PENDING";
    #RESOLVED = "RESOLVED";
    #REJECTED = "REJECTED";

    // 初始化Promise
    constructor( executor ){

        // 初始化状态和返回值
        this.status = this.#PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.Fulfill_Callbacks = [];
        this.Reject_Callbacks = [];

        // 初始化resolve、reject
        const resolve = ( value ) => {
            // 只有一种状态改变
            if( this.status == this.#PENDING){
                this.value = value;
                this.status = this.#RESOLVED;
                this.Fulfill_Callbacks.forEach( callback => {
                    callback();
                })
            }
        }
        const reject  = ( reason ) => {
            if( this.status == this.#PENDING){
                this.reason = reason;
                this.status = this.#REJECTED;
                this.Reject_Callbacks.forEach( callback => {
                    callback();
                })
            }
        }

        try{
             // 立即执行
            executor( resolve, reject );
        }catch( e ){
            reject( e );
        }
    }

    /**
     * @description: 定义实例then方法
     */
    then( onfulfilled, onrejected ){
        // 处理缺省参数 onrejected 抛出错误,下一个promise处理
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value=> value;
        onrejected = typeof onrejected === 'function' ? onrejected : reason=> { throw reason };

         return new promise( ( resolve, reject )=> {
            function callback( type , info ){
                try{
                    let result = type( info );
                    // 处理链式调用（返回值是promise）
                    if ( result instanceof promise ) {
                        result.then( s => {
                            resolve( s );
                        },r => {
                            reject( r );
                        });
                    } else {
                    // 返回值是普通值时
                        resolve( result );
                    }
                }catch( e ){
                    reject( e );
                }
            }
            // 处理同步调用
            if( this.status == this.#RESOLVED){
                callback( onfulfilled , this.value )
            }

            if( this.status == this.#REJECTED){
                callback( onrejected , this.reason );
            }

            // 采用发布-订阅处理异步函数（还包括多个成功失败回调）
            if( this.status == this.#PENDING ){

                this.Fulfill_Callbacks.push( ()=> {
                    // do something
                    callback( onfulfilled , this.value )
                });
                this.Reject_Callbacks.push( ()=> {
                    // do something
                    callback( onrejected , this.reason );
                });
            
            }
         })
        
    }

     // 处理错误 只需返回一个promise对象
     catch( onrejected ){
        this.then( undefined, onrejected );
    }

    /**
     * @description: 不管promise状态,都将执行
     * @param {*} cb
     * @return {*}
     */
    finally( cb ){
        return new promise( ( resolve, reject )=> {
            this.then( value=>{
                resolve( value );
                cb( value );
            }, reason=>{
                reject( reason );
                cb( reason );
            })
        })
    }

    /**
     * @description: value是失败的promise时,返回失败的promise
     * @param {*} value
     * @return {*}
     */
    static resolve( value ){
        return new promise( ( resolve, reject )=> {
            if( value instanceof promise ){
                value.then( resolve, reject )
            } else{
                resolve( value );
            }
            
        });
    }

    /**
     * @description: 返回失败的promise对象
     * @param {*} reason
     * @return {*}
     */
    static reject( reason ){
        return new promise( ( resolve, reject )=> {
            reject( reason );
        });
    }

    /**
     * @description: 最先成功的返回数据
     * @param {*}
     * @return {*}
     */
    static race( promises ){
        return new promise( ( resolve, reject )=>{
            promises.forEach( ( p )=> {
                promise.resolve(p).then( ( value, index )=>{
                    resolve( value );
                }, ( reason )=> {
                    reject( reason );
                });
            })
        })
    }

    /**
     * @description: 全部成功返回数据
     * @param {*} promises
     * @return {*}
     */
    static all( promises){
        let count = 0;
        let datas = new Array( promises.length );
        return new promise( ( resolve, reject )=>{
            promises.forEach( ( p )=> {
                promise.resolve(p).then( ( value, index )=>{
                    datas[index] = value;
                    if ( ++count == promiseslength) {
                        resolve( datas );
                    }
                }, ( reason )=> {
                    reject( reason );
                });
            })
        })
    }

}



// Test
let p = new promise( function( resolve, reject ){
    
            setTimeout( ()=>{
                resolve( 1  )
                // reject( 0 )
            },1000)
});

// let res = p.then( (data)=>{
//     // console.log( data );
//     // throw 'ssdgdfs'
// },( e )=>{
//     // throw 'ssdgdfs'
// }).then( ()=>{

// })
// .catch( e=>{
//     console.log( e);
// })
    

setTimeout( ()=>{
    // console.dir( res );
},1500)



// let p2 = promise.resolve( p ) ;

// p2.then( ( value )=> {
//     console.log( value );
// }).catch( (e)=>{
//     console.log( e);
// })

// setTimeout( ()=>{
//     // console.dir( p2 );
// },1500)



// let p3 = new Promise( function( resolve, reject ){
    
//     setTimeout( ()=>{
//         resolve( 2  )
//         // reject( 0 )
//     },500)
// });

// promise.race( [p,p3,5] ).then((value)=>{
//     console.log( value );
// })

// let p4 = p3.then( value=>{
//         console.log( value );
//         return 10
//     }, value=>{
//         console.log( value );
//     }).finally( ()=>{
//         console.log( 3 );
//     })

//     setTimeout( ()=>{
//         console.dir( p4 );
//     },1500)

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
  }
  
  Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
  }
