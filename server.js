const express = require('express');
const app = express();
app.use(express.json());

const auth = require('./routes/api/auth');
app.use('/api/auth', auth);
const info = require('./routes/api/info');
app.use('/api/info', info);
const events = require('./routes/api/events');
app.use('/api/events', events);
const rso = require('./routes/api/rso');
app.use('/api/rso', rso);

const path = require('path');
// Serve static assess while in production
if (process.env.NODE_ENV === 'production')
{   
    // sets the static folder, putting the index.html in client/build
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);