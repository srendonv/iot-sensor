const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/** 
 * Method to return al documents in the DB
 */
async function findAll(){
    const uri = "mongodb://127.0.0.1:27017";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try{
        await client.connect();
        console.log("Connected correctly to server");

        // const database = client.db("iot");
        // const movies = database.collection("sensor");

        const collection = client.db("iot").collection("sensors");

        const docs = await collection.find().toArray();
        // await docs.forEach(data => console.log(data.cat));

        console.log(docs);

        client.close();

    }catch(err){
        console.log(err.stack);
    }


}

 /**
  *  Method to seed the DB with fake data
  */
async function seedDB() {
    // Connection URL
    const uri = "mongodb://127.0.0.1:27017";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("iot").collection("sensors");

  
        await collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 1000; i++) {
        
            let newDay = {
                timestamp_day:  faker.date.past(),
                name:           faker.name.firstName(),
                long:           randomIntFromInterval(-180, 180),
                lat:            randomIntFromInterval(-90, 90),
                temperature:    randomIntFromInterval(10, 40),
                humidity:       randomIntFromInterval(0, 100),
                pH:             randomIntFromInterval(0, 14),
                pressure:       randomIntFromInterval(25, 32),
                co2:            randomIntFromInterval(0, 30)
            };

            timeSeriesData.push(newDay);
        }
        await collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

module.exports = {seedDB, findAll};