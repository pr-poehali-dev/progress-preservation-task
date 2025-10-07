
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    order_num INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject VARCHAR(100),
    difficulty VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS game_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (title, subject, description, icon, color) VALUES
('Математика', 'math', 'Изучай числа, геометрию и решай задачи', 'Calculator', '#FF6B6B'),
('Русский язык', 'russian', 'Грамматика, орфография и развитие речи', 'BookOpen', '#4ECDC4'),
('Английский язык', 'english', 'Учи слова, грамматику и разговорную речь', 'Globe', '#FFE66D'),
('Окружающий мир', 'world', 'Природа, животные, страны и наука', 'Leaf', '#95E1D3');

INSERT INTO games (title, description, subject, difficulty) VALUES
('Математическая викторина', 'Реши примеры на скорость', 'math', 'easy'),
('Угадай слово', 'Составь слово из букв', 'russian', 'medium'),
('English Words', 'Запоминай английские слова', 'english', 'easy'),
('Природный мир', 'Узнай животных и растения', 'world', 'medium');
