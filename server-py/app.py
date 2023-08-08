from flask import Flask, request, jsonify
import pickle
import pandas as pd
import requests

model = pickle.load(open("server-py/agb_model.pkl", "rb"))



app = Flask(__name__)

@app.route('/get_data', methods=['GET'])
def get_data():
    # Get the 'id' parameter from the query string
    id_param = request.args.get('id')
    
    # Check if 'id' parameter is provided
    if id_param is None:
        return jsonify({'error': 'Missing "id" parameter'}), 400
    
    # Make a request to the external API
    api_key = '6jk1pKXjCGxjiXnT6ASc'  # Replace with your API key
    api_url = f'https://services.tokenview.io/vipapi/eth/address/{id_param.lower()}?apikey={api_key}'
    
    try:
        response = requests.get(api_url)
        response_data = response.json()
        print(response_data)
        return jsonify(response_data), 200
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch data from the external API'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
