import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import './styles.css'

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
    }, [onFileUploaded])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ["image/jpeg","image/png","image/jpg"]
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/jpeg,image/png,image/jpg" />

            {selectedFileUrl
                ? <img src={selectedFileUrl} alt="Imagem do ponto de coleta" />
                : isDragActive ?
                    <p><FiUpload />Solte o arquivo aqui...</p> :
                    <p><FiUpload />Arraste e solte a imagem do estabelecimento aqui, ou clique e selecione o arquivo</p>
            }
        </div>
    )
}

export default Dropzone;