import psycopg2
from datetime import datetime

# 连接到数据库
conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="postgres",
    password="admin"
)

# 创建一个新的游标对象
cur = conn.cursor()

# 插入一条新的记录
cur.execute(
    "INSERT INTO expense (crated_date, updated_date, date, description, amount) VALUES (%s, %s, %s, %s, %s)",
    (datetime.now(), datetime.now(), datetime.now(), "Lunch", 15.50)
)
conn.commit()

# 查询记录
cur.execute("SELECT * FROM expense")
rows = cur.fetchall()
for row in rows:
    print(row)

# 更新记录
cur.execute(
    "UPDATE expense SET description = %s WHERE id = %s",
    ("Dinner", 1)
)
conn.commit()

# 删除记录
cur.execute(
    "DELETE FROM expense WHERE id = %s",
    (1,)
)
conn.commit()

# 关闭游标和连接
cur.close()
conn.close()