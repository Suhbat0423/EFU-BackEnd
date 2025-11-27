const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },

  studentId: { type: String, unique: true, required: true },

  password: { type: String, required: true },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },

  class: {
    type: String,
    required: true,
    enum: [
      "Аялал жуулчлал",
      "Нийгмийн инноваци",
      "Бизнесийн удирдлага",
      "Даатгал",
      "Зочлох үйлчилгээний менежмент",
      "Маркетинг",
      "Мэдээллийн систем",
      "Нягтлан бодох бүртгэл",
      "Санхүү, банк",
      "Худалдаа",
      "Эдийн засаг",
      "Эрх зүй",
      "Ажлын байр, тэтгэлэгтэй элсэлт (Мандал)",
    ],
  },
});

module.exports = mongoose.model("Student", StudentSchema);
