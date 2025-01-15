import unittest
from unittest.mock import patch, MagicMock
import mysql.connector
from app import app
import json

class FlaskAPITestCase(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        cls.client = app.test_client()
        app.config['TESTING'] = True

    def test_health_endpoint(self):
        """Test the /health endpoint."""
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'status': 'healthy'})

    @patch('mysql.connector.connect')
    def test_get_dogs_success(self, mock_connect):
        """Test the /api/dogs endpoint for successful dog data retrieval."""
        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = [
            ('Buddy', 'Golden Retriever', 3, 'A friendly dog'),
            ('Max', 'Beagle', 2, 'A playful dog'),
        ]
        mock_cursor.column_names = ['name', 'breed', 'age', 'description']
        mock_connect.return_value.cursor.return_value = mock_cursor

        response = self.client.get('/api/dogs')

        self.assertEqual(response.status_code, 200)
        expected_data = [
            {'name': 'Buddy', 'breed': 'Golden Retriever', 'age': 3, 'description': 'A friendly dog'},
            {'name': 'Max', 'breed': 'Beagle', 'age': 2, 'description': 'A playful dog'},
        ]
        expected_json = json.dumps(expected_data)
        self.assertEqual(response.data, expected_json.encode('utf-8')) 

    @patch('mysql.connector.connect')
    def test_get_dogs_db_error(self, mock_connect):
        """Test the /api/dogs endpoint for database connection errors."""
        mock_connect.side_effect = mysql.connector.Error("Database connection failed")

        response = self.client.get('/api/dogs')

        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json, {'message': 'error', 'error': 'Database connection failed'})

    @patch('mysql.connector.connect')
    def test_adoption_db_error(self, mock_connect):
        """Test the /api/adoption endpoint for database insertion errors."""
        mock_cursor = MagicMock()
        mock_connect.return_value.cursor.return_value = mock_cursor
        
        mock_cursor.execute.side_effect = mysql.connector.Error("Database insertion failed")
        
        data = {
            'dogName': 'Daisy',
            'breed': 'Poodle',
            'age': 2,
            'description': 'A cute dog'
        }

        response = self.client.post('/api/adoption', json=data)

        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json, {'message': 'error', 'error': 'Database insertion failed'})

    @patch('mysql.connector.connect')
    def test_adoption_success(self, mock_connect):
        """Test the /api/adoption endpoint for successful database insertion."""
        mock_cursor = MagicMock()
        mock_connect.return_value.cursor.return_value = mock_cursor

        mock_cursor.execute.return_value = None
        mock_cursor.fetchall.return_value = []
        mock_connect.return_value.commit.return_value = None

        data = {
            'dogName': 'Daisy',
            'breed': 'Poodle',
            'age': 2,
            'description': 'A cute dog'
        }

        response = self.client.post('/api/adoption', json=data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'ok'})

if __name__ == '__main__':
    unittest.main()
