-- Create personas table
CREATE TABLE IF NOT EXISTS personas (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cluster TEXT NOT NULL,
    definition TEXT NOT NULL,
    age_range TEXT NOT NULL,
    gender TEXT NOT NULL,
    channel_size TEXT NOT NULL,
    upload_cadence TEXT NOT NULL,
    top_cities TEXT[] NOT NULL DEFAULT '{}',
    example_channels TEXT[] NOT NULL DEFAULT '{}',
    milo_must_haves TEXT[] NOT NULL DEFAULT '{}',
    zara_must_haves TEXT[] NOT NULL DEFAULT '{}',
    tasks TEXT[] NOT NULL DEFAULT '{}',
    benefits TEXT[] NOT NULL DEFAULT '{}',
    revenue JSONB NOT NULL DEFAULT '{}',
    pain_points TEXT[] NOT NULL DEFAULT '{}',
    tonality TEXT NOT NULL,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    purchase_behavior TEXT NOT NULL,
    success_looks TEXT NOT NULL,
    logic_buying TEXT NOT NULL,
    primary_platform TEXT NOT NULL,
    software TEXT[] NOT NULL DEFAULT '{}',
    psychographics TEXT NOT NULL,
    life_stage TEXT NOT NULL,
    interests TEXT[] NOT NULL DEFAULT '{}',
    favorite_brands TEXT[] NOT NULL DEFAULT '{}',
    hobbies TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create channels table
CREATE TABLE IF NOT EXISTS channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id TEXT NOT NULL UNIQUE,
    channel_url TEXT NOT NULL,
    persona_id TEXT REFERENCES personas(id) ON DELETE SET NULL,
    status TEXT NOT NULL CHECK (status IN ('classified', 'unclassified')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_channels_persona_id ON channels(persona_id);
CREATE INDEX IF NOT EXISTS idx_channels_status ON channels(status);

-- Enable Row Level Security (RLS)
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON personas
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON channels
    FOR SELECT USING (true);

-- Optional: Create policies for authenticated insert/update (uncomment if needed)
-- CREATE POLICY "Enable insert for authenticated users only" ON personas
--     FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Enable update for authenticated users only" ON personas
--     FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Enable insert for authenticated users only" ON channels
--     FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Enable update for authenticated users only" ON channels
--     FOR UPDATE USING (auth.role() = 'authenticated');
