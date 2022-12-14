import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const app = express();
app.use(express.json());

app.use(express.static("public"));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.get("/cats", (req, res) => {
  pool.query('SELECT * FROM cats').then((data) => {
    res.send(data.rows);
  });
});


app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.get('/cats/:id', (req,res, next) => {
  const id =req.params.id;
  pool.query('SELECT * FROM cats WHERE id = $1;', [id]).then((data)=> {
      const cat = data.rows[0];
      if([0]){
          res.send([cat]);
      }
  })
  .catch(next)
})

app.delete("/cats/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query('DELETE FROM cats WHERE id = $1 RETURNING *;', [id])
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
  });
  
  app.patch("/cats/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, gender, color, owner } = req.body;
  if (Number.isNaN(id)) {
    res.status(400).send(`invalid id "${req.params}`);
  }
  pool
  .query(
      `
      UPDATE cats
      SET name = COALESCE($1, name),
      age = COALESCE($2, age),
      gender = COALESCE($3, gender),
              color = COALESCE($4, color),
              owner = COALESCE($5, owner)
              WHERE id = $6
              RETURNING *;
              `,
      [name, age, gender, color, owner, id]
    )
    .then((data) => {
      res.send(data.rows[0]);
    });
  });
  
  app.post("/cats/", (req, res) => {
    const { age, name, gender, color, owner } = req.body;
    pool
    .query(
      'INSERT INTO cats (age, name, gender, color, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [age, name, gender, color, owner]
      )
      .then((data) => {
        console.log(data.rows);
        res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.get("/owners", (req, res) => {
  pool.query('SELECT * FROM owners').then((data) => {
    res.send(data.rows);
  });
});

app.get('/owners/:id', (req,res, next) => {
  const id =req.params.id;
  pool.query(`SELECT * FROM owners WHERE id = $1;`, [id]).then((data)=> {
      const owner = data.rows[0];
      if([0]){
          res.send(owner);
      }
  })
  .catch(next)
})

app.delete("/owners/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query('DELETE FROM owners WHERE id = $1 RETURNING *;', [id])
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
});

app.patch("/owners/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, avatar, email } = req.body;
  if (Number.isNaN(id)) {
    res.status(400).send(`invalid id "${req.params}`);
  }
  pool
    .query(
      `
              UPDATE owners
              SET first_name = COALESCE($1, first_name),
              last_name = COALESCE($2, last_name),
              avatar = COALESCE($3, avatar),
              email = COALESCE($4, email),
              WHERE id = $5
              RETURNING *;
              `,
      [first_name, last_name, avatar, email, id]
    )
    .then((data) => {
      res.send(data.rows[0]);
    });
});

app.post("/owners/", (req, res) => {
  const { first_name, last_name, avatar, email } = req.body;
  pool
    .query(
      'INSERT INTO owners (first_name, last_name, avatar, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, avatar, email]
    )
    .then((data) => {
      console.log(data.rows);
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
