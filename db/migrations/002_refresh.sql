CREATE TABLE refresh_token (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) DELETE CASCADE,
  token_hash TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
);
