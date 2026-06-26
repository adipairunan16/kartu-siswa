import mongoose from "mongoose";

const StudentSchema =
new mongoose.Schema({

name: String,

kelas: String,

nis: String,

nisn: String,

jk: String,

tempat: String,

ttl: String,

alamat: String,

photo: String,

});

export default
mongoose.models.Student ||
mongoose.model(
"Student",
StudentSchema
);