import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; // los plugins de sqlite
import { ToastController } from '@ionic/angular'; // avisos para la base de datos
import { BehaviorSubject } from 'rxjs'; // usar la base de datos sin devolver la consulta

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  // variable publica para la base de datos
  public db!: SQLiteObject;

  //variable de valor para saldo
  public saldo: number =0;

  // observable
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false); // maneja el estado de la BD y los usuarios

  // crear objetos dentro del constructor
  // 1 sqlt
  // 2 toast controller
  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.initDatabase(); // inicializar la base de datos
  }

  async initDatabase() {
    try {
      const db = await this.sqlite.create({
        name: 'mydb.db', // nombre BD
        location: 'default' // lugar donde esta guardada por defecto
      });
      this.db = db;
      // si no se cae, va a crear las tablas y va a mandar el mensaje
      await this.crearTablaUsuarios();
      this.isDBReady.next(true); // muestra true cuando la base de datos está lista
      await this.mostrarAlerta('Felicidades!', 'Base de datos y tabla creadas con éxito');
    } catch (error: any) {
      await this.mostrarAlerta('Error', 'Error al crear la tabla: ' + error.message);
    }
  }

  // crear tablas
  async crearTablaUsuarios() {
    try {
      await this.sqlite.create({ name: 'mydb.db', location: 'default' })
        .then((db: SQLiteObject) => {
          return db.executeSql(`
            CREATE TABLE IF NOT EXISTS usuarios (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              usuario TEXT,
              password TEXT,
              nombre TEXT,
              apellido TEXT,
              opcion TEXT,
              fecha TEXT,
              nCuenta TEXT,
              FOREIGN KEY (nCuenta) REFERENCES cuentaUsuario(nCuenta)
            )
          `, [])
            .then(async () => {
              // Verifica si la tabla usuarios se creó correctamente
              const result = await db.executeSql(`
                SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios';
              `, []);
              if (result.rows.length > 0) {
                await this.mostrarAlerta('Felicidades!', 'Tabla usuarios creada correctamente');
              } else {
                await this.mostrarAlerta('Error', 'No se pudo crear la tabla usuarios');
              }
            })
            .catch(e => console.error('Error al crear la tabla usuarios', e));
        });
    } catch (error:any) {
      console.error('Error en crearTablaUsuarios', error.message);
    }
  }

  async crearTablaCuentaUsuario() {
    try {
      await this.sqlite.create({ name: 'mydb.db', location: 'default' })
        .then((db: SQLiteObject) => {
          return db.executeSql(`
            CREATE TABLE IF NOT EXISTS cuentaUsuario (
              nCuenta TEXT PRIMARY KEY,
              saldo INTERGER
            )
          `, [])
            .then(async () => {
              console.log('Tabla cuentaUsuario creada correctamente.');
            })
            .catch(e => console.error('Error al crear la tabla cuentaUsuario', e));
        });
    } catch (error:any) {
      console.error('Error en crearTablaCuentaUsuario', error.message);
    }
  }

  

  // insertar los datos a la tabla:
  async insertarUsuario(usuario: string, password: string, nombre: string, apellido: string, opcion: string, fecha: string, nCuenta: string) {
    try {
      const result = await this.db.executeSql(`INSERT INTO usuarios(usuario, password, nombre, apellido, opcion, fecha, nCuenta) VALUES(?,?,?,?,?,?,?)`, [usuario, password, nombre, apellido, opcion, fecha, nCuenta]);
      
      if (result.rowsAffected > 0) {
        const id = await this.db.executeSql(`SELECT id FROM usuarios WHERE usuario = ? AND password = ?`,[usuario, password]);
         this.mostrarAlerta('Felicidades!', 'Usuario ingresado correctamente'+ id.message);
        return id; // Retorna true si la inserción fue exitosa
      } else {
        console.log('Hubo un error al ingresar el usuario.');
        return false; // Retorna false si la inserción falló
      }
    } catch (error:any) {
      console.error('Error al ingresar usuario:', error.message);
      throw error; // Lanza el error para ser capturado por el componente
    }
  }



  // validar usuario en la base de datos
  async validarUsuario(usuario: string, password: string) {
    console.log('entro a la funcion validar usuario');
    try {
      const res = await this.db.executeSql(`SELECT * FROM usuarios WHERE usuario = ? AND password = ?`, [usuario, password]);
      if (res.rows.length > 0) {//numero de filas que trae de la consulta que coincida, si hay 1 que consida
        this.mostrarAlerta('validarUsuario','cantidad usuario: '+ res.rows.length);
        this.mostrarAlerta('validarUsuarioMetodo','id:' +res.rows.item(0).id)

        return res.rows.item(0).id; // retorna el primer usuario que coincida y su id
      } else {
        return null; // retorna nulo al no encontrar ningún usuario
      }
      
    } catch (error:any) {
      await this.mostrarAlerta('Error', 'No se encontró al usuario: ' + error.message);
      return null;
    }
  }

  
  //método para actualizar valores del usario y la tabla usuarios
  async actualizarUsuario(id: number,usuario: string, password: string, nombre: string, apellido: string, opcion: string, fecha: string, nCuenta: string){
    try {
      const update = await this.db.executeSql(
        `UPDATE usuarios SET usuario = ?, password = ?, nombre = ?, apellido = ?, opcion = ?, fecha = ?, nCuenta = ? WHERE id = ? `,
        [usuario, password, nombre, apellido, opcion, fecha, nCuenta,id]
      );
  
      if (update.rowsAffected > 0) {
        console.log('Usuario actualizado correctamente.');
        return true; // Retorna true si la actualización fue correcta
      } else {
        console.log('Hubo un error al actualizar los datos del usuario.');
        return false; // Retorna false si la actualización falló
      }
    } catch (error: any) {
      console.error('Error al actualizar el usuario:', error.message);
      throw error; // Lanza el error para ser capturado por el componente
    }
  }


  //crear metodo para ingresar valores a la tabla nCuenta
  async InsertarcuentaUsuario(nCuenta: string, saldo:number) {
    try {
      const insertCuenta = await this.db.executeSql(`INSERT INTO cuentaUsuario SET saldo = ? WHERE nCuenta = ?`, [this.saldo, nCuenta]);
      if (insertCuenta.rows.length > 0) {
        console.log('Cuenta de usuario encontrada');
        return true;
      } else {
        console.log('No se encontró ninguna cuenta con el número de cuenta proporcionado.');
        return false; // Retorna false si no se encontró la cuenta
      }
      } catch (error:any) {
        console.error('Error al encontrar nCuenta:', error.message);
        throw error; // Lanza el error para ser capturado por el componente
      }
  }
  
/*  // metodo que permite encontrar y actualizar la cuenta de usuario y su saldo
  async cuentaUsuario(nCuenta: string, saldo:number) {
    try {
      const updateCuenta = await this.db.executeSql(`UPDATE cuentaUsuario SET saldo = ? WHERE nCuenta = ?`, [saldo, nCuenta]);
      if (updateCuenta.rows.length > 0) {
        console.log('Cuenta de usuario encontrada');
        return true;
      } else {
        console.log('No se encontró ninguna cuenta con el número de cuenta proporcionado.');
        return false; // Retorna false si no se encontró la cuenta
      }
      } catch (error:any) {
        console.error('Error al encontrar nCuenta:', error.message);
        throw error; // Lanza el error para ser capturado por el componente
      }
  }*/

  // trae los datos del usuario
  async datosUsuario(id: string) {
    try {
      const dataUser = await this.db.executeSql(`SELECT * FROM usuarios WHERE id = ?`, [id]);
      if (dataUser.rows.length > 0) {//numero de filas que trae de la consulta que coincida, si hay 1 que consida
        this.mostrarAlerta('validarUsuarioMetodo','id:' 
          +dataUser.rows.item(0).id
          +dataUser.rows.item(1).usuario
          +dataUser.rows.item(3).nombre
          +dataUser.rows.item(4).apellido
          +dataUser.rows.item(5).opcion
          +dataUser.rows.item(6).fecha
          +dataUser.rows.item(7).nCuenta
        )

        return dataUser; // retorna el primer usuario que coincida y su id
      } else {
        return null; // retorna nulo al no encontrar ningún usuario
      }
      
    } catch (error:any) {
      await this.mostrarAlerta('Error', 'No se encontró al usuario: ' + error.message);
      return null;
    }
  }

  // mostrar mensaje
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.toastController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  getIsDBReady() {
    return this.isDBReady.asObservable();
  }



}
