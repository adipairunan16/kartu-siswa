import {
connectDB
}
from "@/lib/mongodb";

export async function GET(){

try{

await connectDB();

return Response.json({

status:
"Mongo Connected"

});

}

catch(e){

return Response.json({

error:
e.message

});

}

}