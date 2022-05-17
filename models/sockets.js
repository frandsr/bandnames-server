const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente contectado");

      //Emitir al cliente contectado, todas las bandas actuales
      socket.emit("current-bands", this.bandList.getBands());

      socket.on("votar-banda", ({ id }) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("borrar-banda", ({ id }) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("cambiar-nombre-banda", ({ id, nuevoNombre }) => {
        this.bandList.changeBandName(id, nuevoNombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("agregar-banda", ({ nombreNuevaBanda }) => {
        this.bandList.addBand(nombreNuevaBanda);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
