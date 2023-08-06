import json
from flask import Flask, request, jsonify
from .types import RiskReport
from .exceptions import RequestedNullReport, EndPointException
import urllib3
from urllib3.exceptions import ProtocolError
import os

app = Flask(__name__)

url = "https://risk.charybdis.januus.io/"

__http__ = urllib3.PoolManager()

def perform_risk_report(eth_addresses):
    payload = {"ethAddresses": eth_addresses, "btcAddresses": []}
    
    if not any(eth_addresses):
        raise RequestedNullReport()

    try:
        r = __http__.request('POST', url,
                             headers={'Content-Type': 'application/json'},
                             body=json.dumps(payload).encode("utf-8"))
        
        json_response = json.loads(r.data.decode('utf-8'))

        return RiskReport.from_dict(json_response)
    except ProtocolError:
        raise EndPointException()

@app.route('/riskreport', methods=['POST'])
def risk_report():
    try:
        data = request.json
        eth_address = data.get('eth_address')
        if eth_address is None:
            return jsonify({'error': 'Ethereum address not provided'}), 400
        
        risk_report = perform_risk_report([eth_address])
        
        return jsonify(risk_report.to_dict())
    except RequestedNullReport:
        return jsonify({'error': 'RequestedNullReport'}), 400
    except EndPointException:
        return jsonify({'error': 'EndPointException'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
