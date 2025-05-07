import React from 'react';
import { useEffect, useState } from 'react';
import { list, fetchDepartments } from './actions';
import { Photo } from './Photo';
import { Department } from './Department';
import './Gallery.css';

const Gallery: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchPhotosByDepartment = async () => {
            setLoading(true);
            const fetchedPhotos = await list(currentPage, selectedDepartment);
            setPhotos(fetchedPhotos);
            setLoading(false);
        };

        fetchPhotosByDepartment();
    }, [selectedDepartment]);

    const handlePageChange = async (newPage: number) => {
        if (newPage < 0) return;
        setLoading(true);
        const fetchedPhotos = await list(newPage);
        if (fetchedPhotos.length > 0) {
            setPhotos(fetchedPhotos);
            setCurrentPage(newPage);
        }
        setLoading(false);
    };
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            const fetchedPhotos = await list(0);
            const fetchedDepartments = await fetchDepartments();
            setDepartments(fetchedDepartments);
            setPhotos(fetchedPhotos);
            setLoading(false);
        };

        init();
    }, []);

    return (
        <div>
            <h2>Highpoint Exercise</h2>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Loading please wait...</p>
                </div>
            ) : (
                <>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        style={{ padding: '8px', width: '150px' }}
                    >
                        <option value="">All Departments</option>
                        {departments.map((department) => (
                            <option key={department.departmentId} value={department.departmentId}>
                                {department.displayName}
                            </option>
                        ))}
                    </select>
                </div>
                    <div className="gallery">
                        {photos.map((photo: Photo) => (
                            <div
                                key={photo.id}
                                className="gallery-item"
                                onClick={() => {
                                    setSelectedPhoto(photo);
                                    setShowModal(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={photo.url || '/images/not-available.jpg'}
                                    alt={photo.title}
                                    loading="lazy"
                                    className="gallery-image"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <p>{photo.title}</p>
                            </div>
                        ))}

                        {showModal && selectedPhoto && (
                            <div
                                className="modal"
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                                onClick={() => setShowModal(false)}
                            >
                                <div
                                    className="modal-content"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        maxWidth: '500px',
                                        width: '90%',
                                        maxHeight: '90%',
                                        overflowY: 'auto',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={selectedPhoto.url || '/images/not-available.jpg'}
                                        alt={selectedPhoto.title}
                                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                    />
                                    <h2>{selectedPhoto.title}</h2>
                                    <div>
                                        {selectedPhoto.accessionYear && <p><strong>Accession Year:</strong> {selectedPhoto.accessionYear}</p>}
                                        {selectedPhoto.isPublicDomain !== undefined && <p><strong>Public Domain:</strong> {selectedPhoto.isPublicDomain ? 'Yes' : 'No'}</p>}
                                        {selectedPhoto.department && <p><strong>Department:</strong> {selectedPhoto.department}</p>}
                                        {selectedPhoto.objectName && <p><strong>Object Name:</strong> {selectedPhoto.objectName}</p>}
                                        {selectedPhoto.culture && <p><strong>Culture:</strong> {selectedPhoto.culture}</p>}
                                        {selectedPhoto.period && <p><strong>Period:</strong> {selectedPhoto.period}</p>}
                                        {selectedPhoto.artistDisplayName && <p><strong>Artist:</strong> {selectedPhoto.artistDisplayName}</p>}
                                        {selectedPhoto.medium && <p><strong>Medium:</strong> {selectedPhoto.medium}</p>}
                                        {selectedPhoto.classification && <p><strong>Classification:</strong> {selectedPhoto.classification}</p>}
                                        <p>
                                            <strong>Learn more about this piece on the Met website:</strong>{' '}
                                            <a href={selectedPhoto.objectURL} target="_blank" rel="noopener noreferrer">
                                                View More
                                            </a>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            marginTop: '10px',
                                            padding: '8px 16px',
                                            backgroundColor: '#007BFF',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                            Previous
                        </button>
                        <span style={{ margin: '0 10px' }}>Page {currentPage + 1}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Gallery;