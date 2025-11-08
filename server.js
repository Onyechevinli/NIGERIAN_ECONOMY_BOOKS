const express = require('express');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Sample book data
const BOOKS = [
    {
        id: 1,
        title: 'Understanding Nigeria\'s Economic Challenges',
        author: 'Dr. Chinedu Okoro',
        price: 4500,
        description: 'A comprehensive analysis of Nigeria\'s economic struggles and potential solutions.',
        image: 'book1.jpg'
    },
    {
        id: 2,
        title: 'The Path to Economic Recovery',
        author: 'Prof. Adeola Johnson',
        price: 5200,
        description: 'Practical strategies for navigating and overcoming economic hardships in Nigeria.',
        image: 'book2.jpg'
    },
    {
        id: 3,
        title: 'Entrepreneurship in Tough Times',
        author: 'Bola Ahmed',
        price: 3800,
        description: 'How to start and grow businesses despite economic challenges.',
        image: 'book3.jpg'
    },
    {
        id: 4,
        title: 'Financial Survival Guide',
        author: 'Chioma Eze',
        price: 4200,
        description: 'Personal finance management during economic instability.',
        image: 'book4.jpg'
    }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layout');

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Nigeria Economic Insight - Books & Analysis by Vincent',
        activePage: 'home'
    });
});

app.get('/economy', (req, res) => {
    const economicIssues = [
        "High inflation rates affecting purchasing power",
        "Unemployment and underemployment challenges",
        "Naira depreciation and foreign exchange issues",
        "Infrastructure deficits",
        "Dependence on oil exports",
        "Rising cost of living",
        "Power supply challenges",
        "Security concerns affecting investments"
    ];
    
    const solutions = [
        "Diversification of the economy",
        "Investment in agriculture and manufacturing",
        "Improving infrastructure",
        "Encouraging local production",
        "Digital economy development",
        "Youth empowerment programs"
    ];
    
    res.render('economy', { 
        title: 'Economic Analysis - Nigeria',
        activePage: 'economy',
        issues: economicIssues,
        solutions: solutions
    });
});

app.get('/books', (req, res) => {
    res.render('books', { 
        title: 'Books - Economic Solutions',
        activePage: 'books',
        books: BOOKS
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact Us',
        activePage: 'contact',
        success: false,
        name: ''
    });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In a real application, you would save this to a database
    console.log('Contact form submission:', { name, email, message });
    
    res.render('contact', { 
        title: 'Contact Us',
        activePage: 'contact',
        success: true,
        name: name
    });
});

// API Routes
app.get('/api/books', (req, res) => {
    res.json(BOOKS);
});

app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = BOOKS.find(book => book.id === bookId);
    
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Error handling middleware
app.use((req, res) => {
    res.status(404).render('error', { 
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist.'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});