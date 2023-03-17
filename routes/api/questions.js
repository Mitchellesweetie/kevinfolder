const express=require('express')

const mysql=require('mysql')
const  router=express.Router()
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"kevin"
})


router.get("/",(req,res)=>{
    //const quiz=req.body.quiz
   // const questions=req.body.quiz
    //if(questions.length>0)
    //console.log('welcome')
    db.query("select * from kevin1",(err,result)=>{
        if(err)
        res.send(err)
        else 
        res.send(result)

    })
 
}) 

router.post("/",(req,res)=>{
    console.log("The request body is", req.body)
    const data=req.body
    //if(name&&questions){const newqueestion=questions[question.length-1].Id+1
        //questions.push({id:newqueestion,
      // name:name,
      // questions:questions}  res.json({ success:1,  message:" question inserted"
       // })} else{ res.status(404).json({success:-1, message:"question not posted"})  }
      db.query("insert into kevin1 set ?",data,(err,result)=>{
        
        if(err)
        res.send(err)
        else 
        res.send(result)
      })
    
})
router.get("/:questionId",(req,res)=>{
    let quizid=req.params.questionId
    //const id=req.body.id
    db.query("select*from kevin1 where id="+quizid,(err,result)=>{
        if(err)
        res.send(err)
        else 
        res.send(result)
    })
   

})
router.delete("/:questionId",(req,res)=>{
    let quizid=req.params.questionId
    //const id=req.body.id
   // const quizid=req.params.questionsId
    db.query("delete from kevin1 where id="+quizid,(err,result)=>{
        if(err)
        res.send(err)
        else 
        res.send(result)
    })
   
})

router.post("/:questionId/answers",(req,res)=>{
    let quizid=req.params.questionId

    const data=req.body

    db.query("insert into kevin1 (name,answer) values (?) where id="+quiz,data,(err,result)=>{
        
        if(err)
        res.send(err)
        else 
        res.send(result)
      })
  
})
router.put('/:questionId/answers/:answerId',(req,res)=>{
    let quizid=req.params.answerId
     const data=['kare',81]
 
     db.query("update kevin1 set answer =? where id=?",data,(err,result)=>{
         if(err)
         res.send(err)
         else 
         return(result)
     })
 
 })
 router.delete('/:questionId/answers/:answerId',(req,res)=>{
     const id=req.params.answerId
     db.query("delete from kevin1 where id="+id,(err,result)=>{
         if(err)
         res.send("error")
         else 
         return(result)
     })
    
     
     
 })

module.exports=router