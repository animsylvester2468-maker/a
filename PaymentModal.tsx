import React from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

const PAYMENT_LINK_BASE = 'https://buy.stripe.com/00w8wI6pa2Ah84G6d10co02';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, userEmail }) => {
  if (!isOpen) return null;

  const paymentLink = userEmail 
    ? `${PAYMENT_LINK_BASE}?prefilled_email=${encodeURIComponent(userEmail)}` 
    : PAYMENT_LINK_BASE;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary mb-5">
            <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Unlock Business Growth</h3>
          <p className="mt-4 text-gray-600">
            Gain full access to our powerful suite of business tools with a one-time payment. Supercharge your growth today!
          </p>
          
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong className="font-semibold">Important Notice:</strong> Your subscription is saved on this device's browser only. If you clear your browser data or sign in on a different device, you will lose access to subscribed features.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105"
            >
              Unlock Business Growth
            </a>
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-full border border-gray-300 px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;