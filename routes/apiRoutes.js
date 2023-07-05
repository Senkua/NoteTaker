const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
  // API routes
  app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }

      res.json(JSON.parse(data));
    });
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // assign a unique id to the new note

    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }

      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).end();
        }

        res.json(newNote);
      });
    });
  });

  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }

      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== noteId); // remove the note with the given id

      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).end();
        }

        res.json({ message: `Note ${noteId} has been deleted.` });
      });
    });
  });
};
