obj = {

    /* 
        确定是原型中的属性
    */

    hasPrototypeProperty: function(obj, name) {
       return !obj.hasOwnProperty(name) && (name in obj);
   },

   /* 
        对象深拷贝 
        todo：copy多个对象，或仅copy实例属性
   */

   copy: function(tar,source){
        for(var i in source){
            tar[i] = source[i]
        }
        return tar;
   }
}