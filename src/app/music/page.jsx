"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MusicAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Albums per page
    const router = useRouter();

    useEffect(() => {
        fetch("https://67c2a046471ff9000880e4bf--music-crazy.netlify.app/api/albums/")
            .then(response => response.json())
            .then(data => {
                console.log(data, "This is data");
                setAlbums(data);
            })
            .catch(error => console.error("Error fetching albums:", error));
    }, []);

    const handleAlbumClick = (link) => {
        router.push(`/music/album?url=${link}`);
    };

    // Pagination Logic
    const totalPages = Math.ceil(albums.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedAlbums = albums.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="music-albums-container">
            <h2>Music Albums</h2>
            <div className="albums-grid">
                {paginatedAlbums.map((album, index) => (
                    <div 
                        key={index} 
                        className="album-card" 
                        onClick={() => handleAlbumClick(album.link)} 
                        style={{ cursor: "pointer" }}
                    >
                        <img src={album.image} alt={album.title} className="album-cover" />
                        <h3>{album.title}</h3>
                        <p>{album.artist}</p>
                        <p>{album.year}</p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
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
                .pagination {
                    margin-top: 20px;
                }
                .pagination button {
                    margin: 5px;
                    padding: 5px 10px;
                    border: none;
                    background-color: #007bff;
                    color: white;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .pagination button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default MusicAlbums;
