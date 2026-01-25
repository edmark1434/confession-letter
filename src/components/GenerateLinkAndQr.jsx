import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideX, LucideCopy, LucideCheck, LucideDownload, LucideShare2 } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import love from '../../public/love.png';
import {generateWebsiteId} from '../services/WebsiteIdGenerator.jsx';
const GenerateLinkAndQr = ({ isOpen, onClose}) => {
  const [copied, setCopied] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const qrCodeRef = useRef(null);
  const canvasRef = useRef(null);

  // Generate shareable link when modal opens
  useEffect(() => {
    const generateLink = async () => {
      const code = sessionStorage.getItem("latestConfessionCode");
      const baseUrl = window.location.origin;
      return `${baseUrl}/confession/${code}`;
    };

    if (isOpen && !shareableLink) {
      generateLink().then(link => setShareableLink(link));
    }
  }, [isOpen]);
  
  // Init QR instance once
  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: 280,
      height: 280,
      image: love,
      dotsOptions: {
        color: '#4267b2',
        type: 'rounded',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 16,
      },
    });
  }, []);
    
  // Generate QR code
  useEffect(() => {
    if (isOpen && shareableLink && qrCodeRef.current && canvasRef.current) {
      // append only once
      qrCodeRef.current.append(canvasRef.current);
      qrCodeRef.current.update({ data: shareableLink });
    }
  }, [isOpen, shareableLink]);

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download QR code
  const downloadQR = () => {
    qrCodeRef.current?.download({ name: 'confession-qr-code', extension: 'png' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white rounded-4xl shadow-2xl max-w-md w-full p-6 border-4 border-rose-100 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-rose-50 rounded-full transition-colors text-slate-400 hover:text-rose-500"
          >
            <LucideX size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <LucideShare2 size={32} className="text-rose-500" />
            </div>
            <h2 className="text-3xl font-serif text-rose-900 mb-2">Share Your Confession</h2>
            <p className="text-slate-500 text-sm">Copy the link or scan the QR code to share</p>
          </div>

          {/* Link Section */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                Shareable Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 bg-white px-3 py-2 rounded-lg text-sm font-mono text-slate-700 border border-slate-200 outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-rose-500 text-white hover:bg-rose-600'
                  }`}
                >
                  {copied ? (
                    <>
                      <LucideCheck size={16} /> Copied!
                    </>
                  ) : (
                    <>
                      <LucideCopy size={16} /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">
                QR Code
              </label>
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-xl inline-block border-4 border-rose-100">
                  {/* Canvas host for styled QR */}
                  <div ref={canvasRef} className="w-[280px] h-[280px]" />
                </div>
                <button
                  onClick={downloadQR}
                  className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <LucideDownload size={18} /> Download QR Code
                </button>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-slate-400 text-center mt-6 italic">
            This link will open your personalized confession letter
          </p>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};

export default GenerateLinkAndQr;