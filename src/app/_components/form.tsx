"use client";
import { upload } from "@/app/actions";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/app/constants";
import { formatFileSize } from "@/app/utils";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification, Notification } from "./Notification"; 

const Form = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { notification, showNotification, hideNotification } = useNotification(); 

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true);
    const result = await upload(formData);
    if (!result.success) {
      setErrorMessage(result.message);
      showNotification('error', result.message || 'Failed to upload file');
    } else {
      setErrorMessage(null);
      setFileName(null);
      showNotification('success', 'File uploaded successfully'); 
    }
    setIsUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {/* Añadimos el componente de notificación */}
      <Notification 
        type={notification.type} 
        message={notification.message} 
        onClose={hideNotification} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-xl bg-[#282a36] mb-8 border border-[#44475a] shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#f8f8f2] tracking-wide">Upload Files</h2>
        <form action={handleUpload}>
          <div className="space-y-6">
            <motion.div 
              className={`border-3 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors duration-300 ${isDragging ? 'border-[#ff79c6] bg-[#ff79c6]/10' : 'border-[#44475a] bg-[#1e1f29]'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                ref={fileInputRef}
                name="file"
                type="file"
                accept={Object.keys(ALLOWED_TYPES).join(",")}
                className="hidden"
                onChange={handleFileChange}
              />
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-[#bd93f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                
                {fileName ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#f8f8f2] font-medium"
                  >
                    {fileName}
                  </motion.p>
                ) : (
                  <>
                    <p className="text-lg font-medium text-[#f8f8f2] mb-2">Drag files here or click to browse</p>
                    <p className="text-[#6272a4]">
                      Max file size: {formatFileSize(MAX_FILE_SIZE)}
                    </p>
                  </>
                )}
              </motion.div>
            </motion.div>
            
            <AnimatePresence>
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#ff5555]/20 p-4 rounded-lg border border-[#ff5555]"
                >
                  <p className="text-[#ff5555] flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {errorMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              type="submit"
              className="w-full p-3 bg-[#bd93f9] rounded-lg text-white font-medium shadow-md hover:bg-[#ff79c6] transition-colors duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <span>Upload File</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export { Form };