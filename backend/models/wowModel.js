const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://admin:admin@testing.t6ul4ol.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
//  // sets the name of the DB that our collections are part of
  dbName: 'wow'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

  const wowSchema = mongoose.Schema({
    movie: String,
    year: Number,
    release_date: String,
    director: String,
    character: String,
    movie_duration: String,
    timestamp: String,
    full_line: String,
    current_wow_in_movie: Number,
    total_wows_in_movie: Number,
    poster: String,
    video: {
      "1080p" : String,
      "720p" : String,
      "480p" : String,
      "360p" : String,
    },
    audio: String
  });

module.exports = mongoose.model('Wow', wowSchema);