import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { createPerjalanan, updatePerjalanan } from '../../api/perjalanan.api';

const JourneyFormModal = ({ isOpen, onClose, tujuanId, initialData = null }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    arah: '',
    ketahanan: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        arah: initialData.arah || '',
        ketahanan: initialData.ketahanan || '',
      });
    } else {
      setFormData({
        arah: '',
        ketahanan: '',
      });
    }
    setError(null);
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const mutation = useMutation({
    mutationFn: initialData ? updatePerjalanan : createPerjalanan,
    onSuccess: () => {
      queryClient.invalidateQueries(['perjalanans', tujuanId]);
      onClose();
    },
    onError: (err) => {
      setError(err.response?.data?.message || `Failed to ${initialData ? 'update' : 'create'} journey.`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (initialData) {
      mutation.mutate({ id: initialData.id, ...formData });
    } else {
      mutation.mutate({ tujuanId, ...formData });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Journey' : 'Add New Journey'}>
      {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="arah" className="block text-gray-700 text-sm font-bold mb-2">
            Journey
          </label>
          <Input
            id="arah"
            name="arah"
            value={formData.arah}
            onChange={handleChange}
            placeholder="e.g., Meditate 10 minutes daily"
            required
          />
        </div>
        <div>
          <label htmlFor="ketahanan" className="block text-gray-700 text-sm font-bold mb-2">
            Resilience (Optional)
          </label>
          <Input
            id="ketahanan"
            name="ketahanan"
            value={formData.ketahanan}
            onChange={handleChange}
            placeholder="e.g., High"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Saving...' : 'Save Journey'}
        </Button>
      </form>
    </Modal>
  );
};

export default JourneyFormModal;
