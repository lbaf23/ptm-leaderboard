from psycopg2 import pool


class PostgreSQL:
    def __init__(self, config):
        try:
            self.connectPool = pool.SimpleConnectionPool(
                2,
                10,
                host=config.get('config', 'dbHost'),
                port=config.get('config', 'dbPort'),
                user=config.get('config', 'dbUser'),
                password=config.get('config', 'dbPassword'),
                database=config.get('config', 'dbName'),
                keepalives=1,
                keepalives_idle=30,
                keepalives_interval=10,
                keepalives_count=5
            )
        except Exception as e:
            print(e)

    def get_connect(self):
        conn = self.connectPool.getconn()
        cursor = conn.cursor()
        return conn, cursor

    def close_connect(self, conn, cursor):
        cursor.close()
        self.connectPool.putconn(conn)

    def close_all(self):
        self.connectPool.closeall()

    def execute(self, sql, value=None):
        conn, cursor = self.get_connect()
        try:
            res = cursor.execute(sql, value)
            conn.commit()
            return res, True
        except Exception as e:
            print(e)
            conn.rollback()
            return None, False
        finally:
            self.close_connect(conn, cursor)

    def select_one(self, sql):
        conn, cursor = self.get_connect()
        cursor.execute(sql)
        result = cursor.fetchone()
        self.close_connect(conn, cursor)
        return result

    def select_all(self, sql):
        conn, cursor = self.get_connect()
        cursor.execute(sql)
        result = cursor.fetchall()
        self.close_connect(conn, cursor)
        return result
