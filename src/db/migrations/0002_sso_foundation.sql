ALTER TABLE portal_users
  ADD COLUMN IF NOT EXISTS sso_subject uuid DEFAULT gen_random_uuid();

UPDATE portal_users
SET sso_subject = gen_random_uuid()
WHERE sso_subject IS NULL;

ALTER TABLE portal_users
  ALTER COLUMN sso_subject SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS portal_users_sso_subject_unique
  ON portal_users (sso_subject);

CREATE TABLE IF NOT EXISTS portal_sso_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_hash varchar(64) NOT NULL UNIQUE,
  user_id bigint NOT NULL REFERENCES portal_users(id) ON DELETE CASCADE,
  client_id varchar(80) NOT NULL,
  redirect_uri text NOT NULL,
  code_challenge varchar(128) NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS portal_sso_codes_expiry_idx
  ON portal_sso_codes (expires_at);

CREATE INDEX IF NOT EXISTS portal_sso_codes_user_idx
  ON portal_sso_codes (user_id);
