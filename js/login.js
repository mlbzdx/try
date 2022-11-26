const longinIdValidator =  new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '账号不能为空'
    }
})
const loginPwdValidator = new FieldValidator('txtLoginPwd',async function(val){
    if(!val){
        return '请填写密码'
    }
})
const form = $('.user-form');
form.addEventListener('submit',async function(e){
    e.preventDefault();
    const result = await FieldValidator.validate(
        longinIdValidator,
        loginPwdValidator,
        )
    if(!result){
        return
    }
    const formData = new FormData(form)//传入表单form，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries())
    // const data = reg({
    //     loginId:longinIdValidator.input.value,
    //     loginPwd:loginPwdValidator.input.value,
    //     nickname:nickNameValidator.input.value,

    // })
    const resp = await login(data);
    if(resp.code === 0){
        alert('登录成功，点击确定，跳转到聊天首页');
        location.href = './index.html';
    }else{
        longinIdValidator.p.innerHTML = '登录失败，账号和密码错误'
        loginPwdValidator.input.value = ''
    }
})