import pandas as pd
from faker import Faker
import random
import os

# Initialize Faker
fake = Faker()

# Constants
num_users = 10000
num_courses = 200
num_learning_materials = 5000
num_quizzes = 200
num_questions = 30
num_posts = 3000
num_feedbacks = 5000
num_user_sessions = 10000
num_results = 2000  # Adjust this number as needed
num_user_progress = 30000  # Number of user progress entries

# Predefined Departments and Teams
departments_data = [
    ('Development', ['Frontend', 'Backend', 'Full Stack']),
    ('Quality Assurance', ['QA', 'Automation', 'Performance']),
    ('DevOps', ['Cloud', 'Infrastructure', 'Security']),
    ('Product Management', ['Product Design', 'Product Analysis']),
    ('Human Resources', ['Recruitment', 'Training']),
    ('Sales', ['Inside Sales', 'Field Sales']),
    ('Marketing', ['Content Marketing', 'SEO']),
    ('Customer Support', ['Technical Support', 'Customer Success']),
    ('IT Support', ['Help Desk', 'Network Administration']),
    ('Research and Development', ['Innovation', 'Prototyping'])
]

# Create RAW folder if it doesn't exist
os.makedirs('./data', exist_ok=True)

# Generate Departments and Teams
departments = []
teams = []
for i, (department_name, team_names) in enumerate(departments_data, start=1):
    departments.append({'id': i, 'name': department_name})
    for team_name in team_names:
        teams.append({'id': len(teams) + 1, 'name': team_name, 'departmentId': i})

# Generate Users
users = []
for i in range(1, num_users + 1):
    users.append({
        'id': i,
        'name': fake.name(),
        'email': fake.unique.email(),
        'password': fake.password(),
        'isAdmin': random.choice([True, False]),
        'departmentId': random.choice(range(1, len(departments) + 1)),
        'teamId': random.choice(range(1, len(teams) + 1))
    })

# Generate Courses
courses = [{'id': i, 'name': fake.catch_phrase(), 'content': fake.paragraph(), 'teamId': random.choice(range(1, len(teams) + 1))} for i in range(1, num_courses + 1)]

# Generate Learning Materials
learning_materials = [{'id': i, 'title': fake.sentence(), 'type': random.choice(['article', 'video', 'document']), 'content': fake.paragraph(), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_learning_materials + 1)]

# Generate Quizzes
quizzes = [{'id': i, 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_quizzes + 1)]

# Generate Questions
questions = []
for quiz_id in range(1, num_quizzes + 1):
    for j in range(num_questions):
        questions.append({
            'id': len(questions) + 1,
            'quizId': quiz_id,
            'questionText': fake.sentence(),
            'answerA': fake.word(),
            'answerB': fake.word(),
            'answerC': fake.word(),
            'answerD': fake.word(),
            'correctAnswer': random.randint(1, 4)
        })

# Generate Results
results = []
for i in range(1, num_results + 1):
    results.append({
        'id': i,
        'userId': random.choice(range(1, num_users + 1)),  # Random user ID
        'quizId': random.choice(range(1, num_quizzes + 1)),  # Random quiz ID
        'score': random.randint(0, 100),  # Random score between 0 and 100
        'totalScore': 100  # Assuming the total score for each quiz is 100
    })

# Generate Posts
posts = [{'id': i, 'content': fake.paragraph(), 'createdAt': fake.date_time_this_year(), 'userId': random.choice(range(1, num_users + 1)), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_posts + 1)]

# Generate Feedback
feedbacks = [{'id': i, 'content': fake.paragraph(), 'rating': random.randint(1, 5), 'createdAt': fake.date_time_this_year(), 'userId': random.choice(range(1, num_users + 1)), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_feedbacks + 1)]

# Generate User Sessions
user_sessions = [{'id': i, 'userId': random.choice(range(1, num_users + 1)), 'duration': random.randint(1, 3600)} for i in range(1, num_user_sessions + 1)]

# Generate User Progress
user_progress = []
for _ in range(num_user_progress):
    user_id = random.choice(users)['id']
    team_courses = [course for course in courses if course['teamId'] == users[user_id - 1]['teamId']]
    
    if team_courses:
        course = random.choice(team_courses)
        course_learning_materials = [material for material in learning_materials if material['courseId'] == course['id']]
        
        if course_learning_materials:
            learning_material = random.choice(course_learning_materials)
            completed = random.choice([True, False])
            user_progress.append({
                'id': len(user_progress) + 1,
                'userId': user_id,
                'learningMaterialId': learning_material['id'],
                'completed': completed,
                'completedAt': fake.date_time_this_year() if completed else None
            })

# Create DataFrames and Save to CSV in RAW folder
pd.DataFrame(departments).to_csv('./data/departments.csv', index=False)
pd.DataFrame(teams).to_csv('./data/teams.csv', index=False)
pd.DataFrame(users).to_csv('./data/users.csv', index=False)
pd.DataFrame(courses).to_csv('./data/courses.csv', index=False)
pd.DataFrame(learning_materials).to_csv('./data/learning_materials.csv', index=False)
pd.DataFrame(quizzes).to_csv('./data/quizzes.csv', index=False)
pd.DataFrame(questions).to_csv('./data/questions.csv', index=False)
pd.DataFrame(posts).to_csv('./data/posts.csv', index=False)
pd.DataFrame(feedbacks).to_csv('./data/feedbacks.csv', index=False)
pd.DataFrame(user_sessions).to_csv('./data/user_sessions.csv', index=False)
pd.DataFrame(results).to_csv('./data/results.csv', index=False)
pd.DataFrame(user_progress).to_csv('./data/user_progress.csv', index=False)

print("Fake data generated and saved to CSV files in RAW folder.")
