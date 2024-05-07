from flask import Flask, request
import psycopg2
from datetime import datetime

app = Flask(__name__)

@app.route('/expense', methods=['POST'])
def create_expense():
    data = request.get_json()

    conn = psycopg2.connect(
        host="localhost",
        database="postgres",
        user="postgres",
        password="admin"
    )
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO expense (crated_date, updated_date, date, description, amount) VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (datetime.now(), datetime.now(), datetime.now(), data['description'], data['amount'])
    )
    expense_id = cur.fetchone()[0]
    for tag in data['tags']:
        # 检查tag是否已经存在
        cur.execute("SELECT id FROM tags WHERE tag = %s", (tag,))
        result = cur.fetchone()

        if result is None:
            cur.execute("INSERT INTO tags (crated_date, updated_date, tag) VALUES (%s, %s, %s) RETURNING id", (datetime.now(), datetime.now(), tag,))
            tag_id = cur.fetchone()[0]
        else:
            tag_id = result[0]

        # 创建expense和tag之间的关系
        cur.execute("INSERT INTO expense_tags (crated_date, updated_date, expense_id, tag_id) VALUES (%s, %s, %s, %s)", (datetime.now(), datetime.now(), expense_id, tag_id))
   
    conn.commit()

    cur.close()
    conn.close()

    return {'status': 'success'}, 201

if __name__ == '__main__':
    app.run(debug=True)