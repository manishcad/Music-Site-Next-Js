import fs from "fs";
import path from "path";
import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Image URL is required" });
    }

    try {
        // Fetch image from the given URL
        const response = await axios.get(url, { responseType: "arraybuffer" });
        
        // Extract file extension
        const ext = path.extname(url).split("?")[0] || ".jpg";
        const fileName = `downloaded-image${ext}`;
        const filePath = path.resolve("public", fileName);

        // Save image to public folder
        fs.writeFileSync(filePath, response.data);

        // Send the file to the user for download
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-Type", response.headers["content-type"]);
        res.send(response.data);

        // (Optional) Delete the file after download
        setTimeout(() => fs.unlinkSync(filePath), 5000);
        
    } catch (error) {
        console.error("Download Error:", error);
        res.status(500).json({ error: "Failed to download image" });
    }
}
