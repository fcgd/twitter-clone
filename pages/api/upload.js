import multiparty from "multiparty";
import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import { unstable_getServerSession } from "next-auth";
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

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }

    const type = Object.keys(files)[0];
    const fileInfo = files[type][0];
    const filename = fileInfo.path.split("/").slice(-1)[0];

    S3Client.upload(
      {
        Bucket: "twitter-clone-2023",
        Body: fs.readFileSync(fileInfo.path),
        ACL: "public-read",
        Key: filename,
        ContentType: fileInfo.headers["content-type"],
      },
      async (err, data) => {
        if (type === "cover" || type === "image") {
          await User.findByIdAndUpdate(session.user.id, {
            [type]: data.Location,
          });
        }

        fs.unlinkSync(fileInfo.path);
        res.json({ files, err, data, fileInfo, src: data.Location });
      }
    );
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
