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

        const resolve = (value) => {
            // 只有一种状态改变
            if( this.status == this.#PENDING){
                this.value = value;
                this.status = this.#RESOLVED;
                this.Fulfill_Callbacks.forEach( callback => {
                    callback();
                })
            }
            
        }
        const reject  = (reason) => {
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
     * @param {*} onfulfilled
     * @param {*} onrejected
     * @return {*}
     */
    then( onfulfilled = ()=>{}, onrejected = ()=> {} ){
        // 处理同步调用
        if( this.status == this.#RESOLVED){
            onfulfilled( this.value );
        }
        if( this.status == this.#REJECTED){
            onrejected( this.reason );
        }
        // 处理异步函数
        if( this.status == this.#PENDING ){
            this.Fulfill_Callbacks.push( ()=> {
                // do something
                onfulfilled( this.value );
            });
            this.Reject_Callbacks.push( ()=> {
                // do something
                onrejected( this.reason );
            });
        }
    }

    catch(){

    }

    finally(){

    }
}




let p = new promise( function( resolve, reject ){
    
            setTimeout( ()=>{
                reject( 0  )
            },500)
});

p.then( (data)=>{
    console.log( data );
},( e )=>{
    console.log( e );
})

p.then( (data)=>{
    console.log( data );
},( e )=>{
    console.log( e );
})

p.then( (data)=>{
    console.log( data );
},( e )=>{
    console.log( e );
})