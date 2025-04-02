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
    <section className="bg-white dark:bg-[#1a1b26] rounded-xl shadow-lg p-6">
      <header className="flex items-center mb-6">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
          <FiFolder className="text-white text-xl" />
        </span>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Files</h1>
      </header>

      {Object.entries(groupedFiles).length > 0 ? (
        Object.entries(groupedFiles).map(([type, typeFiles]) => (
          <section key={type} className="mb-8">
            <header className="flex items-center mb-4">
              {getTypeIcon(type)}
              <h2 className="ml-2 text-lg font-semibold capitalize text-gray-700 dark:text-gray-200">
                {type} Files
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({typeFiles.length})
                </span>
              </h2>
            </header>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {typeFiles.map((file) => {
                const fileName = file.substring(file.indexOf("-") + 1);
                const fileDate = new Date(parseInt(file.split("-")[0]));
                
                return (
                  <li
                    key={file}
                    className="bg-gray-50 dark:bg-[#282a36] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 dark:border-[#44475a] hover:border-blue-200 dark:hover:border-[#6272a4]"
                  >
                    {type === "image" && (
                      <figure className="relative aspect-video bg-gray-100 dark:bg-[#1e1f29]">
                        <Image
                          src={`/api/download/${file}`}
                          alt={fileName}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </figure>
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
                      <figure className="pt-4 px-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-[#2a2c3a] dark:to-[#282a36]">
                        <span className="flex justify-center items-center py-6">
                          <FiMusic className="text-5xl text-purple-500 dark:text-purple-400" />
                        </span>
                        <audio
                          className="w-full mb-2"
                          controls
                          src={`/api/download/${file}`}
                          preload="none"
                        />
                      </figure>
                    )}
                    {(type === "document" || type === "other") && (
                      <figure className="flex justify-center items-center py-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#2a2c3a] dark:to-[#282a36]">
                        {type === "document" ? (
                          <FiFileText className="text-5xl text-indigo-500 dark:text-indigo-400" />
                        ) : (
                          <FiFile className="text-5xl text-gray-500 dark:text-gray-400" />
                        )}
                      </figure>
                    )}

                    <footer className="p-4">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-[#f8f8f2] truncate mb-1" title={fileName}>
                        {fileName}
                      </h3>
                      <time className="block text-xs text-gray-500 dark:text-[#6272a4] mb-3">
                        {fileDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </time>
                      
                      <nav className="flex justify-between items-center">
                        <a
                          href={`/api/download/${file}`}
                          className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-[#bd93f9] hover:text-blue-800 dark:hover:text-[#ff79c6] font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiDownload size={14} />
                          Download
                        </a>
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
                      </nav>
                    </footer>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      ) : (
        <figure className="flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-[#1e1f29] rounded-xl border border-gray-200 dark:border-[#44475a]">
          <span className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
            <FiFolder className="text-3xl text-blue-500 dark:text-blue-400" />
          </span>
          <p className="text-gray-500 dark:text-[#6272a4] font-medium mb-2">No files uploaded yet</p>
          <p className="text-sm text-gray-400 dark:text-[#6272a4]/80">Upload files to see them here</p>
        </figure>
      )}
    </section>
  );
};

export { List };