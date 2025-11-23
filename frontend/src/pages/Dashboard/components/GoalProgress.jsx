import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card';

const GoalProgress = ({ goals }) => {
  return (
    <Card className="lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Goal Progress Overview</h3>
      {goals && goals.length > 0 ? (
        <div className="space-y-2">
          {goals.map((goal) => (
            <Link 
              key={goal.id} 
              to={`/tujuan`} // Navigate to the main goals page 
              className="block p-4 rounded-lg hover:bg-gray-50 transition-colors border-b last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-blue-700">{goal.jenis_tujuan}</p>
                <p className="text-sm font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                  {goal._count.perjalanan} Journeys
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">No goals created yet.</p>
          <Link to="/tujuan" className="text-blue-600 hover:underline font-medium mt-2 inline-block">
            Go to "My Goals" to add one!
          </Link>
        </div>
      )}
    </Card>
  );
};

export default GoalProgress;
