import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; // los plugins de sqlite
import { ToastController } from '@ionic/angular'; // avisos para la base de datos
import { BehaviorSubject } from 'rxjs'; // usar la base de datos sin devolver la consulta
import { ActivatedRoute,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  // variable publica para la base de datos
  public db!: SQLiteObject;

  //variable de valor para saldo
  public idOBt: number =0;


  // observable
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false); // maneja el estado de la BD y los usuarios

  // crear objetos dentro del constructor
  // 1 sqlt
  // 2 toast controller
  constructor(private sqlite: SQLite, private toastController: ToastController, private activerouter: ActivatedRoute,private router: Router) {
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
      await this.crearTablaCuentaUsuario();
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
              nCuenta INTEGER,
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
  async insertarUsuario(usuario: string, password: string, nombre: string, apellido: string, opcion: string, fecha: string, nCuenta: number) {
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

    try {
      const res = await this.db.executeSql(`SELECT * FROM usuarios WHERE usuario = ? AND password = ?`, [usuario, password]);
      if (res.rows.length > 0) {//numero de filas que trae de la consulta que coincida, si hay 1 que consida
        this.idOBt=res.rows.item(0).id
        return this.idOBt; // retorna el primer usuario que coincida y su id
      } else {
        return null; // retorna nulo al no encontrar ningún usuario
      }
      
    } catch (error:any) {
      await this.mostrarAlerta('Error', 'No se encontró al usuario: ' + error.message);
      return null;
    }
  }

  
  //método para actualizar valores del usario y la tabla usuarios
  async actualizarUsuario(id: number,usuario: string, nombre: string, apellido: string, opcion: string, fecha: string, nCuenta: number){
    try {
      const update = await this.db.executeSql(
        `UPDATE usuarios SET usuario = ?, nombre = ?, apellido = ?, opcion = ?, fecha = ?, nCuenta = ? WHERE id = ? `,
        [usuario, nombre, apellido, opcion, fecha, nCuenta,id]
      );
  
      if (update.rowsAffected > 0) {
        
        this.router.navigate(['/menu/home']);
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
  async insertarCuentaUsuario(nCuenta: number, saldo: number) {
    try {
      const resultado = await this.db.executeSql(`
        INSERT INTO cuentaUsuario (nCuenta, saldo) VALUES (?, ?)`, [nCuenta, saldo]);

      if (resultado.rowsAffected > 0) {
        
        this.mostrarAlerta('actualizarcuentaUsuario','iiiiiiiiiiiiii');
        for (let i = 0; i < resultado.rows.length; i++) {
          const usuario = resultado.rows.item(i);

          this.mostrarAlerta('actualizarcuentaUsuario', 'numero cuenta: ' +usuario.nCuenta+'n/saldo actual: '+usuario.saldo );
        }
        return resultado;
      } else {
        console.log('Error al insertar registro en cuentaUsuario');
        return false;
      }
    } catch (error: any) {
      console.error('Error al insertar en cuentaUsuario:', error.message);
      throw error;
    }
  }



  //actualizar metodo para ingresar valores a la tabla nCuenta
  async actualizarcuentaUsuario(nCuenta: number, saldo:number) {
    try {
      const insertCuenta = await this.db.executeSql(`UPDATE cuentaUsuario SET saldo = ? WHERE nCuenta = ?`, [saldo, nCuenta]);
      if (insertCuenta.rowsAffected > 0) {
        for (let i = 0; i < insertCuenta.rows.length; i++) {
          const user = insertCuenta.rows.item(i);
 
        }
      
        
        return insertCuenta;
      } else {
        console.log('No se encontró ninguna cuenta con el número de cuenta proporcionado.');
        return false; // Retorna false si no se encontró la cuenta
      }
      } catch (error:any) {
        console.error('Error al encontrar nCuenta:', error.message);
        throw error; // Lanza el error para ser capturado por el componente
      }
  }
  
  // metodo que permite encontrar y actualizar la cuenta de usuario y su saldo
  async cuentaUsuario(nCuenta: number, saldo:number) {
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
  }

  // trae los datos del usuario
  async datosUsuario(id: number) {
    try {
      const dataUser = await this.db.executeSql(`SELECT * FROM usuarios WHERE id = ?`, [id]);
 
      if (dataUser.rows && dataUser.rows.length > 0) {
        // Iterar sobre los resultados y mostrar los valores
        

        return dataUser; // retorna el primer usuario que coincida y su id
      } else {
        return null; // retorna nulo al no encontrar ningún usuario
      }
      
    } catch (error:any) {
      await this.mostrarAlerta('Error', 'No se encontró al usuario: ' + error.message);
      return null;
    }
  }

  async getSalgo(nCuenta: number) {
    try {
      const getSalgo = await this.db.executeSql(`SELECT saldo FROM cuentaUsuario WHERE nCuenta = ?`, [nCuenta]);
      const saldo = getSalgo.rows.item(0).saldo;

     return saldo;
    } catch (error:any) {
      await this.mostrarAlerta('Error', 'No trae getSaldo: ' + error.message);
      return null;
    }
  }

  async comprobarCuenta(){
    
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
