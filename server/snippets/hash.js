const bcryptjs = require("bcryptjs")

// console.log(bcryptjs.hashSync("Sanket",10))
console.log(bcryptjs.compareSync("","$2a$10$ShxZ66iUcf5sB9lzCM/g4.tSJ6NY075w.16oMjF/zImZ1e5caF2sy"))