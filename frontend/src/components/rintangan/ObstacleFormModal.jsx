import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { createRintangan, updateRintangan } from '../../api/rintangan.api';

const ObstacleFormModal = ({ isOpen, onClose, perjalananId, initialData = null }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    jenis_rintangan: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        jenis_rintangan: initialData.jenis_rintangan || '',
      });
    } else {
      setFormData({
        jenis_rintangan: '',
      });
    }
    setError(null);
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const mutation = useMutation({
    mutationFn: initialData ? updateRintangan : createRintangan,
    onSuccess: () => {
      queryClient.invalidateQueries(['rintangans', perjalananId]);
      onClose();
    },
    onError: (err) => {
      setError(err.response?.data?.message || `Failed to ${initialData ? 'update' : 'create'} obstacle.`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (initialData) {
      mutation.mutate({ id: initialData.id, ...formData });
    } else {
      mutation.mutate({ perjalananId, ...formData });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Obstacle' : 'Add New Obstacle'}>
      {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jenis_rintangan" className="block text-gray-700 text-sm font-bold mb-2">
            Obstacle
          </label>
          <Input
            id="jenis_rintangan"
            name="jenis_rintangan"
            value={formData.jenis_rintangan}
            onChange={handleChange}
            placeholder="e.g., Overthinking, Procrastination"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Saving...' : 'Save Obstacle'}
        </Button>
      </form>
    </Modal>
  );
};

export default ObstacleFormModal;
