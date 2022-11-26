//用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidator{
    /**
     * 构造函数
     * @param {String} txtId 文本框的ID
     * @param {*} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为文本框的值，函数的返回值为验证的错误消息，若无返回，则表示无错误，有返回值，则表示有错误。
     */
    constructor(txtId,validatorFunc){
        this.input = $('#'+txtId);
        this.p = this.input.nextElementSibling;
        this.validatorFunc = validatorFunc;
        this.input.addEventListener('blur',() => {
            this.validate();
        })
    }
    //静态方法
    /**
     * 对所有验证器进行统一验证
     * @param {FieldValidator[]} validators
     */
    static async validate(...validators){
        const proms = validators.map(v=>v.validate());
        const result = await Promise.all(proms)
        return result.every(r=>r);
    }
    //开始验证，验证成功返回true
    async validate(){
      const err =  await this.validatorFunc(this.input.value)
      if(err){
        this.p.innerHTML = err;
        return false;
      }else{
        this.p.innerHTML = '';
        return true
      }
    }
}
