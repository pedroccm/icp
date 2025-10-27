-- Tabela de Personas (simples)
CREATE TABLE IF NOT EXISTS personas (
    id TEXT PRIMARY KEY,
    persona TEXT NOT NULL
);

-- Tabela de Channels (simples)
CREATE TABLE IF NOT EXISTS channels (
    id SERIAL PRIMARY KEY,
    channel_id TEXT NOT NULL UNIQUE,
    persona TEXT
);

-- Políticas de acesso público
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso público personas" ON personas FOR SELECT USING (true);
CREATE POLICY "Acesso público channels" ON channels FOR SELECT USING (true);
CREATE POLICY "Inserir personas" ON personas FOR INSERT WITH CHECK (true);
CREATE POLICY "Inserir channels" ON channels FOR INSERT WITH CHECK (true);
