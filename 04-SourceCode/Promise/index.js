/**
 * @description: 手写Promise
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
    then( onfulfilled = ()=>{}, onrejected = ()=> {} ){
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

    static resolve(){

    }

    static reject(){

    }

    static race(){

    }
    
    // 处理错误 只需返回一个promise对象
    catch( onrejected ){
        this.then( undefined, onrejected );
    }

    finally(){

    }
}



// Test
let p = new promise( function( resolve, reject ){
    
            setTimeout( ()=>{
                // resolve( 1  )
                reject( 0 )
            },1000)
});

let res = p.then( (data)=>{
    console.log( data );
    
},( e )=>{
    throw 'ssdgdfs'
})

setTimeout( ()=>{
    console.dir( res );
},1500)





