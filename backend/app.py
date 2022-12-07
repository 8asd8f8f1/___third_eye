from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify, make_response
from flask_mysqldb import MySQL
from functools import wraps
from flask_cors import CORS, cross_origin
from datetime import datetime, date
from flask.json import JSONEncoder
import jwt
import decimal

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, date):
                return obj.isoformat()
            elif isinstance(obj, decimal.Decimal):
                return float(obj)
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder
CORS(app)


# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'thirdEyeDB'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# init MYSQL
mysql = MySQL(app)


# @cross_origin()
@app.route('/')
# User login
@app.route('/login', methods=['POST'])
@cross_origin(origin="*", headers=["Content-Type", "Access-Control-Allow-Origin"])
def login():
    if request.method == 'POST':
        # Get Form Fields
        request_json= request.get_json()

        email = request_json['email']
        password_candidate = request_json['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM Users WHERE email = %s", [email])
        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['UPassword']
            userid = data['ID']

            # Compare Passwords
            if password_candidate == password:
                # Passed
                session['logged_in'] = True
                session['email'] = email
                session['userid'] = userid

                details = {'email': email,'userid': userid}
                token = jwt.encode(details, app.secret_key, algorithm="HS256")
                session['token'] = token

                data = {
                    'message' : 'Sucessfully logged in',
                    'auth-token': token
                    }

                return make_response(jsonify(data), 200)
            else:
                data = {'message':'Failed'}
                return make_response(jsonify(data), 401)
            # Close connection
            cur.close()
        else:
            data = {'message':'Not found'}
            return make_response(jsonify(data), 404)


@app.route('/events')
def showAllEvents():
    cur = mysql.connection.cursor()

    # Execute query
    cur.execute("Select ue.*, u.UserName from UserEvent ue, Users u Where u.ID = ue.UserID")
    result = cur.fetchall()
    # Commit to DB
    mysql.connection.commit()

    # print(result)

    # Close connection
    cur.close()
    return make_response(jsonify(result),200)


@app.route('/event/<int:id>')
def showEventById(id):
    cur = mysql.connection.cursor()

    # Execute query
    cur.execute("Select ue.*, u.UserName from UserEvent ue, Users u Where u.ID = ue.UserID and ue.ID = %s" , [id])
    result = cur.fetchone()
    # Commit to DB
    mysql.connection.commit()

    # Close connection
    cur.close()
    return make_response(jsonify(result),200)

@app.route('/showEventByLocation', methods=['POST'])
def showEventByLocation():
    if request.method == 'POST':
        request_json = request.get_json()
        lat = request_json['latitude'] 
        long = request_json['longitude'] 

        cur = mysql.connection.cursor()

        # Execute query

        statement = f'''
        SELECT * FROM 
        UserEvent where 
        Latitude BETWEEN '{lat-0.5}' AND '{lat+0.5}' 
        and 
        Longitude BETWEEN '{long-0.5}' AND '{long+0.5}'
        '''

        cur.execute(statement)
        result = cur.fetchall()
        # Commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()
        return make_response(jsonify(result),200)



# User Register
@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        request_json = request.get_json()

        name = request_json['username']
        email = request_json['email']
        phone = request_json['phone']
        password = request_json['password']
        houseno = request_json['houseno']
        street = request_json['street']
        pincode = request_json['pincode']
        city = request_json['city']
        district = request_json['district']
        state = request_json['state']

        # Create cursor
        cur = mysql.connection.cursor()

        result = cur.execute("SELECT * FROM users WHERE email = %s", [email])
        if result > 0:
            # Close connection
            cur.close()

            data = { 'message': 'User already exists. Please log in'} 

            return make_response(jsonify(data), 400)

        else:
            # Execute query
            cur.execute("INSERT INTO users(username, email, phone, upassword) VALUES(%s, %s, %s, %s)", (name, email, phone, password))
            
            # Commit to DB
            mysql.connection.commit()
            userid = cur.lastrowid
            cur.execute("INSERT INTO address(userid, houseno, street, pincode, city, district, state) VALUES(%s, %s, %s, %s, %s, %s, %s)", (userid, houseno, street, pincode, city, district, state))
            # Commit to DB
            mysql.connection.commit()

            session['logged_in'] = True
            session['email'] = email
            session['userid'] = userid

            details = {'email': email,'userid': userid}
            token = jwt.encode(details, app.secret_key, algorithm="HS256")
            session['token'] = token
            data = {
                'message' : 'Sucessfully logged in',
                'auth-token': token
                }
            
            # Close connection
            cur.close()
            return make_response(jsonify(data), 200)



def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session and jwt.decode(session['token'],app.secret_key, algorithms=["HS256"])['email'] == session['email']:
            return f(*args, **kwargs)
        else:
            data = { 'message': 'Unauthorized. Please log in!'}
            return make_response(jsonify(data),200)
    return wrap

@app.route('/addevent',methods=['POST'])
@is_logged_in
def addevent():
    if request.method == 'POST':
        request_json = request.get_json()

        severity = request_json['severity']
        desc = request_json['desc']
        category = request_json['category']
        title = request_json['title']
        etime = request_json['etime']
        lat = request_json['lat']
        lng = request_json['lng']

        # Create cursor
        cur = mysql.connection.cursor()

        # cur.execute("INSERT INTO UserEvent(userid, severity, eventdescription, category, title, Event_time) VALUES(%s, %s, %s, %s, %s, %s)", (session['userid'], severity, desc, category, title, etime))

        cur.execute("INSERT INTO UserEvent(userid, severity, eventdescription, category, title, Event_time, Latitude, Longitude) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)", (1, severity, desc, category, title, etime, lat, lng))

        # Commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()
        data = {'message' : 'Sucess'}
        return make_response(jsonify(data), 201)

@app.route('/upvoteById/<int:id>')
@is_logged_in
def upvoteById(id):
    cur = mysql.connection.cursor()

    # Execute query
    cur.execute("update UserEvent set Upvote=Upvote+1 where id = %s",[id])

    # Commit to DB
    mysql.connection.commit()

    # Close connection
    cur.close()
    result = {'message':'Success'}
    return make_response(jsonify(result),200)

@app.route('/downvoteById/<int:id>')
@is_logged_in
def downvoteById(id):
    cur = mysql.connection.cursor()

    # Execute query
    cur.execute("update UserEvent set Downvote=Downvote+1 where id = %s",[id])

    # Commit to DB
    mysql.connection.commit()

    # Close connection
    cur.close()
    result = {'message':'Success'}
    return make_response(jsonify(result),200)


@app.route('/editEvent',methods=['POST'])
@is_logged_in
def editEvent():
    if request.method == 'POST':
        request_json = request.get_json()

        uid = request_json['userid']
        id = request_json['id']
        status = request_json['status']
        severity = request_json['severity']
        desc = request_json['desc']
        category = request_json['category']
        title = request_json['title']
        etime = request_json['etime']

        if uid == session['userid']:
            try:
                cur = mysql.connection.cursor()

                # Execute query
                statement = f'''
                            update UserEvent set Title = '{title}', EventDescription = '{desc}', 
                            Category = '{category}', Severity = '{severity}', EventStatus = '{status}',
                            Event_time = '{etime}' where ID = {id} and UserID = {uid};
                            '''

                cur.execute(statement)

                # Commit to DB
                mysql.connection.commit()

                if cur.rowcount:
                    # Close connection
                    cur.close()
                    result = {'message':'Success'}
                    return make_response(jsonify(result),200)
                else:
                    cur.close()
                    result = {'message':'Sorry! You are not allowed to update this event.1'}
                    return make_response(jsonify(result),401)
                
            except Exception as e:
                result = {'message':'Failed'}
                return make_response(jsonify(result),401)

        else:
            result = {'message':'Sorry! You are not allowed to update this event.'}
            return make_response(jsonify(result),401)





# Logout
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    data = { 'message': 'You are now logged out'}
    return make_response(jsonify(data),200)

# Dashboard
# @app.route('/dashboard')
# @is_logged_in
# def dashboard():
#     # Create cursor
#     cur = mysql.connection.cursor()

  
#     result = cur.execute("SELECT * FROM blogs WHERE author = %s", [session['username']])

#     articles = cur.fetchall()

#     if result > 0:
#         return render_template('dashboard.html', articles=articles)
#     else:
#         msg = 'No Articles Found'
#         return render_template('dashboard.html', msg=msg)
#     # Close connection
#     cur.close()






if __name__ == '__main__':
    app.secret_key='wiley-team-pheonix'
    app.run(debug=True)