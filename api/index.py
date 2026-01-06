import os
import sys
from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
from dotenv import load_dotenv

# --- SETUP IMPORT MODELS ---
# Menangani import baik saat dijalankan lokal maupun production
try:
    from .models import db, Project, Message, Certificate
except ImportError:
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    from models import db, Project, Message, Certificate

load_dotenv()

app = Flask(__name__, template_folder='../templates', static_folder='../static')

# Konfigurasi Database
db_url = os.getenv('DATABASE_URL')
if db_url and db_url.startswith("mysql://"):
    db_url = db_url.replace("mysql://", "mysql+pymysql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url if db_url else 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('SECRET_KEY', 'rahasia_super_aman_123')

db.init_app(app)

# Route Favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, '../static/img'),
                               'profile.jpg', mimetype='image/jpeg')

# --- ROUTE UTAMA ---
@app.route('/')
def home():
    # 1. Data Diri
    me = {
        "name": "Salvado Agus Firmansyah Ode",
        "role": "Junior Cyber Security",
        "bio": "Passionate about protecting digital systems and data from cyber threats. Skilled in basic network security, vulnerability analysis, and ethical hacking fundamentals.",
        "skills": [
            {"name": "Network Defense", "percent": "85%"},
            {"name": "Penetration Testing", "percent": "75%"},
            {"name": "Digital Forensics", "percent": "70%"},
            {"name": "Python Scripting", "percent": "80%"}
        ]
    }

    # 2. Data Pendidikan (Timeline)
    education = [
        {
            "school": "Universitas Amikom Yogyakarta", 
            "degree": "S1 Teknik Komputer",
            "year": "2023 - Present",
            "description": "Focus on Network Security, Cryptography, and Web Developer",
            "status": "active"
        },
        {
            "school": "SMA Negeri 1 Kulisusu", 
            "degree": "SCIENCE MAJOR",
            "year": "2020 - 2023",
            "description": "Graduates with a special interest in Mathematics and Natural Sciences",
            "status": "completed"
        },
        {
            "school": "SMP Negeri 1 Kulisusu", 
            "year": "2017- 2020",
            "description": "Have completed junior high school education well and developed learning skills and responsibilities.",
            "status": "completed"
        },
        {
            "school": "SD Negeri 2 BANGKUDU", 
            "year": "2011- 2017",
            "description": "Have completed elementary school education well as a basis for the formation of knowledge, attitudes and discipline.",
            "status": "completed"
        }
    ]

    # 3. Data Social Media
    socials = [
        {"name": "GitHub", "username": "@LaOdhe16", "link": "https://github.com/LaOdhe16", "icon": "github", "color": "hover:text-white"},
        {"name": "LinkedIn", "username": "Salvado Odhe", "link": "https://www.linkedin.com/in/salvado-odhe-306369356/", "icon": "linkedin", "color": "hover:text-blue-400"},
        {"name": "Instagram", "username": "@elsalvtoreee", "link": "https://www.instagram.com/elsalvtoreee/", "icon": "instagram", "color": "hover:text-pink-500"},
        {"name": "Email", "username": "aryabutur94@gmail.com", "link": "mailto:email@example.com", "icon": "mail", "color": "hover:text-cyan-400"}
    ]

    # 4. Data Projects 
    try:
        projects = Project.query.limit(6).all()
        if not projects: raise Exception("DB Kosong")
    except:
        projects = [
            {"title": "YARA Malware Detection Rules", "description": "A collection of YARA rules for identifying and detecting malware patterns using YARA’s rule-based scanning syntax. The repository contains custom `.yar` signatures aimed at improving threat detection and malware analysis workflows.", "tech_stack": "YARA", "link": "https://github.com/LaOdhe16/Yara-Rule"},
            {"title": "Flappy Bird Game (Python)", "description": "A Python-based implementation of the classic Flappy Bird game, featuring game logic and assets to recreate the addictive side-scrolling bird gameplay in a desktop environment.", "tech_stack": "Python", "link": "https://github.com/LaOdhe16/Projek-Game-Flappy-Bird"},
            {"title": "Library Book Borrowing System", "description": "A web-based library management and book borrowing application built with Flask and MySQL, featuring user authentication, book search, borrowing/returning functions, and admin book management.", "tech_stack": "Python, Flask, MySQL, Bootstrap", "link": "https://github.com/LaOdhe16/Library_Management"},
            {"title": "HomeService", "description": "HomeService is a web-based platform built with Python and Flask to manage household service bookings, hosted on Microsoft Azure with a MySQL database.", "tech_stack": "Python, Flask, Azure For MySQL, Azure APP Service", "link": "https://github.com/LaOdhe16/HomeService"}
        ]

    # 5. Data Certificates 
    try:
        certificates = Certificate.query.all()
        if not certificates: raise Exception("DB Kosong")
    except:
        certificates = [
            {"title": "CCNA Introduction to Networks", "issuer": "CISCO", "year": "2025", "image_url": "/static/img/ccna-intro.png"},
            {"title": "CCNA: Enterprise Networking", "issuer": "CISCO", "year": "2025", "image_url": "/static/img/ccna-enterprise.png"},
            {"title": "CCNA: Switching, Routing", "issuer": "CISCO", "year": "2025", "image_url": "/static/img/ccna-switching.png"},
            {"title": "Cybersecurity Educator", "issuer": "RED TEAM LEADERS", "year": "2025", "image_url": "/static/img/ccep.png"},
            {"title": "Phishing Prevention (CPPS)", "issuer": "Hack & Fix", "year": "2025", "image_url": "/static/img/cpps.png"},
            {"title": "Malware Analysis Intro", "issuer": "RED TEAM LEADERS", "year": "2025", "image_url": "/static/img/malware-intro.png"}
        ]

    return render_template('index.html', me=me, projects=projects, certificates=certificates, socials=socials, education=education)

@app.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            email = request.form.get('email')
            content = request.form.get('message')
            
            # Validasi input kosong
            if not name or not email or not content:
                flash('All fields must be filled!', 'error')
                return redirect(url_for('home') + '#contact')

            new_msg = Message(name=name, email=email, content=content)
            db.session.add(new_msg)
            db.session.commit()
            flash('Message Encrypted & Sent Successfully!', 'success')
        except Exception as e:
            # FIX: Print error agar terlihat di terminal & Rollback DB
            print(f"ERROR CONTACT: {e}") 
            db.session.rollback()
            flash('Transmission Failed. Check Connection.', 'error')
            
        return redirect(url_for('home') + '#contact')

@app.route('/setup-db')
def setup_db():
    try:
        with app.app_context():
            db.create_all()
        return "Database Initialized Successfully."
    except Exception as e:
        return f"Error: {e}"

if __name__ == '__main__':
    app.run(debug=True)
