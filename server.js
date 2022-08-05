import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const app = express();

app.use(express.static("public"));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.get("/cats", (req, res) => {
  pool.query("SELECT * FROM cats").then((data) => {
    res.send(data.rows);
  });
});

app.get("/owners", (req, res) => {
  pool.query("SELECT * FROM owners").then((data) => {
    res.send(data.rows);
  });
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.get("/cats/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM cats").then((data) => {
    if (data.rows[id]) {
      res.send(data.rows[id]);
    } else {
      res.sendStatus(404);
    }
  });
});

app.delete("/cats/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM cats WHERE id = $1 RETURNING *;", [id])
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
  const { name, age, gender, color, food_type } = req.body;
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
              food_type = COALESCE($5, food_type)
              WHERE id = $6
              RETURNING *;
              `,
      [name, age, gender, color, food_type, id]
    )
    .then((result) => {
      res.send(result.rows[0]);
    });
});

app.post("/cats/", (req, res) => {
  const { age, name, gender, color, food_type } = req.body;
  pool
    .query(
      "INSERT INTO cats (age, name, gender, color, food_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [age, name, gender, color, food_type]
    )
    .then((result) => {
      console.log(result.rows);
      req.send(result.rows[0]);
    });
});

app.get("/owners", (req, res) => {
  pool.query("SELECT * FROM owners").then((data) => {
    res.send(data.rows);
  });
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.get("/owners/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM owners").then((data) => {
    if (data.rows[id]) {
      res.send(data.rows[id]);
    } else {
      res.sendStatus(404);
    }
  });
});

app.delete("/owners/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM owners WHERE id = $1 RETURNING *;", [id])
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
    .then((result) => {
      res.send(result.rows[0]);
    });
});

app.post("/owners/", (req, res) => {
  const { first_name, last_name, avatar, email } = req.body;
  pool
    .query(
      "INSERT INTO owners (first_name, last_name, avatar, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, avatar, email]
    )
    .then((result) => {
      console.log(result.rows);
      req.send(result.rows[0]);
    });
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
