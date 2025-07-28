import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
if not os.path.exists("files"):
    os.mkdir("files")
if not os.path.exists("files/log.txt"):
    writer = open("files/log.txt","w")
    writer.write("====This is the begining of logs====\n")
EXCEL_FILE = "files/data.xlsx"
if not os.path.exists(EXCEL_FILE):
    with pd.ExcelWriter(EXCEL_FILE) as writer:
        pd.DataFrame(columns=['id','name', 'category', 'quantity']).to_excel(writer,sheet_name="Items",index=False)
        pd.DataFrame(columns=["id","name"]).to_excel(writer,sheet_name="Categories",index=False)

def fetchData():
    return pd.read_excel(EXCEL_FILE,sheet_name=["Items","Categories"])
def saveData(items,categories):
    with pd.ExcelWriter(EXCEL_FILE) as writer:
        items.to_excel(writer,sheet_name="Items",index=False)
        categories.to_excel(writer,sheet_name="Categories",index=False)

def postLog(message):
    with open("files/log.txt","a") as writer:
        writer.write(f"{message} on {datetime.now()}\n ")


@app.route("/categories",methods=["GET","POST","DELETE"])
def categories():
    data = fetchData()
    categories = data["Categories"]
    if request.method == "POST":
        newCategory = request.json
        newId = categories["id"].max() + 1 if not categories.empty else 1
        newRow = pd.DataFrame([{
            "id":newId,
            "name":newCategory["name"]
        }])
        categories = pd.concat([categories,newRow],ignore_index=True)
        saveData(data["Items"],categories)
        postLog(f"""Added '{newCategory["name"]}'""")
        return jsonify({"msg":"Category added successfully"}), 201
    if request.method == "DELETE":
        deletingCategory = request.json
        data = fetchData()
        categories = data["Categories"]
        afterDrop = categories.query(f"""name != '{deletingCategory["name"]}'""")
        saveData(data["Items"],afterDrop)
        postLog(f"""Deleted '{deletingCategory["name"]}'""")
        return jsonify({"msg":"Item deleted successfully"}), 201

        
    return jsonify(categories.to_dict('records'))

@app.route("/items",methods=["GET","POST","DELETE"])
def items():
    data = fetchData()
    items = data["Items"]
    if request.method == "POST":
        newItem = request.json
        newId = items["id"].max() + 1 if not items.empty else 1
        newRow = pd.DataFrame([{
            "id": newId,
            "name": newItem["name"],
            "category": newItem["category"],
            "quantity": newItem["quantity"]
        }])
        items = pd.concat([items,newRow],ignore_index=True)
        saveData(items,data["Categories"])
        postLog(f"Added {newItem["name"]} in {newItem["category"]} category with {newItem["quantity"]} quantity")
        return jsonify({"msg":"Item added successfully"}), 201
    
    if request.method == "DELETE":
        deletingItem = request.json
        data = fetchData()
        items = data["Items"]
        afterDrop = items.query(f"""name != '{deletingItem["name"]}'""")
        saveData(afterDrop,data["Categories"])
        postLog(f"Deleted {deletingItem["name"]}")
        return jsonify({"msg":"Item added successfully"}), 201

    return jsonify(items.to_dict('records'))

@app.route("/items/<int:item_id>/withdraw",methods=["POST"])
def withdraw_item(item_id):
    data = fetchData()
    items = data['Items']
    
    item = items[items['id'] == item_id]
    if item.empty:
        return jsonify({'error': 'Item not found'}), 404
    
    amount = request.json.get('amount', 0)
    old_quantity = items.loc[items['id'] == item_id, 'quantity'].values[0]
    if old_quantity < amount:
        return jsonify({'message': 'Not enough quantity'}), 401
    items.loc[items['id'] == item_id, 'quantity'] -= amount
    
    saveData(items, data['Categories'])
    postLog(f"Withdraw {amount} from {item['name']} ")
    return jsonify({'message': 'Item withdrawn successfully'})

@app.route("/items/<int:item_id>/restock",methods=["POST"])
def restock_item(item_id):
    data = fetchData()
    items = data['Items']
    
    item = items[items['id'] == item_id]
    if item.empty:
        return jsonify({'error': 'Item not found'}), 404
    
    amount = request.json.get('amount', 0)
    old_quantity = items.loc[items['id'] == item_id, 'quantity'].values[0]
    items.loc[items['id'] == item_id, 'quantity'] += amount
    
    saveData(items, data['Categories'])
        
    postLog(f"Restocked {amount} to {item['name']} ")
    return jsonify({'message': 'Item restocked successfully'})

@app.route("/logs",methods=["GET"])
def logging():
    logs = open("files/log.txt","r")
    return logs.read().replace("\n","<br/><br/>")

app.run(debug=True)