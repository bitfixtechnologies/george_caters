import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const token = process.argv[2] || process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("No token provided");
  process.exit(1);
}

const client = createClient({
  projectId: "u1mx3eth",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: token,
  useCdn: false,
});

const POST_IMAGES = [
  {
    postId: "post-wedding-catering-tips-kerala",
    filePath: "public/blog/wedding-catering-guide.png",
    filename: "wedding-catering-guide.png",
  },
  {
    postId: "post-gourmet-corporate-events-buffet",
    filePath: "public/blog/corporate-buffet-setup.png",
    filename: "corporate-buffet-setup.png",
  },
  {
    postId: "post-secret-traditional-spices-fusion",
    filePath: "public/blog/spice-secrets-traditional.png",
    filename: "spice-secrets-traditional.png",
  },
  {
    postId: "post-home-party-platters-catering-guide",
    filePath: "public/blog/party-platters-tips.png",
    filename: "party-platters-tips.png",
  },
];

async function uploadImagesAndPatchPosts() {
  console.log("Starting image upload to Sanity Cloud...");

  for (const item of POST_IMAGES) {
    const fullPath = path.resolve(item.filePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }

    console.log(`Uploading ${item.filename} to Sanity Assets...`);
    const imageAsset = await client.assets.upload("image", fs.createReadStream(fullPath), {
      filename: item.filename,
    });

    console.log(`Uploaded asset ID: ${imageAsset._id}. Patching post ${item.postId}...`);

    await client
      .patch(item.postId)
      .set({
        mainImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      })
      .commit();

    console.log(`Successfully attached cover image to ${item.postId}`);
  }

  console.log("ALL COVER IMAGES SUCCESSFULLY UPLOADED & LINKED TO SANITY ARTICLES!");
}

uploadImagesAndPatchPosts().catch((err) => {
  console.error("Upload error:", err);
  process.exit(1);
});
