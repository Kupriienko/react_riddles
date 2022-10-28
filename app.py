from flask import Flask, request, abort
import psycopg2
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r'*': {'origins': ['http://localhost:3000', 'http://127.0.0.1:5000']}})

con = psycopg2.connect(
    host=os.getenv('HOST'),
    database=os.getenv('DATABASE'),
    user=os.getenv('USER'),
    password=os.getenv('PASSWORD'),
    port=os.getenv('DB_PORT')
)
cur = con.cursor()


@app.route('/addRiddle', methods=['POST'])
def add_riddle() -> str:
    data = request.get_json()
    if type(data) != dict or data.keys() != {'riddle', 'answer'}:
        abort(400)
    riddle = data['riddle'], data['answer']
    cur.execute('insert into riddles (riddle, solution) values (%s, %s) returning id', riddle)
    con.commit()
    return str(cur.fetchone()[0])


@app.route('/verifyAnswer', methods=['GET'])
def get_answer() -> dict[str, bool]:
    data = request.args.to_dict()
    if type(data) != dict or (data.keys() != {'answer', 'id'} or not data['id'].isnumeric()):
        abort(400)
    cur.execute('select solution from riddles where id = %s', (data['id'],))
    answer = cur.fetchall()
    if len(answer) == 1:
        return {'correct': answer[0][0] == data['answer']}
    else:
        abort(404)


@app.route('/', methods=['GET'])
def index() -> dict[str, list[dict[str, int]]]:
    data = []
    cur.execute('select id, riddle from riddles')
    for i in cur.fetchall():
        data.append({'id': i[0], 'riddle': i[1]})
    return {'riddles': data}
