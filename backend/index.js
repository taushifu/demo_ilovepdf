const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/conversion", require('./routes/conversion.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
