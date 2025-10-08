import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Course = {
  id: number;
  title: string;
  subject: string;
  description: string;
  icon: string;
  color: string;
};

type Game = {
  id: number;
  title: string;
  description: string;
  subject: string;
  difficulty: string;
};

type UserProgress = {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  streak: number;
  nasa: number;
  credits: number;
};

export default function Index() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalLessons: 24,
    completedLessons: 8,
    averageScore: 78,
    streak: 5,
    nasa: 1250,
    credits: 45
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [activeLesson, setActiveLesson] = useState<{courseId: number; lessonNum: number} | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lessonScore, setLessonScore] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('nasaLearningUser');
    const savedProgress = localStorage.getItem('nasaLearningProgress');
    
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    const mockCourses: Course[] = [
      {
        id: 1,
        title: 'Математика',
        subject: 'math',
        description: 'Изучай числа, геометрию и решай задачи',
        icon: 'Calculator',
        color: '#FF6B6B'
      },
      {
        id: 2,
        title: 'Русский язык',
        subject: 'russian',
        description: 'Грамматика, орфография и развитие речи',
        icon: 'BookOpen',
        color: '#4ECDC4'
      },
      {
        id: 3,
        title: 'Английский язык',
        subject: 'english',
        description: 'Учи слова, грамматику и разговорную речь',
        icon: 'Globe',
        color: '#FFE66D'
      },
      {
        id: 4,
        title: 'Окружающий мир',
        subject: 'world',
        description: 'Природа, животные, страны и наука',
        icon: 'Leaf',
        color: '#95E1D3'
      }
    ];
    setCourses(mockCourses);

    const mockGames: Game[] = [
      { id: 1, title: 'Математическая викторина', description: 'Реши примеры на скорость', subject: 'math', difficulty: 'easy' },
      { id: 2, title: 'Угадай слово', description: 'Составь слово из букв', subject: 'russian', difficulty: 'medium' },
      { id: 3, title: 'English Words', description: 'Запоминай английские слова', subject: 'english', difficulty: 'easy' },
      { id: 4, title: 'Природный мир', description: 'Узнай животных и растения', subject: 'world', difficulty: 'medium' }
    ];
    setGames(mockGames);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nasaLearningUser', currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nasaLearningProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const handleLogin = () => {
    if (loginUsername && loginEmail) {
      setCurrentUser(loginUsername);
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nasaLearningUser');
    localStorage.removeItem('nasaLearningProgress');
    setCurrentUser(null);
    setCurrentPage('login');
    setUserProgress({
      totalLessons: 24,
      completedLessons: 0,
      averageScore: 0,
      streak: 0,
      nasa: 0,
      credits: 0
    });
  };

  const progressPercentage = (userProgress.completedLessons / userProgress.totalLessons) * 100;

  const getLessonQuestions = (courseId: number, lessonNum: number) => {
    const questions = {
      1: [
        { q: 'Сколько будет 5 + 3?', a: ['6', '8', '9', '7'], correct: 1 },
        { q: 'Что больше: 10 или 15?', a: ['10', '15', 'Равны', 'Не знаю'], correct: 1 },
        { q: 'Сколько будет 12 - 4?', a: ['6', '7', '8', '9'], correct: 2 }
      ],
      2: [
        { q: 'Найди существительное', a: ['Бежать', 'Дом', 'Красный', 'Быстро'], correct: 1 },
        { q: 'Сколько букв в слове "ШКОЛА"?', a: ['4', '5', '6', '7'], correct: 1 },
        { q: 'Какая буква первая в алфавите?', a: ['Б', 'А', 'В', 'Г'], correct: 1 }
      ],
      3: [
        { q: 'How do you say "Привет" in English?', a: ['Goodbye', 'Hello', 'Thank you', 'Please'], correct: 1 },
        { q: 'What color is the sky?', a: ['Red', 'Blue', 'Green', 'Yellow'], correct: 1 },
        { q: 'How many letters in "CAT"?', a: ['2', '3', '4', '5'], correct: 1 }
      ],
      4: [
        { q: 'Какое животное самое большое?', a: ['Слон', 'Кит', 'Жираф', 'Лев'], correct: 1 },
        { q: 'Сколько ног у паука?', a: ['6', '8', '10', '4'], correct: 1 },
        { q: 'Что растет из семечка?', a: ['Камень', 'Растение', 'Вода', 'Воздух'], correct: 1 }
      ]
    };
    return questions[courseId as keyof typeof questions] || questions[1];
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const questions = getLessonQuestions(activeLesson!.courseId, activeLesson!.lessonNum);
    if (answerIndex === questions[currentQuestion].correct) {
      setLessonScore(lessonScore + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const earnedNasa = 50;
        const earnedCredits = 5;
        setUserProgress({
          ...userProgress,
          nasa: userProgress.nasa + earnedNasa,
          credits: userProgress.credits + earnedCredits,
          completedLessons: userProgress.completedLessons + 1
        });
      }
    }, 1500);
  };

  const renderNavigation = () => (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="GraduationCap" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduLearn
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`font-medium transition-colors ${currentPage === 'home' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => setCurrentPage('courses')}
              className={`font-medium transition-colors ${currentPage === 'courses' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Курсы
            </button>
            <button 
              onClick={() => setCurrentPage('games')}
              className={`font-medium transition-colors ${currentPage === 'games' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Игры
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`font-medium transition-colors ${currentPage === 'about' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              О нас
            </button>
          </div>

          <div>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-full border border-yellow-300">
                    <Icon name="Coins" size={16} className="text-yellow-600" />
                    <span className="font-bold text-yellow-700">{userProgress.nasa}</span>
                    <span className="text-xs text-yellow-600">НАСЫ</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border border-blue-300">
                    <Icon name="Star" size={16} className="text-blue-600" />
                    <span className="font-bold text-blue-700">{userProgress.credits}</span>
                  </div>
                </div>
                <button onClick={() => setCurrentPage('profile')} className="flex items-center space-x-2 hover:opacity-80 transition">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                      {currentUser[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">{currentUser}</span>
                </button>
              </div>
            ) : (
              <Button onClick={() => setCurrentPage('login')} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {renderNavigation()}
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Обучайся с удовольствием! 🚀
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Интерактивная платформа для изучения школьных предметов с отслеживанием прогресса
          </p>
        </div>

        {currentUser && (
          <Card className="mb-12 animate-scale-in border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="TrendingUp" className="text-primary" />
                Твой прогресс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-6 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl border-2 border-yellow-300">
                  <Icon name="Coins" size={32} className="text-yellow-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-yellow-700">{userProgress.nasa}</div>
                  <div className="text-sm text-gray-600 mt-1">НАСЫ 🚀</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border-2 border-blue-300">
                  <Icon name="Star" size={32} className="text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-700">{userProgress.credits}</div>
                  <div className="text-sm text-gray-600 mt-1">Кредиты ⭐</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                  <div className="text-3xl font-bold text-primary">{userProgress.completedLessons}</div>
                  <div className="text-sm text-gray-600 mt-1">Уроков завершено</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl">
                  <div className="text-3xl font-bold text-secondary">{userProgress.totalLessons}</div>
                  <div className="text-sm text-gray-600 mt-1">Всего уроков</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl">
                  <div className="text-3xl font-bold" style={{ color: 'hsl(var(--accent))' }}>{userProgress.averageScore}%</div>
                  <div className="text-sm text-gray-600 mt-1">Средний балл</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">{userProgress.streak} 🔥</div>
                  <div className="text-sm text-gray-600 mt-1">Дней подряд</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Общий прогресс</span>
                  <span className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, borderColor: course.color + '40' }}
              onClick={() => setCurrentPage('courses')}
            >
              <CardHeader>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: course.color + '20' }}
                >
                  <Icon name={course.icon as any} size={32} style={{ color: course.color }} />
                </div>
                <CardTitle className="text-center text-xl">{course.title}</CardTitle>
                <CardDescription className="text-center">{course.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="border-2 border-secondary/30 shadow-xl animate-scale-in">
          <CardHeader>
            <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
              <Icon name="Sparkles" className="text-accent" />
              Почему выбирают нас?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10">
                <Icon name="BarChart3" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Отслеживание прогресса</h3>
                <p className="text-gray-600">Визуализация твоих успехов в режиме реального времени</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10">
                <Icon name="Gamepad2" size={48} className="text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Обучение через игры</h3>
                <p className="text-gray-600">Развивающие игры делают обучение увлекательным</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10">
                <Icon name="Trophy" size={48} className="text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Достижения и награды</h3>
                <p className="text-gray-600">Получай бейджи за успехи и поддерживай мотивацию</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {renderNavigation()}
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Наши курсы
        </h2>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="math">📐</TabsTrigger>
            <TabsTrigger value="russian">📚</TabsTrigger>
            <TabsTrigger value="english">🌍</TabsTrigger>
            <TabsTrigger value="world">🌿</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-all border-2" style={{ borderColor: course.color + '40' }}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: course.color + '20' }}
                    >
                      <Icon name={course.icon as any} size={32} style={{ color: course.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div onClick={() => setActiveLesson({courseId: course.id, lessonNum: 1})} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                      <span className="font-medium">Урок 1: Введение</span>
                      <Badge className="bg-green-100 text-green-700">Завершено</Badge>
                    </div>
                    <div onClick={() => setActiveLesson({courseId: course.id, lessonNum: 2})} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                      <span className="font-medium">Урок 2: Основы</span>
                      <Badge className="bg-blue-100 text-blue-700">В процессе</Badge>
                    </div>
                    <div onClick={() => setActiveLesson({courseId: course.id, lessonNum: 3})} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                      <span className="font-medium">Урок 3: Практика</span>
                      <Badge className="bg-yellow-100 text-yellow-700">Доступен</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-sm font-medium text-gray-700">Награда за урок:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Icon name="Coins" size={14} className="text-yellow-600" />
                        <span className="font-bold text-yellow-700">+50 НАСЫ</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-blue-600" />
                        <span className="font-bold text-blue-700">+5</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setActiveLesson({courseId: course.id, lessonNum: 2})} className="w-full" style={{ backgroundColor: course.color }}>
                    Продолжить обучение
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {courses.map((course) => (
            <TabsContent key={course.subject} value={course.subject}>
              <Card className="border-2" style={{ borderColor: course.color + '40' }}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: course.color + '20' }}
                    >
                      <Icon name={course.icon as any} size={40} style={{ color: course.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-3xl">{course.title}</CardTitle>
                      <CardDescription className="text-lg">{course.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((lessonNum) => (
                      <div key={lessonNum} onClick={() => setActiveLesson({courseId: course.id, lessonNum})} className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold">Урок {lessonNum}</h4>
                          {lessonNum <= 2 ? (
                            <Badge className="bg-green-100 text-green-700">Завершено</Badge>
                          ) : lessonNum === 3 ? (
                            <Badge className="bg-blue-100 text-blue-700">В процессе</Badge>
                          ) : (
                            <Badge variant="secondary">Заблокировано</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Тема урока {lessonNum}</p>
                        <Progress value={lessonNum <= 2 ? 100 : lessonNum === 3 ? 45 : 0} className="mt-2 h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {renderNavigation()}
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Развивающие игры 🎮
          </h2>
          <p className="text-xl text-gray-600">Учись играя! Закрепляй знания в интерактивном формате</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <Card 
              key={game.id} 
              className="hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 border-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Gamepad2" className="text-primary" />
                    {game.title}
                  </CardTitle>
                  <Badge 
                    className={game.difficulty === 'easy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                  >
                    {game.difficulty === 'easy' ? 'Легко' : 'Средне'}
                  </Badge>
                </div>
                <CardDescription className="text-base">{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="Target" size={16} />
                    <span>Лучший результат: {Math.floor(Math.random() * 50) + 50} очков</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="PlayCircle" size={16} />
                    <span>{Math.floor(Math.random() * 20) + 5} игр</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-sm font-medium text-gray-700">Награда:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Coins" size={14} className="text-yellow-600" />
                      <span className="font-bold text-yellow-700">+100 НАСЫ</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-blue-600" />
                      <span className="font-bold text-blue-700">+10</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Play" className="mr-2" size={18} />
                  Играть сейчас
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      {renderNavigation()}
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-8">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
                {currentUser?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl">{currentUser}</CardTitle>
            <CardDescription className="text-lg">Юный ученик</CardDescription>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="mt-4"
            >
              <Icon name="LogOut" className="mr-2" size={18} />
              Выйти из аккаунта
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-primary" />
                    Достижения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <div className="font-bold">Первые шаги</div>
                        <div className="text-sm text-gray-600">Завершил 5 уроков</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <div className="font-bold">Постоянство</div>
                        <div className="text-sm text-gray-600">5 дней подряд</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <div className="font-bold">Отличник</div>
                        <div className="text-sm text-gray-600">Средний балл 78%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" className="text-secondary" />
                    Статистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Математика</span>
                        <span className="text-sm font-bold text-primary">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Русский язык</span>
                        <span className="text-sm font-bold text-primary">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Английский</span>
                        <span className="text-sm font-bold text-primary">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Окружающий мир</span>
                        <span className="text-sm font-bold text-primary">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" className="text-accent" />
                  Последняя активность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Завершил урок "Дроби"', course: 'Математика', time: '2 часа назад', icon: 'CheckCircle', color: '#FF6B6B' },
                    { action: 'Сыграл в "Угадай слово"', course: 'Русский язык', time: '5 часов назад', icon: 'Gamepad2', color: '#4ECDC4' },
                    { action: 'Начал урок "Present Simple"', course: 'Английский', time: 'Вчера', icon: 'BookOpen', color: '#FFE66D' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: activity.color + '20' }}
                      >
                        <Icon name={activity.icon as any} size={20} style={{ color: activity.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.course}</div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {renderNavigation()}
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              О платформе EduLearn
            </CardTitle>
            <CardDescription className="text-lg">
              Современное образование для нового поколения
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Target" className="text-primary" />
                Наша миссия
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Мы создаем интерактивную образовательную платформу, которая делает обучение увлекательным и эффективным. 
                Наша цель — помочь каждому ученику раскрыть свой потенциал через современные технологии и игровые механики.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">Активных учеников</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl">
                <div className="text-4xl font-bold text-secondary mb-2">50+</div>
                <div className="text-gray-600">Интерактивных курсов</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl">
                <div className="text-4xl font-bold" style={{ color: 'hsl(var(--accent))' }}>98%</div>
                <div className="text-gray-600">Довольных родителей</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Sparkles" className="text-secondary" />
                Что нас отличает
              </h3>
              <div className="space-y-3">
                {[
                  { icon: 'BarChart3', title: 'Персональный прогресс', desc: 'Детальная аналитика успеваемости в реальном времени' },
                  { icon: 'Gamepad2', title: 'Игровой подход', desc: 'Обучение через интерактивные игры и квесты' },
                  { icon: 'Users', title: 'Сообщество', desc: 'Общение с другими учениками и учителями' },
                  { icon: 'Award', title: 'Система наград', desc: 'Бейджи и достижения за успехи в обучении' }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon as any} className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Присоединяйся к нам!</h3>
              <p className="text-gray-700 mb-6">Начни своё образовательное путешествие уже сегодня</p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={() => setCurrentPage(currentUser ? 'home' : 'login')}
              >
                {currentUser ? 'К обучению' : 'Зарегистрироваться'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 shadow-2xl animate-scale-in">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" className="text-white" size={40} />
          </div>
          <CardTitle className="text-3xl">Добро пожаловать!</CardTitle>
          <CardDescription className="text-lg">Войди в свой аккаунт или создай новый</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input 
              id="username" 
              placeholder="Введи своё имя"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
            size="lg"
            onClick={handleLogin}
            disabled={!loginUsername || !loginEmail}
          >
            Войти
          </Button>
          <p className="text-sm text-center text-gray-600">
            Нажимая "Войти", ты соглашаешься с нашими правилами
          </p>
        </CardContent>
      </Card>
    </div>
  );

  if (activeLesson) {
    const course = courses.find(c => c.id === activeLesson.courseId);
    const questions = getLessonQuestions(activeLesson.courseId, activeLesson.lessonNum);
    const currentQ = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const isCompleted = showResult && isLastQuestion && selectedAnswer === currentQ.correct;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        {renderNavigation()}
        
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Button 
            onClick={() => {
              setActiveLesson(null);
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setLessonScore(0);
            }}
            variant="outline"
            className="mb-6"
          >
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад к курсам
          </Button>

          <Card className="border-2 shadow-xl" style={{ borderColor: course?.color + '40' }}>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: course?.color + '20' }}
                  >
                    <Icon name={course?.icon as any} size={32} style={{ color: course?.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{course?.title}</CardTitle>
                    <CardDescription>Урок {activeLesson.lessonNum}</CardDescription>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  Вопрос {currentQuestion + 1}/{questions.length}
                </Badge>
              </div>
              <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
            </CardHeader>
            
            <CardContent>
              {!isCompleted ? (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">{currentQ.q}</h3>
                  
                  <div className="grid gap-4">
                    {currentQ.a.map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => !showResult && handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                          showResult
                            ? index === currentQ.correct
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : index === selectedAnswer
                              ? 'bg-red-100 border-red-500 text-red-700'
                              : 'bg-gray-100 border-gray-300 text-gray-500'
                            : 'bg-white border-gray-300 hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{answer}</span>
                          {showResult && index === currentQ.correct && (
                            <Icon name="CheckCircle" className="ml-auto text-green-600" size={24} />
                          )}
                          {showResult && index === selectedAnswer && index !== currentQ.correct && (
                            <Icon name="XCircle" className="ml-auto text-red-600" size={24} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
                    <Icon name="Trophy" size={48} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Урок завершен! 🎉</h3>
                  <p className="text-xl text-gray-600 mb-6">
                    Правильных ответов: {lessonScore + 1}/{questions.length}
                  </p>
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-lg mb-4">Награда получена:</h4>
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={32} className="text-yellow-600" />
                        <span className="text-2xl font-bold text-yellow-700">+50 НАСЫ</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={32} className="text-blue-600" />
                        <span className="text-2xl font-bold text-blue-700">+5 Кредитов</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    onClick={() => {
                      setActiveLesson(null);
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setShowResult(false);
                      setLessonScore(0);
                    }}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    Вернуться к курсам
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  switch (currentPage) {
    case 'home':
      return renderHome();
    case 'courses':
      return renderCourses();
    case 'games':
      return renderGames();
    case 'profile':
      return renderProfile();
    case 'about':
      return renderAbout();
    case 'login':
      return renderLogin();
    default:
      return renderHome();
  }
}