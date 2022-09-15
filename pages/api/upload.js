import multiparty from "multiparty";
import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import { initMongoose } from "../lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import User from "../../models/User";

export default async function handle(req, res) {
  await initMongoose();
  const session = await unstable_getServerSession(req, res, authOptions);

  const S3Client = new S3({
    region: "sa-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const form = new multiparty.Form({
    uploadDir: "./public",
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }
    const fileInfo = files["cover"][0].path;
    const filename = fileInfo.path.split("/")[1];
    S3Client.upload(
      {
        Bucket: "twitter-clone-2023",
        Body: fs.readFileSync(fileInfo),
        ACL: "public-read",
        Key: filename,
        ContentType: fileInfo.headers["content-type"],
      },
      async (err, data) => {
        const user = await User.findByIdAndUpdate(session.user.id, {
          cover: data.Location,
        });
        res.json({ err, data, fileInfo, src: data.Location });
      }
    );
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
