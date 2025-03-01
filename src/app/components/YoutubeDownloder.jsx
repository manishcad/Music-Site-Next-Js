"use client";

import { useState } from "react";
import "./YoutubeDownloder.css"
const YoutubeDownloader = () => {
    const [url, setUrl] = useState("");
    const [format, setFormat] = useState("mp4");

    const handleDownload = () => {
        console.log("handler running ///")
        if (!url) {
            alert("Please enter a valid YouTube URL.");
            return;
        }

        window.open(`/api/image/download?url=${url}`);
    };

    return (
        <div className="downloader-container">
            <h2>YouTube Downloader</h2>
            <input
                type="text"
                placeholder="Enter YouTube URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <select onChange={(e) => setFormat(e.target.value)} value={format}>
                <option value="mp4">MP4 (Video)</option>
                <option value="mp3">MP3 (Audio)</option>
            </select>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default YoutubeDownloader;
