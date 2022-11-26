const longinIdValidator =  new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '账号不能为空'
    }
    const resp = await exist(val)
    if(resp.data){
        return '该账号已被注册，请重新注册其他号码';
    }
})
const nickNameValidator = new FieldValidator('txtNickname',async function(val){
    if(!val){
        return '请填写昵称'
    }
    const resp = await exist(val)
    if(resp.data){
        return '该昵称已被注册，请重新注册其他号码';
    }
})
const loginPwdValidator = new FieldValidator('txtLoginPwd',async function(val){
    if(!val){
        return '请填写密码'
    }
})
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',async function(val){
    if(!val){
        return '请填写密码'
    }
    if(val !== loginPwdValidator.input.value){
        return '密码输入不一致，重新填写密码'
    }
})
const form = $('.user-form');
form.addEventListener('submit',async function(e){
    e.preventDefault();
    const result = await FieldValidator.validate(longinIdValidator,nickNameValidator,loginPwdValidator,loginPwdConfirmValidator)
    if(!result){
        return
    }
    const formData = new FormData(form)//传入表单form，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries())
    console.log(data);

    // const data = reg({
    //     loginId:longinIdValidator.input.value,
    //     loginPwd:loginPwdValidator.input.value,
    //     nickname:nickNameValidator.input.value,

    // })
    const resp = await reg(data);
    if(resp.code === 0){
        alert('注册成功,点击确定，跳转到登录页');
        location.href = './login.html';
    }
})

