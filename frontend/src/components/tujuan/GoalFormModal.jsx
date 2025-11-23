import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { createTujuan, updateTujuan } from '../../api/tujuan.api';

const GoalFormModal = ({ isOpen, onClose, initialData = null }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    jenis_tujuan: '',
    hasil: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        jenis_tujuan: initialData.jenis_tujuan || '',
        hasil: initialData.hasil || '',
      });
    } else {
      setFormData({
        jenis_tujuan: '',
        hasil: '',
      });
    }
    setError(null);
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const mutation = useMutation({
    mutationFn: initialData ? (data) => updateTujuan(initialData.id, data) : createTujuan,
    onSuccess: () => {
      queryClient.invalidateQueries(['tujuans']);
      onClose();
    },
    onError: (err) => {
      setError(err.response?.data?.message || `Failed to ${initialData ? 'update' : 'create'} goal.`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    mutation.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Goal' : 'Add New Goal'}>
      {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jenis_tujuan" className="block text-gray-700 text-sm font-bold mb-2">
            Goal
          </label>
          <Input
            id="jenis_tujuan"
            name="jenis_tujuan"
            value={formData.jenis_tujuan}
            onChange={handleChange}
            placeholder="e.g., Become more disciplined"
            required
          />
        </div>
        <div>
          <label htmlFor="hasil" className="block text-gray-700 text-sm font-bold mb-2">
            Desired Outcome (Optional)
          </label>
          <Input
            id="hasil"
            name="hasil"
            value={formData.hasil}
            onChange={handleChange}
            placeholder="e.g., Achieve inner peace"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Saving...' : 'Save Goal'}
        </Button>
      </form>
    </Modal>
  );
};

export default GoalFormModal;
