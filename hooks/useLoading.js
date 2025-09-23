'use client';

import { useState, useCallback } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

export const useAsyncOperation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { startLoading, stopLoading } = useLoading();

  const execute = useCallback(async (
    asyncFunction,
    {
      loadingMessage = 'Loading...',
      loadingType = 'default',
      showProgress = false,
      showGlobalLoader = false,
      onSuccess,
      onError
    } = {}
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (showGlobalLoader) {
        startLoading(loadingMessage, loadingType, showProgress);
      }
      
      const result = await asyncFunction();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
      if (showGlobalLoader) {
        stopLoading();
      }
    }
  }, [startLoading, stopLoading]);

  return {
    execute,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};

export const usePageLoading = () => {
  const { startLoading, stopLoading, isLoading, loadingMessage, setLoadingMessage } = useLoading();

  const showLoader = useCallback((message = 'Loading...', type = 'default', showProgress = false) => {
    startLoading(message, type, showProgress);
  }, [startLoading]);

  const hideLoader = useCallback(() => {
    stopLoading();
  }, [stopLoading]);

  const updateMessage = useCallback((message) => {
    setLoadingMessage(message);
  }, [setLoadingMessage]);

  return {
    showLoader,
    hideLoader,
    updateMessage,
    isLoading,
    loadingMessage
  };
};

export default useAsyncOperation;