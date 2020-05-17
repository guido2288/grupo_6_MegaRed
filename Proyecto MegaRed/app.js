const express= require("express");
const router= require("./routes/index")

const app = express();

app.use("/MegaRed", router);
app.listen(3000, ()=> console.log("servidor corriendo"));


