import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import { ApiResponse } from "../../src/models/ApiResponse";
import { read } from "./readcsv";

interface NextConnectApiRequest extends NextApiRequest {
  files: any;
}
type ResponseData = ApiResponse<string[], string>;

const oneMegabyteInBytes = 1000000;
const outputFolderName = "./public/uploads";

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 100 },
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
      fs.exists("./public/uploads/" + file.originalname, (exists: any) => {
        if (exists) {
          read(file.originalname);
        } else {
          let intervalId = setInterval(() => {
            let filseStatus = fs.existsSync(
              "./public/uploads/" + file.originalname
            );
            if (filseStatus) {
              console.log("ACTIVATE");
              read(file.originalname);
              clearInterval(intervalId);
            }
          }, 2000);
        }
      });
    },
  }),
  /*fileFilter: (req, file, cb) => {
    const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
    cb(null, acceptFile);
  },*/
});

const apiRoute = nextConnect({
  onError(
    error,
    req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// apiRoute.use();

apiRoute.post(
  (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    const filenames = fs.readdirSync(outputFolderName);
    const files = filenames.map((name) => name);
    // console.log(upload);
    upload.array("theFiles");
    res.status(200).json({ data: files });
  }
);

apiRoute.get(
  (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    const filenames = fs.readdirSync(outputFolderName + "/csv");
    const files = filenames.map((name) => name);
    // console.log(upload);

    res.status(200).json({ data: files });
  }
);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;
