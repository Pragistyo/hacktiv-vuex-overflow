const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const answerSchema = new Schema({
  id_user: {type: Schema.ObjectId, ref: 'user'},
  id_question: {type: Schema.ObjectId, ref: 'question'},
  content: {type: String, required: true},
  vote_up: [{type: Schema.ObjectId, ref: 'user'}],
  vote_down: [{type: Schema.ObjectId, ref: 'user'}]
},
{timestamp:true})

var Answers = mongoose.model('answer', answerSchema);

module.exports = Answers


// id_answer
// id_user (  Schema.Types.ObjectId ) << author
// content ( String )
// voted [Schema.Types.ObjectId]
// created_at (Date)
// updated_at (Date)
