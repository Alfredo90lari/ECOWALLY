#Importaciones necesarias
from itertools import count
from flask import Flask, jsonify, render_template, request, redirect, send_from_directory, url_for, session
from flask_mysqldb import MySQL
from flask_login import LoginManager
from flask_cors import CORS

from confi import confi

app=Flask(__name__)
CORS(app)

app.secret_key = '12345678'

#Conexion MySQL
conexion=MySQL(app)

#MOSTRAR DATOS
@app.route('/Usuarios', methods=['GET'])
def listar_Usuario():
    try:
        cursor=conexion.connection.cursor()
        sql="SELECT Usuario, Nombre, Apellido, CorreoElectronico, Contrasena, Confirmar_Contra, Rol FROM Usuario"
        cursor.execute(sql)
        datos=cursor.fetchall()
        usuario=[]
        for fila in datos:
            curso={'Usuario':fila[0],'Nombre':fila[1], 'Apellido':fila[2], 'CorreoElectronico':fila[3], 'Contrasena':fila[4], 'Confirmar_Contra':fila[5], 'Rol':fila[6]}
            usuario.append(curso)
        return jsonify({'Usuario':usuario,'mensaje':'Usuarios Listados'})
        
    except Exception as ex:
        return jsonify({'mensaje':'Error'})    
    


#Leer Usuario
@app.route('/Usuarios/<Usuario>', methods=['GET'])    
def Leer_Usuario(Usuario):
        try:
            cursor=conexion.connection.cursor()
            sql="SELECT Usuario, Nombre, Apellido, CorreoElectronico, Contrasena, Confirmar_Contra, Rol FROM Usuario WHERE Usuario ='{0}'".format(Usuario)
            cursor.execute(sql)
            datos=cursor.fetchone()
            if datos != None:
                usuario={'Usuario':datos[0],'Nombre':datos[1], 'Apellido':datos[2], 'CorreoElectronico':datos[3], 'Contrasena':datos[4], 'Confirmar_Contra':datos[5], 'Rol':datos[6]}
                return jsonify({'Usuario':usuario,'mensaje':'Usuario Encontrado'})
            else:
                return jsonify ({'mensaje':'Usuario No encontrado'})
        except Exception as ex:
            return jsonify({'mensaje':'Error'})   



#Ingresar Usuarios
@app.route('/Usuarios', methods=['POST'])        
def Registrar_Usuario():        
    try:
        cursor=conexion.connection.cursor()
        sql="""INSERT INTO Usuario (Usuario, Nombre, Apellido, CorreoElectronico, Contrasena, Confirmar_Contra, Rol) 
        VALUES ('{0}', '{1}', '{2}', '{3}', '{4}','{5}','{6}')""".format(request.json['Usuario'], request.json['Nombre'], 
                                                         request.json['Apellido'], request.json['CorreoElectronico'], request.json['Contrasena'], request.json['Confirmar_Contra'],request.json['Rol'])
        print("SQL Query: ", sql)  # Debug: Print SQL query
        cursor.execute(sql)
        conexion.connection.commit() # Confirma la accion de insertar
        return jsonify({'mensaje':'Usuario Registrado.'})      
    except Exception as ex:
            return jsonify({'mensaje':'Error'})  
    
#Actualziar Usuario
@app.route('/Usuarios/<Usuario>',methods=['PUT'])
def actualizar_Usuario(Usuario):
    try:
        cursor=conexion.connection.cursor()
        sql="""UPDATE Usuario SET Nombre='{0}', Apellido='{1}', CorreoElectronico='{2}', Contrasena='{3}', Confirmar_Contra='{4}', Rol='{5}' WHERE Usuario= '{6}' """.format(request.json['Nombre'], request.json['Apellido'], request.json['CorreoElectronico'], request.json['Contrasena'],request.json['Confirmar_Contra'],request.json['Rol'],Usuario)
        cursor.execute(sql)
        conexion.connection.commit() # Confirma la accion de insertar
        return jsonify({'mensaje':'Usuario Actualizado.'})
    except Exception as ex:
            return jsonify({'mensaje':'Error'}) 

#Elimar Usuario
@app.route('/Usuarios/<Usuario>',methods=['DELETE'])
def eliminar_Usuario(Usuario):    
    try:
        cursor=conexion.connection.cursor()
        sql="DELETE FROM Usuario WHERE Usuario = '{0}'".format(Usuario)
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje':'Usuario Eliminado.'})
    except Exception as ex:
        return jsonify({'mensaje':'Error'})


#LOGIN    
@app.route('/login', methods=["GET","POST"])
def login():
    try:
        data = request.json
        print("Received data:", data)  # Debug: Print received data

        username = data.get('Usuario')
        password = data.get('Contrasena')

        cursor = conexion.connection.cursor()
        sql = "SELECT Usuario, id_rol FROM Usuario WHERE Usuario=%s AND Contrasena=%s"
        cursor.execute(sql, (username, password))
        user = cursor.fetchone()

        if user:
           session['logged_in'] = True
           session['id'] = user[0]
           session['id_rol'] = user[1]
           
           if session['id_rol']==1:
               return jsonify({'message': 'Login exitoso como Administrador'})
           elif session['id_rol']==2:
               return jsonify({'message': 'Login exitoso como Usuario'})
        else:
            return jsonify({'message': 'Usuario o contraseña incorrectos'})

    except Exception as ex:
        print("Error:", str(ex))
        return jsonify({'message': 'Error: {}'.format(str(ex))})  
      
    
#Cerrar Sesion
@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({'mensaje':'Sesion Cerrada con exito'})
    

#Error Pagina no encontrada
def pagina_no_encontrada(error):
    return " <h1> la pagina que estas buscando no existe <h1>"    


if __name__== '__main__':
    app.config.from_object(confi['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run()