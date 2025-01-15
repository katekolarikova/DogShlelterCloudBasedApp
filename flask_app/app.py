import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import mysql.connector
import json

app = Flask(__name__)


CORS(app)


default_config = {
    'user': os.getenv('MYSQL_USER_USERNAME'),
    'password': os.getenv('MYSQL_USER_PASSWORD'),
    'host': os.getenv('MYSQL_HOST'),
    'port': os.getenv('MYSQL_PORT'),
    'database': os.getenv('MYSQL_DATABASE'),
}


def get_dogs_db(db_config=default_config):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        cursor.execute('SELECT name, breed, age, description FROM dogs')
        
        rows = cursor.fetchall()

        columns = cursor.column_names
        
        results = []
        for row in rows:
            results.append({
                columns[0]: row[0],  # 'name'
                columns[1]: row[1],  # 'breed'
                columns[2]: row[2],  # 'age'
                columns[3]: row[3]   # 'description'
            })

        cursor.close()
        connection.close()

        return json.dumps(results)

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'message': 'error', 'error': str(err)}), 500


@app.route('/test_db', methods=['GET'])
def get_db_dogs():
    return  get_dogs_db()


@app.route('/api/dogs', methods=['GET'])
def get_dogs():
    return get_dogs_db()


@app.route('/api/adoption', methods=['POST'])
def adoption(db_config=default_config):
    data = request.get_json()

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        insert_query = """
        INSERT INTO dogs (name, breed, age, description)
        VALUES (%s, %s, %s, %s)
        """

        values = (
            data.get('dogName'),
            data.get('breed'),
            data.get('age'),
            data.get('description')
        )

        cursor.execute(insert_query, values)

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({'message': 'ok'}), 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'message': 'error', 'error': str(err)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy'
    }), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2222)