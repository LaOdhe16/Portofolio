from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# 1. Model untuk Project
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack = db.Column(db.String(200), nullable=False)
    link = db.Column(db.String(200), nullable=True)

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "tech_stack": self.tech_stack,
            "link": self.link
        }

# 2. Model untuk Pesan (Contact Form)
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False) # Sudah benar sesuai index.py
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 3. Model untuk Sertifikat
class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    issuer = db.Column(db.String(100), nullable=False)
    year = db.Column(db.String(4), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)