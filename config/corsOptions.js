import {allowedOrigins} from "./allowedOrigins.js";

// export const corsOptionsDelegate = (req,callback) => {
//     var corsOptions;
//     if (allowlist.indexOf(req.header('Origin')) !== -1) {
//       corsOptions = { origin: true,credentials:true,optionsSuccessStatus: 200 } // reflect (enable) the requested origin in the CORS response
//     } else {
//       corsOptions = { origin: false } // disable CORS for this request
//     }
//     callback(new Error('Not allowed by CORS')) // callback expects two parameters: error and options
//   }


const corsOptions = {
    origin: (origin,callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
}

export default corsOptions