import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTujuans, deleteTujuan } from '../../api/tujuan.api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import GoalFormModal from '../../components/tujuan/GoalFormModal';
import JourneyManagementSection from '../../components/perjalanan/JourneyManagementSection';

const TujuanList = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [expandedGoalId, setExpandedGoalId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tujuans'],
    queryFn: getTujuans,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTujuan,
    onSuccess: () => {
      queryClient.invalidateQueries(['tujuans']);
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'Failed to delete goal.');
    },
  });

  const handleDeleteTujuan = (id) => {
    if (window.confirm('Are you sure you want to delete this goal and all its associated data?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleToggleExpand = (goalId) => {
    setExpandedGoalId(prevId => (prevId === goalId ? null : goalId));
  };

  if (isLoading) {
    return (
      <div className="p-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="mb-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) return <p className="text-center p-4 text-red-500">Error: {error.message}</p>;

  const tujuans = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Goals</h1>
        <Button onClick={handleOpenCreateModal}>Add New Goal</Button>
      </div>

      <GoalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingGoal}
      />

      <div className="space-y-4">
        {tujuans.length > 0 ? (
          tujuans.map((tujuan) => (
            <Card key={tujuan.id}>
              <div className="flex justify-between items-start">
                <div 
                  className="flex-grow cursor-pointer" 
                  onClick={() => handleToggleExpand(tujuan.id)}
                >
                  <h3 className="text-xl font-semibold text-blue-700 hover:underline">
                    {tujuan.jenis_tujuan}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">Outcome: {tujuan.hasil || 'Not specified'}</p>
                </div>
                <div className="flex space-x-2 flex-shrink-0 ml-4">
                  <Button size="sm" variant="secondary" onClick={() => handleOpenEditModal(tujuan)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteTujuan(tujuan.id)} disabled={deleteMutation.isLoading}>
                    Delete
                  </Button>
                </div>
              </div>

              {expandedGoalId === tujuan.id && (
                <JourneyManagementSection tujuanId={tujuan.id} />
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">No Goals Yet</h3>
            <p className="text-gray-500 mt-2">Start your life journey by adding your first goal.</p>
            <Button className="mt-4" onClick={handleOpenCreateModal}>
              Create Your First Goal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TujuanList;