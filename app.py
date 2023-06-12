from flask import Flask, render_template, request, jsonify
import requests

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

@app.route('/concluirPagamento', methods=['POST'])
def processar_pagamento():
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

    jsonify(valor)
    
    qr_code_data = processar_pagamento_api(name, order, hour)

    return render_template('pagamentoFinalizado.html', qr_code_data=qr_code_data, valor=valor)
    # return jsonify(qr_code_data=qr_code_data)

def processar_pagamento_api(name, order, hour):
    pedido = {
        'name': name,
        'order': order,
        'hour': hour
    }

    # response = requests.post('http://127.0.0.1:3000/generatePayment', json=payload)
    response = requests.get('https://dummyjson.com/products/search?q=Laptop')

    if response.status_code == 200:
        # qr_code_data = response.json().get('qr_code_data')
        qr_code_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAARGUlEQVR42u3dsZLbxhKFYejGpAOp9Jb7ACo9gMqx9JYbKOA6pwNfuly2yJ5lz5nuA/xfFSILwGAwanuxxz0frtfrdQMAA/+rHgAAjKJgAbBBwQJgg4IFwAYFC4ANChYAGxQsADYoWABsULAA2KBgAbBBwQJgg4IFwAYFC4ANChYAGxQsADYoWABsULAA2KBgAbBBwQJgg4IFwAYFC4ANChYAGxQsADYoWABsULAA2KBgAbBBwQJgg4IFwAYFC4ANChYAGxQsADYoWABsULAA2GhTsD59+rR9+PBht0fkx48f2/l8/s955/N5+/HjR/XruTu+6Bgdv/r51dc/+vpd5cP1er1WD2Lb/nrhP3/+rB6GTDTN5/N5++OPP375z06n0/b29lY6/kfji4yMX/386usfff2uQsFaJJrm6N9i1a8p+2/Z6udXX//o63eVNj8SAkCEggXABgULgA0KFkIzPvhH1zidTk/9s07PCD0KFh56e3vbvnz5kr7O169fHxaFb9++/bIwnU6n7ffff5c/ZzQ+NHFt4uPHj9dt2+4er6+v1UNMjT/y6NwZr+n79+/X0+kU3mf1cTqdrt+/f396/KPnq8d39PW7ik2s4fX1dfv8+XP1MJ8efzTN6l+7Z3JUaityWplYxsj1j75+V+FHwoPoWqxGx/boz6ifrfPcHQ0FC4ANChYAGxQsADYoWCayv3JfkWVSjq06p4UeKFgmsjmhezmnaqM5q+qcFpqozlXcZHMsmyAjtL0jh6LOYd07RnNC91wul+vLy0t4n5eXl+vlcpl+/irV73/v63eV3eSw1E3GomlS57AeyfZzent723777beHf+ZyuWzn81ly/grq9jhHX7+r8CPhDmRzQiOF5NGfyZ4PjKJgAbBBwQJgg4IFwAYFayeqW6N0z0l1GAPyKFg7Ud3PqXtOqmsODe9Unau4OXqORTXuWf2i1FT9uqLnH82RZd//3tfvKuSwBkXTVJnDiszoF6VeJsp+XdHzj+TIsu9/7+t3FX4kPACHfk7KMUbXJiPmg4IFwAYFC4ANChYAGxSsJo7+K/fq5++eI8NfKFhNHD0nVP383XNk+L/qXMUNOZZfG80JZcefPb/KrBxVFut3Df4Lq7nz+bx9+/atehhtMT/HQsEyQE7oMebnOChYAGxQsADYoGABsEHBMrCibYx7Dsl9/BhDwWru7e1t+/Lli/w+7jkk9/FjUHWu4iabY6mWzbGo+kGN3r+7e/OT3Zdx1vWPvn5X2U0/rGrZfkLKflAj9+/u0fxk92Wccf2jr99V+JGwCYeeVZUezc+MuVNfH3NQsADYoGABsEHBAmCDggUL5KywbRQsmCBnhW3b+gQsohyI+xGJzn95ebleLpf/nDerH1Q2h+R+fnb+jr5+V7HJYbmLpjnal+5yudxtozJjX71sDsn9/Oy+jEdfv6tQsBbJFizO733+0dfvKnzDAmCDggXABgULgA0KVhPqnFH00Tl7/8z5M/p9VY4f61CwmlDnjL5+/fqwMGTv/+z5s/p9VY0fi1XnKjDH9mS+pjonNXpkqftpYY02sQbkRL+Wf6Q6JzUiu0zV/bSwBgVrJzIFa9vqc07Z8UWy40cPfMMCYIOCBcAGBQuADQoWynNSanxQ3w8K1sFV56TUVu3riEWqcxU3z+Z01PvSZY9VOZ9oHPf6ac16/mep+3mpxz+qOsfWff2OahNryOR01PvSZa3I+WT6ac14/swyUvfzUo9/RHWOLaNTTq1Nweqe08lST/PRc1LV4+/+fFlNygTfsAD4oGABsEHBAmBjFwUr++ty9QfFFb/OV/aDGpGdw+rxqzk/X6e5tS9Y2X5F6pzOqn5Kqn5Qo6J+W93Hr+b6fO36gVXnKm624hxR9ojGF+nar2k0J3XvcBl/xP39ZNdnFzaxBnWOKCsaX6Rzv6aRnNQjDuOP/hq4v5/s+uzCpmBFw3TPqXTv19Q955Qdf3Z9uT+fC/tvWACOg4IFwAYFC4ANCtYk1TkktcwYqsffYd/D7s/ngoI1SXUOSe3ZHFD1+Lvse9j9+WxU5yputmROJjq/66Huh1SdE1o1/up+WNU5wOzzdc2Z/RuxhgbU/ZCqc0Irxl/dD6s6B5h9vs45s3+iYDWhfr7q11y9b2L2+urnU8vOX/X6ueEbFgAbFCwANihYAGy0KVjO/YK66zA36hxX535e1bLz1+nZ2hQs135B3VXnhG7UOa6u/byqZeevy/r5W3WuYtSzOZFsP6fR416/oVn9mJ69v3p+Z53f9f1X55CO1u8q0ibWEMnkRLL9nEY86jc0ox9Ttl9YRLlvnnrfSPX7r84hHanfVcSmYHXPaWXvrz4/cvTxRar/mrjkpNTafMMCgAgFC4ANChYAGxYFq8v/eHnPipyLOieTuf6K91M5vo5xhdnP6KJ9were72dVzkWdk3n2+qveT9X42uWQ7sjmyGxU5ypu1P2Mnr3uNphz2WuOadX7UT3fXt5vdv3eO6pzZu/VJtag7meU/bV2Zl9E9xxTdP4I9TLLjq/7+1XGcqpzZu/RpmC590six/SYepnt/f1W5wi7aP8NCwBuKFgAbFCwANhoU7Dc+yWpc1LV+x5235ewcv2seL/KOXTImd20KVju/ZLUOanqfQ+770tYtX5WvV9Vvy2XnNnfqnMVs7j3S3r2/rPG1z0H5k71/o7WL6tNrCHLvV9Sdc6mew7MXeb9zli/e+mXtZuCVZ1zyU5jdc6mew7MXfecmIs237AAIELBAmCDggXAxmEKVvTRMqN6T7zs+Ebunxnj3j+oj1CuEfX76+QwBetezqW6X5K6n9SsflHP5sC69zNbRZUDVL+/dqpzFbNsohzTNphjyfZjyt4/oh5f9sh69vmqc2ar9s1UP/8qh4k1ZGX6Ja24f0Q9vqzsMsw8X3XObMW+mernX4WCNSiapur7R9Tjc38+9f2r14/6+Vc5zDcsAP4oWABsULAA2NhNwaruF9S5p1D3D6odcmzO/caOZDcFq7pfkOr+Wd1zUF1ybK79xg6nOldxo+qX1L1f0Oj4np2/0ePe83eZv6ocmVtO6d9mra8u2sQalP2SuvcLGhlf9JqU+/J1mL/KHJlTTulXZqyvLtoUrKP3Y6rO8WSvr54/cko51e9vlt18wwKwfxQsADYoWABstClY6n3f1NfPmPFBV7kvX/UH5+r7V6+PrOr5m6lNwVLv+6a+/rNm5YhU+/JV57iq71+9PrKq52+66lzFqOp+R6rxjR7dx199/+zxbL8zdT+tVYeLNrGGSHW/I+X4RqhfU3b82fFV9+vK9DtT99NawaQM9MlhhQMt7nekHp/7+LPj656zqs4JVj9/F22+YQFAhIIFwAYFC4ANi4LVod9RpLofV/U9qvd2VN9bmePbU05KrX3B6tLvKFLdj6t6/Kp+UmrZflVd+nkdRnWu4qY6h3Lv6NKPqyqHlt03z6WfVPecVbZfWXS4aBNrqM6hPNKhH1dlDi27b55DP6nuOatsv7JIkzIQalOwqnMokew0de93lR2/+v5q3XNW3dfHKu2/YQHADQULgA0KFgAbbQpW955D2Y/W2T9TPT/KflsdVPZjG/FofTjkFGdpU7C678v2bM5oNGcTXb96flT9trqo6sc26t76cMkpTlOdq8jK5pxm5VhUR5QD2su+c9kclDpHpbq/+/pbrU2sISObc5qRY1GKckB72Hcum4NS56iU43dffyvtomBtW33OSS07/u6vWf3+1M9/9PW3SptvWAAQoWABsEHBAmBjNwUrm6PpHKk4AuX7q+4n5r7+Oo1tNwUrm6Opzjkdner9VfcTc19/7XJ01bmKVdQ5mep+Rdnz3XNQz44ve3R5vntm9WPrYjexhog6J1Pdryj7a3X3HFRE2W+tw/M9MqMfWxeHKVjVOZ/qfkjdz1dz3zdS/fzdx3+zm29YAPaPggXABgULgI3DFCx1TkfZrygan7rf1oz77133OajOqc1ymIKlzumo+hVF41P325p1/73r3k+qOqc2TXWu4qZq371R7x3Xew/VvoSz5i97/+r3r35/qqN7zmu1NrGGyn33Rqh/La7clzCSzVmNiJaZ+v13b9+Sfb6jaFOwuu+rVp3jcb+/+/WrNflrWu4w37AA+KNgAbBBwQJgo03B6r7vnfIe1f2S1PdXv58j5MT28AwztClY3fe9U/Urqu6XpL6/+v0cJSfWPee1THWuAn+p7idVff8tyCNV5dRG7/8s9b6Ee8txtYk1HF11P6nq+0exg8qc2sj9M9T7Eu4px0XBaqK6X5H7/atzaurn7z7+Vdp8wwKACAULgA0KFgAbFKwmKvsVzeinpb4/sG0UrDaq+hXN6qelvj+wbVufHNbHjx/Lew8pjyzVvoEuR6T6/tn34z7+VdrEGj59+rT9/Pmzehgy2WlW7hvoIJq/6lhA9v24j38VCtYi2WnunlNSq36+7P33Pv5V+IYFwAYFC4ANChYAGxQsA10+eFap7heWHWP12LZNuy/lShSs5o6eU6ruFzaq+75/qn0pl6vOVdxEOazX19fqIabGH1Hv+xedf6/f02i/JlW/qKxZ/abU1O/n3tEtZxWxiTW8vr5unz9/rh7m0+OPplm971+m39RIvyZlv6isGf2m1H9N1O/nkU45qwg/EjZRHeqMmuNlzq/WeWwzniH7fNVr7z0oWABsULAA2KBgAbBBwdqBbE7pCPv6ZSMP1f3AMjmqSKecVYSCZS6bUzrKvn7ZnFZ1P7Bnc1SRdjmrSHWu4iabw9qSOZvoyI4/Et1fnXNS58BU98/miNT7AqqPWTkq+mG9UzaHVd2eI5vDyu7Ll6XOgSnvn80RqfcFVJuRo3Lph8WPhCbUWaLqLE7m/tmxu+e0Zry7R9eoXhv/RMECYIOCBcAGBQuADQpWE9X9iDrnlNRjn3WNStn5r15/oyhYTVT3I+qaU4rMmp/qflpZ2fmvXn/DqnMVN0fPYUWqcjKr+i1F18nm0J6dv2w/sFXnq99PF+SwBkXTlM1hRSpzMiv6LalzaJn5y/YDW3F+RqecVYSCNai6YFXvG5ed32h86udT7xtYfX5WkzIQ4hsWABsULAA2KFgAbFCwMETdb0mdA8pev/P5M7h8dKdgYYi635I6B5S9ftfzZ6nK0b1bda7ihhzWY9nxVVPnyKr7OWXvr86JPXt0y2kRaxgUTdPeYw1Z6hxZdT+n7P3VObGMTjktfiTEEup+S9X9nLL3z5y/915p/0TBAmCDggXABgULgA0KloEuHzwzuues1KKP5urzMzrM3w0Fq7m97wvYJWeldi/nlN2XUL0+uszf36pzFTfZHFa1bA6r676A6hzRqvGpr//se1t1qPe1XGU3Oaxq2RxW530B1TmiFeNTX1+dA8xS72u5Cj8SNlGddanMEa0YX/X1q+2hWG0bBQuAEQoWABsULAA2KFg7UJ1jUueAOly/MgeV1SlHlUXBMledY1LngLpcvyoHldUuR5VVnau4iXJM7kckOj/K0Tyb48rmrGY9f/frZw/VvoWjqvuFzWKTw3IXTXN2X75Mjiubs5rx/N2vn6Xct3BEdb+wWShYi2QLVvZ89fj2fv0s9fuPuDeAvOEbFgAbFCwANihYAGxQsJqo3LeO62vtYV/GLihYTVTtW8f1tfayL2MXbX5LCAAR/gsLgA0KFgAbFCwANihYAGxQsADYoGABsEHBAmCDggXABgULgA0KFgAbFCwANihYAGxQsADYoGABsEHBAmCDggXABgULgA0KFgAbFCwANihYAGxQsADYoGABsEHBAmCDggXABgULgA0KFgAbFCwANihYAGxQsADYoGABsEHBAmCDggXABgULgI0/AXRl5K/bYs25AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAyLTExVDIwOjQzOjIzKzAwOjAwj4NP3QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMi0xMVQyMDo0MzoyMyswMDowMP7e92EAAAAASUVORK5CYII="
        return qr_code_data
    else:
        return None

if __name__ == '__main__':
    app.run()