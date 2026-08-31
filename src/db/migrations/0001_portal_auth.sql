CREATE TABLE IF NOT EXISTS portal_workspaces (
  id bigserial PRIMARY KEY,
  name varchar(120) NOT NULL,
  slug varchar(90) NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portal_users (
  id bigserial PRIMARY KEY,
  workspace_id bigint NOT NULL REFERENCES portal_workspaces(id) ON DELETE CASCADE,
  username varchar(80) NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS portal_users_username_unique
  ON portal_users (lower(username));
CREATE INDEX IF NOT EXISTS portal_users_workspace_idx
  ON portal_users (workspace_id);

CREATE TABLE IF NOT EXISTS portal_sessions (
  id uuid PRIMARY KEY,
  token_hash varchar(64) NOT NULL UNIQUE,
  user_id bigint NOT NULL REFERENCES portal_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS portal_sessions_user_idx
  ON portal_sessions (user_id);
CREATE INDEX IF NOT EXISTS portal_sessions_expiry_idx
  ON portal_sessions (expires_at);

