const { connect } = require("mongoose");

(async () => {
    try {
        const db = await connect(process.env.MONGODB_URL)
        console.log("DB is connected to", db.connection.name)
    } catch (error) {
        console.log(error)
    }
})()