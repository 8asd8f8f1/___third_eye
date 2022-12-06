from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify, make_response
from flask_mysqldb import MySQL
from functools import wraps
from flask_cors import CORS
from datetime import datetime, date
from flask.json import JSONEncoder

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, date):
                return obj.isoformat()
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




@app.route('/')
# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get Form Fields
        email = request.json['email']
        password_candidate = request.json['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE email = %s", [email])
        print("Outside if")
        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            print(data)
            password = data['UPassword']
            userid = data['ID']

            # Compare Passwords
            if password_candidate == password:
                # Passed
                session['logged_in'] = True
                session['email'] = email
                session['userid'] = userid

                data = {'message' : 'Sucess'}
                return make_response(jsonify(data), 200)
            else:
                data = {'message':'Failed'}
                return make_response(jsonify(data), 401)
            # Close connection
            cur.close()
        else:
            data = {'message':'Not found'}
            return make_response(jsonify(data), 404)
    data = {'message':'Failed'}
    return make_response(jsonify(data), 401)


@app.route('/events')
def showAllEvents():
    cur = mysql.connection.cursor()

    # Execute query
    cur.execute("Select ue.*, u.UserName from UserEvent ue, Users u Where u.ID = ue.UserID")
    result = cur.fetchall()
    # Commit to DB
    mysql.connection.commit()

    print(result)

    # Close connection
    cur.close()
    return make_response(jsonify(result),200)


@app.route('/event/<int:id>')
def showEventById(id):
    cur = mysql.connection.cursor()

    # Execute query
    cur.execute("Select * from UserEvent where id = %s" , [id])
    result = cur.fetchone()
    # Commit to DB
    mysql.connection.commit()

    # Close connection
    cur.close()
    return make_response(jsonify(result),200)

@app.route('/showEventByLocation/data')
def showEventByLocation(data):

    lat = data['latitude'] 
    long = data['longitude'] 

    cur = mysql.connection.cursor()

    # Execute query

    statment = f'''
    select * from 
    UserEvent u join LocationMapping lm
    on u.id = lm.eventid
    join Location l
    on lm.locationid = l.id
    where latitude between '{lat-0.5}' and '{lat+0.5}' and longitude between '{long-0.5}' and '{long+0.5}'
    '''


    cur.execute(statment)
    result = cur.fetcall()
    # Commit to DB
    mysql.connection.commit()

    # Close connection
    cur.close()
    return make_response(jsonify(result),200)


#filterEventByLocation
'''
@app.route('/showEventNLGU') # Show event for non logged in user
def showEventNLGU():
    # Create cursor
    cur = mysql.connection.cursor()

    # Execute query
    cur.execute("Select * from UserEvent where isVerified = 0 and severity = 'High'")
    result = cur.fetchall()
    # Commit to DB
    mysql.connection.commit()

    # Close connection
    cur.close()

    return render_template('home.html', msg=result)
'''

#filters

#filterByCategory
# @app.route('/filterByCategory/<category>')
# def filterByCategory(category):
#     cur = mysql.connection.cursor()
#     category = str(category)
#     if category != "":
#         q1 = f"Category = 'Locality Issue'"
#     else:
#         q1 = "category is not null"

#     print(q1)
#     print("hello")
#     # Execute query
#     statment = f"Select * from userevent where {q1}" 
#     print(statment)
#     cur.execute(statment)
#     result = cur.fetchall()
#     # Commit to DB
#     mysql.connection.commit()

#     # Close connection
#     cur.close()
#     print(result)
#     return make_response(jsonify(result),200)



# User Register
@app.route('/register', methods=['GET', 'POST'])
def register():

    if request.method == 'POST':
        name = request.json['username']
        email = request.json['email']
        phone = request.json['phone']
        password = request.json['password']
        houseno = request.json['houseno']
        street = request.json['street']
        pincode = request.json['pincode']
        city = request.json['city']
        district = request.json['district']
        state = request.json['state']

        # Create cursor
        cur = mysql.connection.cursor()

        # Execute query
        cur.execute("INSERT INTO users(username, email, phone, upassword) VALUES(%s, %s, %s, %s)", (name, email, phone, password))
        
        # Commit to DB
        mysql.connection.commit()

        cur.execute("INSERT INTO address(userid, houseno, street, pincode, city, district, state) VALUES(%s, %s, %s, %s, %s, %s, %s)", (cur.lastrowid, houseno, street, pincode, city, district, state))
        # Commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()

        data = {'message' : 'Sucess'}
        return make_response(jsonify(data), 201)
    
    data = {'message':'Failed'}
    return make_response(jsonify(data), 401)


def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, Please login', 'danger')
            return redirect(url_for('login'))
    return wrap

@app.route('/addevent',methods=['GET', 'POST'])
@is_logged_in
def addevent():
    if request.method == 'POST':
        severity = request.json['severity']
        desc = request.json['desc']
        category = request.json['category']
        title = request.json['title']
        etime = request.json['etime']

        # Create cursor
        cur = mysql.connection.cursor()

        cur.execute("INSERT INTO UserEvent(userid, severity, eventdescription, category, title, Event_time) VALUES(%s, %s, %s, %s, %s, %s)", (session['userid'], severity, desc, category, title, etime))
        # Commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()
        data = {'message' : 'Sucess'}
        return make_response(jsonify(data), 201)




# Logout
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))

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
