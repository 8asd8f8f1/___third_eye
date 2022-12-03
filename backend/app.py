from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps

app = Flask(__name__)

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Alt@mas@6980'
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
        username = request.form['username']
        password_candidate = request.form['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']
            userid = data['id']

            # Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed
                session['logged_in'] = True
                session['username'] = username
                session['userid'] = userid

                flash('You are now logged in', 'success')
            else:
                error = 'Invalid login'
                return render_template('login.html')
            # Close connection
            cur.close()
        else:
            error = 'Username not found'
            return render_template('login.html')

    return render_template('login.html')







    


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

        # Close connection
        # cur.close()

        # # Create cursor again
        # cur = mysql.connection.cursor()

        # Execute query
        # userid  = cur.execute("SELECT id FROM users WHERE email = %s", [email])
        # print(email)
        # print(userid)
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
