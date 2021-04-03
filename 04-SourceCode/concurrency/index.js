/*
 * @Description: 控制并发数
 *
 *   应用:
 *        限制请求的数量,减轻服务器压力
 *       
 */

 /**
  * @description: 模拟ajax请求
  * @param {*} data,time合并
  * @param {*} 
  * @return {*}
  */
 function creatRequest( time ){
        // 必须包裹一层函数,否侧会立即执行,请求会全部发出,没有起到控制作用
        return function(){
            return new Promise( ( resolve, reject )=>{
                setTimeout( ()=>{
                    resolve( time );
                }, time)
            })
        }
 }

 class Concurrency{
    list = [];
    maxCount;
    workCount = 0;
    
    constructor( num = 2){
        this.maxCount = num;
    }

    add( p ){
        this.list.push( p );
    }
    
    start(){
        for( let i = 0; i< this.maxCount; i++ ){
            this.doNext();
         }
    }
    doNext(){
        if( this.list.length && this.workCount < this.maxCount ){
            this.workCount--;
            let req = this.list.shift()().then( ( data )=>{
                this.workCount--;
                console.log( data );
                this.doNext();
                
            })
        }
    }
    get getList(){
        console.log( this.list )
    }
 }


 let c = new Concurrency( 3 );

 c.add( creatRequest( 1000 ) );
 c.add( creatRequest( 1000 ) );
 c.add( creatRequest( 1000 ) );
 c.add( creatRequest( 2000 ) );
 c.add( creatRequest( 4000 ) );
 c.add( creatRequest( 3000 ) );
 c.add( creatRequest( 2000 ) );
 c.add( creatRequest( 1000 ) );
 
 setTimeout( function(){
    // c.getList
 },5000)
 
 c.start();