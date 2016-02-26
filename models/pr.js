const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const PRSchema = new Schema({
  gh_id     : Number,
  url       : String,
  state     : String,
  title     : String,
  author    : Schema.Types.Mixed,
  body      : String,
  created_at: Date,
  updated_at: Date,
  closed_at : Date,
  merged_at : Date,
  marged    : Boolean,
  commits   : Number,
  links     : []
});

module.exports = mongoose.model('PR', PRSchema);

// {"pr":
//     {
//       "gh_id"     : 1234,
//       "url"       : "http://some.url",
//       "state"     : "open",
//       "title"     : "My PR",
//       "author"    : {
//         "login": "martip-sainsburys",
//         "id": 1234
//       },
//       "body"      : "This is the body of the PR",
//       "created_at": "2015-05-05T23:40:27Z",
//       "updated_at": "2015-05-05T23:40:27Z",
//       "closed_at" : null,
//       "merged_at" : null,
//       "marged"    : false,
//       "commits"   : 1,
//       "links"     : []
//     }
// }
