const mongoose = require('mongoose');

const DB = 'mongodb+srv://Saneha:shiaa1234@cluster0.7wscy5g.mongodb.net/JPMC?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection`));