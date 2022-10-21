// npm i nodemailer
const nodemailer = require('nodemailer')
function sendMailCode (email){
    return new Promise((reslove,reject)=>{
        let code = Math.floor(Math.random() * 900000) + 100000
    //建立smtp连接
    let transporter = nodemailer.createTransport({
        host: "smtp.163.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: "",//邮箱账号
            pass: ""//这里填网易获取到的
        }
    })
    //相关参数
    let options = {
        from: "", //邮箱账号
        to: email,//发送的邮箱账号
        subject: '注册',
        html: `<div style="width:600px;margin:30px auto"><h1 style="text-align:center;">欢迎注册缤果网课登录系统账户</h1><p style="font-size:24px">此次的验证码如下:</p><strong style="font-size:20px;display:block;text-align:center;color:red">${code}</strong><p>验证码十分钟内有效，请及时输入</p><i style="color:#00bfff">此邮件为系统自动发送，请勿回复！若您没有进行注册请忽略。</i><p style="text-align:right">--胡巴传媒</p></div>`
    }
    //发送
    transporter.sendMail(options, function (err) {
        if (err) {
            reject(err)
        } else {
            reslove(code)
            transporter.close()
        }
    })
    })
}
module.exports = {
    sendMailCode
}