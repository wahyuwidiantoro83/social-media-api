const multer = require("multer")
const fs = require("fs")
module.exports = {
    uploader: (directory) => {
        // LOKASI UTAMA PENYIMPANAN FILE
        const defaultDir = "./public"

        //KONFIGURASI MULTER
        const storageUploader = multer.diskStorage({
            destination: (req, file, cb) => {
                const pathDir = directory? defaultDir+directory : defaultDir; // Membuat directory penyimpanan bisa dinamis dengan menambahkan parameter directory.
                if (fs.existsSync(pathDir)) {
                    // JIKA DIRECTORY DITEMUKAN MAKA PARAMATER cb DARI DESTINATION AKAN MENYIMPAN FILE
                    console.log(`Directory ${pathDir} EXIST`);
                    cb(null, pathDir)
                } else {
                    fs.mkdirSync(pathDir, (err) => {
                        if (err) {
                            console.log("Error Create Directory", err);
                        }
                        return cb(err, pathDir);
                    })
                }
            },
            filename:(req,file,cb)=> {
                //MENENTUKAN NAMA FILE YANG AKAN DISIMPAN
                cb(null, `${Date.now()}--${file.originalname}`)
            }
        })

        const fileFilter = (req,file,cb)=>{
            if (file.originalname.toLowerCase().includes(".png")||file.originalname.toLowerCase().includes(".jpg")) {
                cb(null, true)
            } else {
                cb (new Error("Your file extension are denied. Only JPG or PNG", false))
            }
        }

        return multer({storage:storageUploader, fileFilter}) // fileFilter : fileFilter, karena namanya sama cukup ditulis sekali saja
    }
}