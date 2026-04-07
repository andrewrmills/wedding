-- Wedding RSVP — Supabase schema
-- Run this in the Supabase SQL editor after creating the project.

-- ─────────────────────────────────────────
-- Table
-- ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.invitees (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  token                uuid        UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  name                 text        NOT NULL,
  type                 text        NOT NULL CHECK (type IN ('Aus', 'Pom', 'Kiwi')),
  welcome_message      text,
  rsvp_attending       boolean,
  dietary_requirements text,
  beer_choice          text        CHECK (
                                     beer_choice IN (
                                       'Hazy Pale Ale', 'Lager', 'Sour',
                                       'Ginger Beer', 'Other'
                                     )
                                   ),
  beer_other_details   text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────
-- Auto-update updated_at
-- ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_updated_at
  BEFORE UPDATE ON public.invitees
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─────────────────────────────────────────
-- Row Level Security
-- (Protects direct DB access; app uses service role with explicit WHERE clauses)
-- ─────────────────────────────────────────

ALTER TABLE public.invitees ENABLE ROW LEVEL SECURITY;

-- current_setting('app.token', true) returns NULL (not an error) if the setting
-- is not set in the current session — the `true` flag is the missing_ok parameter.
CREATE POLICY "select_by_token" ON public.invitees
  FOR SELECT USING (
    token = current_setting('app.token', true)::uuid
  );

CREATE POLICY "update_by_token" ON public.invitees
  FOR UPDATE USING (
    token = current_setting('app.token', true)::uuid
  );

-- ─────────────────────────────────────────
-- Test seed (one per guest type)
-- Remove or replace with real guests before launch
-- ─────────────────────────────────────────

INSERT INTO public.invitees (name, type) VALUES
  ('Test Aus Guest',  'Aus'),
  ('Test Pom Guest',  'Pom'),
  ('Test Kiwi Guest', 'Kiwi');

-- After running, retrieve the generated tokens for testing:
-- SELECT name, type, token FROM public.invitees;
