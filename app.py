import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def homepage():
    dados_select = [
        {
            'key': "Hamburger",
            'value': "HAMBURGUER"
        },
        {
            'key': "Pão",
            'value': "PAO"
        },
        {
            'key': "Massa",
            'value': "MASSA"
        },
    ]
    return render_template('index.html', dados=dados_select)

@app.route('/form_home', methods=['POST'])
def form_home():
    name = request.form['name']
    order = request.form['order']
    hour = request.form['hour']
    payment_method = request.form['payment_method']

    valor = {
        'name': name,
        'order': order,
        'hour': hour,
        'payment_method': payment_method
    }


    return jsonify(valor)

if __name__ == '__main__':
    app.run()
