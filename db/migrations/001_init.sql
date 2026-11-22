CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE wishlist_items (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  added_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  scheduled_at TEXT NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL
);

CREATE TABLE proposals (
  id INTEGER PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id),
  item_id INTEGER NOT NULL REFERENCES wishlist_items(id),
  proposed_by INTEGER REFERENCES users(id),
  UNIQUE (event_id, item_id)
);

CREATE TABLE proposal_rating (
  user_id INTEGER NOT NULL REFERENCES users(id),
  proposal_id INTEGER NOT NULL REFERENCES proposals(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  PRIMARY KEY (user_id, proposal_id)
);

CREATE TABLE proposal_vote (
  user_id INTEGER NOT NULL REFERENCES users(id),
  proposal_id INTEGER NOT NULL REFERENCES proposals(id),
  approved BOOLEAN NOT NULL,
  PRIMARY KEY (user_id, proposal_id)
);
