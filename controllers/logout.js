const mysql=require('mysql')
const jwt=require('jsonwebtoken')
const session=require('express-session')





const logout=async (req,res)=>{
    req.session.destroy(function(err){
        if(!err)
        res.status(200).redirect("/login")
        //res.send('logout')
        res.cookie('logout',{
            expires:new Date(Date.now()+2*1000),
            httpOnly:true
        
        

    })
    
    })
    
}
module.exports=logout 