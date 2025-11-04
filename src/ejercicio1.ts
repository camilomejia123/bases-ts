
// Enumeración de tipos de energía o combustible
enum Combustible {
  Gasolina = "Gasolina",
  Diesel = "Diésel",
  Electrico = "Eléctrico"
}

// Estructura con los datos básicos de un vehículo
interface DatosVehiculo {
  marca: string;
  modelo: string;
  anio: number;
  combustible: Combustible;
}

// Clase abstracta que define el comportamiento general de los vehículos
abstract class Vehiculo {
  protected datos: DatosVehiculo;
  protected kilometraje: number = 0;

  constructor(datos: DatosVehiculo) {
    this.datos = datos;
  }

  // Métodos que las subclases deben implementar
  abstract encender(): void;
  abstract apagar(): void;

  // Método compartido para simular el desplazamiento del vehículo
  conducir(distancia: number): void {
    this.kilometraje += distancia;
    console.log(`${this.datos.marca} ${this.datos.modelo} recorrió ${distancia} km. Total: ${this.kilometraje} km.`);
  }

  // Devuelve la descripción del vehículo
  obtenerDescripcion(): string {
    return `${this.datos.marca} ${this.datos.modelo} (${this.datos.anio}) - Combustible: ${this.datos.combustible}`;
  }
}

// Herencia y especialización

class Automovil extends Vehiculo {
  encender(): void {
    console.log(`El automóvil ${this.datos.marca} ${this.datos.modelo} ha sido encendido.`);
  }

  apagar(): void {
    console.log(`El automóvil ${this.datos.marca} ${this.datos.modelo} se ha apagado.`);
  }
}

class Camion extends Vehiculo {
  encender(): void {
    console.log(`El camión ${this.datos.marca} ${this.datos.modelo} está en marcha.`);
  }

  apagar(): void {
    console.log(`El camión ${this.datos.marca} ${this.datos.modelo} se ha detenido.`);
  }

  cargarMercancia(peso: number): void {
    console.log(`El camión ha cargado ${peso} kg de mercancía.`);
  }
}

//  Simulación asíncrona

async function ejecutarViaje(vehiculo: Vehiculo, distancia: number, tiempo: number): Promise<void> {
  console.log(`Inicio del viaje con ${vehiculo.obtenerDescripcion()}`);
  vehiculo.encender();

  await new Promise((resolver) => setTimeout(resolver, tiempo));

  vehiculo.conducir(distancia);
  vehiculo.apagar();
  console.log(`El recorrido con ${vehiculo.obtenerDescripcion()} ha finalizado tras ${distancia} km.`);
}

//  Ejemplos de uso

const auto = new Automovil({
  marca: "Mazda",
  modelo: "3 Touring",
  anio: 2023,
  combustible: Combustible.Gasolina
});

const camionVolvo = new Camion({
  marca: "Volvo",
  modelo: "FH16",
  anio: 2021,
  combustible: Combustible.Diesel
});

camionVolvo.cargarMercancia(4500);

// Ejecución secuencial de viajes simulados
(async () => {
  await ejecutarViaje(auto, 80, 2000);
  await ejecutarViaje(camionVolvo, 120, 3000);
})();

// Extensión (vehículo eléctrico)


interface FuncionesElectricas {
  recargarBateria(): void;
}

class AutoElectrico extends Automovil implements FuncionesElectricas {
  private nivelBateria: number = 40;

  recargarBateria(): void {
    this.nivelBateria = Math.min(this.nivelBateria + 35, 100);
    console.log(`Batería recargada. Nivel actual: ${this.nivelBateria}%`);
  }
}

// Prueba adicional
const tesla = new AutoElectrico({
  marca: "Tesla",
  modelo: "Model 3",
  anio: 2024,
  combustible: Combustible.Electrico
});

tesla.recargarBateria();
ejecutarViaje(tesla, 200, 2500);
