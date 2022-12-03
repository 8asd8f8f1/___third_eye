from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps

app = Flask(__name__)

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
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
        email = request.form['email']
        password_candidate = request.form['password']

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

                flash('You are now logged in')
                print("Welcome")
                return render_template('dashboard.html', msg = "")
            else:
                return render_template('login.html')
            # Close connection
            cur.close()
        else:
            return render_template('login.html')

    return render_template('login.html')

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


# User Register
@app.route('/register', methods=['GET', 'POST'])
def register():

    if request.method == 'POST':
        name = request.form['username']
        email = request.form['email']
        phone = request.form['phone']
        password = request.form['password']
        houseno = request.form['houseno']
        street = request.form['street']
        pincode = request.form['pincode']
        city = request.form['city']
        district = request.form['district']
        state = request.form['state']

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

        flash('You are now registered and can log in', 'success')

        return redirect(url_for('login'))
    return render_template('register.html')





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
        severity = request.form['severity']
        desc = request.form['desc']
        category = request.form['category']
        title = request.form['title']
        etime = request.form['etime']

        # Create cursor
        cur = mysql.connection.cursor()

        cur.execute("INSERT INTO UserEvent(userid, severity, eventdescription, category, title, Event_time) VALUES(%s, %s, %s, %s, %s, %s)", (session['userid'], severity, desc, category, title, etime))
        # Commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()
        print("Added Event")
        return render_template('dashboard.html', msg="Added Event")




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
