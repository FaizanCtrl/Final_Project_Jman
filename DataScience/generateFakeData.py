# # import pandas as pd
# # from faker import Faker
# # import random
# # import os

# # # Initialize Faker
# # fake = Faker()

# # # Constants
# # num_users = 10000
# # num_departments = 50
# # num_teams = 1000
# # num_courses = 200
# # num_learning_materials = 5000
# # num_quizzes = 200
# # num_questions = 30
# # num_posts = 3000
# # num_feedbacks = 5000
# # num_user_sessions = 10000
# # num_results = 2000  # Adjust this number as needed

# # # Create RAW folder if it doesn't exist
# # os.makedirs('./new_data', exist_ok=True)

# # # Generate Departments
# # departments = [{'id': i, 'name': fake.company()} for i in range(1, num_departments + 1)]

# # # Generate Teams
# # teams = [{'id': i, 'name': fake.bs(), 'departmentId': random.choice(range(1, num_departments + 1))} for i in range(1, num_teams + 1)]

# # # Generate Users
# # users = []
# # for i in range(1, num_users + 1):
# #     users.append({
# #         'id': i,
# #         'name': fake.name(),
# #         'email': fake.unique.email(),
# #         'password': fake.password(),
# #         'isAdmin': random.choice([True, False]),
# #         'departmentId': random.choice(range(1, num_departments + 1)),
# #         'teamId': random.choice(range(1, num_teams + 1))
# #     })

# # # Generate Courses
# # courses = [{'id': i, 'name': fake.catch_phrase(), 'content': fake.paragraph(), 'teamId': random.choice(range(1, num_teams + 1))} for i in range(1, num_courses + 1)]

# # # Generate Learning Materials
# # learning_materials = [{'id': i, 'title': fake.sentence(), 'type': random.choice(['article', 'video', 'document']), 'content': fake.paragraph(), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_learning_materials + 1)]

# # # Generate Quizzes
# # quizzes = [{'id': i, 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_quizzes + 1)]

# # # Generate Questions
# # questions = []
# # for quiz_id in range(1, num_quizzes + 1):
# #     for j in range(num_questions):
# #         questions.append({
# #             'id': len(questions) + 1,
# #             'quizId': quiz_id,
# #             'questionText': fake.sentence(),
# #             'answerA': fake.word(),
# #             'answerB': fake.word(),
# #             'answerC': fake.word(),
# #             'answerD': fake.word(),
# #             'correctAnswer': random.randint(1, 4)
# #         })

# # # Generate Results
# # results = []
# # for i in range(1, num_results + 1):
# #     results.append({
# #         'id': i,
# #         'userId': random.choice(range(1, num_users + 1)),  # Random user ID
# #         'quizId': random.choice(range(1, num_quizzes + 1)),  # Random quiz ID
# #         'score': random.randint(0, 100),  # Random score between 0 and 100
# #         'totalScore': 100  # Assuming the total score for each quiz is 100
# #     })

# # # Generate Posts
# # posts = [{'id': i, 'content': fake.paragraph(), 'createdAt': fake.date_time_this_year(), 'userId': random.choice(range(1, num_users + 1)), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_posts + 1)]

# # # Generate Feedback
# # feedbacks = [{'id': i, 'content': fake.paragraph(), 'rating': random.randint(1, 5), 'createdAt': fake.date_time_this_year(), 'userId': random.choice(range(1, num_users + 1)), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_feedbacks + 1)]

# # # Generate User Sessions
# # user_sessions = [{'id': i, 'userId': random.choice(range(1, num_users + 1)), 'duration': random.randint(1, 3600)} for i in range(1, num_user_sessions + 1)]


# # # Generate User Progress
# # user_progress = []
# # for user_id in range(1, num_users + 1):
# #     # Randomly decide how many learning materials this user has progressed through
# #     num_progress = random.randint(1, 10)  # Each user progresses through 1 to 10 learning materials
# #     completed_materials = random.sample(range(1, num_learning_materials + 1), num_progress)

# #     for learning_material_id in completed_materials:
# #         user_progress.append({
# #             'id': len(user_progress) + 1,
# #             'userId': user_id,
# #             'learningMaterialId': learning_material_id,
# #             'completed': True,
# #             'completedAt': fake.date_time_this_year()  # Assuming all progress is from this year
# #         })

# #     # For materials not completed, you can add them too if needed
# #     for learning_material_id in range(1, num_learning_materials + 1):
# #         if learning_material_id not in completed_materials:
# #             user_progress.append({
# #                 'id': len(user_progress) + 1,
# #                 'userId': user_id,
# #                 'learningMaterialId': learning_material_id,
# #                 'completed': False,
# #                 'completedAt': None  # Not completed means no date
# #             })


# # # Create DataFrame and Save to CSV
# # pd.DataFrame(user_progress).to_csv('./new_data/user_progress.csv', index=False)
# # pd.DataFrame(results).to_csv('./new_data/results.csv', index=False)
# # pd.DataFrame(departments).to_csv('./new_data/departments.csv', index=False)
# # pd.DataFrame(teams).to_csv('./new_data/teams.csv', index=False)
# # pd.DataFrame(users).to_csv('./new_data/users.csv', index=False)
# # pd.DataFrame(courses).to_csv('./new_data/courses.csv', index=False)
# # pd.DataFrame(learning_materials).to_csv('./new_data/learning_materials.csv', index=False)
# # pd.DataFrame(quizzes).to_csv('./new_data/quizzes.csv', index=False)
# # pd.DataFrame(questions).to_csv('./new_data/questions.csv', index=False)
# # pd.DataFrame(posts).to_csv('./new_data/posts.csv', index=False)
# # pd.DataFrame(feedbacks).to_csv('./new_data/feedbacks.csv', index=False)
# # pd.DataFrame(user_sessions).to_csv('./new_data/user_sessions.csv', index=False)

# # print("Fake data generated and saved to CSV files.")
# # ///////////////////////////


# import pandas as pd
# from faker import Faker
# import random
# import os

# # Initialize Faker
# fake = Faker()

# # Constants
# num_users = 10000
# num_departments = 50
# num_teams = 1000
# num_courses = 200
# num_learning_materials = 5000
# num_quizzes = 200
# num_questions = 30
# num_posts = 3000
# num_feedbacks = 5000
# num_user_sessions = 10000
# num_results = 2000  # Adjust this number as needed

# # Create new_data folder if it doesn't exist
# os.makedirs('./new_data', exist_ok=True)

# # Generate Departments
# departments = [{'id': i, 'name': fake.company()} for i in range(1, num_departments + 1)]

# # Generate Teams
# teams = [{'id': i, 'name': fake.bs(), 'departmentId': random.choice(range(1, num_departments + 1))} for i in range(1, num_teams + 1)]

# # Generate Users
# users = []
# for i in range(1, num_users + 1):
#     users.append({
#         'id': i,
#         'name': fake.name(),
#         'email': fake.unique.email(),
#         'password': fake.password(),
#         'isAdmin': random.choice([True, False]),
#         'departmentId': random.choice(range(1, num_departments + 1)),
#         'teamId': random.choice(range(1, num_teams + 1))
#     })

# # Generate Courses
# courses = [{'id': i, 'name': fake.catch_phrase(), 'content': fake.paragraph(), 'teamId': random.choice(range(1, num_teams + 1))} for i in range(1, num_courses + 1)]

# # Generate Learning Materials
# learning_materials = [{'id': i, 'title': fake.sentence(), 'type': random.choice(['article', 'video', 'document']), 'content': fake.paragraph(), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_learning_materials + 1)]

# # Generate Quizzes
# quizzes = [{'id': i, 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_quizzes + 1)]

# # Generate Questions
# questions = []
# for quiz_id in range(1, num_quizzes + 1):
#     for j in range(num_questions):
#         questions.append({
#             'id': len(questions) + 1,
#             'quizId': quiz_id,
#             'questionText': fake.sentence(),
#             'answerA': fake.word(),
#             'answerB': fake.word(),
#             'answerC': fake.word(),
#             'answerD': fake.word(),
#             'correctAnswer': random.randint(1, 4)
#         })

# # Generate Results
# results = []
# for i in range(1, num_results + 1):
#     results.append({
#         'id': i,
#         'userId': random.choice(range(1, num_users + 1)),  # Random user ID
#         'quizId': random.choice(range(1, num_quizzes + 1)),  # Random quiz ID
#         'score': random.randint(0, 100),  # Random score between 0 and 100
#         'totalScore': 100  # Assuming the total score for each quiz is 100
#     })

# # Generate Posts
# posts = [{'id': i, 'content': fake.paragraph(), 'createdAt': fake.date_time_this_year(), 'userId': random.choice(range(1, num_users + 1)), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_posts + 1)]

# # Generate Feedback
# feedbacks = [{'id': i, 'content': fake.paragraph(), 'rating': random.randint(1, 5), 'createdAt': fake.date_time_this_year(), 'userId': random.choice(range(1, num_users + 1)), 'courseId': random.choice(range(1, num_courses + 1))} for i in range(1, num_feedbacks + 1)]

# # Generate User Sessions
# user_sessions = [{'id': i, 'userId': random.choice(range(1, num_users + 1)), 'duration': random.randint(1, 3600)} for i in range(1, num_user_sessions + 1)]

# # Generate User Progress
# user_progress = []
# for user in users:
#     user_id = user['id']
#     team_courses = [course for course in courses if course['teamId'] == user['teamId']]
    
#     for course in team_courses:
#         course_learning_materials = [material for material in learning_materials if material['courseId'] == course['id']]
        
#         # Randomly decide how many learning materials this user has progressed through
#         if course_learning_materials:
#             num_progress = random.randint(1, len(course_learning_materials))  # Each user progresses through 1 to all learning materials
#             completed_materials = random.sample(course_learning_materials, num_progress)

#             for material in completed_materials:
#                 user_progress.append({
#                     'id': len(user_progress) + 1,
#                     'userId': user_id,
#                     'learningMaterialId': material['id'],
#                     'completed': True,
#                     'completedAt': fake.date_time_this_year()  # Completion date
#                 })

#             # For materials not completed
#             for material in course_learning_materials:
#                 if material not in completed_materials:
#                     user_progress.append({
#                         'id': len(user_progress) + 1,
#                         'userId': user_id,
#                         'learningMaterialId': material['id'],
#                         'completed': False,
#                         'completedAt': None  # Not completed means no date
#                     })

# # Create DataFrames and Save to CSV
# pd.DataFrame(user_progress).to_csv('./new_data/user_progress.csv', index=False)
# pd.DataFrame(results).to_csv('./new_data/results.csv', index=False)
# pd.DataFrame(departments).to_csv('./new_data/departments.csv', index=False)
# pd.DataFrame(teams).to_csv('./new_data/teams.csv', index=False)
# pd.DataFrame(users).to_csv('./new_data/users.csv', index=False)
# pd.DataFrame(courses).to_csv('./new_data/courses.csv', index=False)
# pd.DataFrame(learning_materials).to_csv('./new_data/learning_materials.csv', index=False)
# pd.DataFrame(quizzes).to_csv('./new_data/quizzes.csv', index=False)
# pd.DataFrame(questions).to_csv('./new_data/questions.csv', index=False)
# pd.DataFrame(posts).to_csv('./new_data/posts.csv', index=False)
# pd.DataFrame(feedbacks).to_csv('./new_data/feedbacks.csv', index=False)
# pd.DataFrame(user_sessions).to_csv('./new_data/user_sessions.csv', index=False)

# print("Fake data generated and saved to CSV files.")
# /////////////////////////////////////
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
os.makedirs('./RAW', exist_ok=True)

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
pd.DataFrame(departments).to_csv('./RAW/departments.csv', index=False)
pd.DataFrame(teams).to_csv('./RAW/teams.csv', index=False)
pd.DataFrame(users).to_csv('./RAW/users.csv', index=False)
pd.DataFrame(courses).to_csv('./RAW/courses.csv', index=False)
pd.DataFrame(learning_materials).to_csv('./RAW/learning_materials.csv', index=False)
pd.DataFrame(quizzes).to_csv('./RAW/quizzes.csv', index=False)
pd.DataFrame(questions).to_csv('./RAW/questions.csv', index=False)
pd.DataFrame(posts).to_csv('./RAW/posts.csv', index=False)
pd.DataFrame(feedbacks).to_csv('./RAW/feedbacks.csv', index=False)
pd.DataFrame(user_sessions).to_csv('./RAW/user_sessions.csv', index=False)
pd.DataFrame(results).to_csv('./RAW/results.csv', index=False)
pd.DataFrame(user_progress).to_csv('./RAW/user_progress.csv', index=False)

print("Fake data generated and saved to CSV files in RAW folder.")
