"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MusicAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:3000/api/albums/")
            .then(response => response.json())
            .then(data => {
                console.log(data, "This is data");
                setAlbums(data);
            })
            .catch(error => console.error("Error fetching albums:", error));
    }, []);

    const handleAlbumClick = (id) => {
        router.push(`/music/album/${id}`);
    };

    return (
        <div className="music-albums-container">
            <h2>Music Albums</h2>
            <div className="albums-grid">
                {albums.map((album, index) => (
                    <div 
                        key={index} 
                        className="album-card" 
                        onClick={() => handleAlbumClick(album.id)} 
                        style={{ cursor: "pointer" }}
                    >
                        <img src={album.image} alt={album.title} className="album-cover" />
                        <h3>{album.title}</h3>
                        <p>{album.artist}</p>
                        <p>{album.year}</p>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .music-albums-container {
                    padding: 20px;
                    text-align: center;
                    margin-top: 100px;
                }
                .albums-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                .album-card {
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 5px;
                    text-align: center;
                    transition: transform 0.2s;
                }
                .album-card:hover {
                    transform: scale(1.05);
                }
                .album-cover {
                    width: 100%;
                    height: auto;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default MusicAlbums;
