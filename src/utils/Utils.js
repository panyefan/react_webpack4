
export default class Utils {
    //static关键字 静态方法，调用方式 Utils.say('test')
    static say (val) {
        console.log(val)
    }
    //Utils.shout('test')
    static shout=(val)=>{
        console.log(val+'-shout')
    }
    //非静态方法，调用必须new一下 new Utils().crazy('test')
    crazy=(val)=>{
        console.log(val+'-crazy')
    }
};
