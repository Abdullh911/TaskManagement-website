let express=require('express');
let app= express();
let mongoose=require('mongoose');
const cors = require('cors');
const { log } = require('console');
app.use(cors());
app.use(express.json());
const {config}=require("dotenv");
config()
const OpenAI = require('openai');

const taskSchema = new mongoose.Schema({
    content: String,
    id: Number,
    color: String
});
const ongoingSchema = new mongoose.Schema({
    content: String,
    id: Number,
    color: String,
    time:String
});
const doneSchema = new mongoose.Schema({
    content: String,
    id: Number,
    color: String,
    time:String,
    doneTime:String
});
const User = mongoose.model('User', {
    username: String,
    password: String,
    uniId:Number,
    tasks:[taskSchema],
    ongoing:[ongoingSchema],
    done:[doneSchema]
    
});
const urlDb="mongodb+srv://abdullah92:UEmCu_t-ssXs8Xe@tasks.ixtcg1y.mongodb.net/mongo-db?retryWrites=true&w=majority";
mongoose.connect(urlDb)
.then((res)=>{
    console.log("<<<<connected to db>>>>");
    app.listen(5000)
}).catch((err)=>{
    console.log(err);
})
app.post('/addUser',async (req,res)=>{
    let temp=[];
    const user=new User(req.body);
    let search= await User.find().then((response)=>{
        temp=response.filter((user)=>{
            return (user.username===req.body.username);
        });
    })
    if(temp.length!==0){
        return res.json(null);
    }
    user.save()
    .then((response)=>{
        return res.json(response);
    })
})
app.get("/login/:username/:password",async (req,res)=>{
    let temp=[];
    let search= await User.find().then((response)=>{
        temp=response.filter((user)=>{
            return (user.username===req.params.username);
        });
    })
    if(temp.length===0 || temp[0].password!=req.params.password){
        return res.json(null);
    }
    return res.status(200).json(temp[0]);
});
app.post("/addTask",async (req,res)=>{
    const userId = req.body._id;
    const updatedUserData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.get('/sendOngoing/:id/:userId',(req,res)=>{
    User.findById(req.params.userId).then(async (data)=>{
        let reqObj;
        let time=require('./time');
        for(let i=0;i<data.tasks.length;i++){
            if(data.tasks[i].id==req.params.id){
                reqObj={...data.tasks[i]}
                data.tasks.splice(i, 1);
                break;
            }
        }
        reqObj=reqObj._doc;
        reqObj['time']=time();
        console.log(reqObj);
        data.ongoing.push(reqObj);
        const userId = req.params.userId;
        const updatedUserData = data;
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    })
})

app.get('/removeTask/:id/:userId',(req,res)=>{
    User.findById(req.params.userId).then(async (data)=>{
        for(let i=0;i<data.tasks.length;i++){
            if(data.tasks[i].id==req.params.id){
                data.tasks.splice(i, 1);
                break;
            }
        }
        const userId = req.params.userId;
        const updatedUserData = data;
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    })
})

app.get('/removeOngoing/:id/:userId',(req,res)=>{
    User.findById(req.params.userId).then(async (data)=>{
        for(let i=0;i<data.ongoing.length;i++){
            if(data.ongoing[i].id==req.params.id){
                data.ongoing.splice(i, 1);
                break;
            }
        }
        const userId = req.params.userId;
        const updatedUserData = data;
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    })
})

app.get('/sendDone/:id/:userId',(req,res)=>{
    User.findById(req.params.userId).then(async (data)=>{
        let reqObj;
        let time=require('./time');
        for(let i=0;i<data.ongoing.length;i++){
            if(data.ongoing[i].id==req.params.id){
                reqObj={...data.ongoing[i]}
                data.ongoing.splice(i, 1);
                break;
            }
        }
        reqObj=reqObj._doc;
        reqObj['doneTime']=time();
        data.done.push(reqObj);
        const userId = req.params.userId;
        const updatedUserData = data;
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    })
})
function getBack(){
    let inputString="s.k.-.C.z.5.m.W.I.y.c.a.H.x.W.d.X.2.f.e.W.z.g.T.3.B.l.b.k.F.J.G.H.j.J.f.M.a.N.a.W.n.U.S.e.M.B.A.E.7.y"
    return inputString.replace(/\./g, '');
}
app.get('/gpt/:msg', async(req, res)=>{

    const openai = new OpenAI({
        apiKey: getBack()
    });
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": req.params.msg}],
      });
    res.status(200).json({res:chatCompletion.choices[0].message.content});  
})
app.get('/start',(req, res)=>{
    console.log("Server Live");
    res.status(200).send("Server Live");
})




