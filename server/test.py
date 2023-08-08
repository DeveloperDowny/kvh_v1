import networkx as nx
import matplotlib.pyplot as plt

# Provided list of transactions
transactions = [
    {
        "type": "tx",
        "network": "BTC",
        "block_no": 573346,
        "height": 573346,
        "index": 808,
        "time": 1556296856,
        "txid": "83f86073df488e6f32acce48db40e86c4931ebe2a4f520641b1f12d96b00aa3b",
        "fee": "0.00010775",
        "confirmations": 193054,
        "inputs": [
            {
                "input_no": 0,
                "address": "1AqSbAsXh3zxE8Z61afpU65u4pxB9BBRcz",
                "value": "0.07920632",
                "received_from": {
                    "output_no": 0,
                    "txid": "fdc072a98dd017a8f3c0bcb0569f0b0ee33ef16a9dfb0e96e50866463e038142"
                }
            }
        ],
        "outputs": [
            {
                "output_no": 0,
                "address": "1PuaubWLayAxAF8sAq6r41BAVYhSKAK4Nr",
                "value": "0.07849857"
            },
            {
                "output_no": 1,
                "address": "17hLEAaZsaRxeBvpYB3JUjrwtSG8tUQaDG",
                "value": "0.0006"
            }
        ],
        "inputCnt": 1,
        "outputCnt": 2
    },
    {
        "type": "tx",
        "network": "BTC",
        "block_no": 573331,
        "height": 573331,
        "index": 11,
        "time": 1556288370,
        "txid": "fdc072a98dd017a8f3c0bcb0569f0b0ee33ef16a9dfb0e96e50866463e038142",
        "fee": "0.00170771",
        "confirmations": 193069,
        "inputs": [
            {
                "input_no": 0,
                "address": "1HG1kf8JcMCaQgh7d5YH5JFyy8soM4cRyK",
                "value": "0.08151403",
                "received_from": {
                    "output_no": 1,
                    "txid": "cd957a317f547ff23f623ba47067cc294297fadef89fb0e3bd229f226c43c498"
                }
            }
        ],
        "outputs": [
            {
                "output_no": 0,
                "address": "1AqSbAsXh3zxE8Z61afpU65u4pxB9BBRcz",
                "value": "0.07920632"
            },
            {
                "output_no": 1,
                "address": "17vuVSWNNRzE7HVRasQSSw5gqNPUH1UNyj",
                "value": "0.0006"
            }
        ],
        "inputCnt": 1,
        "outputCnt": 2
    }
]

# Create a directed graph
G = nx.DiGraph()

# Add transactions as edges
for transaction in transactions:
    for input_address in transaction["inputs"]:
        sender = input_address["address"]
        for output_address in transaction["outputs"]:
            receiver = output_address["address"]
            G.add_edge(sender, receiver)

# Perform connected components analysis
clusters = list(nx.strongly_connected_components(G))

# Print clusters
print("Address Clusters:")
for idx, cluster in enumerate(clusters):
    print(f"Cluster {idx + 1}: {cluster}")

# Visualization (optional)
pos = nx.spring_layout(G)
nx.draw_networkx_nodes(G, pos)
nx.draw_networkx_edges(G, pos)
nx.draw_networkx_labels(G, pos)
plt.show()
