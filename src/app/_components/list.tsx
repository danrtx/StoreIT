import { deleteFile } from "@/app/actions";
import { groupFilesByType } from "@/app/utils";
import fs from "fs/promises";
import Image from "next/image";
import { FiFile, FiImage, FiVideo, FiMusic, FiFileText, FiDownload, FiTrash2, FiFolder } from 'react-icons/fi';

const List = async () => {
  let files: string[] = [];

  try {
    files = await fs.readdir("uploads");
  } catch (error) {
    console.error(error);
    await fs.mkdir("uploads", { recursive: true });
  }

  const groupedFiles = groupFilesByType(files);

  const handleDelete = async (fileName: string) => {
    "use server";
    await deleteFile(fileName);
  };

  // Función para obtener el icono según el tipo de archivo
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <FiImage className="text-blue-400" />;
      case "video": return <FiVideo className="text-red-400" />;
      case "audio": return <FiMusic className="text-green-400" />;
      case "document": return <FiFileText className="text-amber-400" />;
      default: return <FiFile className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1b26] rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
          <FiFolder className="text-white text-xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Files</h1>
      </div>

      {Object.entries(groupedFiles).length > 0 ? (
        Object.entries(groupedFiles).map(([type, typeFiles]) => (
          <div key={type} className="mb-8">
            <div className="flex items-center mb-4">
              {getTypeIcon(type)}
              <h2 className="ml-2 text-lg font-semibold capitalize text-gray-700 dark:text-gray-200">
                {type} Files
              </h2>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({typeFiles.length})
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {typeFiles.map((file) => {
                const fileName = file.substring(file.indexOf("-") + 1);
                const fileDate = new Date(parseInt(file.split("-")[0]));
                
                return (
                  <div
                    key={file}
                    className="bg-gray-50 dark:bg-[#282a36] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 dark:border-[#44475a] hover:border-blue-200 dark:hover:border-[#6272a4]"
                  >
                    {/* Vista previa del archivo */}
                    <div className="relative">
                      {type === "image" && (
                        <div className="relative aspect-video bg-gray-100 dark:bg-[#1e1f29]">
                          <Image
                            src={`/api/download/${file}`}
                            alt={fileName}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      {type === "video" && (
                        <video
                          className="w-full aspect-video bg-gray-100 dark:bg-[#1e1f29]"
                          controls
                          src={`/api/download/${file}`}
                          poster="/api/placeholder/400/225"
                        />
                      )}
                      {type === "audio" && (
                        <div className="pt-4 px-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-[#2a2c3a] dark:to-[#282a36]">
                          <div className="flex justify-center items-center py-6">
                            <FiMusic className="text-5xl text-purple-500 dark:text-purple-400" />
                          </div>
                          <audio
                            className="w-full mb-2"
                            controls
                            src={`/api/download/${file}`}
                            preload="none"
                          />
                        </div>
                      )}
                      {(type === "document" || type === "other") && (
                        <div className="flex justify-center items-center py-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#2a2c3a] dark:to-[#282a36]">
                          {type === "document" ? (
                            <FiFileText className="text-5xl text-indigo-500 dark:text-indigo-400" />
                          ) : (
                            <FiFile className="text-5xl text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Información del archivo */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-[#f8f8f2] truncate" title={fileName}>
                          {fileName}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-[#6272a4] mb-3">
                        {fileDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      
                      {/* Acciones */}
                      <div className="flex justify-between items-center">
                        {(type === "document" || type === "other") ? (
                          <a
                            href={`/api/download/${file}`}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-[#bd93f9] hover:text-blue-800 dark:hover:text-[#ff79c6] font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiDownload size={14} />
                            Download
                          </a>
                        ) : (
                          <a
                            href={`/api/download/${file}`}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-[#bd93f9] hover:text-blue-800 dark:hover:text-[#ff79c6] font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiDownload size={14} />
                            Download
                          </a>
                        )}
                        <form action={handleDelete.bind(null, file)}>
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-[#ff5555] hover:text-red-800 dark:hover:text-red-400 font-medium"
                            title="Delete file"
                          >
                            <FiTrash2 size={14} />
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-[#1e1f29] rounded-xl border border-gray-200 dark:border-[#44475a]">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
            <FiFolder className="text-3xl text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-500 dark:text-[#6272a4] font-medium mb-2">No files uploaded yet</p>
          <p className="text-sm text-gray-400 dark:text-[#6272a4]/80">Upload files to see them here</p>
        </div>
      )}
    </div>
  );
};

export { List };