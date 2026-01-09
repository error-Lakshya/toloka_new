-- Enable extensions needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- Optional: CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- Optional: CREATE EXTENSION IF NOT EXISTS unaccent;

BEGIN;

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  official_url TEXT NOT NULL,
  pricing_model TEXT CHECK (pricing_model IN ('free','paid','freemium','subscription','one_time')),
  has_api BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  languages_supported TEXT[] DEFAULT '{}',
  media JSONB DEFAULT '{"images":[],"videos":[]}',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  popularity_score NUMERIC,
  source_citation JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tool_categories (
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, category_id)
);

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending','approved','rejected')) DEFAULT 'pending',
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS tool_search (
  tool_id UUID PRIMARY KEY REFERENCES tools(id) ON DELETE CASCADE,
  tsv tsvector
);

CREATE OR REPLACE FUNCTION tools_tsvector_update() RETURNS trigger AS $$
BEGIN
  INSERT INTO tool_search(tool_id, tsv)
  VALUES (NEW.id, to_tsvector('simple', coalesce(NEW.name,'') || ' ' || coalesce(NEW.description,'')))
  ON CONFLICT (tool_id) DO UPDATE SET tsv = EXCLUDED.tsv;
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tools_tsv_update
AFTER INSERT OR UPDATE OF name, description ON tools
FOR EACH ROW EXECUTE FUNCTION tools_tsvector_update();

CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_pricing ON tools(pricing_model);
CREATE INDEX IF NOT EXISTS idx_tools_has_api ON tools(has_api);
CREATE INDEX IF NOT EXISTS idx_tools_languages ON tools USING GIN (languages_supported);
CREATE INDEX IF NOT EXISTS idx_tools_tags ON tools USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_tool_search_tsv ON tool_search USING GIN (tsv);
CREATE INDEX IF NOT EXISTS idx_tool_categories_cat ON tool_categories(category_id);

COMMIT;
