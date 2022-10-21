const express = require("express")
const cors = require("cors")
const { sendMailCode } = require("./utils/sendEmail")
const execSQL = require("./db/index")
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// 发送验证码接口,注册的时候用
app.use("api/sendRegCode",async (req,res)=>{
    try{
        const {email} = req.body
        let code = await sendMailCode(email)  
        // 先删除所有
        await execSQL("delete from code where email = " + email) 
        // 然后在发送
        await execSQL(`insert into code values(${email},${code})`)
        res.send({
            code:1,
            msg:"发送成功"
        }) 
    }catch(err){
        next(err)
    }

})
// 注册接口
app.post("api/register",async (req,res)=>{
    //
    const {username,password,email,code} = req.body
    // 查询有没有发送过验证码
    const result = await execSQL("select * from code where email = " + email)
    if(!result.length){
        return res.send({
            code:"注册失败",
            msg:"请先发送验证码"
        })
    }
    // 注意：我们就不判断验证码是否过期了 如果要判断可以加一个 Date字段 和现在的时间来比较
    let selectCode = result[0].code
    if(code !== selectCode){
        return res.send({
            code:"注册失败",
            msg:"验证码错误"
        })
    }
    // 全部正确了...
    // 根据用用户的email 创建token 然后返回 记得
    // Todo1 在user表中 保存用户信息 。。。 密码什么的都保存起来 等下登陆就可以登陆了    
})

app.post("api/login",()=>{
    const {password,email} = req.body
    //查询是否有用户信息
    // 有的话就 再次比较密码 之后就可以返回Token 了
    
})

app.use((req,res,next,err)=>{
    // 错误处理 参数有点忘了
})

app.listen(port,()=>{
    console.log("Server is running at port" + port)
})