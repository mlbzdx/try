const BASE_URL = 'https://study.duyiedu.com'
const TOKEN_KEY = 'token'

async function get(path){
    const headers = {'Content-Type':'application/json'};
    const token = localStorage.getItem(TOKEN_KEY)
    if(token){
        headers.authorization = `Bearer ${token}`
    }
    return fetch(BASE_URL+path,{
        headers
    })
}
async function post(path,bodyobj){
    const headers = {
        'Content-Type':'application/json'
    };
    const token = localStorage.getItem(TOKEN_KEY)
    if(token){
        headers.authorization = `Bearer ${token}`
    }
    return fetch(BASE_URL+path,{
        headers,method:'POST',body:JSON.stringify(bodyobj)
    })
    
}

async function reg(userInformation){
    const resp = await post('/api/user/reg',userInformation)
    return await resp.json()

}
// reg({
//     'loginId':'mlbzdx',
//     'nickname':'迷路不知东西',
//     'loginPwd':'mlbzdx123456'
// })
async function login(loginInformation){
   const resp =  await post('/api/user/login',loginInformation)
   const result = await resp.json();
    //将响应头中返回的token保存
   if(result.code === 0){
    const token = resp.headers.get('authorization')
    localStorage.setItem(TOKEN_KEY,token)
   }
   return result     
}
// login({
//     "loginId":"mlbzdx",
//     "loginPwd":"mlbzdx123456"
// })
async function exist(loginId){
    const resp = await get('/api/user/exists?loginId='+loginId)
    return await resp.json()
}
async function profile(){
    const resp = await get('/api/user/profile')
    return await resp.json()
}
async function sendChat(content){
    const resp = await post('/api/chat',{content})
    return await resp.json()
}
async function getHistory(){
    const resp = await get('/api/chat/history')
    return await resp.json()
}
function loginOut(){
    localStorage.removeItem(TOKEN_KEY)
}