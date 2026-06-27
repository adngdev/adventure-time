CREATE TYPE rating_value AS ENUM (
  'rating_1',
  'rating_2',
  'rating_3',
  'rating_4',
  'rating_5'
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE wishlist_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  added_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE proposals (
  id SERIAL PRIMARY KEY,
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
